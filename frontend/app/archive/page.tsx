import type { Metadata } from "next";
import ArchiveChatClient from "./ArchiveChatClient";

export const metadata: Metadata = {
  title: "Archive",
};

type Props = {
  searchParams: Promise<{ q?: string; character?: string }>;
};

export default async function ArchivePage({ searchParams }: Props) {
  const sp = await searchParams;
  return (
    <div className="archive-page">
      <div className="archive-page__bg" aria-hidden />
      <div className="archive-page__veil" aria-hidden />
      <div className="archive-page__shell">
        <header className="archive-page__header">
          <p className="eyebrow">Ask the Archive</p>
          <h1>Quiet oracle</h1>
          <p>
            Inquire about characters, places, and events. Answers are drawn from
            the books you have ingested, with spoiler protection on.
          </p>
        </header>
        <div className="archive-page__chat">
          <ArchiveChatClient
            initialQuery={sp.q}
            characterSlug={sp.character}
          />
        </div>
      </div>
    </div>
  );
}
