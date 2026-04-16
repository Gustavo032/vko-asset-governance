const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">VKO</span>
              </div>
              <span className="font-display font-semibold text-foreground">VKO Solution</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Governança de ativos de alto padrão com estrutura, método e inteligência operacional.
            </p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p><span className="font-medium text-foreground">CNPJ:</span> 00.000.000/0001-00</p>
              <p><span className="font-medium text-foreground">Endereço:</span> Av. Paulista, 1000 — São Paulo, SP</p>
              <p>contato@vkosolution.com</p>
              <p>+55 (11) 0000-0000</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4">Navegação</p>
            <div className="space-y-3">
              {["Sobre", "Governança", "Ferramentas", "Contato"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4">Localização</p>
            <div className="rounded-xl overflow-hidden border aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976070442225!2d-46.65390668502168!3d-23.56110398468041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização VKO Solution"
              />
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
