import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const xTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xTo(mouse.x);
      yTo(mouse.y);
      dx(mouse.x);
      dy(mouse.y);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (target) {
        const mode = target.dataset.cursor;
        if (mode === "view") {
          gsap.to(ring, {
            scale: 4.5,
            backgroundColor: "oklch(0.76 0.16 190)",
            duration: 0.4,
            ease: "power3.out",
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
          duration: 0.4,
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

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/60 mix-blend-difference"
      >
        <span ref={labelRef} className="text-eyebrow opacity-0 text-[8px] text-ink">
          View
        </span>
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone mix-blend-difference"
      />
    </>
  );
}
