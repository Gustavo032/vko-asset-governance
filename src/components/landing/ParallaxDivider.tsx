import { useEffect, useRef, useState } from "react";

interface ParallaxDividerProps {
  variant?: "primary" | "secondary";
}

const ParallaxDivider = ({ variant = "primary" }: ParallaxDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - (rect.top + rect.height / 2) / vh;
      setProgress(Math.max(-0.2, Math.min(1.2, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const colorVar = variant === "primary" ? "hsl(var(--primary))" : "hsl(var(--secondary))";
  const accentVar = variant === "primary" ? "hsl(var(--secondary))" : "hsl(var(--primary))";

  // Strong parallax movements
  const layer1 = (progress - 0.5) * 320; // back layer slow, large amplitude
  const layer2 = (progress - 0.5) * -480; // mid layer opposite direction
  const layer3 = (progress - 0.5) * 200;
  const rotate = progress * 360;
  const scale = 0.8 + Math.sin(progress * Math.PI) * 0.6;

  return (
    <div
      ref={ref}
      className="relative h-32 w-full flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Background gradient band */}
      <div
        className="absolute inset-x-0 h-px top-1/2 -translate-y-1/2"
        style={{
          background: `linear-gradient(90deg, transparent, ${colorVar} 20%, ${accentVar} 50%, ${colorVar} 80%, transparent)`,
          opacity: 0.4,
        }}
      />

      {/* Layer 1: large faded text/track moving slowly */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none"
        style={{ transform: `translateX(${layer1}px)` }}
      >
        <div className="flex items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-xs font-semibold tracking-[0.5em] uppercase"
              style={{ color: colorVar, opacity: 0.15 }}
            >
              VKO · Solution · Governança ·
            </span>
          ))}
        </div>
      </div>

      {/* Layer 2: mid line of dashes moving opposite */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none"
        style={{ transform: `translateX(${layer2}px)` }}
      >
        <div className="flex items-center gap-3">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="block h-2 w-8 rounded-full"
              style={{
                backgroundColor: i % 3 === 0 ? accentVar : colorVar,
                opacity: i % 3 === 0 ? 0.7 : 0.35,
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer 3: front floating dots with stronger motion */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none"
        style={{ transform: `translateX(${layer3}px)` }}
      >
        <div className="flex items-center gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="block w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: colorVar,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Center rotating emblem - clearly tied to scroll */}
      <div
        className="relative will-change-transform"
        style={{
          transform: `rotate(${rotate}deg) scale(${scale})`,
          transition: "transform 0.05s linear",
        }}
      >
        <div
          className="w-6 h-6 rotate-45 border-2"
          style={{
            borderColor: accentVar,
            backgroundColor: colorVar,
            boxShadow: `0 0 24px ${colorVar}`,
          }}
        />
      </div>

      {/* Outer ring around emblem */}
      <div
        className="absolute w-16 h-16 rounded-full border pointer-events-none"
        style={{
          borderColor: colorVar,
          opacity: 0.3,
          transform: `scale(${1 + progress * 0.8})`,
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
};

export default ParallaxDivider;
