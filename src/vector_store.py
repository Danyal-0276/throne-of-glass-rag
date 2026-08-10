"""
Handles embedding text chunks and storing/retrieving them locally.

Uses sentence-transformers for embeddings and a simple NumPy cosine-similarity
index (no ChromaDB) so it installs cleanly on Windows/Python 3.14 without
Visual C++ Build Tools.
"""

import json
from pathlib import Path

import numpy as np
from sentence_transformers import SentenceTransformer

from src.aliases import expand_query

# Stronger than MiniLM; better at nuanced meaning. Re-ingest after changing this.
EMBED_MODEL_NAME = "BAAI/bge-base-en-v1.5"

# BGE asymmetric retrieval: prefix queries (not passages) for better recall
_QUERY_PREFIX = "Represent this sentence for searching relevant passages: "


class VectorStore:
    def __init__(self, collection_name: str = "rag_docs", persist_dir: str = "./chroma_db"):
        self.embed_model = SentenceTransformer(EMBED_MODEL_NAME)
        self.persist_dir = Path(persist_dir)
        self.persist_dir.mkdir(parents=True, exist_ok=True)
        self.collection_name = collection_name

        self._embeddings_path = self.persist_dir / f"{collection_name}_embeddings.npy"
        self._meta_path = self.persist_dir / f"{collection_name}_meta.json"

        self.documents: list[str] = []
        self.metadatas: list[dict] = []
        self.ids: list[str] = []
        self.embeddings: np.ndarray | None = None

        self._load()

    def clear(self):
        """Wipe the on-disk index (needed when re-ingesting or changing models)."""
        self.documents = []
        self.metadatas = []
        self.ids = []
        self.embeddings = None
        if self._embeddings_path.exists():
            self._embeddings_path.unlink()
        if self._meta_path.exists():
            self._meta_path.unlink()

    def _load(self):
        if self._meta_path.exists() and self._embeddings_path.exists():
            with open(self._meta_path, encoding="utf-8") as f:
                data = json.load(f)
            self.documents = data["documents"]
            self.metadatas = data["metadatas"]
            self.ids = data["ids"]
            self.embeddings = np.load(self._embeddings_path)

    def _save(self):
        with open(self._meta_path, "w", encoding="utf-8") as f:
            json.dump(
                {
                    "documents": self.documents,
                    "metadatas": self.metadatas,
                    "ids": self.ids,
                },
                f,
            )
        if self.embeddings is not None:
            np.save(self._embeddings_path, self.embeddings)

    def _normalize(self, vectors: np.ndarray) -> np.ndarray:
        norms = np.linalg.norm(vectors, axis=1, keepdims=True)
        return vectors / np.clip(norms, 1e-12, None)

    def add_chunks(self, chunks: list[str], source_name: str = "document"):
        """Embeds and stores a list of text chunks."""
        if not chunks:
            return

        new_embeddings = self._normalize(
            np.asarray(self.embed_model.encode(chunks, show_progress_bar=False))
        )

        start = len(self.ids)
        new_ids = [f"{source_name}_{i}" for i in range(start, start + len(chunks))]
        new_metas = [{"source": source_name, "chunk_index": i} for i in range(len(chunks))]

        self.documents.extend(chunks)
        self.metadatas.extend(new_metas)
        self.ids.extend(new_ids)

        if self.embeddings is None or len(self.embeddings) == 0:
            self.embeddings = new_embeddings.astype(np.float32)
        else:
            self.embeddings = np.vstack(
                [self.embeddings, new_embeddings.astype(np.float32)]
            )

        self._save()
        print(f"Added {len(chunks)} chunks from '{source_name}' to the vector store.")

    def query(self, question: str, top_k: int = 8) -> list[dict]:
        """Returns the top_k most relevant chunks for a question."""
        if self.embeddings is None or len(self.documents) == 0:
            return []

        expanded = expand_query(question)
        query_text = _QUERY_PREFIX + expanded
        query_embedding = self._normalize(
            np.asarray(self.embed_model.encode([query_text], show_progress_bar=False))
        )[0]

        scores = self.embeddings @ query_embedding
        top_k = min(top_k, len(scores))
        top_indices = np.argsort(scores)[::-1][:top_k]

        retrieved = []
        for idx in top_indices:
            distance = float(1.0 - scores[idx])
            retrieved.append(
                {
                    "text": self.documents[idx],
                    "source": self.metadatas[idx]["source"],
                    "distance": distance,
                }
            )

        return retrieved
