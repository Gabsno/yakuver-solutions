import logo from '../../assets/yakuver-logo.png';
import { useT } from '../../lib/i18n';

interface Props {
  base?: string;
}

export function Footer({ base = '/' }: Props) {
  const { t } = useT();
  const b = base.endsWith('/') ? base : base + '/';

  const sections: { titleKey: string; links: { labelKey?: string; label?: string; href: string }[] }[] = [
    {
      titleKey: 'footer.col.sitemap',
      links: [
        { labelKey: 'footer.link.home',     href: b },
        { labelKey: 'footer.link.about',    href: b + 'about/' },
        { labelKey: 'footer.link.services', href: b + 'services/' },
        { labelKey: 'footer.link.projects', href: b + 'projects/' },
        { labelKey: 'footer.link.contact',  href: b + 'contact/' },
      ],
    },
    {
      titleKey: 'footer.col.capabilities',
      links: [
        { labelKey: 'footer.cap.arch',       href: b + 'services/#architecture' },
        { labelKey: 'footer.cap.civil',      href: b + 'services/#civil' },
        { labelKey: 'footer.cap.hvac',       href: b + 'services/#hvac' },
        { labelKey: 'footer.cap.electrical', href: b + 'services/#electrical' },
        { labelKey: 'footer.cap.plumbing',   href: b + 'services/#plumbing' },
        { labelKey: 'footer.cap.fire',       href: b + 'services/#fire' },
      ],
    },
    {
      titleKey: 'footer.col.contact',
      links: [
        { label: '+233 24 014 5460',          href: 'tel:+233240145460' },
        { label: '+233 30 230 1233',          href: 'tel:+233302301233' },
        { label: 'info@yakuversolutions.com', href: 'mailto:info@yakuversolutions.com' },
        { labelKey: 'footer.locations',       href: b + 'contact/' },
      ],
    },
  ];

  return (
    <footer className="bg-[#050505] text-on-primary/70 pt-20 pb-7 border-t border-line-dark">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-16 pb-14 border-b border-line-dark">
          <div>
            <a href={b} className="inline-block" aria-label="Yakuver Solutions LTD home">
              <img
                src={logo.src}
                alt="Yakuver Solutions LTD"
                width={logo.width}
                height={logo.height}
                className="h-14 lg:h-16 w-auto brightness-0 invert opacity-90 drop-shadow-[0_4px_14px_rgba(245,241,232,0.18)]"
              />
            </a>
            <p className="text-on-primary/55 text-[14px] leading-[1.7] mt-6 max-w-[36ch]">
              {t('footer.tagline')}
            </p>
          </div>

          {sections.map((s) => (
            <div key={s.titleKey}>
              <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold-2 mb-5 font-medium">
                {t(s.titleKey)}
              </h5>
              <ul className="flex flex-col gap-3">
                {s.links.map((l, i) => (
                  <li key={i}>
                    <a
                      href={l.href}
                      className="text-[14px] text-on-primary/65 hover:text-gold-2 transition-colors"
                    >
                      {l.labelKey ? t(l.labelKey) : l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-wrap justify-between items-center gap-4 font-mono text-[11px] tracking-[0.14em] text-on-primary/45">
          <div>© {new Date().getFullYear()} Yakuver Solutions LTD - {t('footer.rights')}</div>
          <div>{t('footer.tagline.short')}</div>
        </div>
      </div>
    </footer>
  );
}
