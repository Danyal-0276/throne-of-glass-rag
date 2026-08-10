"""Groq generation with optional streaming and light chat history."""

from __future__ import annotations

from collections.abc import Iterator

from groq import Groq

from app.config import GROQ_API_KEY, GROQ_MODEL

SYSTEM_PROMPT = """You are a knowledgeable literary assistant for the Throne of Glass series,
speaking as the keeper of a private archive. Answer using ONLY the provided context passages.

Write a clear, synthesized answer in a few short paragraphs (not a bare bullet list).
Weave together details from multiple passages when they support the same point.
Name characters and places as they appear in the context.
If the context is incomplete, say what is known and what is missing — do not invent plot.
If the answer is not in the context at all, say you don't know."""


def _client() -> Groq:
    if not GROQ_API_KEY or GROQ_API_KEY == "your_key_here":
        raise RuntimeError("GROQ_API_KEY is not configured")
    return Groq(api_key=GROQ_API_KEY)


def _build_messages(
    question: str,
    retrieved_chunks: list[dict],
    history: list[dict] | None = None,
) -> list[dict]:
    context = "\n\n".join(
        f"[Source: {c['source']}]\n{c['text']}" for c in retrieved_chunks
    )
    messages: list[dict] = [{"role": "system", "content": SYSTEM_PROMPT}]

    if history:
        for turn in history[-6:]:
            role = turn.get("role")
            content = turn.get("content")
            if role in ("user", "assistant") and content:
                messages.append({"role": role, "content": content})

    messages.append(
        {
            "role": "user",
            "content": f"""Context passages:
{context}

Question: {question}

Write a fuller, well-organized answer that synthesizes the context above.
Prefer prose over lists unless a short list clearly helps. Cite sources in parentheses
when you lean on a specific passage (e.g. book filename).""",
        }
    )
    return messages


def generate_answer(
    question: str,
    retrieved_chunks: list[dict],
    history: list[dict] | None = None,
    model: str | None = None,
) -> str:
    response = _client().chat.completions.create(
        model=model or GROQ_MODEL,
        messages=_build_messages(question, retrieved_chunks, history),
        temperature=0.3,
    )
    return response.choices[0].message.content or ""


def stream_answer(
    question: str,
    retrieved_chunks: list[dict],
    history: list[dict] | None = None,
    model: str | None = None,
) -> Iterator[str]:
    stream = _client().chat.completions.create(
        model=model or GROQ_MODEL,
        messages=_build_messages(question, retrieved_chunks, history),
        temperature=0.3,
        stream=True,
    )
    for chunk in stream:
        delta = chunk.choices[0].delta.content
        if delta:
            yield delta
