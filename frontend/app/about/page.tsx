import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="section archive-index" style={{ maxWidth: 720 }}>
      <p className="section__eyebrow">Disclaimer</p>
      <h1 className="section__title">About this archive</h1>
      <p className="section__lede" style={{ maxWidth: "100%" }}>
        This is an unofficial fan project built for personal and educational use.
        It is not affiliated with, endorsed by, or connected to Sarah J. Maas,
        Bloomsbury Publishing, or any other rights holders.
      </p>
      <div
        style={{
          color: "rgba(232,220,200,0.78)",
          lineHeight: 1.7,
          display: "grid",
          gap: "1rem",
        }}
      >
        <p>
          Characters, place names, and story elements belong to their respective
          creators. Text and images here are fan-made summaries and atmosphere,
          not a substitute for the novels.
        </p>
        <p>
          The Archive chatbot answers from documents you ingest into the local
          RAG backend. Spoiler protection uses your &quot;read up to&quot; book
          setting (<strong>0.5–7</strong>). <em>The Assassin&apos;s Blade</em> is
          book <strong>0.5</strong> (prequel, before <em>Throne of Glass</em>).
          Main novels are books 1–7.
        </p>
        <p>
          Prefer the books. Support the author by purchasing official editions.
        </p>
      </div>
      <Link href="/archive" className="btn" style={{ marginTop: "2rem" }}>
        Ask the Archive
      </Link>
    </section>
  );
}
