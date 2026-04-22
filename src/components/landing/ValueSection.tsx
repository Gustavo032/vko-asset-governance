import { XCircle, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";
import semGtaImg from "@/assets/semgta.png";
import comGtaImg from "@/assets/comgta.png";

const problems = [
  "Inventário incompleto ou desatualizado",
  "Documentos e informações espalhados",
  "Manutenções e reformas sem histórico técnico",
  "Prioridades definidas no improviso",
  "Intervenções sem trilha de auditoria",
  "Custos e riscos que aparecem de surpresa",
];

const solutions = [
  "Inventário validado e atualizado por ativo",
  "Documentação técnica centralizada e acessível",
  "Histórico técnico completo de manutenções e reformas",
  "Priorização por critérios técnicos e impacto",
  "Intervenções com evidências e trilha de auditoria",
  "Custos e riscos previstos com antecedência",
];

const ValueSection = () => {
  return (
    <section id="sobre" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16 lg:mb-20" variant="fade-in">
          <p className="text-sm font-semibold tracking-widest uppercase font-iansui text-secondary mb-4">Por que GTA</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            Quando não há GTA, tudo vira urgência
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Cada ponto abaixo foi escrito em contraponto direto: o que hoje gera ruído operacional e o que muda quando a VKO entra em campo.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problems */}
          <ScrollReveal
            className="relative overflow-hidden p-8 lg:p-10 rounded-2xl border border-primary/20"
          >
            <div
              className="absolute inset-0"
              style={{ backgroundImage: `url(${semGtaImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="absolute inset-0 bg-[rgba(155,35,35,0.48)]" />
            <div className="relative z-10">
              <p className="text-sm font-semibold tracking-widest uppercase font-iansui text-primary-foreground/90 mb-8">Sem GTA</p>
              <div className="space-y-5">
              {problems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                    <XCircle size={18} className="text-primary-foreground/80 mt-0.5 shrink-0" />
                    <p className="text-base text-primary-foreground leading-relaxed">{item}</p>
                </div>
              ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Solutions */}
          <ScrollReveal
            className="relative overflow-hidden p-8 lg:p-10 rounded-2xl border border-primary/20"
            delayMs={100}
            variant="zoom-in"
          >
            <div
              className="absolute inset-0"
              style={{ backgroundImage: `url(${comGtaImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <div className="absolute inset-0 bg-[rgba(97,113,60,0.58)]" />
            <div className="relative z-10">
              <p className="text-sm font-semibold tracking-widest uppercase font-iansui text-primary-foreground mb-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">Com GTA (VKO)</p>
              <div className="space-y-5">
              {solutions.map((item) => (
                <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-primary-foreground mt-0.5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" />
                    <p className="text-base text-primary-foreground leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">{item}</p>
                </div>
              ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
