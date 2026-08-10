"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SpoilerSelect } from "@/lib/spoiler";
import SiteMark from "@/components/SiteMark";

const LINKS = [
  { href: "/", label: "Story", match: (p: string) => p === "/" },
  { href: "/characters", label: "Characters", match: (p: string) => p.startsWith("/characters") },
  { href: "/villains", label: "Villains", match: (p: string) => p.startsWith("/villains") },
  { href: "/world", label: "Places", match: (p: string) => p.startsWith("/world") },
  { href: "/timeline", label: "Timeline", match: (p: string) => p.startsWith("/timeline") },
  { href: "/archive", label: "Archive", match: (p: string) => p.startsWith("/archive") },
  { href: "/about", label: "About", match: (p: string) => p.startsWith("/about") },
];

export default function FloatingNav() {
  const pathname = usePathname();

  return (
    <div className="float-nav">
      <motion.div
        className="float-nav__capsule"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: [0, -3, 0] }}
        transition={{
          opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
        }}
      >
        <Link href="/" className="float-nav__mark" aria-label="Home">
          <SiteMark size={28} />
        </Link>

        <nav className="float-nav__links" aria-label="Primary">
          {LINKS.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="float-nav__link"
                data-active={active}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="float-nav__spoiler">
          <SpoilerSelect />
        </div>
      </motion.div>
    </div>
  );
}
