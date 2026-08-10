import type { Metadata } from "next";
import Link from "next/link";
import { characters } from "@/content/characters";

export const metadata: Metadata = { title: "Characters" };

export default function CharactersPage() {
  return (
    <section className="section archive-index">
      <p className="section__eyebrow">Court and company</p>
      <h1 className="section__title">Characters</h1>
      <p className="section__lede">
        Assassins, witches, princes, and the stubborn hearts between them.
      </p>
      <div className="entity-grid">
        {characters.map((c) => (
          <Link
            key={c.slug}
            href={`/characters/${c.slug}`}
            className="entity-card"
            data-mood={c.mood}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt="" />
            <div>
              <p className="entity-card__meta">{c.species}</p>
              <h2>{c.shortName}</h2>
              <p>{c.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
