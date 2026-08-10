# Throne of Glass Archive (Monorepo)

Unofficial fan archive + **dense RAG** chatbot for the *Throne of Glass* series.

```
rag-project/
├── backend/     FastAPI + Postgres/pgvector + ingest
├── frontend/    Next.js immersive site + Ask the Archive chat
└── data/        Optional mirror of PDFs (gitignored)
```

PDFs live in `backend/data/` (gitignored). Never commit books or `.env`.

## Features

- Immersive pages: Home, World, Characters, Timeline, Archive, About
- Spoiler gate (“I’ve read up to Book N”, books **01–08**)
- Ask the Archive: streaming chat, threads, source cards, alias expansion
- Dense RAG: BGE embeddings → pgvector → Groq

Publication / chronological labels used for filenames and spoilers:

- **0.5** The Assassin’s Blade (prequel novellas — before Throne of Glass)
- **01** Throne of Glass  
- **02** Crown of Midnight  
- **03** Heir of Fire  
- **04** Queen of Shadows  
- **05** Empire of Storms  
- **06** Tower of Dawn  
- **07** Kingdom of Ash  

Spoiler filter and `max_book` accept `0.5` through `7`.

## Prerequisites

- Python 3.11+ (3.14 works with this stack)
- Node.js 20+
- PostgreSQL 18+ with **pgvector** extension

### Enable pgvector (Windows)

1. Install [pgvector](https://github.com/pgvector/pgvector) for your Postgres major version (or use Stack Builder if available).
2. Create DB and schema:

```powershell
cd backend
# Set your postgres password for this session:
$env:PGPASSWORD = "YOUR_PASSWORD"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -f scripts\init_db.sql
```

If `CREATE DATABASE` errors because `tog_rag` already exists, connect and run the extension/table statements only:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d tog_rag -c "CREATE EXTENSION IF NOT EXISTS vector;"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d tog_rag -f scripts\init_schema.sql
```

## Backend setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
# Edit .env: GROQ_API_KEY, DATABASE_URL password, INGEST_TOKEN
```

Put renamed PDFs in `backend/data/` (already named `01 - …` through `08 - …`).

Ingest (re-run whenever PDFs/model/chunking change):

```powershell
cd backend
.\.venv\Scripts\activate
python scripts\ingest.py
# or: curl -X POST http://localhost:8000/ingest -H "Content-Type: application/json" -d "{\"token\":\"dev-ingest-token\",\"clear\":true}"
```

Run API:

```powershell
cd backend
.\.venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

Docs: http://localhost:8000/docs

## Frontend setup

```powershell
cd frontend
npm install
# .env.local already has NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

Open http://localhost:3000 — Archive at `/archive`.

## Copyright

Unofficial fan project, not affiliated with Sarah J. Maas or Bloomsbury.  
Do not host book PDFs or long verbatim excerpts publicly. Site copy and generated art are original for this fan archive.

## Future RAG upgrades

v1 is dense RAG only. Planned later: Hybrid → light CRAG → optional Graph / Agentic / Multimodal.
