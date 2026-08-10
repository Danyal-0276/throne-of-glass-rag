"""
Takes retrieved chunks + the user's question, builds a prompt,
and calls an LLM to generate the final answer.

Using Groq here because it has a generous free tier and is very fast.
Get a free key at https://console.groq.com
"""

import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """You are a knowledgeable literary assistant for the Throne of Glass series.
Answer using ONLY the provided context passages.

Write a clear, synthesized answer in a few short paragraphs (not a bare bullet list).
Weave together details from multiple passages when they support the same point.
Name characters and places as they appear in the context.
If the context is incomplete, say what is known and what is missing — do not invent plot.
If the answer is not in the context at all, say you don't know."""


def generate_answer(
    question: str,
    retrieved_chunks: list[dict],
    model: str = "llama-3.1-8b-instant",
) -> str:
    context = "\n\n".join(
        f"[Source: {c['source']}]\n{c['text']}" for c in retrieved_chunks
    )

    user_prompt = f"""Context passages:
{context}

Question: {question}

Write a fuller, well-organized answer that synthesizes the context above.
Prefer prose over lists unless a short list clearly helps. Cite sources in parentheses
when you lean on a specific passage (e.g. book filename)."""

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content
