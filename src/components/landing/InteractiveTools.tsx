import { useState } from "react";
import { Home, ShieldCheck, Wrench, TrendingUp, ClipboardCheck, Thermometer } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/* ─── Tool configs ─── */
const tools = [
  {
    id: "valorizacao",
    icon: TrendingUp,
    title: "Valorização Patrimonial",
    desc: "Projete a valorização do seu imóvel com base no nível de manutenção e governança.",
  },
  {
    id: "manutencao",
    icon: Wrench,
    title: "Custo de Manutenção",
    desc: "Estime o investimento anual ideal em manutenção para o seu imóvel de alto padrão.",
  },
  {
    id: "protecao",
    icon: ShieldCheck,
    title: "Proteção Patrimonial",
    desc: "Descubra o nível de proteção e governança do seu patrimônio imobiliário.",
  },
  {
    id: "checklist",
    icon: ClipboardCheck,
    title: "Checklist Sazonal",
    desc: "Verifique se a conservação do seu imóvel está em dia com nosso checklist completo.",
  },
  {
    id: "eficiencia",
    icon: Thermometer,
    title: "Eficiência do Imóvel",
    desc: "Avalie a eficiência energética e operacional da sua propriedade.",
  },
  {
    id: "comparativo",
    icon: Home,
    title: "Comparativo de Cenários",
    desc: "Compare o valor do seu patrimônio com e sem governança ao longo dos anos.",
  },
] as const;

/* ─── Per-tool forms ─── */

