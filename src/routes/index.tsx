import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { MagneticButton } from "@/components/MagneticButton";
import { SplitText } from "@/components/SplitText";

import heroCar from "@/assets/hero-car.jpg";
import detail1 from "@/assets/detail-1.jpg";
import detail2 from "@/assets/detail-2.jpg";
import collection1 from "@/assets/collection-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velocity Atelier — Engineering Emotion" },
      {
        name: "description",
        content:
          "Velocity Atelier is a private dealership for avant-garde hypercars. Curated machines, by appointment only.",
      },
      { property: "og:title", content: "Velocity Atelier — Engineering Emotion" },
      {
        property: "og:description",
        content: "A private atelier for avant-garde hypercars. By appointment only.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative bg-background text-foreground">
      <SmoothScroll />
      <CustomCursor />
      <Nav />
      <Hero />
      <Marquee />
      <Collection />
      <Metrics />
      <Atelier />
      <Footer />
    </div>
  );
}

/* ───────────────────────── NAV ───────────────────────── */
function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-6 md:px-8">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 rounded-full border border-bone/15 bg-ink/70 px-4 py-2.5 shadow-[0_18px_60px_oklch(0_0_0_/_30%)] backdrop-blur-xl md:px-5">
        <a href="#" className="font-display text-lg text-bone tracking-tight md:text-xl">
          Velocity<span className="text-ember">·</span>Atelier
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-bone/10 bg-bone/8 p-1 text-eyebrow text-bone md:flex">
          <a
            href="#collection"
            className="rounded-full px-4 py-2 text-bone/70 transition-colors hover:bg-accent hover:text-accent-foreground"
            data-cursor="magnetic"
          >
            Collection
          </a>
          <a
            href="#metrics"
            className="rounded-full px-4 py-2 text-bone/70 transition-colors hover:bg-accent hover:text-accent-foreground"
            data-cursor="magnetic"
          >
            Metrics
          </a>
          <a
            href="#atelier"
            className="rounded-full px-4 py-2 text-bone/70 transition-colors hover:bg-accent hover:text-accent-foreground"
            data-cursor="magnetic"
          >
            Atelier
          </a>
        </nav>
        <span className="hidden rounded-full border border-bone/10 px-3 py-2 text-eyebrow text-bone/70 md:inline">
          MMXXVI / Geneva
        </span>
      </div>
    </header>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 25,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(overlayRef.current, {
        opacity: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[110vh] w-full overflow-hidden bg-ink">
      <img
        ref={imgRef}
        src={heroCar}
        alt="Carbon-fibre hypercar lit in a dark studio"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-70 will-change-transform"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink"
      />
      {/* grid overlay */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />

      <div className="relative z-10 mx-auto grid h-full max-w-[1600px] grid-cols-12 gap-6 px-6 pb-16 pt-32 md:px-12">
        {/* Top metadata */}
        <div className="col-span-6 flex items-start gap-6 text-eyebrow text-bone/70 md:col-span-3">
          <span>N°</span>
          <span>001 / 026</span>
        </div>
        <div className="col-span-6 hidden text-right text-eyebrow text-bone/70 md:col-span-9 md:block">
          A private atelier — viewing by request
        </div>

        {/* Headline anchored bottom-left */}
        <div className="col-span-12 mt-auto md:col-span-9">
          <p className="text-eyebrow mb-10 text-bone/70">⎯⎯ Hypercars · Curated · Numbered</p>
          <h1 className="font-display text-bone text-[clamp(4rem,14vw,16rem)] font-[300]">
            <SplitText as="span" trigger="load" stagger={0.08} delay={0.2} className="block">
              Engineering
            </SplitText>
            <SplitText
              as="span"
              trigger="load"
              stagger={0.08}
              delay={0.55}
              className="block italic text-ember"
            >
              Emotion.
            </SplitText>
          </h1>
        </div>

        <div className="col-span-12 mt-10 flex flex-col items-start justify-between gap-8 md:col-span-3 md:mt-auto md:items-end">
          <p className="max-w-[18rem] text-sm leading-relaxed text-bone/70">
            Twenty-six machines per year. Each a thesis on velocity, restraint, and the unrepeatable
            hand of a single coachbuilder.
          </p>
          <MagneticButton>
            Enter the Atelier
            <Arrow />
          </MagneticButton>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-eyebrow text-bone/50">
        scroll ⌄
      </div>
    </section>
  );
}

/* ───────────────────────── MARQUEE (horizontal scroll specs) ───────────────────────── */
function Marquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const items = [
    { k: "01", v: "Carbon", l: "Monocoque" },
    { k: "02", v: "1,184 hp", l: "Twin-Turbo V12" },
    { k: "03", v: "Active", l: "Aero Surfaces" },
    { k: "04", v: "Ceramic", l: "Brake Discs" },
    { k: "05", v: "Bespoke", l: "Hide & Suede" },
    { k: "06", v: "Atelier", l: "Hand-Built" },
  ];

  return (
    <section ref={wrapRef} className="relative h-screen overflow-hidden bg-ink">
      <div className="absolute left-0 right-0 top-10 z-10 flex items-baseline justify-between px-6 md:px-12">
        <p className="text-eyebrow text-bone/70">⎯⎯ Mechanical Lexicon</p>
        <p className="text-eyebrow text-bone/70">scroll →</p>
      </div>
      <div
        ref={trackRef}
        className="flex h-full items-center gap-24 pl-[10vw] pr-[10vw] will-change-transform"
      >
        {items.map((it) => (
          <div key={it.k} className="flex shrink-0 items-end gap-6 border-l border-bone/15 pl-6">
            <span className="text-eyebrow text-bone/40">{it.k}</span>
            <div>
              <div className="font-display text-[clamp(5rem,12vw,12rem)] font-[300] leading-none text-bone">
                {it.v}
              </div>
              <div className="text-eyebrow mt-4 text-bone/60">{it.l}</div>
            </div>
          </div>
        ))}
        <div className="shrink-0 pr-[20vw] text-bone/30 font-display text-[8rem]">∞</div>
      </div>
    </section>
  );
}

