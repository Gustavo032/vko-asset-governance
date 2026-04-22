import { useState } from "react";
import { Eye, FolderTree, ClipboardCheck, Clock, Grid3X3, Search, Brain, Compass } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const pillars = [
  { icon: Eye, title: "Visibilidade", desc: "Saber o que existe, onde está e em que condição está — por ativo." },
  { icon: FolderTree, title: "Cadastro e contexto", desc: "Dados técnicos, documentos e fotos organizados e fáceis de encontrar." },
  { icon: ClipboardCheck, title: "Critérios", desc: "Regras claras de criticidade, prioridade e aprovação de intervenções." },
  { icon: Clock, title: "Histórico", desc: "Registro completo de manutenção, reformas, trocas e decisões." },
  { icon: Grid3X3, title: "Padronização", desc: "Padrão de cadastro, processos e nomenclaturas para evitar ruído." },
  { icon: Search, title: "Rastreabilidade", desc: "Auditoria simples: quem fez, quando, por quê e com qual evidência." },
  { icon: Brain, title: "Inteligência operacional", desc: "Indicadores para antecipar riscos e orientar CAPEX/OPEX." },
  { icon: Compass, title: "Decisão", desc: "Menos urgência, mais planejamento — com base em dados." },
];

const Governance = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="governanca" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16 lg:mb-20" variant="fade-in">
          <p className="text-sm font-semibold tracking-widest uppercase font-iansui text-secondary mb-4">Conceito</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            GTA: Governança Técnica de Ativos
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            GTA é a disciplina de organizar dados, processos e responsabilidades para dominar o ciclo de vida dos ativos — com rastreabilidade, padrões e critérios de decisão.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <ScrollReveal
              key={p.title}
              className="h-full"
              delayMs={i * 70}
              variant="zoom-in"
            >
              <button
                type="button"
                onClick={() => setActiveCard(activeCard === i ? null : i)}
                className={`group/card relative w-full h-full min-h-[210px] overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-card via-card to-accent/20 p-6 text-left shadow-[0_10px_30px_hsl(var(--foreground)/0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_hsl(var(--foreground)/0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 before:absolute before:top-0 before:right-0 before:h-[22%] before:w-[22%] before:rounded-[0_1rem_0_100%] before:bg-primary/20 before:transition-all before:duration-500 after:absolute after:bottom-0 after:left-0 after:h-[22%] after:w-[22%] after:rounded-[0_100%_0_1rem] after:bg-secondary/25 after:transition-all after:duration-500 hover:before:h-full hover:before:w-full hover:before:rounded-2xl hover:after:h-full hover:after:w-full hover:after:rounded-2xl ${
                  activeCard === i ? "before:h-full before:w-full before:rounded-2xl after:h-full after:w-full after:rounded-2xl" : ""
                }`}
                aria-pressed={activeCard === i}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-visible/card:opacity-100 bg-gradient-to-br from-primary/80 via-primary/70 to-secondary/75" />

                <div
                  className={`relative z-10 transition-all duration-300 ${
                    activeCard === i ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
                  } group-hover/card:opacity-0 group-hover/card:-translate-y-2`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-4 transition-colors duration-300">
                    <p.icon size={21} className="text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                </div>

                <div
                  className={`absolute inset-0 z-20 flex items-center justify-center p-6 transition-all duration-300 ${
                    activeCard === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  } group-hover/card:opacity-100 group-hover/card:translate-y-0`}
                >
                  <p className="text-sm md:text-[15px] leading-relaxed text-primary-foreground font-medium">
                    {p.desc}
                  </p>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Governance;
