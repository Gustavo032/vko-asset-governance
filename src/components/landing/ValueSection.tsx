import { XCircle, CheckCircle } from "lucide-react";

const problems = [
  "Ativos sem histórico consolidado",
  "Decisões tomadas sem base clara",
  "Baixa rastreabilidade de intervenções",
  "Operação predominantemente reativa",
  "Falta de padronização entre equipes",
  "Dificuldade de acompanhar criticidade e ciclo de vida",
];

const solutions = [
  "Mais clareza sobre o estado de cada ativo",
  "Mais consistência nos critérios de decisão",
  "Melhor previsibilidade operacional",
  "Inteligência aplicada ao acompanhamento",
  "Capacidade de priorização fundamentada",
  "Base sólida para governança contínua",
];

const ValueSection = () => {
  return (
    <section id="sobre" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary mb-4">Por que importa</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            O impacto da ausência de governança
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Sem uma abordagem estruturada, a operação se torna reativa, fragmentada e dependente de esforços individuais. Com governança, cada decisão ganha contexto, cada ativo ganha visibilidade.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problems */}
          <div className="p-8 lg:p-10 rounded-2xl border bg-background">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">Sem governança</p>
            <div className="space-y-5">
              {problems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <XCircle size={18} className="text-secondary/70 mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="p-8 lg:p-10 rounded-2xl border bg-background border-primary/20">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-8">Com governança VKO</p>
            <div className="space-y-5">
              {solutions.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
