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

const FAN = [
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
      if (reduced) return;

      const hero = root.querySelector(".story-hero");
      const bg = root.querySelector(".story-hero__bg");
      const mark = root.querySelector(".story-hero__g");
      const copy = root.querySelector(".story-hero__copy");
      const hint = root.querySelector(".story-hero__scroll-hint");

      if (hero && mark && copy && bg) {
        gsap.set(mark, { transformOrigin: "50% 50%" });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
            },
          })
          .to(bg, { scale: 1.1, ease: "none" }, 0)
          .to(mark, { scale: 1.35, rotate: 16, opacity: 0.35, ease: "none" }, 0)
          .to(copy, { y: -70, opacity: 0, ease: "none" }, 0)
          .to(hint, { opacity: 0, ease: "none" }, 0);
      }

      root.querySelectorAll<HTMLElement>(".story-calm").forEach((el) => {
        gsap.from(el.children, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });

      root.querySelectorAll<HTMLElement>(".story-stack__card").forEach((card) => {
        const inner = card.querySelector(".story-stack__inner");
        if (inner) {
          gsap.from(inner, {
            y: 36,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      const fanSection = root.querySelector<HTMLElement>(".story-fan");
      const fanStage = root.querySelector<HTMLElement>(".story-fan__stage");
      const fanCards = gsap.utils.toArray<HTMLElement>(".story-fan__card", root);
      const canFan =
        fanSection &&
        fanStage &&
        fanCards.length &&
        window.matchMedia("(min-width: 701px)").matches;

      if (canFan) {
        const mid = (fanCards.length - 1) / 2;
        const spreads = fanCards.map((_, i) => {
          const t = i - mid;
          return {
            x: t * 118,
            y: Math.abs(t) * 18,
            rotate: t * 9,
            z: 10 - Math.abs(t),
          };
        });

        gsap.set(fanCards, {
          x: 0,
          y: 40,
          rotate: 0,
          scale: 0.92,
          opacity: 0,
          transformOrigin: "50% 100%",
        });

        const fanTl = gsap.timeline({
          scrollTrigger: {
            trigger: fanSection,
            start: "top 70%",
            toggleActions: "play none none reverse",
            onReverseComplete: () => {
              fanStage.classList.remove("is-open");
            },
          },
          onComplete: () => {
            fanStage.classList.add("is-open");
          },
        });

        fanCards.forEach((card, i) => {
          const s = spreads[i];
          card.style.zIndex = String(20 + s.z);
          card.style.setProperty("--fan-delay", `${i * 0.18}s`);
          fanTl.to(
            card,
            {
              x: s.x,
              y: s.y,
              rotate: s.rotate,
              scale: 1,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
            },
            i * 0.06,
          );
        });

        const onEnter = (e: Event) => {
          const target = e.currentTarget as HTMLElement;
          fanStage.classList.add("is-focus");
          fanCards.forEach((card, i) => {
            const s = spreads[i];
            if (card === target) {
              card.classList.add("is-active");
              gsap.to(card, {
                scale: 1.1,
                x: s.x,
                y: s.y - 30,
                rotate: 0,
                opacity: 1,
                zIndex: 40,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            } else {
              card.classList.remove("is-active");
              const dir =
                spreads[i].x === 0 ? (i < mid ? -1 : 1) : Math.sign(spreads[i].x);
              gsap.to(card, {
                scale: 0.92,
                x: s.x + dir * 22,
                y: s.y + 14,
                rotate: s.rotate * 1.15,
                opacity: 0.55,
                zIndex: 20 + s.z,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          });
        };

        const onLeave = () => {
          fanStage.classList.remove("is-focus");
          fanCards.forEach((card, i) => {
            const s = spreads[i];
            card.classList.remove("is-active");
            gsap.to(card, {
              scale: 1,
              x: s.x,
              y: s.y,
              rotate: s.rotate,
              opacity: 1,
              zIndex: 20 + s.z,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
        };

        fanCards.forEach((card) => {
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("focus", onEnter);
          card.addEventListener("blur", onLeave);
        });
        fanStage.addEventListener("mouseleave", onLeave);
      }

      root.querySelectorAll<HTMLElement>(".story-cta-row .btn").forEach((btn) => {
        gsap.from(btn, {
          y: 16,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: btn,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, root);

    return () => ctx.revert();
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
          One continuous scroll through pinned scenes and stacked peeks, then a
          fan of doors into the archives.
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

      <section className="story-fan">
        <div className="story-fan__copy">
          <p className="eyebrow">Across the map</p>
          <h2>Choose a door</h2>
          <p>Hover a card to draw it forward. Each one opens a wing of the archive.</p>
        </div>
        <div className="story-fan__stage" aria-label="Archive peeks">
          {FAN.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="story-fan__card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt="" />
              <span>{item.label}</span>
            </Link>
          ))}
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
