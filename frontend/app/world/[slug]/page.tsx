import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocation, locations } from "@/content/locations";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  return { title: loc?.name ?? "Place" };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <article className="detail">
      <div className="detail__hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={loc.image} alt="" style={{ aspectRatio: "4 / 3" }} />
        <div className="detail__hero-copy">
          <p className="eyebrow">{loc.region}</p>
          <h1>{loc.name}</h1>
          <p>{loc.blurb}</p>
          <Link
            href={`/?ask=1&q=${encodeURIComponent(loc.askPrompt)}`}
            className="btn"
          >
            Ask the Archive
          </Link>
        </div>
      </div>
      <div className="detail__grid">
        {loc.rulingPower && (
          <section>
            <h2>Ruling power</h2>
            <p>{loc.rulingPower}</p>
          </section>
        )}
        {loc.climate && (
          <section>
            <h2>Climate &amp; feel</h2>
            <p>{loc.climate}</p>
          </section>
        )}
        {loc.significance && (
          <section>
            <h2>Narrative weight</h2>
            <p>{loc.significance}</p>
          </section>
        )}
        <section>
          <h2>Aesthetics</h2>
          <div className="chip-row">
            {loc.aesthetics.map((a) => (
              <span key={a} className="chip">
                {a}
              </span>
            ))}
          </div>
        </section>
      </div>
      <p className="detail__back">
        <Link href="/world">← All places</Link>
      </p>
    </article>
  );
}
