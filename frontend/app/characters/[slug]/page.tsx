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
    <article className="detail" data-mood={c.mood}>
      <div className="detail__hero">
        <div className="detail__hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.image} alt="" />
        </div>
        <div className="detail__hero-copy">
          <p className="eyebrow">Character · {c.species}</p>
          <h1>{c.name}</h1>
          <p className="detail__aliases">{c.aliases.join(" · ")}</p>
          <p>{c.blurb}</p>
          <Link
            href={`/archive?q=${encodeURIComponent(c.askPrompt)}&character=${c.slug}`}
            className="btn"
            style={{ marginTop: "1.25rem" }}
          >
            Ask about {c.shortName}
          </Link>
        </div>
      </div>
      <div className="detail__grid">
        <section>
          <h2>Allegiance</h2>
          <p>{c.allegiance}</p>
        </section>
        <section>
          <h2>Also known as</h2>
          <div className="chip-row">
            {c.aliases.map((a) => (
              <span key={a} className="chip">
                {a}
              </span>
            ))}
          </div>
        </section>
        <section>
          <h2>Powers</h2>
          <div className="chip-row">
            {c.powers.map((p) => (
              <span key={p} className="chip">
                {p}
              </span>
            ))}
          </div>
        </section>
        <section>
          <h2>Relationships</h2>
          <ul>
            {c.relationships.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Arc</h2>
          <p>{c.arcSummary}</p>
          <CharacterArc arcs={c.arcByBook} />
        </section>
      </div>
      <p className="detail__back">
        <Link href="/characters">All characters</Link>
      </p>
    </article>
  );
}
