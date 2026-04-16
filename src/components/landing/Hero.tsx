import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-mansion.jpg";

const metrics = [
  { value: "2.400+", label: "Ativos monitorados" },
  { value: "850k", label: "m² sob gestão" },
  { value: "12", label: "Estados atendidos" },
  { value: "98%", label: "Satisfação dos clientes" },
  { value: "150+", label: "Imóveis de alto padrão" },
  { value: "R$3.2B", label: "Patrimônio sob governança" },
];

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0 -top-20 -bottom-40 will-change-transform" style={{ transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0003})` }}>
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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-28">
        <div className="max-w-2xl space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
            Governança de Ativos de Alto Padrão
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground text-balance">
            Seu patrimônio merece{" "}
            <span className="text-primary">gestão inteligente</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            A VKO Solution cuida dos seus ativos com estrutura, controle e inteligência operacional — para que você tenha visibilidade total e tranquilidade sobre seu patrimônio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Fale com um especialista
              <ArrowRight size={16} />
            </a>
            <a
              href="#governanca"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border text-foreground font-medium hover:bg-accent transition-colors bg-background/60 backdrop-blur-sm"
            >
              Conheça nossa abordagem
            </a>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="p-5 rounded-2xl bg-card/80 backdrop-blur-sm border shadow-sm text-center"
            >
              <p className="text-2xl lg:text-3xl font-bold text-primary">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-tight">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
