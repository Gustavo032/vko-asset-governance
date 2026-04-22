const benefits = [
  {
    number: "01",
    title: "Controle e visibilidade",
    desc: "Saiba exatamente onde estão, como estão e o que exigem seus ativos — em tempo real.",
  },
  {
    number: "02",
    title: "Rastreabilidade completa",
    desc: "Cada intervenção, movimentação e decisão registrada com contexto e histórico.",
  },
  {
    number: "03",
    title: "Menos improviso operacional",
    desc: "Processos padronizados que substituem a informalidade pela consistência.",
  },
  {
    number: "04",
    title: "Organização estruturada",
    desc: "Informações classificadas, acessíveis e conectadas ao contexto do ativo.",
  },
  {
    number: "05",
    title: "Decisões mais consistentes",
    desc: "Base fundamentada para priorizar, planejar e agir com segurança.",
  },
  {
    number: "06",
    title: "Previsibilidade e maturidade",
    desc: "Uma operação que antecipa necessidades e evolui com governança contínua.",
  },
];

const Benefits = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase font-iansui text-secondary mb-4">Benefícios</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            O que sua operação ganha
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Os resultados de uma governança estruturada se refletem em todos os níveis: do operacional ao estratégico.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div key={b.number} className="p-7 rounded-2xl bg-card border shadow-sm">
              <span className="text-3xl font-bold text-primary/20 font-display">{b.number}</span>
              <h3 className="text-base font-semibold text-foreground mt-3 mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
