import { motion, animate } from 'motion/react';
import { useEffect, useState } from 'react';
import { fadeUp, sectionViewport } from '../../lib/motion-presets';
import { useT } from '../../lib/i18n';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [display, setDisplay] = useState('0' + suffix);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString() + suffix),
    });
    return () => controls.stop();
  }, [to, suffix]);

  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{display}</span>;
}

export function Stats({ base = '/' }: { base?: string }) {
  const { t } = useT();
  const b = base.endsWith('/') ? base : base + '/';
  return (
    <section className="py-20 lg:py-24 border-b border-line bg-background">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-x-16 gap-y-8 items-end"
        >
          <p className="font-heading font-bold text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.25] tracking-[-0.018em] text-primary text-balance max-w-[28ch]">
            {t('stats.line.1')}{' '}
            <span className="text-gold-deep">
              <Counter to={10} suffix="+" />
            </span>{' '}
            {t('stats.line.2')}{' '}
            <span className="text-gold-deep">{t('stats.geo')}</span>
            {t('stats.line.3')}{' '}
            <span className="text-gold-deep">
              GH₵ <Counter to={60} />M
            </span>{' '}
            {t('stats.line.4')}
          </p>

          <div className="lg:pl-8 lg:border-l border-line">
            <p className="text-secondary text-[15px] leading-[1.65] max-w-[36ch]">
              {t('stats.qualifier')}
            </p>
            <a
              href={b + 'projects/'}
              className="inline-flex items-center gap-1.5 mt-5 font-heading font-semibold text-[14px] text-primary hover:text-gold-deep transition-colors"
            >
              {t('stats.see_portfolio')}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
