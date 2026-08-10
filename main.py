"""
Simple CLI RAG pipeline.

Usage:
    1. Put your .txt or .pdf files in the data/ folder
    2. Run: python main.py ingest        -> chunks + embeds + stores all files in data/
    3. Run: python main.py ask "your question here"
"""

import sys
import os
from src.aliases import expand_query
from src.chunker import load_and_chunk_txt, load_and_chunk_pdf
from src.vector_store import VectorStore
from src.generator import generate_answer

DATA_DIR = "data"
DEFAULT_TOP_K = 8


def ingest():
    store = VectorStore()
    store.clear()  # fresh index (required after model / chunking changes)
    files = sorted(os.listdir(DATA_DIR))

    if not files:
        print(f"No files found in {DATA_DIR}/. Add some .txt or .pdf files first.")
        return

    for filename in files:
        path = os.path.join(DATA_DIR, filename)

        if filename.endswith(".pdf"):
            chunks = load_and_chunk_pdf(path)
        elif filename.endswith(".txt"):
            chunks = load_and_chunk_txt(path)
        else:
            print(f"Skipping unsupported file: {filename}")
            continue

        store.add_chunks(chunks, source_name=filename)

    print("Ingestion complete.")


def ask(question: str):
    store = VectorStore()
    expanded = expand_query(question)
    if expanded != question:
        print(f"Expanded query: {expanded}")

    retrieved = store.query(question, top_k=DEFAULT_TOP_K)

    print("\n--- Retrieved chunks ---")
    for r in retrieved:
        print(f"[{r['source']}] (distance={r['distance']:.3f})")
        print(r["text"][:200] + "...\n")

    answer = generate_answer(question, retrieved)
    print("--- Answer ---")
    print(answer)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python main.py [ingest | ask \"question\"]")
        sys.exit(1)

    command = sys.argv[1]

    if command == "ingest":
        ingest()
    elif command == "ask":
        if len(sys.argv) < 3:
            print("Usage: python main.py ask \"your question here\"")
            sys.exit(1)
        ask(sys.argv[2])
    else:
        print(f"Unknown command: {command}")
