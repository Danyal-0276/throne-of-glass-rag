"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ArchiveChat = dynamic(() => import("@/components/archive/ArchiveChat"), {
  ssr: false,
  loading: () => (
    <div className="chat-orb__loading">Opening the archive…</div>
  ),
});

/** Minimal oracle orb, closed by default; expands into compact chat. */
export default function ChatOrb() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // Deep-link: /?ask=1 or /archive opens orb
  useEffect(() => {
    if (pathname.startsWith("/archive")) setOpen(true);
    if (searchParams.get("ask") === "1") setOpen(true);
  }, [pathname, searchParams]);

  const close = useCallback(() => {
    setOpen(false);
    if (pathname.startsWith("/archive")) router.push("/");
  }, [pathname, router]);

  const initialQuery = searchParams.get("q") || undefined;
  const characterSlug = searchParams.get("character") || undefined;

  return (
    <>
      <motion.button
        type="button"
        className="chat-orb"
        aria-label={open ? "Close archive chat" : "Open Ask the Archive"}
        onClick={() => (open ? close() : setOpen(true))}
        animate={{ y: [0, -4, 0], boxShadow: open ? "0 0 0 0 transparent" : undefined }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        data-open={open}
      >
        <span className="chat-orb__glyph" aria-hidden>
          ✦
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-orb__panel"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chat-orb__panel-head">
              <div>
                <p className="chat-orb__eyebrow">Ask the Archive</p>
                <h2>Quiet oracle</h2>
              </div>
              <button type="button" className="chat-orb__close" onClick={close}>
                Close
              </button>
            </div>
            <div className="chat-orb__panel-body">
              <ArchiveChat
                initialQuery={initialQuery}
                characterSlug={characterSlug}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
