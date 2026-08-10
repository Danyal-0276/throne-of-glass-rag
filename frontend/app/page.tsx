"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EmberCssField } from "@/components/EmberField";

export default function HomePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = titleRef.current?.querySelectorAll("span");
      gsap.fromTo(
        words || [],
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        [tagRef.current, ctaRef.current],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.45,
          stagger: 0.15,
          ease: "power2.out",
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="hero">
        <div
          className="hero__bg"
          style={{ backgroundImage: "url(/images/ui/hero.jpg)" }}
        />
        <div className="hero__veil" />
        <EmberCssField />
        <div className="hero__content">
          <p className="section__eyebrow">Fan archive</p>
          <h1 className="hero__brand" ref={titleRef}>
            <span>Throne</span> <span>of</span> <span>Glass</span>
          </h1>
          <p className="hero__tag" ref={tagRef}>
            Embers, ice, and unfinished crowns — explore Erilea, then ask the
            archive what the tomes remember.
          </p>
          <div ref={ctaRef} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/archive" className="btn">
              Open the Archive
            </Link>
            <Link href="/characters" className="btn btn--ghost">
              Meet the cast
            </Link>
          </div>
        </div>
      </section>

      <section className="section tease">
        <p className="section__eyebrow">Inside the vault</p>
        <h2 className="section__title">What waits beyond the glass</h2>
        <p className="section__lede">
          Browse the world and court, walk the books at your own pace, then
          query a spoiler-aware librarian powered by your local RAG backend.
        </p>
        <div className="tease-grid">
          <Link href="/world" className="tease-item">
            <h3 className="font-display">World</h3>
            <p>Rifthold to Antica — places shaped by empire, witches, and war.</p>
          </Link>
          <Link href="/timeline" className="tease-item">
            <h3 className="font-display">Timeline</h3>
            <p>Book panels gated by how far you&apos;ve read. Assassin&apos;s Blade is book 0.5 (before Throne of Glass).</p>
          </Link>
          <Link href="/archive" className="tease-item">
            <h3 className="font-display">Archive</h3>
            <p>A ChatGPT-like tome interface with streaming answers and torn-page sources.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
