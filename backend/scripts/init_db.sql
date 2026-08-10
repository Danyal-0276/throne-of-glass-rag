-- Throne of Glass RAG schema (Postgres + pgvector)
-- Run as a superuser first time: psql -U postgres -f init_db.sql

CREATE DATABASE tog_rag;

\c tog_rag

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS document_chunks (
  id            BIGSERIAL PRIMARY KEY,
  source        TEXT NOT NULL,
  book_number   DOUBLE PRECISION,
  chunk_index   INT NOT NULL,
  content       TEXT NOT NULL,
  embedding     vector(768) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS document_chunks_embedding_hnsw
  ON document_chunks
  USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS document_chunks_book_number_idx
  ON document_chunks (book_number);

CREATE INDEX IF NOT EXISTS document_chunks_source_idx
  ON document_chunks (source);
