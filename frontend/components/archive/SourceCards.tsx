"use client";

import type { SourceChunk } from "@/lib/api";

export default function SourceCards({ sources }: { sources: SourceChunk[] }) {
  if (!sources?.length) return null;

  return (
    <div className="source-cards">
      {sources.map((s, i) => (
        <article key={`${s.source}-${s.chunk_index ?? i}`} className="source-card">
          <div className="source-card__meta">
            {s.source}
            {s.book_number != null ? ` · Book ${s.book_number}` : ""}
          </div>
          <p style={{ margin: 0 }}>
            {s.text.length > 280 ? `${s.text.slice(0, 280).trim()}…` : s.text}
          </p>
        </article>
      ))}
    </div>
  );
}
