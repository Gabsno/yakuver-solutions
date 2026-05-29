import { useT } from '../../lib/i18n';

interface Crumb { labelKey: string; href: string }

interface Props {
  eyebrowKey: string;
  titleKey: string;
  accentKey?: string;
  ledeKey?: string;
  crumbs?: Crumb[];
}

export function PageHero({ eyebrowKey, titleKey, accentKey, ledeKey, crumbs }: Props) {
  const { t } = useT();
  return (
    <section className="relative bg-primary text-on-primary overflow-hidden pt-[180px] pb-20 lg:pt-[210px] lg:pb-24 border-b border-line-dark">
      <div className="absolute inset-0 paper-grid-dark opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_75%)]" />
      <div
        className="absolute -right-[10%] -top-[10%] w-[55%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.18), transparent 60%)' }}
      />

      <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 font-mono text-[11px] tracking-[0.14em] uppercase text-on-primary/55 flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                {i > 0 && <span className="opacity-50">/</span>}
                <a href={c.href} className="hover:text-gold-2 transition-colors">{t(c.labelKey)}</a>
              </span>
            ))}
          </nav>
        )}

        <div className="font-mono text-[11.5px] tracking-[0.18em] uppercase text-gold-2 mb-5 inline-flex items-center gap-3">
          <span className="inline-block w-7 h-px bg-current opacity-60" />
          {t(eyebrowKey)}
        </div>

        <h1 className="font-heading font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2.4rem,5.5vw,4.6rem)] max-w-[18ch]">
          {t(titleKey)}
          {accentKey && <span className="block text-gold">{t(accentKey)}</span>}
        </h1>

        {ledeKey && (
          <p className="mt-7 text-on-primary/70 text-[clamp(1.05rem,1.2vw,1.2rem)] leading-[1.65] max-w-[64ch]">
            {t(ledeKey)}
          </p>
        )}
      </div>
    </section>
  );
}
