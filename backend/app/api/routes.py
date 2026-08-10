"""Ask / stream / ingest / health routes."""

from __future__ import annotations

import json
import os
from pathlib import Path

from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import StreamingResponse

from app.config import DATA_DIR, DEFAULT_TOP_K, INGEST_TOKEN
from app.db.vector_store import VectorStore
from app.rag.aliases import expand_query
from app.rag.chunker import load_and_chunk_pdf, load_and_chunk_txt
from app.rag.generator import generate_answer, stream_answer
from app.api.schemas import AskRequest, AskResponse, IngestRequest, SourceChunk

router = APIRouter()


def _history_dicts(req: AskRequest) -> list[dict] | None:
    if not req.history:
        return None
    return [h.model_dump() for h in req.history]


@router.get("/health")
def health():
    try:
        count = VectorStore(lazy_model=True).count()
        db_ok = True
    except Exception as exc:  # noqa: BLE001
        count = 0
        db_ok = False
        return {"status": "degraded", "db": False, "chunks": 0, "error": str(exc)}
    return {"status": "ok", "db": db_ok, "chunks": count}


@router.post("/ask", response_model=AskResponse)
def ask(req: AskRequest):
    store = VectorStore()
    top_k = req.top_k or DEFAULT_TOP_K
    expanded = expand_query(req.question)
    sources = store.query(req.question, top_k=top_k, max_book=req.max_book)
    if not sources:
        return AskResponse(
            answer="I could not find relevant passages in the archive for that question. Try rephrasing, or check that documents have been ingested.",
            sources=[],
            expanded_query=expanded if expanded != req.question else None,
        )
    answer = generate_answer(req.question, sources, history=_history_dicts(req))
    return AskResponse(
        answer=answer,
        sources=[SourceChunk(**s) for s in sources],
        expanded_query=expanded if expanded != req.question else None,
    )


@router.post("/ask/stream")
def ask_stream(req: AskRequest):
    store = VectorStore()
    top_k = req.top_k or DEFAULT_TOP_K
    expanded = expand_query(req.question)
    sources = store.query(req.question, top_k=top_k, max_book=req.max_book)

    def event_gen():
        payload = {
            "sources": sources,
            "expanded_query": expanded if expanded != req.question else None,
        }
        yield f"event: sources\ndata: {json.dumps(payload)}\n\n"
        if not sources:
            yield f"event: token\ndata: {json.dumps({'token': 'I could not find relevant passages in the archive for that question.'})}\n\n"
            yield "event: done\ndata: {}\n\n"
            return
        try:
            for token in stream_answer(req.question, sources, history=_history_dicts(req)):
                yield f"event: token\ndata: {json.dumps({'token': token})}\n\n"
            yield "event: done\ndata: {}\n\n"
        except Exception as exc:  # noqa: BLE001
            yield f"event: error\ndata: {json.dumps({'error': str(exc)})}\n\n"

    return StreamingResponse(event_gen(), media_type="text/event-stream")


@router.post("/ingest")
def ingest(req: IngestRequest):
    if req.token != INGEST_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid ingest token")

    data_dir = Path(DATA_DIR)
    if not data_dir.exists():
        raise HTTPException(status_code=400, detail=f"DATA_DIR missing: {data_dir}")

    store = VectorStore()
    if req.clear:
        store.clear()

    files = sorted(os.listdir(data_dir))
    added = []
    for filename in files:
        path = data_dir / filename
        if filename.endswith(".pdf"):
            chunks = load_and_chunk_pdf(str(path))
        elif filename.endswith(".txt"):
            chunks = load_and_chunk_txt(str(path))
        else:
            continue
        store.add_chunks(chunks, source_name=filename)
        added.append({"file": filename, "chunks": len(chunks)})

    return {"status": "ok", "files": added, "total_chunks": store.count()}
