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
      <div className="archive-page__frame">
        <ArchiveChatClient
          initialQuery={sp.q}
          characterSlug={sp.character}
        />
      </div>
    </div>
  );
}
