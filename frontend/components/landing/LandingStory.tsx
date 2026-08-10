"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import SiteMark from "@/components/SiteMark";

function usePrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function LandingStory() {
  const heroRef = useRef<HTMLElement>(null);
  const horizRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: horizProgress } = useScroll({
    target: horizRef,
    offset: ["start end", "end start"],
  });

  const gScale = useSpring(useTransform(heroProgress, [0, 0.6], [1, 1.35]), {
    stiffness: 60,
    damping: 20,
  });
  const gRotate = useTransform(heroProgress, [0, 1], [0, 18]);
  const gCrack = useTransform(heroProgress, [0, 0.4, 1], [0, 0.4, 1]);
  const titleY = useTransform(heroProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(heroProgress, [0, 0.55], [1, 0]);

  const stripX = useTransform(horizProgress, [0.1, 0.9], ["0%", "-55%"]);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="story">
      {/* HERO — morphing G */}
      <section className="story-hero" ref={heroRef}>
        <div className="story-hero__bg" />
        <motion.div
          className="story-hero__g"
          style={
            reduced
              ? undefined
              : { scale: gScale, rotate: gRotate, opacity: gCrack }
          }
        >
          <SiteMark size={220} />
        </motion.div>
        <motion.div
          className="story-hero__copy"
          style={reduced ? undefined : { y: titleY, opacity: titleOpacity }}
        >
          <p className="eyebrow">Unofficial fan archive</p>
          <h1>
            Throne of
            <br />
            <span>Glass</span>
          </h1>
          <p className="lede">
            Scroll to enter Erilea — fire, ice, and the quiet archive that
            remembers both.
          </p>
        </motion.div>
        <div className="story-hero__scroll-hint">Scroll</div>
      </section>

      {/* Calm intro */}
      <section className="story-calm">
        <p className="eyebrow">The telling</p>
        <h2>Not a menu. A passage.</h2>
        <p>
          This landing is one continuous scroll — pin, stack, and sideways peeks —
          before you step into the archives of people, villains, and places.
        </p>
      </section>

      {/* Sticky stacking cards */}
      <section className="story-stack">
        {[
          {
            title: "Fireheart",
            body: "A queen who survived as an assassin. Preview the court of ash and gold.",
            href: "/characters/aelin",
            tone: "ember",
          },
          {
            title: "Valg shadow",
            body: "Kings behind kings. Meet the darkness that wore Adarlan’s crown.",
            href: "/villains/erawan",
            tone: "void",
          },
          {
            title: "Glass & stone",
            body: "From Endovier’s salt to Orynth’s pines — walk the map of Erilea.",
            href: "/world",
            tone: "ice",
          },
        ].map((card) => (
          <article key={card.title} className={`story-stack__card tone-${card.tone}`}>
            <div className="story-stack__inner">
              <p className="eyebrow">Sneak peek</p>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
              <Link href={card.href} className="text-link">
                Enter →
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Horizontal scroll-jacked peek */}
      <section className="story-horiz" ref={horizRef}>
        <div className="story-horiz__pin">
          <p className="eyebrow">Across the map</p>
          <h2>Sneak peeks while you scroll</h2>
          <motion.div className="story-horiz__strip" style={reduced ? undefined : { x: stripX }}>
            {[
              { label: "Characters", href: "/characters", img: "/images/characters/aelin.jpg" },
              { label: "Villains", href: "/villains", img: "/images/locations/morath.jpg" },
              { label: "Places", href: "/world", img: "/images/locations/terrasen.jpg" },
              { label: "Timeline", href: "/timeline", img: "/images/ui/hero.jpg" },
              { label: "Ask", href: "/?ask=1", img: "/images/characters/rowan.jpg" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="story-horiz__card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt="" />
                <span>{item.label}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Closing CTA — calm */}
      <section className="story-calm story-calm--end">
        <p className="eyebrow">The archive awaits</p>
        <h2>Browse deeply. Ask quietly.</h2>
        <p>
          Full indexes for characters, villains, and places live on their own
          routes. The oracle orb stays minimal until you summon it.
        </p>
        <div className="story-cta-row">
          <Link href="/characters" className="btn">
            Characters
          </Link>
          <Link href="/villains" className="btn btn--ghost">
            Villains
          </Link>
          <Link href="/world" className="btn btn--ghost">
            Places
          </Link>
        </div>
      </section>
    </div>
  );
}
