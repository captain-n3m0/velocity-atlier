import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
}

export function MagneticButton({ children, className = "", onClick, variant = "solid" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const move = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: "power3.out" });
    gsap.to(innerRef.current!, { x: x * 0.15, y: y * 0.15, duration: 0.6, ease: "power3.out" });
  };
  const reset = () => {
    gsap.to(ref.current!, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
    gsap.to(innerRef.current!, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
  };

  const base =
    variant === "solid"
      ? "bg-bone text-ink hover:bg-ember"
      : "border border-bone/40 text-bone hover:border-ember hover:text-ember";

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      data-cursor="magnetic"
      className={`group relative inline-flex items-center gap-4 rounded-full px-8 py-4 text-eyebrow transition-colors duration-500 ${base} ${className}`}
    >
      <span ref={innerRef} className="inline-flex items-center gap-4">
        {children}
      </span>
    </button>
  );
}
