import { ArrowRight, Shield, BarChart3, Layers, GitBranch } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '48px 48px',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wide uppercase">
              <Shield size={14} />
              Governança de Ativos
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground text-balance">
              Estrutura, controle e inteligência para a{" "}
              <span className="text-primary">gestão dos seus ativos</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              A VKO Solution conecta operação, engenharia e controle em uma abordagem de governança que transforma a forma como sua organização acompanha, organiza e decide sobre seus ativos.
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
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border text-foreground font-medium hover:bg-accent transition-colors"
              >
                Conheça nossa abordagem
              </a>
            </div>
          </div>

          {/* Right — conceptual visual blocks */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="col-span-2 p-6 rounded-2xl bg-card border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Layers size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Visão Integrada</p>
                    <p className="text-xs text-muted-foreground">Governança operacional</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {["Critérios", "Processos", "Histórico", "Decisão"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-md bg-accent text-accent-foreground text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-2xl bg-card border shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <BarChart3 size={20} className="text-secondary" />
                </div>
                <p className="text-sm font-semibold text-foreground">Rastreabilidade</p>
                <div className="space-y-2">
                  {[85, 92, 78].map((v, i) => (
                    <div key={i} className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary/60" style={{ width: `${v}%` }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl bg-card border shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GitBranch size={20} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">Ciclo de Vida</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Ativo", "Manutenção", "Revisão", "Operação"].map((s) => (
                    <span key={s} className="px-2 py-1 rounded bg-accent text-accent-foreground text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 4 — wide */}
              <div className="col-span-2 p-5 rounded-2xl bg-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Maturidade Operacional</p>
                    <p className="text-xs opacity-80 mt-1">Governança estruturada com visibilidade e padronização</p>
                  </div>
                  <div className="text-3xl font-bold opacity-90">97%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
