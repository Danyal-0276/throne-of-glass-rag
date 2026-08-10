"use client";

import { timeline } from "@/content/timeline";
import { useSpoiler } from "@/lib/spoiler";

export default function TimelinePage() {
  const { canReveal, maxBook } = useSpoiler();

  return (
    <div className="book-saga archive-index">
      <header className="book-saga__intro section">
        <p className="section__eyebrow">Reading order</p>
        <h1 className="section__title">Timeline</h1>
        <p className="section__lede">
          One full chapter per book. Raise your spoiler setting to unveil later
          beats. You are open through book {maxBook}.
        </p>
      </header>

      {timeline.map((book) => {
        const locked = !canReveal(book.bookNumber);
        return (
          <section
            key={book.bookNumber}
            className={`book-chapter ${locked ? "is-locked" : ""}`}
            data-mood={locked ? "shadow" : "ember"}
          >
            <div className="book-chapter__cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.cover} alt="" />
            </div>
            <div className="book-chapter__body">
              <p className="eyebrow">Book {book.bookNumber}</p>
              <h2>{book.title}</h2>
              <p className="book-chapter__subtitle">{book.subtitle}</p>
              {locked ? (
                <p className="locked-note">
                  Raise your spoiler setting to book {book.bookNumber} or beyond
                  to read this chapter.
                </p>
              ) : (
                <>
                  <p className="book-chapter__overview">{book.overview}</p>
                  <ul className="book-chapter__beats">
                    {book.beats.map((beat) => (
                      <li key={beat.id}>
                        <strong>{beat.title}</strong>
                        <span>{beat.summary}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
