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
      // 0 when entering bottom, 1 when leaving top
      const p = 1 - (rect.top + rect.height / 2) / vh;
      setProgress(Math.max(-0.5, Math.min(1.5, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const colorVar = variant === "primary" ? "hsl(var(--primary))" : "hsl(var(--secondary))";
  const translate = (progress - 0.5) * 80; // -40 to 40 px
  const dashOffset = 200 - progress * 200;

  return (
    <div
      ref={ref}
      className="relative h-20 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Floating dots layer */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ transform: `translateX(${translate * 0.4}px)` }}
      >
        <div className="flex items-center gap-2 opacity-30">
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: colorVar,
                animationDelay: `${i * 0.15}s`,
                animationDuration: "2.4s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated SVG line */}
      <svg
        className="relative w-full max-w-3xl h-12 will-change-transform"
        viewBox="0 0 600 48"
        fill="none"
        preserveAspectRatio="none"
        style={{ transform: `translateX(${translate}px)` }}
      >
        <defs>
          <linearGradient id={`grad-${variant}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colorVar} stopOpacity="0" />
            <stop offset="50%" stopColor={colorVar} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colorVar} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Wavy path */}
        <path
          d="M0 24 Q 75 8, 150 24 T 300 24 T 450 24 T 600 24"
          stroke={`url(#grad-${variant})`}
          strokeWidth="1.5"
          strokeDasharray="200 800"
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
        {/* Center diamond */}
        <g transform="translate(300 24)">
          <rect
            x="-4"
            y="-4"
            width="8"
            height="8"
            fill={colorVar}
            transform={`rotate(${45 + progress * 90})`}
            style={{ transformOrigin: "center", transition: "transform 0.2s ease-out" }}
          />
          <circle cx="0" cy="0" r="14" stroke={colorVar} strokeOpacity="0.3" strokeWidth="0.5" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default ParallaxDivider;
