import { useState } from "react";
import { Calculator, ClipboardCheck, BarChart3, Shield, TrendingUp, Wrench } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/* ─── Tool configs ─── */
const tools = [
  {
    id: "roi",
    icon: TrendingUp,
    title: "Calculadora de ROI",
    desc: "Estime o retorno sobre o investimento em governança de ativos.",
  },
  {
    id: "maturidade",
    icon: BarChart3,
    title: "Diagnóstico de Maturidade",
    desc: "Avalie o nível de maturidade operacional da sua organização.",
  },
  {
    id: "manutencao",
    icon: Wrench,
    title: "Estimativa de Custos",
    desc: "Projete custos de manutenção preventiva vs. corretiva.",
  },
  {
    id: "checklist",
    icon: ClipboardCheck,
    title: "Checklist de Governança",
    desc: "Verifique o grau de conformidade da gestão dos seus ativos.",
  },
  {
    id: "risco",
    icon: Shield,
    title: "Avaliação de Risco",
    desc: "Classifique o nível de risco dos seus ativos críticos.",
  },
  {
    id: "vidautil",
    icon: Calculator,
    title: "Ciclo de Vida de Ativos",
    desc: "Calcule a vida útil remanescente e o ponto ideal de substituição.",
  },
] as const;

/* ─── Per-tool forms ─── */

function ROITool() {
  const [investimento, setInvestimento] = useState("");
  const [reducao, setReducao] = useState("");
  const [custoAnual, setCustoAnual] = useState("");
  const roi =
    investimento && reducao && custoAnual
      ? (((Number(custoAnual) * (Number(reducao) / 100) - Number(investimento)) / Number(investimento)) * 100).toFixed(1)
      : null;

  return (
    <div className="space-y-4">
      <Input label="Investimento em governança (R$)" value={investimento} onChange={setInvestimento} />
      <Input label="Custo operacional anual atual (R$)" value={custoAnual} onChange={setCustoAnual} />
      <Input label="Redução estimada de custos (%)" value={reducao} onChange={setReducao} />
      {roi !== null && (
        <Result
          positive={Number(roi) > 0}
          text={`ROI estimado: ${roi}% — ${Number(roi) > 0 ? "Investimento com retorno positivo" : "Revise os parâmetros"}`}
        />
      )}
    </div>
  );
}

