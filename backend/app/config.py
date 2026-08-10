"""App settings loaded from environment."""

from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

# backend/.env then repo root .env
_BACKEND_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(_BACKEND_ROOT / ".env")
load_dotenv(_BACKEND_ROOT.parent / ".env")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/tog_rag",
)
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
INGEST_TOKEN = os.getenv("INGEST_TOKEN", "dev-ingest-token")
DATA_DIR = Path(os.getenv("DATA_DIR", str(_BACKEND_ROOT / "data")))
EMBED_MODEL_NAME = os.getenv("EMBED_MODEL_NAME", "BAAI/bge-base-en-v1.5")
DEFAULT_TOP_K = int(os.getenv("DEFAULT_TOP_K", "8"))
CORS_ORIGINS = [
    o.strip()
    for o in os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
    if o.strip()
]
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
