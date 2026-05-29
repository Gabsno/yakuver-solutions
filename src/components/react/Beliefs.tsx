import { motion } from 'motion/react';
import { staggerContainer, fadeUp, sectionViewport } from '../../lib/motion-presets';
import { useT } from '../../lib/i18n';

const BELIEFS = [
  { numKey: 'beliefs.1.num', titleKey: 'beliefs.1.title', bodyKey: 'beliefs.1.body' },
  { numKey: 'beliefs.2.num', titleKey: 'beliefs.2.title', bodyKey: 'beliefs.2.body' },
  { numKey: 'beliefs.3.num', titleKey: 'beliefs.3.title', bodyKey: 'beliefs.3.body' },
];

export function Beliefs() {
  const { t } = useT();
  return (
    <section className="relative py-24 lg:py-28 bg-primary text-on-primary overflow-hidden">
      <div className="absolute inset-0 paper-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-end mb-12"
        >
          <motion.div variants={fadeUp}>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-on-primary/55 mb-4">
              <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
              {t('beliefs.eyebrow')}
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-on-primary">
              {t('beliefs.title.1')}<br />
              <span className="text-gold">{t('beliefs.title.2')}</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-on-primary/65 text-[16px] leading-[1.65] max-w-[58ch]">
            {t('beliefs.lede')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-y border-line-dark"
        >
          {BELIEFS.map((b, i) => (
            <motion.div
              key={b.numKey}
              variants={fadeUp}
              whileHover={{ backgroundColor: 'rgba(245,241,232,0.04)' }}
              className={`p-10 lg:p-12 ${i > 0 ? 'lg:border-l border-line-dark' : ''} ${
                i > 0 ? 'border-t lg:border-t-0 border-line-dark' : ''
              } transition-colors`}
            >
              <div className="font-mono text-[11px] tracking-[0.18em] text-gold-2 mb-5">{t(b.numKey)}</div>
              <h4 className="font-heading font-black text-[1.55rem] mb-4 text-on-primary leading-[1.15]">{t(b.titleKey)}</h4>
              <p className="text-on-primary/65 text-[14.5px] leading-[1.7]">{t(b.bodyKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
