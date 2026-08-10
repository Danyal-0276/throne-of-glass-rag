import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { characters } from "@/content/characters";

export const metadata: Metadata = {
  title: "Characters",
};

export default function CharactersPage() {
  return (
    <section className="section">
      <p className="section__eyebrow">Court &amp; company</p>
      <h1 className="section__title">Characters</h1>
      <p className="section__lede">
        Assassins, witches, princes, and the stubborn hearts between them.
        Portraits open into aliases, bonds, and archive prompts.
      </p>
      <div className="grid-cards">
        {characters.map((c) => (
          <Link
            key={c.slug}
            href={`/characters/${c.slug}`}
            className="portrait-card"
          >
            <Image
              src={c.image}
              alt={c.shortName}
              width={600}
              height={800}
              style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 300 }}
            />
            <div className="portrait-card__meta">
              <h3 className="font-display">{c.shortName}</h3>
              <p>{c.aliases[0]}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
