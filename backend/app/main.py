"""FastAPI entrypoint for the Throne of Glass archive API."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.content import router as content_router
from app.api.routes import router as api_router
from app.config import CORS_ORIGINS

app = FastAPI(
    title="Throne of Glass Archive API",
    description="Dense RAG + curated content for the unofficial TOG fan archive",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
app.include_router(content_router)


@app.get("/")
def root():
    return {
        "name": "Throne of Glass Archive API",
        "docs": "/docs",
        "health": "/health",
    }
