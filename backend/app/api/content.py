"""Static content endpoints for characters, locations, timeline."""

from __future__ import annotations

import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/content", tags=["content"])
CONTENT_DIR = Path(__file__).resolve().parents[1] / "content"


def _load(name: str):
    path = CONTENT_DIR / name
    if not path.exists():
        raise HTTPException(status_code=404, detail=f"Missing content file: {name}")
    with open(path, encoding="utf-8") as f:
        return json.load(f)


@router.get("/characters")
def list_characters():
    return _load("characters.json")


@router.get("/characters/{slug}")
def get_character(slug: str):
    data = _load("characters.json")
    for item in data:
        if item.get("slug") == slug:
            return item
    raise HTTPException(status_code=404, detail="Character not found")


@router.get("/locations")
def list_locations():
    return _load("locations.json")


@router.get("/locations/{slug}")
def get_location(slug: str):
    data = _load("locations.json")
    for item in data:
        if item.get("slug") == slug:
            return item
    raise HTTPException(status_code=404, detail="Location not found")


@router.get("/timeline")
def get_timeline():
    return _load("timeline.json")
