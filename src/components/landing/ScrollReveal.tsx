import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/hooks/use-in-view-once";

type RevealVariant = "fade-in" | "fade-up" | "zoom-in";

interface ScrollRevealProps {
  className?: string;
  children: ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  threshold?: number;
}

const ScrollReveal = ({
  className,
  children,
  variant = "fade-up",
  delayMs = 0,
  threshold = 0.2,
}: ScrollRevealProps) => {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>({ threshold });
  const style: CSSProperties = { transitionDelay: `${delayMs}ms` };

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "scroll-reveal",
        `scroll-reveal--${variant}`,
        isInView && "is-visible",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