/* ───────────────────────── COLLECTION ───────────────────────── */
function Collection() {
  return (
    <section id="collection" className="relative bg-ink px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6">
        <div className="col-span-12 mb-20 flex items-end justify-between md:col-span-12">
          <p className="text-eyebrow text-bone/60">⎯⎯ 002 — The Collection</p>
          <p className="text-eyebrow text-bone/40">MMXXVI</p>
        </div>

        {/* Asymmetric grid */}
        <div className="col-span-12 md:col-span-7">
          <figure
            className="group relative overflow-hidden"
            data-cursor="view"
            data-cursor-label="View"
          >
            <img
              src={collection1}
              alt="Angular avant-garde hypercar lit by amber and white beams"
              width={1080}
              height={1600}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
            />
            <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-eyebrow text-bone">
              <span>Atelier 01 — Noctis</span>
              <span>€ 4.8M</span>
            </figcaption>
          </figure>
        </div>

        <div className="col-span-12 mt-12 flex flex-col gap-12 md:col-span-4 md:col-start-9 md:mt-0">
          <p className="text-eyebrow text-bone/50">Flagship · 026 examples worldwide</p>
          <SplitText as="h2" className="font-display text-bone text-[clamp(2.5rem,5vw,5rem)]">
            A silhouette carved from negative space.
          </SplitText>
          <p className="max-w-md text-base leading-relaxed text-bone/70">
            The <em className="italic text-bone">Noctis</em> rejects ornament. Its bodywork is a
            single, uninterrupted gesture — a study in shadow, drawn by hand over seven months of
            clay, then cured in autoclave carbon. Nothing decorative. Nothing borrowed.
          </p>
          <ul className="space-y-3 font-mono text-xs text-bone/60">
            <li className="flex justify-between border-t border-bone/15 pt-3">
              <span>Powertrain</span>
              <span className="text-bone">Hybrid V12 · 1,184 hp</span>
            </li>
            <li className="flex justify-between border-t border-bone/15 pt-3">
              <span>Dry Mass</span>
              <span className="text-bone">1,210 kg</span>
            </li>
            <li className="flex justify-between border-t border-bone/15 pt-3">
              <span>Origin</span>
              <span className="text-bone">Modena, IT</span>
            </li>
          </ul>
        </div>

        {/* Detail strip */}
        <div className="col-span-12 mt-24 grid grid-cols-12 gap-6">
          <figure
            className="group col-span-12 overflow-hidden md:col-span-5"
            data-cursor="view"
            data-cursor-label="Detail"
          >
            <img
              src={detail1}
              alt="Carbon fibre aero wing close-up"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </figure>
          <div className="col-span-12 flex flex-col justify-end gap-4 md:col-span-2">
            <span className="text-eyebrow text-bone/50">Fig. A</span>
            <p className="font-mono text-xs text-bone/60">
              Active rear element. 412 kg of downforce at 280 km/h.
            </p>
          </div>
          <figure
            className="group col-span-12 overflow-hidden md:col-span-5"
            data-cursor="view"
            data-cursor-label="Detail"
          >
            <img
              src={detail2}
              alt="Overhead view of matte black hypercar"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── METRICS ───────────────────────── */
function Metrics() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const nums = ref.current!.querySelectorAll<HTMLElement>("[data-num]");
      nums.forEach((el) => {
        const end = parseFloat(el.dataset.num!);
        const decimals = parseInt(el.dataset.decimals || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });

      gsap.from(ref.current!.querySelectorAll(".metric-row"), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const rows = [
    {
      i: "01",
      num: "2.3",
      dec: 1,
      unit: "s",
      label: "0 → 100 km/h",
      note: "Launch-controlled, dry.",
    },
    { i: "02", num: "412", dec: 0, unit: "km/h", label: "V-Max", note: "Long-tail aero package." },
    {
      i: "03",
      num: "1184",
      dec: 0,
      unit: "hp",
      label: "Combined Output",
      note: "V12 + axial e-motor.",
    },
    {
      i: "04",
      num: "1210",
      dec: 0,
      unit: "kg",
      label: "Dry Weight",
      note: "Monocoque + Ti subframe.",
    },
  ];

  return (
    <section
      id="metrics"
      ref={ref}
      className="relative bg-bone px-6 py-32 text-ink md:px-12 md:py-48"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20 grid grid-cols-12 gap-6">
          <p className="text-eyebrow col-span-12 text-ink/60 md:col-span-3">⎯⎯ 003 — Performance</p>
          <SplitText
            as="h2"
            className="font-display col-span-12 text-ink text-[clamp(2.5rem,7vw,8rem)] md:col-span-9"
          >
            Numbers, devoid of poetry.
          </SplitText>
        </div>

        <div className="divide-y divide-ink/15 border-y border-ink/15">
          {rows.map((r) => (
            <div key={r.i} className="metric-row grid grid-cols-12 items-end gap-6 py-10 md:py-14">
              <span className="col-span-2 text-eyebrow text-ink/50 md:col-span-1">{r.i}</span>
              <div className="col-span-10 flex items-baseline gap-3 md:col-span-6">
                <span
                  data-num={r.num}
                  data-decimals={r.dec}
                  className="font-display text-[clamp(4rem,11vw,11rem)] font-[300] leading-none text-ink"
                >
                  0
                </span>
                <span className="font-mono text-sm text-ink/60">{r.unit}</span>
              </div>
              <p className="text-eyebrow col-span-6 text-ink md:col-span-2">{r.label}</p>
              <p className="col-span-6 max-w-xs font-mono text-xs leading-relaxed text-ink/60 md:col-span-3">
                {r.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── ATELIER / CTA ───────────────────────── */
function Atelier() {
  return (
    <section id="atelier" className="relative overflow-hidden bg-ink px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6">
        <p className="text-eyebrow col-span-12 mb-16 text-bone/60">⎯⎯ 004 — A Private Audience</p>

        <div className="col-span-12 md:col-span-9">
          <SplitText as="h2" className="font-display text-bone text-[clamp(3rem,9vw,11rem)]">
            Arrive quietly.
          </SplitText>
          <SplitText
            as="h2"
            className="font-display italic text-ember text-[clamp(3rem,9vw,11rem)]"
            delay={0.1}
          >
            Leave transformed.
          </SplitText>
        </div>

        <div className="col-span-12 mt-16 grid grid-cols-12 gap-6">
          <p className="col-span-12 max-w-xl text-base leading-relaxed text-bone/70 md:col-span-6">
            Viewings are arranged in our Geneva atelier, hosted personally by the curator. Espresso,
            blueprints, and the machine itself — uncovered, idling, unhurried. Reservations are
            confirmed within forty-eight hours.
          </p>
          <div className="col-span-12 flex flex-col items-start gap-6 md:col-span-6 md:items-end">
            <MagneticButton>
              Request a Viewing
              <Arrow />
            </MagneticButton>
            <p className="font-mono text-xs text-bone/50">
              by appointment · concierge@velocity-atelier.ch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── FOOTER ───────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink px-6 py-12 md:px-12">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 items-end gap-6 text-eyebrow text-bone/50">
        <div className="col-span-6 md:col-span-3">© MMXXVI Velocity Atelier SA</div>
        <div className="col-span-6 md:col-span-3">Rue du Rhône 14 · Geneva</div>
        <div className="col-span-6 md:col-span-3">+41 22 000 00 00</div>
        <div className="col-span-6 text-right md:col-span-3">
          <span className="font-display italic text-bone text-lg">v·a</span>
        </div>
      </div>
    </footer>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
