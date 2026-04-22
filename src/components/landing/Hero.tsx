import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-mansion.jpg";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  target: number;
  format: (value: number) => string;
}

const metrics: Metric[] = [
  {
    label: "Anos de experiência em governança técnica de ativos",
    target: 8,
    format: (value) => `${Math.round(value).toLocaleString("pt-BR")}+`,
  },
  {
    label: "Estados atendidos",
    target: 7,
    format: (value) => `${Math.round(value)}`,
  },
  {
    label: "Empreendimentos atendidos",
    target: 45,
    format: (value) => `${Math.round(value).toLocaleString("pt-BR")}+`,
  },
  {
    label: "Chamados atendidos em 2025",
    target: 1200,
    format: (value) => `${Math.round(value).toLocaleString("pt-BR")}+`,
  },
  {
    label: "m² de área técnica gerenciada",
    target: 320000,
    format: (value) => `${Math.round(value).toLocaleString("pt-BR")}`,
  },
  {
    label: "Sistemas técnicos cadastrados e monitorados",
    target: 4000,
    format: (value) => `${Math.round(value).toLocaleString("pt-BR")}+`,
  },
  {
    label: "Ativos com histórico completo de manutenção e conformidade",
    target: 90,
    format: (value) => `${Math.round(value)}%`,
  },
  {
    label: "Vistorias técnicas realizadas",
    target: 1200,
    format: (value) => `${Math.round(value).toLocaleString("pt-BR")}+`,
  },
];

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const MetricCard = ({
  metric,
  delayMs,
  prefersReducedMotion,
}: {
  metric: Metric;
  delayMs: number;
  prefersReducedMotion: boolean;
}) => {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>({
    threshold: 0.55,
    rootMargin: "0px 0px -8% 0px",
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayValue(metric.target);
      return;
    }

    const animationDurationMs = 1400;
    let animationFrame = 0;
    let startTimestamp: number | null = null;

    const animate = (timestamp: number) => {
      if (startTimestamp === null) {
        startTimestamp = timestamp;
      }

      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / animationDurationMs, 1);
      const easedProgress = easeOutCubic(progress);

      setDisplayValue(metric.target * easedProgress);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [isInView, metric.target, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal scroll-reveal--zoom-in p-5 rounded-2xl glass-surface glass-tint text-center",
        (isInView || prefersReducedMotion) && "is-visible"
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <p className="text-2xl lg:text-3xl font-bold text-primary">{metric.format(displayValue)}</p>
      <p className="text-sm text-muted-foreground mt-1 leading-tight">{metric.label}</p>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const background = backgroundRef.current;
    const section = sectionRef.current;
    if (!background || !section) return;

    if (prefersReducedMotion) {
      background.style.transform = "translate3d(0, 0, 0) scale(1)";
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      if (!backgroundRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewportHeight) {
        ticking = false;
        return;
      }

      const scrollOffset = Math.max(0, window.scrollY);
      const translateY = Math.min(scrollOffset * 0.36, 240);
      const scale = 1 + Math.min(scrollOffset * 0.00022, 0.14);

      backgroundRef.current.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
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

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image with parallax */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 -top-20 -bottom-40 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0) scale(1)" }}
      >
        <img
          src={heroImg}
          alt="Mansão de alto padrão com jardim e piscina"
          className="w-full h-full object-cover"
          width={1280}
          height={720}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/55 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-28">
        <div className="max-w-2xl space-y-8">
          <ScrollReveal variant="fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-chip text-primary text-sm font-semibold tracking-wide uppercase font-iansui">
              GTA — Método VKO para Ativos
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={80}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground text-balance">
              Para garantir eficiência e valorizar{" "}
              <span className="text-primary">o seu patrimônio</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delayMs={140}>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Estruturamos do zero o modelo GTA no seu ativo: inventário validado, histórico rastreável e critérios objetivos para priorizar investimentos, reduzir urgências e decidir com segurança.
            </p>
          </ScrollReveal>

          <ScrollReveal delayMs={180} variant="zoom-in">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <a
                href="#contato"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 h-12 px-6 sm:px-8 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Fale com um especialista
                <ArrowRight size={16} />
              </a>
              <a
                href="#governanca"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 h-12 px-6 sm:px-8 rounded-lg border text-foreground font-medium hover:bg-accent transition-colors bg-background/60 backdrop-blur-sm"
              >
                Entenda como funciona
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Metrics grid */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              delayMs={index * 70}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
