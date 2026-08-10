"""CLI: python -m scripts.ingest"""

from __future__ import annotations

import os
import sys
from pathlib import Path

# Allow `python -m scripts.ingest` from backend/
BACKEND_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_ROOT))

from app.config import DATA_DIR  # noqa: E402
from app.db.vector_store import VectorStore  # noqa: E402
from app.rag.chunker import load_and_chunk_pdf, load_and_chunk_txt  # noqa: E402


def main() -> None:
    data_dir = Path(DATA_DIR)
    if not data_dir.exists():
        print(f"DATA_DIR not found: {data_dir}")
        sys.exit(1)

    store = VectorStore()
    store.clear()
    files = sorted(os.listdir(data_dir))
    if not files:
        print(f"No files in {data_dir}")
        return

    for filename in files:
        path = data_dir / filename
        if filename.endswith(".pdf"):
            chunks = load_and_chunk_pdf(str(path))
        elif filename.endswith(".txt"):
            chunks = load_and_chunk_txt(str(path))
        else:
            print(f"Skipping {filename}")
            continue
        store.add_chunks(chunks, source_name=filename)

    print(f"Ingestion complete. Total chunks: {store.count()}")


if __name__ == "__main__":
    main()
