import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface ParallaxDividerProps {
  variant?: "primary" | "secondary";
}

const ParallaxDivider = ({ variant = "primary" }: ParallaxDividerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDotRef = useRef<HTMLDivElement>(null);
  const rightDotRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const leftDot = leftDotRef.current;
    const rightDot = rightDotRef.current;
    const core = coreRef.current;

    if (!container || !leftDot || !rightDot || !core) return;

    if (prefersReducedMotion) {
      leftDot.style.transform = "translate(0px, calc(-50% + 0px))";
      rightDot.style.transform = "translate(0px, calc(-50% + 0px))";
      core.style.transform = "translate(-50%, -50%) rotate(0deg) scale(1)";
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      if (!containerRef.current || !leftDotRef.current || !rightDotRef.current || !coreRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      const containerWidth = containerRef.current.clientWidth;
      const maxTravel = (containerWidth / 2) - 46;
      const travel = Math.max(0, scrollProgress * maxTravel);
      const zigzagPhase = (scrollProgress * 8) % 2;
      const zigzagWave = (1 - Math.abs(zigzagPhase - 1)) * 2 - 1; // -1..1 triangular wave
      const zigzagOffsetPx = zigzagWave * 7.5;

      const coreScale = 0.92 + Math.sin(scrollProgress * Math.PI) * 0.16;
      const coreRotation = (scrollProgress - 0.5) * 38;

      leftDotRef.current.style.transform = `translate(${travel.toFixed(1)}px, calc(-50% + ${zigzagOffsetPx.toFixed(1)}px))`;
      rightDotRef.current.style.transform = `translate(${(-travel).toFixed(1)}px, calc(-50% + ${(-zigzagOffsetPx).toFixed(1)}px))`;
      coreRef.current.style.transform = `translate(-50%, -50%) rotate(${coreRotation.toFixed(1)}deg) scale(${coreScale.toFixed(3)})`;
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [prefersReducedMotion]);

  const colorVar = variant === "primary" ? "hsl(var(--primary))" : "hsl(var(--secondary))";
  const accentVar = variant === "primary" ? "hsl(var(--secondary))" : "hsl(var(--primary))";

  return (
    <div
      ref={containerRef}
      className="relative h-24 w-full flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-0 h-px top-1/2 -translate-y-1/2"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${colorVar} 20%, ${accentVar} 50%, ${colorVar} 80%, transparent 100%)`,
          opacity: 0.68,
        }}
      />

      <div
        ref={leftDotRef}
        className="absolute left-3 top-1/2 h-[clamp(8px,1vw,14px)] w-[clamp(8px,1vw,14px)] rounded-full -translate-y-1/2 blur-[1.5px] will-change-transform pointer-events-none"
        style={{
          background: accentVar,
          boxShadow: `0 0 16px ${accentVar}`,
          opacity: 0.72,
          transform: "translate(0px, calc(-50% + 0px))",
        }}
      />

      <div
        ref={rightDotRef}
        className="absolute right-3 top-1/2 h-[clamp(8px,1vw,14px)] w-[clamp(8px,1vw,14px)] rounded-full -translate-y-1/2 blur-[1.5px] will-change-transform pointer-events-none"
        style={{
          background: colorVar,
          boxShadow: `0 0 16px ${colorVar}`,
          opacity: 0.64,
          transform: "translate(0px, calc(-50% + 0px))",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 h-10 w-10 rounded-full border pointer-events-none"
        style={{
          borderColor: `${colorVar}55`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        ref={coreRef}
        className="absolute left-1/2 top-1/2 h-4 w-4 border will-change-transform"
        style={{
          borderColor: colorVar,
          backgroundColor: accentVar,
          transform: "translate(-50%, -50%) rotate(0deg) scale(1)",
          boxShadow: `0 0 20px ${colorVar}55`,
        }}
      />
    </div>
  );
};

export default ParallaxDivider;
