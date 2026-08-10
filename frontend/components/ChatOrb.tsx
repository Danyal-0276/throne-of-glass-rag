"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

/** Floating orb that routes to the full Archive page. */
export default function ChatOrb() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.startsWith("/archive")) return null;

  return (
    <motion.button
      type="button"
      className="chat-orb"
      aria-label="Open Ask the Archive"
      onClick={() => router.push("/archive")}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="chat-orb__glyph" aria-hidden>
        ✦
      </span>
    </motion.button>
  );
}
