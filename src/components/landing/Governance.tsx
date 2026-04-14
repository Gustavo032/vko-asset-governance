import { Eye, FolderTree, ClipboardCheck, Clock, Grid3X3, Search, Brain, Compass } from "lucide-react";

const pillars = [
  { icon: Eye, title: "Visibilidade", desc: "Enxergar com clareza o estado, a localização e o contexto de cada ativo." },
  { icon: FolderTree, title: "Organização", desc: "Estruturar informações de forma lógica, padronizada e acessível." },
  { icon: ClipboardCheck, title: "Critérios", desc: "Definir parâmetros claros para classificação, priorização e acompanhamento." },
  { icon: Clock, title: "Histórico", desc: "Manter o registro completo das ações, intervenções e movimentações." },
  { icon: Grid3X3, title: "Padronização", desc: "Garantir que processos e informações sigam um padrão consistente." },
  { icon: Search, title: "Rastreabilidade", desc: "Localizar, acompanhar e auditar qualquer ativo a qualquer momento." },
  { icon: Brain, title: "Inteligência Operacional", desc: "Transformar dados em insumos para análise e decisão estratégica." },
  { icon: Compass, title: "Apoio à Decisão", desc: "Fornecer base sólida para escolhas mais consistentes e fundamentadas." },
];

const Governance = () => {
  return (
    <section id="governanca" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary mb-4">Conceito</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            O que é governança de ativos
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Governança de ativos vai além do controle operacional. É uma abordagem estruturada que une critérios, processos, visibilidade e inteligência para que a organização tenha domínio real sobre seus ativos — e sobre as decisões que envolvem cada um deles.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="group p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <p.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Governance;
