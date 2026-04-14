const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">VKO</span>
              </div>
              <span className="font-display font-semibold text-foreground">VKO Solution</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Governança de ativos com estrutura, método e inteligência operacional. Conectamos operação, engenharia e controle para organizações que buscam maturidade e previsibilidade.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4">Navegação</p>
            <div className="space-y-3">
              {["Sobre", "Governança", "Diferenciais", "Atuação", "Contato"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4">Contato</p>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">contato@vkosolution.com</p>
              <p className="text-sm text-muted-foreground">+55 (11) 0000-0000</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VKO Solution. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
