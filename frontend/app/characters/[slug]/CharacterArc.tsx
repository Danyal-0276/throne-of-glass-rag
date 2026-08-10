"use client";

import { useSpoiler } from "@/lib/spoiler";
import type { ArcByBook } from "@/content/types";

export default function CharacterArc({ arcs }: { arcs: ArcByBook[] }) {
  const { canReveal, maxBook } = useSpoiler();

  return (
    <ul style={{ marginTop: "1rem", paddingLeft: "1.1rem", lineHeight: 1.65 }}>
      {arcs.map((a) =>
        canReveal(a.minBook) ? (
          <li key={a.minBook + a.text.slice(0, 12)} style={{ marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>
              From book {a.minBook}:{" "}
            </span>
            {a.text}
          </li>
        ) : (
          <li
            key={a.minBook + "locked"}
            className="locked-note"
            style={{ listStyle: "none", marginLeft: "-1.1rem" }}
          >
            Locked until you set spoiler progress past book {a.minBook - 1}{" "}
            (currently {maxBook}).
          </li>
        ),
      )}
    </ul>
  );
}
