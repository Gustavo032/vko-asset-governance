import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contato" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl bg-primary p-12 lg:p-20 overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }} />

          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground mb-6">
              Leve mais estrutura, clareza e governança para a sua operação
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10">
              Converse com a VKO Solution e conheça nossa abordagem. Entenda como a governança de ativos pode transformar a maturidade operacional da sua organização.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-primary-foreground text-primary font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                Fale com um especialista
                <ArrowRight size={16} />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border border-primary-foreground/30 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                Solicitar apresentação
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
