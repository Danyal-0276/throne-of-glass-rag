import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { locations } from "@/content/locations";

export const metadata: Metadata = {
  title: "World",
};

export default function WorldPage() {
  return (
    <section className="section">
      <p className="section__eyebrow">Map of Erilea</p>
      <h1 className="section__title">World</h1>
      <p className="section__lede">
        Capitals, wastes, and courts — each place a mood of its own. Tap a
        location to linger, or ask the archive to dig deeper.
      </p>
      <div className="grid-cards">
        {locations.map((loc) => (
          <Link key={loc.slug} href={`/world/${loc.slug}`} className="location-card">
            <Image
              src={loc.image}
              alt={loc.name}
              width={600}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 280 }}
            />
            <div className="location-card__meta">
              <h3 className="font-display">{loc.name}</h3>
              <p>{loc.region}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