function ValorizacaoTool() {
  const [valor, setValor] = useState("");
  const [idade, setIdade] = useState("");
  const [manutencao, setManutencao] = useState<string>("");

  const niveis: Record<string, { label: string; taxa: number }> = {
    baixo: { label: "Básica", taxa: 0.02 },
    medio: { label: "Regular", taxa: 0.05 },
    alto: { label: "Governança completa", taxa: 0.09 },
  };

  const resultado =
    valor && idade && manutencao
      ? {
          sem: Number(valor) * Math.pow(1.02, 5),
          com: Number(valor) * Math.pow(1 + niveis[manutencao].taxa, 5),
        }
      : null;

  return (
    <div className="space-y-4">
      <NumInput label="Valor atual do imóvel (R$)" value={valor} onChange={setValor} placeholder="2.500.000" />
      <NumInput label="Idade do imóvel (anos)" value={idade} onChange={setIdade} placeholder="5" />
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Nível de manutenção atual</label>
        <div className="flex gap-2">
          {Object.entries(niveis).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setManutencao(key)}
              className={`flex-1 px-3 py-2.5 text-xs rounded-lg border transition-colors font-medium ${
                manutencao === key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {resultado && (
        <div className="space-y-2 pt-2">
          <Result
            positive={false}
            text={`Sem governança (5 anos): R$ ${resultado.sem.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`}
          />
          <Result
            positive
            text={`Com governança (5 anos): R$ ${resultado.com.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`}
          />
          <Result
            positive
            text={`Diferença de valorização: R$ ${(resultado.com - resultado.sem).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`}
          />
        </div>
      )}
    </div>
  );
}

function ManutencaoTool() {
  const [valor, setValor] = useState("");
  const [area, setArea] = useState("");
  const [itens, setItens] = useState<string[]>([]);

  const extras: Record<string, { label: string; custoM2: number }> = {
    piscina: { label: "Piscina", custoM2: 8 },
    jardim: { label: "Jardim / Paisagismo", custoM2: 5 },
    automacao: { label: "Automação residencial", custoM2: 6 },
    climatizacao: { label: "Climatização central", custoM2: 7 },
    seguranca: { label: "Sistema de segurança", custoM2: 4 },
  };

  const toggle = (id: string) =>
    setItens((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const custoBase = area ? Number(area) * 12 : 0;
  const custoExtras = area ? itens.reduce((acc, id) => acc + Number(area) * extras[id].custoM2, 0) : 0;
  const total = custoBase + custoExtras;

  return (
    <div className="space-y-4">
      <NumInput label="Valor do imóvel (R$)" value={valor} onChange={setValor} placeholder="3.000.000" />
      <NumInput label="Área total construída (m²)" value={area} onChange={setArea} placeholder="450" />
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Itens especiais do imóvel</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(extras).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`px-3 py-2 text-xs rounded-lg border transition-colors font-medium ${
                itens.includes(key)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {area && (
        <div className="space-y-2 pt-2">
          <Result positive text={`Manutenção base anual estimada: R$ ${custoBase.toLocaleString("pt-BR")}`} />
          {custoExtras > 0 && (
            <Result positive text={`Custo adicional (itens especiais): R$ ${custoExtras.toLocaleString("pt-BR")}`} />
          )}
          <Result positive text={`Investimento anual recomendado: R$ ${total.toLocaleString("pt-BR")}`} />
          {valor && (
            <p className="text-xs text-muted-foreground">
              Equivale a {((total / Number(valor)) * 100).toFixed(2)}% do valor do imóvel — referência ideal: 1-2% ao ano.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ProtecaoTool() {
  const perguntas = [
    "Seu imóvel possui seguro patrimonial atualizado?",
    "Existe um inventário documentado de todos os bens e acabamentos?",
    "Há contratos vigentes de manutenção preventiva?",
    "Os sistemas elétricos e hidráulicos passaram por inspeção nos últimos 12 meses?",
    "Há um responsável designado pela gestão do imóvel?",
    "Os documentos do imóvel (escritura, IPTU, habite-se) estão organizados e acessíveis?",
  ];
  const [respostas, setRespostas] = useState<(boolean | null)[]>(Array(perguntas.length).fill(null));
  const respondidas = respostas.filter((r) => r !== null).length;
  const positivas = respostas.filter((r) => r === true).length;
  const completo = respondidas === perguntas.length;
  const pct = completo ? Math.round((positivas / perguntas.length) * 100) : null;
  const nivel = pct !== null ? (pct >= 80 ? "Excelente" : pct >= 50 ? "Moderado" : "Vulnerável") : null;

  return (
    <div className="space-y-4">
      {perguntas.map((p, i) => (
        <div key={i} className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">{p}</p>
          <div className="flex gap-2">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => {
                  const next = [...respostas];
                  next[i] = val;
                  setRespostas(next);
                }}
                className={`px-4 py-2 text-xs rounded-lg border transition-colors font-medium ${
                  respostas[i] === val
                    ? val
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-secondary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {val ? "Sim" : "Não"}
              </button>
            ))}
          </div>
        </div>
      ))}
      {completo && pct !== null && (
        <Result
          positive={pct >= 50}
          text={`Nível de proteção: ${nivel} (${pct}%) — ${
            pct >= 80
              ? "Seu patrimônio está bem protegido."
              : pct >= 50
                ? "Há pontos de atenção que merecem cuidado."
                : "Seu patrimônio está exposto a riscos significativos."
          }`}
        />
      )}
    </div>
  );
}

function ChecklistTool() {
  const categorias = [
    {
      titulo: "Estrutura e Cobertura",
      itens: ["Inspeção de telhado e calhas", "Verificação de trincas e fissuras", "Impermeabilização de lajes"],
    },
    {
      titulo: "Sistemas",
      itens: ["Revisão elétrica geral", "Inspeção hidráulica", "Manutenção de ar-condicionado"],
    },
    {
      titulo: "Áreas Externas",
      itens: ["Tratamento de piscina", "Poda e paisagismo", "Limpeza de fachada"],
    },
    {
      titulo: "Segurança",
      itens: ["Teste de alarmes e câmeras", "Revisão de fechaduras e portões", "Verificação de para-raios"],
    },
  ];

  const allItems = categorias.flatMap((c) => c.itens);
  const [checked, setChecked] = useState<boolean[]>(Array(allItems.length).fill(false));
  const total = checked.filter(Boolean).length;
  const pct = Math.round((total / allItems.length) * 100);

  let idx = 0;
  return (
    <div className="space-y-5">
      {categorias.map((cat) => (
        <div key={cat.titulo}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{cat.titulo}</p>
          <div className="space-y-2">
            {cat.itens.map((item) => {
              const currentIdx = idx++;
              return (
                <label key={currentIdx} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked[currentIdx]}
                    onChange={() => {
                      const next = [...checked];
                      next[currentIdx] = !next[currentIdx];
                      setChecked(next);
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary"
                  />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">{item}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
      <div className="pt-2">
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          {pct}% concluído ({total}/{allItems.length} itens)
        </p>
      </div>
    </div>
  );
}

function EficienciaTool() {
  const [area, setArea] = useState("");
  const [energiaMensal, setEnergiaMensal] = useState("");
  const [aguaMensal, setAguaMensal] = useState("");

  const consumoEnergia = area && energiaMensal ? (Number(energiaMensal) / Number(area)).toFixed(1) : null;
  const consumoAgua = area && aguaMensal ? (Number(aguaMensal) / Number(area)).toFixed(2) : null;

  const nivelEnergia = consumoEnergia
    ? Number(consumoEnergia) <= 8
      ? "Eficiente"
      : Number(consumoEnergia) <= 15
        ? "Dentro da média"
        : "Acima da média — oportunidade de otimização"
    : null;

  const nivelAgua = consumoAgua
    ? Number(consumoAgua) <= 0.15
      ? "Eficiente"
      : Number(consumoAgua) <= 0.3
        ? "Dentro da média"
        : "Acima da média — verifique possíveis vazamentos"
    : null;

  return (
    <div className="space-y-4">
      <NumInput label="Área construída (m²)" value={area} onChange={setArea} placeholder="400" />
      <NumInput label="Consumo mensal de energia (kWh)" value={energiaMensal} onChange={setEnergiaMensal} placeholder="850" />
      <NumInput label="Consumo mensal de água (m³)" value={aguaMensal} onChange={setAguaMensal} placeholder="45" />
      {consumoEnergia && (
        <div className="space-y-2 pt-2">
          <Result
            positive={Number(consumoEnergia) <= 15}
            text={`Energia: ${consumoEnergia} kWh/m² — ${nivelEnergia}`}
          />
          {consumoAgua && (
            <Result
              positive={Number(consumoAgua) <= 0.3}
              text={`Água: ${consumoAgua} m³/m² — ${nivelAgua}`}
            />
          )}
        </div>
      )}
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
      ? Array.from({ length: anosNum + 1 }, (_, i) => ({
          ano: i,
          semGov: Math.round(valorNum * Math.pow(1.02, i)),
          comGov: Math.round(valorNum * Math.pow(1.08, i)),
        }))
      : null;

  const ultimo = projecao ? projecao[projecao.length - 1] : null;
  const maxVal = ultimo ? Math.max(ultimo.comGov, ultimo.semGov) : 1;

  return (
    <div className="space-y-4">
      <NumInput label="Valor atual do patrimônio (R$)" value={valor} onChange={setValor} placeholder="5.000.000" />
      <NumInput label="Horizonte de projeção (anos)" value={anos} onChange={setAnos} placeholder="10" />
      {projecao && ultimo && (
        <div className="space-y-4 pt-2">
          <div className="space-y-3">
            {[
              { label: "Com governança VKO", value: ultimo.comGov, color: "bg-primary" },
              { label: "Sem governança", value: ultimo.semGov, color: "bg-muted-foreground/30" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-foreground">{item.label}</span>
                  <span className="text-muted-foreground">
                    R$ {item.value.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700`}
                    style={{ width: `${(item.value / maxVal) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <Result
            positive
            text={`Em ${anosNum} anos, a diferença pode chegar a R$ ${(ultimo.comGov - ultimo.semGov).toLocaleString("pt-BR")} a mais no seu patrimônio.`}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Shared UI helpers ─── */
function NumInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

const toolComponents: Record<string, React.FC> = {
  valorizacao: ValorizacaoTool,
  manutencao: ManutencaoTool,
  protecao: ProtecaoTool,
  checklist: ChecklistTool,
  eficiencia: EficienciaTool,
  comparativo: ComparativoTool,
};

/* ─── Main section ─── */
const InteractiveTools = () => {
  return (
    <section id="ferramentas" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wide uppercase mb-4">
            Ferramentas Exclusivas
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Avalie seu patrimônio agora
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ferramentas gratuitas para proprietários que valorizam e protegem seus imóveis de alto padrão.
          </p>
        </div>

        <Tabs defaultValue="valorizacao" className="w-full">
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
