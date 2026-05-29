import { useT } from '../../lib/i18n';

interface Props { base?: string }

export function Error404({ base = '/' }: Props) {
  const { t } = useT();
  const b = base.endsWith('/') ? base : base + '/';
  return (
    <section className="bg-primary text-on-primary min-h-[80vh] grid place-items-center pt-[180px] pb-20 relative overflow-hidden">
      <div className="absolute inset-0 paper-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative max-w-[640px] mx-auto px-6 lg:px-10 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-red-500/30 bg-red-500/10 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase text-red-300 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          {t('err.status')}
        </span>
        <h1 className="font-heading font-black text-[clamp(5rem,18vw,11rem)] leading-[0.85] tracking-[-0.05em] text-gold mb-3">{t('err.heading')}</h1>
        <h2 className="font-heading text-[clamp(1.6rem,3.5vw,2.6rem)] mb-5">{t('err.title')}</h2>
        <p className="text-on-primary/65 text-[1.05rem] leading-[1.65] mb-9 max-w-[52ch] mx-auto">
          {t('err.body')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={b} className="inline-flex items-center gap-2 px-7 py-4 rounded-md+ bg-gold-gradient text-primary font-heading font-bold text-[14.5px] shadow-gold hover:-translate-y-0.5 transition-transform">
            {t('err.home')} →
          </a>
          <a href="mailto:info@yakuversolutions.com?subject=Project%20enquiry" className="inline-flex items-center gap-2 px-7 py-4 rounded-md+ border border-on-primary/25 text-on-primary font-heading font-semibold text-[14.5px] hover:bg-on-primary hover:text-primary transition-colors">
            {t('err.email')}
          </a>
        </div>
      </div>
    </section>
  );
}
