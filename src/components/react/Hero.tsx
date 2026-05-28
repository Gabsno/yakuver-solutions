import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import villa from '../../assets/projects/villa-ref.jpg';
import { staggerContainer, wordReveal, fadeUp, springTap } from '../../lib/motion-presets';
import { useT } from '../../lib/i18n';

const TAG_KEYS = [
  'hero.tag.arch',
  'hero.tag.civil',
  'hero.tag.hvac',
  'hero.tag.electrical',
  'hero.tag.plumbing',
  'hero.tag.fire',
];

interface HeroProps {
  /** Astro base URL - e.g. "/yakuver-solutions/" - so cross-page links resolve */
  base?: string;
}

export function Hero({ base = '/' }: HeroProps) {
  const { t } = useT();
  const b = base.endsWith('/') ? base : base + '/';
  return (
    <section className="relative bg-primary text-on-primary overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 paper-grid-dark opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_75%)]" />
      {/* Gold spotlight */}
      <div
        className="absolute -right-[10%] -top-[10%] w-[60%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.18), transparent 60%)' }}
      />

      <div className="relative max-w-[1480px] mx-auto px-6 lg:px-10 pt-[200px] pb-24 min-h-[100vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.15fr] gap-12 lg:gap-16 items-center">
          {/* LEFT - copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-line-dark font-mono text-[11.5px] tracking-[0.12em] uppercase text-on-primary/70 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-2 shadow-[0_0_8px_#d4af37]" />
              {t('hero.eyebrow')}
            </motion.span>

            <h1 className="font-heading font-black leading-[1.04] tracking-[-0.03em] mb-8 text-[clamp(2.6rem,6vw,5.2rem)]">
              <span className="block overflow-hidden">
                <motion.span variants={wordReveal} className="inline-block">{t('hero.title.1')}</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span variants={wordReveal} className="inline-block text-gold-3">
                  {t('hero.title.2')}
                </motion.span>
                <motion.span variants={wordReveal} className="inline-block ml-3">{t('hero.title.3')}</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span variants={wordReveal} className="inline-block text-stroke">{t('hero.title.4')}</motion.span>
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="text-[clamp(1.05rem,1.25vw,1.2rem)] leading-[1.65] text-on-primary/75 max-w-[58ch] mb-9"
            >
              {t('hero.lede')}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
              {TAG_KEYS.map((k) => (
                <motion.span
                  key={k}
                  whileHover={{ y: -1, borderColor: '#c8932e' }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-on-primary/20 font-mono text-[11px] tracking-[0.12em] uppercase text-on-primary/85 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-2" />
                  {t(k)}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.a
                href={b + 'contact/'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={springTap}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-md+ bg-gold-gradient text-primary font-heading font-bold text-[15px] shadow-gold"
              >
                {t('hero.cta.primary')} <ArrowRight className="w-[18px] h-[18px]" />
              </motion.a>
              <motion.a
                href={b + 'projects/'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={springTap}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-md+ border border-on-primary/25 text-on-primary font-heading font-semibold text-[15px] hover:bg-on-primary hover:text-primary transition-colors"
              >
                {t('hero.cta.secondary')} <ChevronRight className="w-[18px] h-[18px]" />
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap gap-x-9 gap-y-3 text-[13.5px] text-on-primary/70 font-mono"
            >
              <div><strong className="text-on-primary font-semibold">10+</strong> {t('hero.meta.live')}</div>
              <div><strong className="text-on-primary font-semibold">GH₵ 60M+</strong> {t('hero.meta.portfolio')}</div>
              <div><strong className="text-on-primary font-semibold">Ghana · Togo</strong> {t('hero.meta.footprint')}</div>
            </motion.div>
          </motion.div>

          {/* RIGHT - static villa image, bleed-integrated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 110, damping: 24, delay: 0.25 }}
            className="relative aspect-[4/5] lg:aspect-[5/6] xl:aspect-[1/1]"
          >
            {/* Ambient gold halo */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-[-6%] pointer-events-none rounded-[40%]"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(200,147,46,0.22), transparent 65%)' }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* The image - masked at edges so it bleeds into the hero bg */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 100% 100% at 50% 50%, black 60%, transparent 100%)',
                maskImage:
                  'radial-gradient(ellipse 100% 100% at 50% 50%, black 60%, transparent 100%)',
              }}
            >
              <motion.img
                src={villa.src}
                alt="Yakuver Solutions - modern 3-story residence with stone column accents, wood-paneled feature wall, glass balconies and curved entrance canopy"
                className="w-full h-full object-cover"
                initial={{ scale: 1.06 }}
                animate={{ scale: [1.06, 1.12, 1.06] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Vignette to deepen edges */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,10,10,0.65)_100%)] pointer-events-none" />
              {/* Bottom gradient to bleed text-friendly */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/85 to-transparent pointer-events-none" />
            </div>

            {/* "LIVE PROJECT" floating chip */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-on-primary/85 bg-primary/65 backdrop-blur border border-gold/30 max-w-[46%] sm:max-w-none"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-gold-2"
                animate={{ boxShadow: ['0 0 0 0 rgba(212,175,55,0.6)', '0 0 0 6px rgba(212,175,55,0)'] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              {t('hero.chip.residential')}
            </motion.div>

            {/* Project sub-tag - top-right */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute top-3 right-3 z-10 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-on-primary/70 bg-primary/65 backdrop-blur border border-line-dark max-w-[46%] sm:max-w-none truncate"
            >
              {t('hero.chip.cluster')}
            </motion.div>

            {/* GHC stamp - bottom-left, integrated */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 220, damping: 22 }}
              whileHover={{ y: -3, scale: 1.03 }}
              className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-gold-gradient text-primary px-3 py-2 sm:px-4 sm:py-3 rounded-md+ shadow-gold cursor-default"
            >
              <div className="font-mono text-[9px] sm:text-[9.5px] tracking-[0.18em] uppercase font-bold">{t('hero.stamp.in')}</div>
              <div className="font-heading font-black text-[1.2rem] sm:text-[1.45rem] leading-none mt-1">GH₵ 60M+</div>
              <div className="font-mono text-[9px] sm:text-[9.5px] tracking-[0.14em] uppercase mt-1 sm:mt-1.5 opacity-80">{t('hero.stamp.activeportfolio')}</div>
            </motion.div>

            {/* Discipline meta - bottom-right (hidden on mobile to avoid overlap) */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, type: 'spring', stiffness: 220, damping: 22 }}
              className="hidden sm:block absolute bottom-4 right-4 z-10 bg-primary/65 backdrop-blur border border-line-dark px-4 py-3 rounded-md+ text-right max-w-[55%]"
            >
              <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-gold-2 font-bold">{t('hero.disciplineMeta')}</div>
              <div className="font-heading font-black text-[1rem] mt-1 text-on-primary">{t('hero.disciplineLabel')}</div>
              <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase mt-1 text-on-primary/65">{t('hero.disciplineSub')}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
