"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SpoilerSelect } from "@/lib/spoiler";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/world", label: "World" },
  { href: "/characters", label: "Characters" },
  { href: "/timeline", label: "Timeline" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <Link href="/" className="nav__brand">
        Throne of Glass Archive
      </Link>
      <button
        type="button"
        className="nav__menu-btn"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((v) => !v)}
      >
        Menu
      </button>
      <nav className={`nav__links ${open ? "is-open" : ""}`}>
        {LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              data-active={active}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
        <SpoilerSelect />
      </nav>
    </header>
  );
}
