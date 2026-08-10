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
  { href: "/about", label: "About", match: (p: string) => p.startsWith("/about") },
];

export default function FloatingNav() {
  const pathname = usePathname();

  return (
    <motion.div
      className="float-nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="float-nav__capsule"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
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
    </motion.div>
  );
}
