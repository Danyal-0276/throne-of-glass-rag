import type { Metadata } from "next";
import Link from "next/link";
import { villains } from "@/content/villains";

export const metadata: Metadata = { title: "Villains" };

export default function VillainsPage() {
  return (
    <section className="section archive-index">
      <p className="section__eyebrow">Antagonists</p>
      <h1 className="section__title">Villains of Erilea</h1>
      <p className="section__lede">
        Tyrants, Valg kings, immortal queens, and the mentors who taught
        cruelty as a craft.
      </p>
      <div className="entity-grid">
        {villains.map((v) => (
          <Link key={v.slug} href={`/villains/${v.slug}`} className="entity-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.image} alt="" />
            <div>
              <p className="entity-card__meta">{v.affiliation}</p>
              <h2>{v.shortName}</h2>
              <p>{v.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
