# Throne of Glass RAG

A from-scratch **Retrieval-Augmented Generation** app that answers questions over your documents. Built without LangChain/LlamaIndex so each step — chunk → embed → retrieve → generate — is explicit and easy to learn.

Demo corpus: Sarah J. Maas’s *Throne of Glass* series (add the PDFs locally; they are **not** committed to this repo).

## Features

- Sentence-aware chunking (~350 words, overlapping windows)
- Local embeddings with `BAAI/bge-base-en-v1.5` (no embedding API cost)
- Lightweight NumPy vector store (no Chroma / C++ build tools required)
- Character alias expansion (e.g. Aelin ↔ Celaena, Fireheart, Buzzard)
- Groq LLM generation with a synthesis-focused prompt
- Simple CLI: `ingest` then `ask`

## How it works

1. **Chunk** — files in `data/` are split into sentence-aware overlapping chunks  
2. **Embed** — each chunk becomes a vector with a local sentence-transformers model  
3. **Store** — vectors + metadata saved under `chroma_db/`  
4. **Retrieve** — the question is expanded with aliases, embedded, and matched by cosine similarity (`top_k=8`)  
5. **Generate** — retrieved passages are stuffed into a prompt and answered via Groq  

## Project structure

```
rag-project/
├── data/                 # your .pdf / .txt files (gitignored)
├── src/
│   ├── chunker.py        # sentence-aware chunking
│   ├── vector_store.py   # embeddings + NumPy index
│   ├── aliases.py        # TOG name / title expansion
│   └── generator.py      # Groq prompt + answer
├── main.py               # CLI entry point
├── requirements.txt
├── .env.example
└── README.md
```

## Setup

**Requirements:** Python 3.10+ (3.11–3.12 recommended; 3.14 works with this NumPy store)

```bash
# 1. Clone
git clone https://github.com/Danyal-0276/throne-of-glass-rag.git
cd throne-of-glass-rag

# 2. Virtualenv
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 3. Dependencies
pip install -r requirements.txt

# 4. API key — free at https://console.groq.com
cp .env.example .env
# edit .env and set GROQ_API_KEY=...

# 5. Add documents
# Drop .pdf or .txt files into data/
# Suggested naming: 01 - Throne of Glass - Sarah J. Maas.pdf
```

## Usage

```bash
# Build / rebuild the index
python main.py ingest

# Ask a question
python main.py ask "Who is Aelin?"
python main.py ask "Tell me about Fireheart"
python main.py ask "Who is the Buzzard?"
```

You’ll see retrieved source chunks (with distances), then a synthesized answer grounded in that context.

## Notes

- Re-run `ingest` after changing the embedding model, chunker, or files in `data/`.
- The Hugging Face model downloads on first ingest (~hundreds of MB).
- Do **not** commit `.env` or copyrighted book files.

## Roadmap

- [ ] Search + answer UI with visible source cards (Streamlit or Next.js)
- [ ] Optional book filter (spoiler-safe by series number)
- [ ] Hybrid search (keyword + vector) and/or re-ranking
- [ ] Stronger citation formatting in answers

## License

Code in this repository is yours to use for learning/portfolio. Book content remains © the respective authors/publishers — supply your own legally obtained copies locally.
