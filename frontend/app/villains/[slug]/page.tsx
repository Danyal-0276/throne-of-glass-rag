import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVillain, villains } from "@/content/villains";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return villains.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVillain(slug);
  return { title: v?.shortName ?? "Villain" };
}

export default async function VillainDetailPage({ params }: Props) {
  const { slug } = await params;
  const v = getVillain(slug);
  if (!v) notFound();

  return (
    <article className="detail">
      <div className="detail__hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={v.image} alt="" />
        <div className="detail__hero-copy">
          <p className="eyebrow">{v.domain}</p>
          <h1>{v.name}</h1>
          <p className="detail__aliases">{v.titles.join(" · ")}</p>
          <p>{v.blurb}</p>
          <Link
            href={`/?ask=1&q=${encodeURIComponent(v.askPrompt)}`}
            className="btn"
          >
            Ask the Archive
          </Link>
        </div>
      </div>
      <div className="detail__grid">
        <section>
          <h2>Affiliation</h2>
          <p>{v.affiliation}</p>
        </section>
        <section>
          <h2>Motivations</h2>
          <p>{v.motivations}</p>
        </section>
        <section>
          <h2>Key conflicts</h2>
          <ul>
            {v.conflicts.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </div>
      <p className="detail__back">
        <Link href="/villains">← All villains</Link>
      </p>
    </article>
  );
}
