"use client";

import { timeline } from "@/content/timeline";
import { useSpoiler } from "@/lib/spoiler";

export default function TimelinePage() {
  const { canReveal, maxBook } = useSpoiler();

  return (
    <section className="section" style={{ maxWidth: "100%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p className="section__eyebrow">Reading order panels</p>
        <h1 className="section__title">Timeline</h1>
        <p className="section__lede">
          Scroll sideways through the saga. Beats past your spoiler setting stay
          veiled. You&apos;re currently open through book {maxBook}.
        </p>
      </div>
      <div className="timeline-track" style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        {timeline.map((book) => {
          const locked = !canReveal(book.bookNumber);
          return (
            <article
              key={book.bookNumber}
              className={`timeline-panel ${locked ? "is-locked" : ""}`}
            >
              <div className="timeline-panel__book">Book {book.bookNumber}</div>
              <h2 className="font-display" style={{ margin: "0 0 0.35rem", fontSize: "1.35rem" }}>
                {book.title}
              </h2>
              <p style={{ margin: "0 0 1rem", color: "var(--ice)", fontSize: "0.9rem" }}>
                {book.subtitle}
              </p>
              {locked ? (
                <p className="locked-note">
                  Raise your spoiler setting to book {book.bookNumber} or beyond
                  to read these beats.
                </p>
              ) : (
                <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.55 }}>
                  {book.beats.map((beat) => (
                    <li key={beat.id} style={{ marginBottom: "0.65rem" }}>
                      <strong style={{ color: "var(--ember-bright)" }}>{beat.title}</strong>
                      <br />
                      <span style={{ color: "rgba(232,220,200,0.75)", fontSize: "0.9rem" }}>
                        {beat.summary}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
