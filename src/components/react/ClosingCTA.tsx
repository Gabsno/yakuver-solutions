import { useT } from '../../lib/i18n';

interface Props {
  /** Astro base URL, e.g. "/yakuver-solutions/" */
  base?: string;
}

export function ClosingCTA({ base = '/' }: Props) {
  const { t } = useT();
  const b = base.endsWith('/') ? base : base + '/';
  return (
    <section className="bg-primary text-on-primary py-20 lg:py-24 border-t border-line-dark relative overflow-hidden">
      <div className="absolute inset-0 paper-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold-2 mb-4">
            <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-60" />
            {t('cta.eyebrow')}
          </div>
          <h2 className="font-heading font-black text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.025em]">
            {t('cta.title.1')}<br />
            <span className="text-gold">{t('cta.title.2')}</span>
          </h2>
          <p className="text-on-primary/70 text-[16px] leading-[1.65] max-w-[58ch] mt-5">
            {t('cta.body')}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href={b + 'contact/'}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-md+ bg-gold-gradient text-primary font-heading font-bold text-[15px] shadow-gold hover:-translate-y-0.5 transition-transform"
          >
            {t('cta.primary')} →
          </a>
          <a
            href={b + 'projects/'}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-md+ border border-on-primary/25 text-on-primary font-heading font-semibold text-[15px] hover:bg-on-primary hover:text-primary transition-colors"
          >
            {t('cta.secondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
