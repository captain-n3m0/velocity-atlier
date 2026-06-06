import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);
  return null;
}
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const xTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xTo(mouse.x);
      yTo(mouse.y);
      dx(mouse.x);
      dy(mouse.y);
    };
    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        const mode = target.dataset.cursor;
        if (mode === "view") {
          gsap.to(ring, {
            scale: 4.5,
            backgroundColor: "oklch(0.76 0.16 190)",
            duration: 0.4,
            ease: "power3.out"
          });
          gsap.to(dot, { opacity: 0, duration: 0.2 });
          label.textContent = target.dataset.cursorLabel || "View";
          gsap.to(label, { opacity: 1, duration: 0.3, delay: 0.1 });
        } else if (mode === "magnetic") {
          gsap.to(ring, { scale: 2.2, borderColor: "oklch(0.94 0.012 85)", duration: 0.3 });
        }
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "oklch(0.94 0.012 85 / 0.6)",
          duration: 0.4
        });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
        gsap.to(label, { opacity: 0, duration: 0.2 });
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: ringRef,
        className: "pointer-events-none fixed left-0 top-0 z-[100] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/60 mix-blend-difference",
        children: /* @__PURE__ */ jsx("span", { ref: labelRef, className: "text-eyebrow opacity-0 text-[8px] text-ink", children: "View" })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: dotRef,
        className: "pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone mix-blend-difference"
      }
    )
  ] });
}
function MagneticButton({ children, className = "", onClick, variant = "solid" }) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const move = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: "power3.out" });
    gsap.to(innerRef.current, { x: x * 0.15, y: y * 0.15, duration: 0.6, ease: "power3.out" });
  };
  const reset = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
  };
  const base = variant === "solid" ? "bg-bone text-ink hover:bg-ember" : "border border-bone/40 text-bone hover:border-ember hover:text-ember";
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      onClick,
      onMouseMove: move,
      onMouseLeave: reset,
      "data-cursor": "magnetic",
      className: `group relative inline-flex items-center gap-4 rounded-full px-8 py-4 text-eyebrow transition-colors duration-500 ${base} ${className}`,
      children: /* @__PURE__ */ jsx("span", { ref: innerRef, className: "inline-flex items-center gap-4", children })
    }
  );
}
function SplitText({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.04,
  trigger = "scroll"
}) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".st-word");
    gsap.set(words, { yPercent: 110, opacity: 0 });
    const anim = () => gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      ease: "expo.out",
      stagger,
      delay
    });
    if (trigger === "load") {
      anim();
    } else {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: anim,
        once: true
      });
      return () => st.kill();
    }
  }, [children, delay, stagger, trigger]);
  const parts = children.split(" ");
  return /* @__PURE__ */ jsx(Tag, { ref, className, children: parts.map((w, i) => /* @__PURE__ */ jsx("span", { className: "inline-block overflow-hidden pb-[0.12em] align-bottom", children: /* @__PURE__ */ jsxs("span", { className: "st-word inline-block will-change-transform", children: [
    w,
    i < parts.length - 1 ? " " : ""
  ] }) }, i)) });
}
const heroCar = "/assets/hero-car-B-JsjOA0.jpg";
const detail1 = "/assets/detail-1-BF2pcQy2.jpg";
const detail2 = "/assets/detail-2-C9Rj-9mX.jpg";
const collection1 = "/assets/collection-1-B2hbD0kY.jpg";
function Landing() {
  return /* @__PURE__ */ jsxs("div", { className: "relative bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(SmoothScroll, {}),
    /* @__PURE__ */ jsx(CustomCursor, {}),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Marquee, {}),
    /* @__PURE__ */ jsx(Collection, {}),
    /* @__PURE__ */ jsx(Metrics, {}),
    /* @__PURE__ */ jsx(Atelier, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Nav() {
  return /* @__PURE__ */ jsx("header", { className: "fixed inset-x-0 top-4 z-50 px-4 md:top-6 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-[1120px] items-center justify-between gap-3 rounded-full border border-bone/15 bg-ink/70 px-4 py-2.5 shadow-[0_18px_60px_oklch(0_0_0_/_30%)] backdrop-blur-xl md:px-5", children: [
    /* @__PURE__ */ jsxs("a", { href: "#", className: "font-display text-lg text-bone tracking-tight md:text-xl", children: [
      "Velocity",
      /* @__PURE__ */ jsx("span", { className: "text-ember", children: "·" }),
      "Atelier"
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-1 rounded-full border border-bone/10 bg-bone/8 p-1 text-eyebrow text-bone md:flex", children: [
      /* @__PURE__ */ jsx("a", { href: "#collection", className: "rounded-full px-4 py-2 text-bone/70 transition-colors hover:bg-accent hover:text-accent-foreground", "data-cursor": "magnetic", children: "Collection" }),
      /* @__PURE__ */ jsx("a", { href: "#metrics", className: "rounded-full px-4 py-2 text-bone/70 transition-colors hover:bg-accent hover:text-accent-foreground", "data-cursor": "magnetic", children: "Metrics" }),
      /* @__PURE__ */ jsx("a", { href: "#atelier", className: "rounded-full px-4 py-2 text-bone/70 transition-colors hover:bg-accent hover:text-accent-foreground", "data-cursor": "magnetic", children: "Atelier" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "hidden rounded-full border border-bone/10 px-3 py-2 text-eyebrow text-bone/70 md:inline", children: "MMXXVI / Geneva" })
  ] }) });
}
function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
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
          scrub: true
        }
      });
      gsap.to(overlayRef.current, {
        opacity: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: "relative h-[110vh] w-full overflow-hidden bg-ink", children: [
    /* @__PURE__ */ jsx("img", { ref: imgRef, src: heroCar, alt: "Carbon-fibre hypercar lit in a dark studio", width: 1920, height: 1080, className: "absolute inset-0 h-full w-full object-cover opacity-70 will-change-transform" }),
    /* @__PURE__ */ jsx("div", { ref: overlayRef, className: "absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 grid-lines opacity-60" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto grid h-full max-w-[1600px] grid-cols-12 gap-6 px-6 pb-16 pt-32 md:px-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-6 flex items-start gap-6 text-eyebrow text-bone/70 md:col-span-3", children: [
        /* @__PURE__ */ jsx("span", { children: "N°" }),
        /* @__PURE__ */ jsx("span", { children: "001 / 026" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "col-span-6 hidden text-right text-eyebrow text-bone/70 md:col-span-9 md:block", children: "A private atelier — viewing by request" }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 mt-auto md:col-span-9", children: [
        /* @__PURE__ */ jsx("p", { className: "text-eyebrow mb-10 text-bone/70", children: "⎯⎯ Hypercars · Curated · Numbered" }),
        /* @__PURE__ */ jsxs("h1", { className: "font-display text-bone text-[clamp(4rem,14vw,16rem)] font-[300]", children: [
          /* @__PURE__ */ jsx(SplitText, { as: "span", trigger: "load", stagger: 0.08, delay: 0.2, className: "block", children: "Engineering" }),
          /* @__PURE__ */ jsx(SplitText, { as: "span", trigger: "load", stagger: 0.08, delay: 0.55, className: "block italic text-ember", children: "Emotion." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 mt-10 flex flex-col items-start justify-between gap-8 md:col-span-3 md:mt-auto md:items-end", children: [
        /* @__PURE__ */ jsx("p", { className: "max-w-[18rem] text-sm leading-relaxed text-bone/70", children: "Twenty-six machines per year. Each a thesis on velocity, restraint, and the unrepeatable hand of a single coachbuilder." }),
        /* @__PURE__ */ jsxs(MagneticButton, { children: [
          "Enter the Atelier",
          /* @__PURE__ */ jsx(Arrow, {})
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-eyebrow text-bone/50", children: "scroll ⌄" })
  ] });
}
function Marquee() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;
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
          invalidateOnRefresh: true
        }
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);
  const items = [{
    k: "01",
    v: "Carbon",
    l: "Monocoque"
  }, {
    k: "02",
    v: "1,184 hp",
    l: "Twin-Turbo V12"
  }, {
    k: "03",
    v: "Active",
    l: "Aero Surfaces"
  }, {
    k: "04",
    v: "Ceramic",
    l: "Brake Discs"
  }, {
    k: "05",
    v: "Bespoke",
    l: "Hide & Suede"
  }, {
    k: "06",
    v: "Atelier",
    l: "Hand-Built"
  }];
  return /* @__PURE__ */ jsxs("section", { ref: wrapRef, className: "relative h-screen overflow-hidden bg-ink", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute left-0 right-0 top-10 z-10 flex items-baseline justify-between px-6 md:px-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-eyebrow text-bone/70", children: "⎯⎯ Mechanical Lexicon" }),
      /* @__PURE__ */ jsx("p", { className: "text-eyebrow text-bone/70", children: "scroll →" })
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: trackRef, className: "flex h-full items-center gap-24 pl-[10vw] pr-[10vw] will-change-transform", children: [
      items.map((it) => /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-end gap-6 border-l border-bone/15 pl-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-eyebrow text-bone/40", children: it.k }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-[clamp(5rem,12vw,12rem)] font-[300] leading-none text-bone", children: it.v }),
          /* @__PURE__ */ jsx("div", { className: "text-eyebrow mt-4 text-bone/60", children: it.l })
        ] })
      ] }, it.k)),
      /* @__PURE__ */ jsx("div", { className: "shrink-0 pr-[20vw] text-bone/30 font-display text-[8rem]", children: "∞" })
    ] })
  ] });
}
function Collection() {
  return /* @__PURE__ */ jsx("section", { id: "collection", className: "relative bg-ink px-6 py-32 md:px-12 md:py-48", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-[1600px] grid-cols-12 gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-12 mb-20 flex items-end justify-between md:col-span-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-eyebrow text-bone/60", children: "⎯⎯ 002 — The Collection" }),
      /* @__PURE__ */ jsx("p", { className: "text-eyebrow text-bone/40", children: "MMXXVI" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "col-span-12 md:col-span-7", children: /* @__PURE__ */ jsxs("figure", { className: "group relative overflow-hidden", "data-cursor": "view", "data-cursor-label": "View", children: [
      /* @__PURE__ */ jsx("img", { src: collection1, alt: "Angular avant-garde hypercar lit by amber and white beams", width: 1080, height: 1600, loading: "lazy", className: "aspect-[4/5] w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]" }),
      /* @__PURE__ */ jsxs("figcaption", { className: "absolute bottom-6 left-6 right-6 flex items-end justify-between text-eyebrow text-bone", children: [
        /* @__PURE__ */ jsx("span", { children: "Atelier 01 — Noctis" }),
        /* @__PURE__ */ jsx("span", { children: "€ 4.8M" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-12 mt-12 flex flex-col gap-12 md:col-span-4 md:col-start-9 md:mt-0", children: [
      /* @__PURE__ */ jsx("p", { className: "text-eyebrow text-bone/50", children: "Flagship · 026 examples worldwide" }),
      /* @__PURE__ */ jsx(SplitText, { as: "h2", className: "font-display text-bone text-[clamp(2.5rem,5vw,5rem)]", children: "A silhouette carved from negative space." }),
      /* @__PURE__ */ jsxs("p", { className: "max-w-md text-base leading-relaxed text-bone/70", children: [
        "The ",
        /* @__PURE__ */ jsx("em", { className: "italic text-bone", children: "Noctis" }),
        " rejects ornament. Its bodywork is a single, uninterrupted gesture — a study in shadow, drawn by hand over seven months of clay, then cured in autoclave carbon. Nothing decorative. Nothing borrowed."
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-3 font-mono text-xs text-bone/60", children: [
        /* @__PURE__ */ jsxs("li", { className: "flex justify-between border-t border-bone/15 pt-3", children: [
          /* @__PURE__ */ jsx("span", { children: "Powertrain" }),
          /* @__PURE__ */ jsx("span", { className: "text-bone", children: "Hybrid V12 · 1,184 hp" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex justify-between border-t border-bone/15 pt-3", children: [
          /* @__PURE__ */ jsx("span", { children: "Dry Mass" }),
          /* @__PURE__ */ jsx("span", { className: "text-bone", children: "1,210 kg" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "flex justify-between border-t border-bone/15 pt-3", children: [
          /* @__PURE__ */ jsx("span", { children: "Origin" }),
          /* @__PURE__ */ jsx("span", { className: "text-bone", children: "Modena, IT" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-12 mt-24 grid grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsx("figure", { className: "group col-span-12 overflow-hidden md:col-span-5", "data-cursor": "view", "data-cursor-label": "Detail", children: /* @__PURE__ */ jsx("img", { src: detail1, alt: "Carbon fibre aero wing close-up", width: 1024, height: 1024, loading: "lazy", className: "aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" }) }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 flex flex-col justify-end gap-4 md:col-span-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-eyebrow text-bone/50", children: "Fig. A" }),
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-bone/60", children: "Active rear element. 412 kg of downforce at 280 km/h." })
      ] }),
      /* @__PURE__ */ jsx("figure", { className: "group col-span-12 overflow-hidden md:col-span-5", "data-cursor": "view", "data-cursor-label": "Detail", children: /* @__PURE__ */ jsx("img", { src: detail2, alt: "Overhead view of matte black hypercar", width: 1024, height: 1024, loading: "lazy", className: "aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" }) })
    ] })
  ] }) });
}
function Metrics() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const nums = ref.current.querySelectorAll("[data-num]");
      nums.forEach((el) => {
        const end = parseFloat(el.dataset.num);
        const decimals = parseInt(el.dataset.decimals || "0");
        const obj = {
          v: 0
        };
        gsap.to(obj, {
          v: end,
          duration: 2.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true
          },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          }
        });
      });
      gsap.from(ref.current.querySelectorAll(".metric-row"), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          once: true
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  const rows = [{
    i: "01",
    num: "2.3",
    dec: 1,
    unit: "s",
    label: "0 → 100 km/h",
    note: "Launch-controlled, dry."
  }, {
    i: "02",
    num: "412",
    dec: 0,
    unit: "km/h",
    label: "V-Max",
    note: "Long-tail aero package."
  }, {
    i: "03",
    num: "1184",
    dec: 0,
    unit: "hp",
    label: "Combined Output",
    note: "V12 + axial e-motor."
  }, {
    i: "04",
    num: "1210",
    dec: 0,
    unit: "kg",
    label: "Dry Weight",
    note: "Monocoque + Ti subframe."
  }];
  return /* @__PURE__ */ jsx("section", { id: "metrics", ref, className: "relative bg-bone px-6 py-32 text-ink md:px-12 md:py-48", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1600px]", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-20 grid grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-eyebrow col-span-12 text-ink/60 md:col-span-3", children: "⎯⎯ 003 — Performance" }),
      /* @__PURE__ */ jsx(SplitText, { as: "h2", className: "font-display col-span-12 text-ink text-[clamp(2.5rem,7vw,8rem)] md:col-span-9", children: "Numbers, devoid of poetry." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-ink/15 border-y border-ink/15", children: rows.map((r) => /* @__PURE__ */ jsxs("div", { className: "metric-row grid grid-cols-12 items-end gap-6 py-10 md:py-14", children: [
      /* @__PURE__ */ jsx("span", { className: "col-span-2 text-eyebrow text-ink/50 md:col-span-1", children: r.i }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-10 flex items-baseline gap-3 md:col-span-6", children: [
        /* @__PURE__ */ jsx("span", { "data-num": r.num, "data-decimals": r.dec, className: "font-display text-[clamp(4rem,11vw,11rem)] font-[300] leading-none text-ink", children: "0" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-sm text-ink/60", children: r.unit })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-eyebrow col-span-6 text-ink md:col-span-2", children: r.label }),
      /* @__PURE__ */ jsx("p", { className: "col-span-6 max-w-xs font-mono text-xs leading-relaxed text-ink/60 md:col-span-3", children: r.note })
    ] }, r.i)) })
  ] }) });
}
function Atelier() {
  return /* @__PURE__ */ jsx("section", { id: "atelier", className: "relative overflow-hidden bg-ink px-6 py-32 md:px-12 md:py-48", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-[1600px] grid-cols-12 gap-6", children: [
    /* @__PURE__ */ jsx("p", { className: "text-eyebrow col-span-12 mb-16 text-bone/60", children: "⎯⎯ 004 — A Private Audience" }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-12 md:col-span-9", children: [
      /* @__PURE__ */ jsx(SplitText, { as: "h2", className: "font-display text-bone text-[clamp(3rem,9vw,11rem)]", children: "Arrive quietly." }),
      /* @__PURE__ */ jsx(SplitText, { as: "h2", className: "font-display italic text-ember text-[clamp(3rem,9vw,11rem)]", delay: 0.1, children: "Leave transformed." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-12 mt-16 grid grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsx("p", { className: "col-span-12 max-w-xl text-base leading-relaxed text-bone/70 md:col-span-6", children: "Viewings are arranged in our Geneva atelier, hosted personally by the curator. Espresso, blueprints, and the machine itself — uncovered, idling, unhurried. Reservations are confirmed within forty-eight hours." }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-12 flex flex-col items-start gap-6 md:col-span-6 md:items-end", children: [
        /* @__PURE__ */ jsxs(MagneticButton, { children: [
          "Request a Viewing",
          /* @__PURE__ */ jsx(Arrow, {})
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-bone/50", children: "by appointment · concierge@velocity-atelier.ch" })
      ] })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-bone/10 bg-ink px-6 py-12 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-[1600px] grid-cols-12 items-end gap-6 text-eyebrow text-bone/50", children: [
    /* @__PURE__ */ jsx("div", { className: "col-span-6 md:col-span-3", children: "© MMXXVI Velocity Atelier SA" }),
    /* @__PURE__ */ jsx("div", { className: "col-span-6 md:col-span-3", children: "Rue du Rhône 14 · Geneva" }),
    /* @__PURE__ */ jsx("div", { className: "col-span-6 md:col-span-3", children: "+41 22 000 00 00" }),
    /* @__PURE__ */ jsx("div", { className: "col-span-6 text-right md:col-span-3", children: /* @__PURE__ */ jsx("span", { className: "font-display italic text-bone text-lg", children: "v·a" }) })
  ] }) });
}
function Arrow() {
  return /* @__PURE__ */ jsx("svg", { width: "14", height: "10", viewBox: "0 0 14 10", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M0 5h12M8 1l4 4-4 4", stroke: "currentColor", strokeWidth: "1.2" }) });
}
export {
  Landing as component
};
