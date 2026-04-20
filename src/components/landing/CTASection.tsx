import { ArrowRight, Instagram, Linkedin, MessageCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ctaImg from "@/assets/cta-mansion.jpg";
import ScrollReveal from "@/components/landing/ScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const CTASection = () => {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const socialLinks = [
    {
      label: "WhatsApp",
      href: "https://wa.me/5511971689500",
      icon: MessageCircle,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/vkosolution/",
      icon: Instagram,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/vko-solution",
      icon: Linkedin,
    },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setForm({ nome: "", email: "", telefone: "", mensagem: "" });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    if (!section || !background) return;

    if (prefersReducedMotion) {
      background.style.transform = "translate3d(0, 0, 0) scale(1)";
      return;
    }

    let ticking = false;

    const updateParallax = () => {
      if (!sectionRef.current || !backgroundRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewportHeight) {
        ticking = false;
        return;
      }

      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      const translateY = (progress - 0.5) * 118;
      const scale = 1.04 + Math.abs(progress - 0.5) * 0.1;

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
    <section ref={sectionRef} id="contato" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background mansion */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 -top-8 -bottom-8 will-change-transform"
        style={{ transform: "translate3d(0, 0, 0) scale(1)" }}
      >
        <img
          src={ctaImg}
          alt="Mansão de luxo à noite"
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left text */}
          <ScrollReveal className="space-y-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-secondary">Contato</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Vamos cuidar do seu patrimônio juntos
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Preencha o formulário e um especialista da VKO entrará em contato para entender suas necessidades e apresentar a melhor solução de governança para seus ativos.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Send size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Resposta em até 24h</p>
                <p className="text-xs text-muted-foreground">Nossa equipe retorna rapidamente</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                Canais diretos
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Falar com a VKO no ${link.label}`}
                    className="inline-flex items-center gap-2 px-3.5 h-10 rounded-lg glass-chip text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    <link.icon size={16} className="text-primary" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right form */}
          <ScrollReveal variant="zoom-in" delayMs={100}>
            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-8 lg:p-10 rounded-2xl glass-surface-strong glass-tint shadow-lg space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nome completo</label>
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full h-11 px-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Seu nome"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">E-mail</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-11 px-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Telefone</label>
                  <input
                    type="tel"
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                    className="w-full h-11 px-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="(11) 99999-0000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Mensagem</label>
                <textarea
                  rows={4}
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Conte-nos sobre seus ativos e necessidades..."
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Enviar mensagem
                <ArrowRight size={16} />
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
