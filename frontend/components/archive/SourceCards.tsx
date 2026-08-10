"use client";

import type { SourceChunk } from "@/lib/api";
import { useState } from "react";

export default function SourceCards({ sources }: { sources: SourceChunk[] }) {
  const [open, setOpen] = useState(false);
  if (!sources?.length) return null;

  return (
    <div className="cite-block">
      <button
        type="button"
        className="cite-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {sources.length} source{sources.length === 1 ? "" : "s"}
        <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="cite-list">
          {sources.map((s, i) => (
            <article
              key={`${s.source}-${s.chunk_index ?? i}`}
              className="cite-item"
            >
              <div className="cite-item__meta">
                {s.source}
                {s.book_number != null ? ` · Book ${s.book_number}` : ""}
              </div>
              <p>
                {s.text.length > 220 ? `${s.text.slice(0, 220).trim()}…` : s.text}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
