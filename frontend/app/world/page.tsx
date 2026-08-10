import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/content/locations";

export const metadata: Metadata = { title: "Places" };

export default function WorldPage() {
  return (
    <section className="section archive-index">
      <p className="section__eyebrow">Map of Erilea</p>
      <h1 className="section__title">Places</h1>
      <p className="section__lede">
        Capitals, wastes, deserts, and courts, each a mood of its own.
      </p>
      <div className="entity-grid">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            href={`/world/${loc.slug}`}
            className="entity-card"
            data-mood={loc.mood}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={loc.image} alt="" />
            <div>
              <p className="entity-card__meta">{loc.region}</p>
              <h2>{loc.name}</h2>
              <p>{loc.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
