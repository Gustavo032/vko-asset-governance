import { useState } from "react";
import { Home } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

function NumInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
        placeholder={placeholder || "0"}
      />
    </div>
  );
}

function Result({ text, positive }: { text: string; positive: boolean }) {
  return (
    <div
      className={`rounded-lg px-4 py-3 text-sm font-medium ${
        positive ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
      }`}
    >
      {text}
    </div>
  );
}

function ComparativoTool() {
  const [valor, setValor] = useState("");
  const [anos, setAnos] = useState("10");

  const anosNum = Number(anos) || 10;
  const valorNum = Number(valor) || 0;

  const projecao =
    valorNum > 0
      ? Array.from({ length: anosNum + 1 }, (_, index) => ({
          ano: index,
          semGov: Math.round(valorNum * Math.pow(1.02, index)),
          comGov: Math.round(valorNum * Math.pow(1.08, index)),
        }))
      : null;

  const ultimoAno = projecao ? projecao[projecao.length - 1] : null;
  const maxValue = ultimoAno ? Math.max(ultimoAno.comGov, ultimoAno.semGov) : 1;

  return (
    <div className="space-y-4">
      <NumInput
        label="Valor atual do patrimônio (R$)"
        value={valor}
        onChange={setValor}
        placeholder="5.000.000"
      />
      <NumInput
        label="Horizonte de projeção (anos)"
        value={anos}
        onChange={setAnos}
        placeholder="10"
      />

      {projecao && ultimoAno && (
        <div className="space-y-4 pt-2">
          <div className="space-y-3">
            {[
              { label: "Com governança VKO", value: ultimoAno.comGov, color: "bg-primary" },
              { label: "Sem governança", value: ultimoAno.semGov, color: "bg-muted-foreground/30" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">{item.label}</span>
                  <span className="text-muted-foreground">R$ {item.value.toLocaleString("pt-BR")}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Result
            positive
            text={`Em ${anosNum} anos, a diferença pode chegar a R$ ${(ultimoAno.comGov - ultimoAno.semGov).toLocaleString("pt-BR")} a mais no seu patrimônio.`}
          />
        </div>
      )}
    </div>
  );
}

const InteractiveTools = () => {
  return (
    <section id="ferramentas" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" variant="fade-in">
          <span className="inline-block px-3 py-1 rounded-full glass-chip text-secondary text-xs font-semibold tracking-wide uppercase mb-4">
            Ferramenta Exclusiva
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4 text-balance">
            Compare seus cenarios patrimoniais
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Simule a diferenca financeira entre uma gestao com governanca e uma operacao reativa.
          </p>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal className="rounded-2xl glass-surface-strong glass-tint p-6 md:p-8 shadow-sm" variant="zoom-in">
            <div className="mb-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Home size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Comparativo de Cenarios</h3>
              <p className="text-sm text-muted-foreground">
                Veja o impacto acumulado da governanca no valor do seu patrimonio ao longo dos anos.
              </p>
            </div>
            <ComparativoTool />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTools;
