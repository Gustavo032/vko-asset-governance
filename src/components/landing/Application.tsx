import { Building2, Home, Wrench, Factory, HardHat, MapPin } from "lucide-react";

const areas = [
  { icon: Building2, title: "Condomínios", desc: "Governança de ativos prediais com rastreabilidade e organização." },
  { icon: Home, title: "Habitação", desc: "Controle estruturado de equipamentos e infraestrutura residencial." },
  { icon: Factory, title: "Operação Predial", desc: "Visibilidade e padronização para operações de facilities." },
  { icon: Wrench, title: "Manutenção", desc: "Histórico, critérios e acompanhamento do ciclo de vida dos ativos." },
  { icon: HardHat, title: "Infraestrutura", desc: "Governança aplicada a ativos de infraestrutura e engenharia." },
  { icon: MapPin, title: "Ativos Distribuídos", desc: "Rastreabilidade e controle de ativos em múltiplas localizações." },
];

const Application = () => {
  return (
    <section id="atuacao" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <p className="text-xs font-semibold tracking-widest uppercase font-iansui text-secondary mb-4">Atuação</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            Contextos de aplicação
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A governança de ativos se aplica a qualquer operação que envolva equipamentos, infraestrutura ou patrimônio que demande acompanhamento, controle e decisão fundamentada.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area) => (
            <div
              key={area.title}
              className="flex items-start gap-4 p-6 rounded-2xl bg-background border hover:border-primary/20 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <area.icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{area.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Application;
