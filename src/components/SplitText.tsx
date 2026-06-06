import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  trigger?: "load" | "scroll";
}

export function SplitText({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.04,
  trigger = "scroll",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".st-word");
    gsap.set(words, { yPercent: 110, opacity: 0 });

    const anim = () =>
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        delay,
      });

    if (trigger === "load") {
      anim();
    } else {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: anim,
        once: true,
      });
      return () => st.kill();
    }
  }, [children, delay, stagger, trigger]);

  const parts = children.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {parts.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <span className="st-word inline-block will-change-transform">
            {w}
            {i < parts.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
