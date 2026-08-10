"use client";

import ArchiveChat from "@/components/archive/ArchiveChat";

export default function ArchiveChatClient({
  initialQuery,
  characterSlug,
}: {
  initialQuery?: string;
  characterSlug?: string;
}) {
  return (
    <ArchiveChat initialQuery={initialQuery} characterSlug={characterSlug} />
  );
}
