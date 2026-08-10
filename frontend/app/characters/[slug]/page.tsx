import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { characters, getCharacter } from "@/content/characters";
import CharacterArc from "./CharacterArc";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCharacter(slug);
  return { title: c?.shortName ?? "Character" };
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params;
  const c = getCharacter(slug);
  if (!c) notFound();

  return (
    <>
      <div className="detail-hero">
        <div
          className="detail-hero__bg"
          style={{ backgroundImage: `url(${c.image})` }}
        />
        <div className="hero__veil" />
        <div className="hero__content" style={{ paddingBottom: "2.5rem" }}>
          <p className="section__eyebrow">Character</p>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", margin: 0 }}>
            {c.name}
          </h1>
        </div>
      </div>
      <div className="detail-body">
        <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "rgba(232,220,200,0.85)" }}>
          {c.blurb}
        </p>

        <h2 className="font-display" style={{ marginTop: "2rem", fontSize: "1.35rem" }}>
          Also known as
        </h2>
        <div className="chip-row">
          {c.aliases.map((a) => (
            <span key={a} className="chip">
              {a}
            </span>
          ))}
        </div>

        <h2 className="font-display" style={{ marginTop: "2rem", fontSize: "1.35rem" }}>
          Relationships
        </h2>
        <ul style={{ color: "rgba(232,220,200,0.8)", lineHeight: 1.7 }}>
          {c.relationships.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <h2 className="font-display" style={{ marginTop: "2rem", fontSize: "1.35rem" }}>
          Arc
        </h2>
        <p style={{ color: "rgba(232,220,200,0.8)", lineHeight: 1.65 }}>
          {c.arcSummary}
        </p>
        <CharacterArc arcs={c.arcByBook} />

        <Link
          href={`/archive?q=${encodeURIComponent(c.askPrompt)}&character=${c.slug}`}
          className="btn"
          style={{ marginTop: "1.75rem" }}
        >
          Ask about {c.shortName}
        </Link>
      </div>
    </>
  );
}