function MaturidadeTool() {
  const perguntas = [
    "Existe um inventário atualizado de todos os ativos?",
    "Os ativos possuem histórico de manutenção registrado?",
    "Há critérios definidos de criticidade para os ativos?",
    "Existe padronização nos processos de manutenção?",
    "Os dados de ativos são utilizados para tomada de decisão?",
  ];
  const [respostas, setRespostas] = useState<number[]>(Array(perguntas.length).fill(-1));
  const respondidas = respostas.filter((r) => r >= 0).length;
  const total = respondidas > 0 ? respostas.filter((r) => r >= 0).reduce((a, b) => a + b, 0) : 0;
  const max = respondidas * 4;
  const pct = max > 0 ? ((total / max) * 100).toFixed(0) : null;
  const nivel = pct ? (Number(pct) >= 80 ? "Avançado" : Number(pct) >= 50 ? "Intermediário" : "Inicial") : null;

  return (
    <div className="space-y-4">
      {perguntas.map((p, i) => (
        <div key={i} className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">{p}</p>
          <div className="flex gap-2">
            {["Nunca", "Raramente", "Às vezes", "Frequente", "Sempre"].map((opt, v) => (
              <button
                key={v}
                onClick={() => {
                  const next = [...respostas];
                  next[i] = v;
                  setRespostas(next);
                }}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  respostas[i] === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      {pct && respondidas === perguntas.length && (
        <Result positive={Number(pct) >= 50} text={`Nível de maturidade: ${nivel} (${pct}%)`} />
      )}
    </div>
  );
}

function ManutencaoTool() {
  const [qtdAtivos, setQtdAtivos] = useState("");
  const [custoCorretivo, setCustoCorretivo] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const custoPreventivo =
    qtdAtivos && custoCorretivo && frequencia
      ? (Number(qtdAtivos) * Number(custoCorretivo) * 0.35 * Number(frequencia)).toFixed(2)
      : null;
  const economia =
    qtdAtivos && custoCorretivo && frequencia
      ? (Number(qtdAtivos) * Number(custoCorretivo) * Number(frequencia) * 0.65).toFixed(2)
      : null;

  return (
    <div className="space-y-4">
      <Input label="Quantidade de ativos" value={qtdAtivos} onChange={setQtdAtivos} />
      <Input label="Custo médio de reparo corretivo (R$)" value={custoCorretivo} onChange={setCustoCorretivo} />
      <Input label="Frequência anual de falhas por ativo" value={frequencia} onChange={setFrequencia} />
      {custoPreventivo && (
        <div className="space-y-2">
          <Result positive text={`Custo estimado com preventiva: R$ ${Number(custoPreventivo).toLocaleString("pt-BR")}`} />
          <Result positive text={`Economia potencial anual: R$ ${Number(economia).toLocaleString("pt-BR")}`} />
        </div>
      )}
    </div>
  );
}

function ChecklistTool() {
  const items = [
    "Inventário completo e atualizado",
    "Classificação de criticidade dos ativos",
    "Plano de manutenção preventiva implementado",
    "Registro histórico de intervenções",
    "Indicadores de desempenho definidos (KPIs)",
    "Responsáveis atribuídos por ativo ou grupo",
    "Processos padronizados e documentados",
    "Uso de sistema para rastreabilidade",
  ];
  const [checked, setChecked] = useState<boolean[]>(Array(items.length).fill(false));
  const total = checked.filter(Boolean).length;
  const pct = ((total / items.length) * 100).toFixed(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <label key={i} className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={checked[i]}
            onChange={() => {
              const next = [...checked];
              next[i] = !next[i];
              setChecked(next);
            }}
            className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary"
          />
          <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item}</span>
        </label>
      ))}
      <div className="pt-2">
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{pct}% de conformidade ({total}/{items.length} itens)</p>
      </div>
    </div>
  );
}

function RiscoTool() {
  const [probabilidade, setProbabilidade] = useState("");
  const [impacto, setImpacto] = useState("");
  const [deteccao, setDeteccao] = useState("");
  const rpn = probabilidade && impacto && deteccao ? Number(probabilidade) * Number(impacto) * Number(deteccao) : null;
  const nivel = rpn ? (rpn >= 200 ? "Crítico" : rpn >= 100 ? "Alto" : rpn >= 40 ? "Moderado" : "Baixo") : null;

  return (
    <div className="space-y-4">
      <Input label="Probabilidade de falha (1-10)" value={probabilidade} onChange={setProbabilidade} />
      <Input label="Impacto da falha (1-10)" value={impacto} onChange={setImpacto} />
      <Input label="Dificuldade de detecção (1-10)" value={deteccao} onChange={setDeteccao} />
      {rpn !== null && (
        <Result
          positive={rpn < 100}
          text={`RPN: ${rpn} — Nível de risco: ${nivel}`}
        />
      )}
    </div>
  );
}

function VidaUtilTool() {
  const [vidaTotal, setVidaTotal] = useState("");
  const [idadeAtual, setIdadeAtual] = useState("");
  const [condicao, setCondicao] = useState("");
  const remanescente =
    vidaTotal && idadeAtual && condicao
      ? Math.max(0, (Number(vidaTotal) - Number(idadeAtual)) * (Number(condicao) / 100)).toFixed(1)
      : null;
  const substituicao =
    vidaTotal && idadeAtual && condicao
      ? (Number(idadeAtual) + Number(remanescente!)).toFixed(1)
      : null;

  return (
    <div className="space-y-4">
      <Input label="Vida útil projetada (anos)" value={vidaTotal} onChange={setVidaTotal} />
      <Input label="Idade atual do ativo (anos)" value={idadeAtual} onChange={setIdadeAtual} />
      <Input label="Índice de condição atual (0-100%)" value={condicao} onChange={setCondicao} />
      {remanescente && (
        <div className="space-y-2">
          <Result positive={Number(remanescente) > 2} text={`Vida útil remanescente estimada: ${remanescente} anos`} />
          <Result positive text={`Ponto ideal de substituição: ano ${substituicao}`} />
        </div>
      )}
    </div>
  );
}

/* ─── Shared UI helpers ─── */
function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
        placeholder="0"
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

const toolComponents: Record<string, React.FC> = {
  roi: ROITool,
  maturidade: MaturidadeTool,
  manutencao: ManutencaoTool,
  checklist: ChecklistTool,
  risco: RiscoTool,
  vidautil: VidaUtilTool,
};

/* ─── Main section ─── */
const InteractiveTools = () => {
  return (
    <section id="ferramentas" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wide uppercase mb-4">
            Ferramentas Interativas
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Experimente na prática
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Utilize nossas ferramentas gratuitas para avaliar e projetar a governança dos seus ativos.
          </p>
        </div>

        <Tabs defaultValue="roi" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-10">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-all text-sm font-medium shadow-none"
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{t.title}</span>
                  <span className="sm:hidden">{t.title.split(" ").pop()}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tools.map((t) => {
            const ToolComp = toolComponents[t.id];
            return (
              <TabsContent key={t.id} value={t.id}>
                <div className="max-w-2xl mx-auto">
                  <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-1">{t.title}</h3>
                      <p className="text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                    <ToolComp />
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default InteractiveTools;
