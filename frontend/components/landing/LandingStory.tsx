"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteMark from "@/components/SiteMark";

gsap.registerPlugin(ScrollTrigger);

const PEEKS = [
  {
    title: "Fireheart",
    body: "A queen who survived as an assassin. Preview the court of ash and gold.",
    href: "/characters/aelin",
    mood: "ember",
    img: "/images/ui/peek-fireheart.png",
  },
  {
    title: "Valg shadow",
    body: "Kings behind kings. Meet the darkness that wore Adarlan's crown.",
    href: "/villains/erawan",
    mood: "void",
    img: "/images/ui/peek-valg.png",
  },
  {
    title: "Glass and stone",
    body: "From Endovier's salt to Orynth's pines: walk the map of Erilea.",
    href: "/world",
    mood: "dawn",
    img: "/images/ui/peek-places.png",
  },
];

const STRIP = [
  { label: "Characters", href: "/characters", img: "/images/characters/aelin.png" },
  { label: "Villains", href: "/villains", img: "/images/locations/morath.png" },
  { label: "Places", href: "/world", img: "/images/locations/terrasen.png" },
  { label: "Timeline", href: "/timeline", img: "/images/ui/hero.png" },
  { label: "Ask", href: "/archive", img: "/images/characters/rowan.png" },
];

export default function LandingStory() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".story-hero__g, .story-hero__copy, .story-calm, .story-stack__card, .story-horiz__strip", {
          clearProps: "all",
        });
        return;
      }

      const hero = root.querySelector(".story-hero");
      const bg = root.querySelector(".story-hero__bg");
      const mark = root.querySelector(".story-hero__g");
      const copy = root.querySelector(".story-hero__copy");
      const hint = root.querySelector(".story-hero__scroll-hint");

      if (hero && mark && copy && bg) {
        gsap.set(mark, { transformOrigin: "50% 50%" });

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.65,
          },
        });

        heroTl
          .to(bg, { scale: 1.12, filter: "saturate(0.95) brightness(0.38)", ease: "none" }, 0)
          .to(mark, { scale: 1.45, rotate: 22, opacity: 0.2, ease: "none" }, 0)
          .to(copy, { y: -90, opacity: 0, ease: "none" }, 0)
          .to(hint, { opacity: 0, ease: "none" }, 0);
      }

      root.querySelectorAll<HTMLElement>(".story-calm").forEach((el) => {
        gsap.fromTo(
          el.children,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              end: "top 40%",
              scrub: 0.8,
            },
          },
        );
      });

      root.querySelectorAll<HTMLElement>(".story-stack__card").forEach((card) => {
        const inner = card.querySelector(".story-stack__inner");
        const img = card.querySelector("img");
        gsap.fromTo(
          img,
          { scale: 1.08, y: 40 },
          {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top 20%",
              scrub: 0.7,
            },
          },
        );
        if (inner) {
          gsap.fromTo(
            inner,
            { y: 48, opacity: 0.35, rotateX: 6 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 35%",
                scrub: 0.7,
              },
            },
          );
        }
      });

      const horiz = root.querySelector(".story-horiz");
      const pin = root.querySelector(".story-horiz__pin");
      const strip = root.querySelector(".story-horiz__strip");
      if (horiz && pin && strip) {
        const getTravel = () =>
          Math.max(0, (strip as HTMLElement).scrollWidth - (pin as HTMLElement).clientWidth + 48);

        gsap.to(strip, {
          x: () => -getTravel(),
          ease: "none",
          scrollTrigger: {
            trigger: horiz,
            start: "top top",
            end: () => `+=${Math.max(getTravel() * 1.15, window.innerHeight)}`,
            scrub: 0.8,
            pin: pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      root.querySelectorAll<HTMLElement>(".story-cta-row .btn").forEach((btn, i) => {
        gsap.fromTo(
          btn,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: btn.parentElement,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.6,
            },
            delay: i * 0.05,
          },
        );
      });
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <div className="story" ref={rootRef}>
      <section className="story-hero" data-mood="ember">
        <div className="story-hero__bg" />
        <div className="story-hero__veil" />
        <div className="story-hero__g">
          <SiteMark size={200} />
        </div>
        <div className="story-hero__copy">
          <p className="eyebrow">Unofficial fan archive</p>
          <h1>
            Throne of
            <br />
            <span>Glass</span>
          </h1>
          <p className="lede">
            Scroll to enter Erilea: fire, ice, and the quiet archive that
            remembers both.
          </p>
        </div>
        <div className="story-hero__scroll-hint">Scroll</div>
      </section>

      <section className="story-calm">
        <p className="eyebrow">The telling</p>
        <h2>Not a menu. A passage.</h2>
        <p>
          One continuous scroll: pinned scenes, stacked peeks, and sideways
          glances before you step into the archives.
        </p>
      </section>

      <section className="story-stack">
        {PEEKS.map((card) => (
          <article
            key={card.title}
            className="story-stack__card"
            data-mood={card.mood}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.img} alt="" />
            <div className="story-stack__inner">
              <p className="eyebrow">Sneak peek</p>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
              <Link href={card.href} className="text-link">
                Enter
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="story-horiz">
        <div className="story-horiz__pin">
          <p className="eyebrow">Across the map</p>
          <h2>Sneak peeks while you scroll</h2>
          <div className="story-horiz__strip">
            {STRIP.map((item) => (
              <Link key={item.label} href={item.href} className="story-horiz__card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt="" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="story-calm story-calm--end">
        <p className="eyebrow">The archive awaits</p>
        <h2>Browse deeply. Ask quietly.</h2>
        <p>
          Full indexes for characters, villains, and places live on their own
          routes. Open the Archive when you are ready to ask.
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
          <Link href="/archive" className="btn btn--ghost">
            Archive
          </Link>
        </div>
      </section>
    </div>
  );
}
