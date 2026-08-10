"""Pydantic request/response models."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field


class HistoryTurn(BaseModel):
    role: str
    content: str


class AskRequest(BaseModel):
    question: str = Field(min_length=1)
    history: list[HistoryTurn] | None = None
    top_k: int | None = Field(default=None, ge=1, le=20)
    # 0.5 = The Assassin's Blade prequel; 1–7 = main novels
    max_book: float | None = Field(default=None, ge=0.5, le=7)


class SourceChunk(BaseModel):
    text: str
    source: str
    distance: float
    book_number: float | None = None
    chunk_index: int | None = None


class AskResponse(BaseModel):
    answer: str
    sources: list[SourceChunk]
    expanded_query: str | None = None


class IngestRequest(BaseModel):
    token: str
    clear: bool = True
