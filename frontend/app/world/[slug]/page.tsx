import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocation, locations } from "@/content/locations";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  return { title: loc?.name ?? "Location" };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  return (
    <>
      <div className="detail-hero">
        <div
          className="detail-hero__bg"
          style={{ backgroundImage: `url(${loc.image})` }}
        />
        <div className="hero__veil" />
        <div className="hero__content" style={{ paddingBottom: "2.5rem" }}>
          <p className="section__eyebrow">{loc.region}</p>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", margin: 0 }}>
            {loc.name}
          </h1>
        </div>
      </div>
      <div className="detail-body">
        <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "rgba(232,220,200,0.85)" }}>
          {loc.blurb}
        </p>
        <div className="chip-row">
          {loc.aesthetics.map((a) => (
            <span key={a} className="chip">
              {a}
            </span>
          ))}
        </div>
        <Link
          href={`/archive?q=${encodeURIComponent(loc.askPrompt)}`}
          className="btn"
          style={{ marginTop: "1.5rem" }}
        >
          Ask the archive
        </Link>
      </div>
    </>
  );
}
