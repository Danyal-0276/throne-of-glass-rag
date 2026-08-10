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
      <ArchiveChatClient
        initialQuery={sp.q}
        characterSlug={sp.character}
      />
    </div>
  );
}
