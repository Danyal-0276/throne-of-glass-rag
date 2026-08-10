"""App settings loaded from environment."""

from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

# backend/app/config.py -> backend/ -> repo root
_BACKEND_DIR = Path(__file__).resolve().parents[1]
_REPO_ROOT = _BACKEND_DIR.parent

# utf-8-sig strips a BOM that Windows editors sometimes prepend
load_dotenv(_BACKEND_DIR / ".env", encoding="utf-8-sig")
load_dotenv(_REPO_ROOT / ".env", encoding="utf-8-sig")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/tog_rag",
)
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip()
INGEST_TOKEN = os.getenv("INGEST_TOKEN", "dev-ingest-token")
DATA_DIR = Path(os.getenv("DATA_DIR", str(_BACKEND_DIR / "data")))
EMBED_MODEL_NAME = os.getenv("EMBED_MODEL_NAME", "BAAI/bge-base-en-v1.5")
DEFAULT_TOP_K = int(os.getenv("DEFAULT_TOP_K", "8"))
CORS_ORIGINS = [
    o.strip()
    for o in os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
    if o.strip()
]
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")
