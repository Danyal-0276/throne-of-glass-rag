# Throne of Glass Archive

[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-backend-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14%2B-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-4169E1?logo=postgresql&logoColor=white)](https://github.com/pgvector/pgvector)
[![RAG](https://img.shields.io/badge/RAG-dense%20vector-c45c26)](#architecture)
[![License](https://img.shields.io/badge/Fan%20project-unofficial-informational)](#disclaimer)

> Unofficial immersive fan archive for Sarah J. Maas’s *Throne of Glass*, with a from-scratch **dense RAG** chatbot (“Ask the Archive”).

**Not affiliated with Sarah J. Maas, Bloomsbury, or any rights holders.**

---

## Highlights

| Area | What you get |
|------|----------------|
| **Site** | Home, World, Characters, Timeline, Archive chat, About — ember/ice fantasy UI |
| **Spoilers** | “Read up to” gate for books **0.5–7** (Assassin’s Blade = **0.5**) |
| **Chat** | Streaming answers, threads, starter chips, torn-page **source cards** |
| **RAG** | Sentence-aware chunking → **BGE** embeddings → **Postgres/pgvector** → **Groq** |
| **Extras** | Character alias expansion (Aelin/Celaena/Fireheart, etc.) |

## Tech stack

**Backend:** Python · FastAPI · sentence-transformers (`BAAI/bge-base-en-v1.5`) · pgvector · Groq · pypdf  

**Frontend:** Next.js (App Router) · TypeScript · Tailwind · GSAP · React Three Fiber  

**No LangChain / LangGraph** in v1 — the pipeline is explicit for learning.

## Repository layout

```text
throne-of-glass-rag/
├── backend/          # FastAPI API + ingest + RAG
│   ├── app/
│   ├── data/         # your PDFs (gitignored)
│   ├── scripts/      # ingest, init_db, pgvector helpers
│   └── .env.example
├── frontend/         # Next.js immersive UI
└── README.md
```

Book PDFs and `.env` are **never** committed.

## Book numbering (filenames + spoilers)

| # | Book |
|---|------|
| **0.5** | The Assassin’s Blade (prequel novellas) |
| **01** | Throne of Glass |
| **02** | Crown of Midnight |
| **03** | Heir of Fire |
| **04** | Queen of Shadows |
| **05** | Empire of Storms |
| **06** | Tower of Dawn |
| **07** | Kingdom of Ash |

Example filename: `0.5 - The Assassin's Blade - Sarah J. Maas.pdf`

## Architecture

```text
PDFs → chunk → embed (BGE) → Postgres/pgvector
                                      ↑
Browser → Next.js → FastAPI /ask[/stream] → retrieve + alias expand → Groq → answer + sources
```

**v1:** dense RAG only. **Later:** Hybrid → light CRAG → optional Graph / Agentic / Multimodal.

## Quick start

### Prerequisites

- Python 3.11+ (3.14 OK with this stack)
- Node.js 20+
- PostgreSQL 18+ with **[pgvector](https://github.com/pgvector/pgvector)**

### 1. Database

```powershell
# After pgvector is installed on the server:
$env:PGPASSWORD = "YOUR_PASSWORD"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -f backend\scripts\init_db.sql
# or, if tog_rag already exists:
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d tog_rag -f backend\scripts\init_schema.sql
```

Windows tip: see `backend/scripts/install_pgvector_windows.ps1` (run as Administrator).

### 2. Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate          # Windows
pip install -r requirements.txt
copy .env.example .env
# Set GROQ_API_KEY + DATABASE_URL in .env

# Place PDFs in backend/data/ then:
python scripts\ingest.py

uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

### 3. Frontend

```powershell
cd frontend
npm install
# .env.local → NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

Open http://localhost:3000 — chat at `/archive`.

## Topics / tags

`rag` · `retrieval-augmented-generation` · `fastapi` · `nextjs` · `postgresql` · `pgvector` · `sentence-transformers` · `groq` · `llm` · `nlp` · `typescript` · `python` · `throne-of-glass` · `fan-project`

## Disclaimer

Unofficial educational / portfolio fan project.  
Do **not** host copyrighted book PDFs or long verbatim excerpts on a public site.  
Supply your own legally obtained copies locally for ingest only.  
Character/location blurbs and generated art on the site are original fan-made content.

## License

Code in this repository is available for learning and portfolio use.  
Book content remains © the respective authors and publishers.
