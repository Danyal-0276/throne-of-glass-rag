"""
Splits documents into overlapping chunks using sentence-aware packing.

Prefer keeping whole sentences together (instead of cutting mid-sentence by
raw word count). Falls back to word splits only when a single sentence is
larger than the target chunk size.
"""

import re

# Target ~300–400 words per chunk with modest sentence overlap
DEFAULT_CHUNK_SIZE = 350
DEFAULT_OVERLAP = 60

_SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+(?=[A-Z\"“‘(])")
_WHITESPACE = re.compile(r"\s+")


def _normalize(text: str) -> str:
    return _WHITESPACE.sub(" ", text).strip()


def _word_count(text: str) -> int:
    return len(text.split())


def _split_sentences(text: str) -> list[str]:
    text = _normalize(text)
    if not text:
        return []
    parts = _SENTENCE_SPLIT.split(text)
    return [p.strip() for p in parts if p.strip()]


def _pack_sentences(sentences: list[str], chunk_size: int, overlap: int) -> list[str]:
    """Greedily pack sentences into chunks of ~chunk_size words."""
    chunks: list[str] = []
    current: list[str] = []
    current_words = 0

    def flush():
        nonlocal current, current_words
        if current:
            chunks.append(" ".join(current))
            # Keep a trailing overlap window of whole sentences
            if overlap > 0 and chunks:
                kept: list[str] = []
                kept_words = 0
                for sent in reversed(current):
                    w = _word_count(sent)
                    if kept and kept_words + w > overlap:
                        break
                    kept.insert(0, sent)
                    kept_words += w
                current = kept
                current_words = kept_words
            else:
                current = []
                current_words = 0

    for sentence in sentences:
        words = _word_count(sentence)

        # Oversized sentence: hard-split by words as a last resort
        if words > chunk_size:
            flush()
            word_list = sentence.split()
            step = max(chunk_size - overlap, 1)
            start = 0
            while start < len(word_list):
                piece = " ".join(word_list[start : start + chunk_size])
                chunks.append(piece)
                start += step
            current = []
            current_words = 0
            continue

        if current and current_words + words > chunk_size:
            flush()

        current.append(sentence)
        current_words += words

    if current:
        chunks.append(" ".join(current))

    return chunks


def chunk_text(
    text: str,
    chunk_size: int = DEFAULT_CHUNK_SIZE,
    overlap: int = DEFAULT_OVERLAP,
) -> list[str]:
    """
    Recursive / sentence-aware chunking:
    1. Split on paragraph breaks
    2. Split paragraphs into sentences
    3. Pack sentences into ~chunk_size-word windows with overlap
    """
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n+", text) if p.strip()]
    if not paragraphs:
        paragraphs = [_normalize(text)] if text.strip() else []

    sentences: list[str] = []
    for para in paragraphs:
        sentences.extend(_split_sentences(para))

    if not sentences:
        return []

    return _pack_sentences(sentences, chunk_size=chunk_size, overlap=overlap)


def load_and_chunk_pdf(
    pdf_path: str,
    chunk_size: int = DEFAULT_CHUNK_SIZE,
    overlap: int = DEFAULT_OVERLAP,
) -> list[str]:
    from pypdf import PdfReader

    reader = PdfReader(pdf_path)
    full_text = ""
    for page in reader.pages:
        page_text = page.extract_text() or ""
        full_text += page_text + "\n\n"

    return chunk_text(full_text, chunk_size, overlap)


def load_and_chunk_txt(
    txt_path: str,
    chunk_size: int = DEFAULT_CHUNK_SIZE,
    overlap: int = DEFAULT_OVERLAP,
) -> list[str]:
    with open(txt_path, "r", encoding="utf-8") as f:
        text = f.read()
    return chunk_text(text, chunk_size, overlap)
