import { useEffect, useRef, useState } from "react";

interface ParallaxDividerProps {
  variant?: "primary" | "secondary";
}

const ParallaxDivider = ({ variant = "primary" }: ParallaxDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * -0.15);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const colorClass = variant === "primary" ? "bg-primary" : "bg-secondary";

  return (
    <div ref={ref} className="relative h-16 flex items-center justify-center overflow-hidden">
      <div
        className="flex items-center gap-3 will-change-transform"
        style={{ transform: `translateX(${offset}px)` }}
      >
        <span className={`h-px w-16 ${colorClass} opacity-40`} />
        <span className={`w-1.5 h-1.5 rounded-full ${colorClass} opacity-60`} />
        <span className={`h-px w-24 ${colorClass} opacity-30`} />
        <span className={`w-2 h-2 rounded-full ${colorClass}`} />
        <span className={`h-px w-24 ${colorClass} opacity-30`} />
        <span className={`w-1.5 h-1.5 rounded-full ${colorClass} opacity-60`} />
        <span className={`h-px w-16 ${colorClass} opacity-40`} />
      </div>
    </div>
  );
};

export default ParallaxDivider;
