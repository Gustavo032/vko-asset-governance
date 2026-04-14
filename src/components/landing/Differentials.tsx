import { Network, ScanSearch, BookCheck, Lightbulb, Workflow, Target } from "lucide-react";

const items = [
  {
    icon: Network,
    title: "Visão estruturada",
    desc: "Conectamos operação, engenharia e controle em uma visão integrada de ativos.",
  },
  {
    icon: ScanSearch,
    title: "Rastreabilidade completa",
    desc: "Organização das informações com histórico, contexto e localização de cada ativo.",
  },
  {
    icon: BookCheck,
    title: "Apoio à padronização",
    desc: "Critérios e processos consistentes para eliminar improvisação e variabilidade.",
  },
  {
    icon: Lightbulb,
    title: "Inteligência para decisão",
    desc: "Dados organizados que se tornam insumo real para análises e priorização.",
  },
  {
    icon: Workflow,
    title: "Operação e engenharia conectadas",
    desc: "Fluxos que integram contexto técnico e operacional em um mesmo ecossistema.",
  },
  {
    icon: Target,
    title: "Governança, não apenas execução",
    desc: "Abordagem orientada por método, não apenas pela demanda do dia a dia.",
  },
];

const Differentials = () => {
  return (
    <section id="diferenciais" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary mb-4">Diferenciais</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            Por que a VKO Solution
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Atuamos como parceira estratégica, com uma abordagem que vai além da ferramenta — entregamos método, estrutura e inteligência operacional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group relative p-7 rounded-2xl bg-card border shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <item.icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
