import { Instagram, Linkedin, MessageCircle } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      label: "WhatsApp",
      href: "https://wa.me/5511971689500",
      icon: MessageCircle,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/vkosolution/",
      icon: Instagram,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/vko-solution",
      icon: Linkedin,
    },
  ] as const;

  return (
    <footer className="border-t glass-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">VKO</span>
              </div>
              <span className="font-display font-semibold text-foreground">VKO Solution</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Governança de ativos de alto padrão com estrutura, método e inteligência operacional.
            </p>
            <div className="space-y-1.5 text-xs text-muted-foreground break-words">
              <p><span className="font-medium text-foreground">CNPJ:</span> 59.985.305/0001-42</p>
              <p className="leading-relaxed"><span className="font-medium text-foreground">Endereço:</span> Alameda Tocantins, 75 - Alphaville Industrial, Barueri - SP, 06455-020</p>
              <p>contato@vkosolution.com</p>
              <p>+55 (11) 0000-0000</p>
            </div>
            <div className="mt-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-foreground mb-3">Redes sociais</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Acessar ${link.label} da VKO Solution`}
                    className="inline-flex items-center gap-2 h-9 px-3 rounded-lg glass-chip text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <link.icon size={14} className="text-primary" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
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
                src="https://www.google.com/maps?q=Alameda%20Tocantins%2C%2075%20-%20Alphaville%20Industrial%2C%20Barueri%20-%20SP%2C%2006455-020&output=embed"
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

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-muted-foreground text-balance">
            © {new Date().getFullYear()} VKO Solution. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
