"""Postgres + pgvector dense vector store."""

from __future__ import annotations

import re
from functools import lru_cache

import numpy as np
import psycopg
from pgvector.psycopg import register_vector
from sentence_transformers import SentenceTransformer

from app.config import DATABASE_URL, EMBED_MODEL_NAME
from app.rag.aliases import expand_query

_QUERY_PREFIX = "Represent this sentence for searching relevant passages: "
# Supports "0.5 - The Assassin's Blade..." and "01 - Throne of Glass..."
_BOOK_NUM = re.compile(r"^(\d+(?:\.\d+)?)\b")


def parse_book_number(source_name: str) -> float | None:
    m = _BOOK_NUM.match(source_name.strip())
    return float(m.group(1)) if m else None


@lru_cache(maxsize=1)
def get_embed_model() -> SentenceTransformer:
    return SentenceTransformer(EMBED_MODEL_NAME)


def get_connection() -> psycopg.Connection:
    conn = psycopg.connect(DATABASE_URL)
    register_vector(conn)
    return conn


class VectorStore:
    """Dense retrieval against Postgres/pgvector."""

    def __init__(self, lazy_model: bool = True):
        self._model: SentenceTransformer | None = None if lazy_model else get_embed_model()

    @property
    def embed_model(self) -> SentenceTransformer:
        if self._model is None:
            self._model = get_embed_model()
        return self._model

    def _normalize(self, vectors: np.ndarray) -> np.ndarray:
        norms = np.linalg.norm(vectors, axis=1, keepdims=True)
        return vectors / np.clip(norms, 1e-12, None)

    def clear(self) -> None:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("TRUNCATE document_chunks RESTART IDENTITY")
            conn.commit()

    def add_chunks(self, chunks: list[str], source_name: str = "document") -> None:
        if not chunks:
            return

        embeddings = self._normalize(
            np.asarray(self.embed_model.encode(chunks, show_progress_bar=False))
        ).astype(np.float32)
        book_number = parse_book_number(source_name)

        rows = [
            (source_name, book_number, i, text, embeddings[i].tolist())
            for i, text in enumerate(chunks)
        ]

        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.executemany(
                    """
                    INSERT INTO document_chunks
                      (source, book_number, chunk_index, content, embedding)
                    VALUES (%s, %s, %s, %s, %s)
                    """,
                    rows,
                )
            conn.commit()

        print(f"Added {len(chunks)} chunks from '{source_name}' to the vector store.")

    def query(
        self,
        question: str,
        top_k: int = 8,
        max_book: int | None = None,
    ) -> list[dict]:
        expanded = expand_query(question)
        query_text = _QUERY_PREFIX + expanded
        query_embedding = self._normalize(
            np.asarray(self.embed_model.encode([query_text], show_progress_bar=False))
        )[0].astype(np.float32)

        sql = """
            SELECT content, source, book_number, chunk_index,
                   (embedding <=> %s::vector) AS distance
            FROM document_chunks
        """
        params: list = [query_embedding.tolist()]

        if max_book is not None:
            sql += " WHERE book_number IS NULL OR book_number <= %s"
            params.append(max_book)

        sql += " ORDER BY embedding <=> %s::vector LIMIT %s"
        params.extend([query_embedding.tolist(), top_k])

        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(sql, params)
                rows = cur.fetchall()

        return [
            {
                "text": r[0],
                "source": r[1],
                "book_number": r[2],
                "chunk_index": r[3],
                "distance": float(r[4]),
            }
            for r in rows
        ]

    def count(self) -> int:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT COUNT(*) FROM document_chunks")
                return int(cur.fetchone()[0])
