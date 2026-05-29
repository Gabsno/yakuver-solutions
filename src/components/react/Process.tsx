import { motion } from 'motion/react';
import { ClipboardList, Pencil, Truck, Wrench, ShieldCheck } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';
import { useT } from '../../lib/i18n';

const STEPS = [
  { num: '01', icon: ClipboardList, titleKey: 'process.1.title', bodyKey: 'process.1.body', metaKey: 'process.1.meta' },
  { num: '02', icon: Pencil,        titleKey: 'process.2.title', bodyKey: 'process.2.body', metaKey: 'process.2.meta' },
  { num: '03', icon: Truck,         titleKey: 'process.3.title', bodyKey: 'process.3.body', metaKey: 'process.3.meta' },
  { num: '04', icon: Wrench,        titleKey: 'process.4.title', bodyKey: 'process.4.body', metaKey: 'process.4.meta' },
  { num: '05', icon: ShieldCheck,   titleKey: 'process.5.title', bodyKey: 'process.5.body', metaKey: 'process.5.meta' },
];

export function Process() {
  const { t } = useT();
  return (
    <section id="process" className="py-24 lg:py-28 bg-paper relative overflow-hidden">
      <div
        className="absolute -right-[8%] top-1/4 w-[40%] h-[40%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.10), transparent 60%)' }}
      />

      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-end mb-14"
        >
          <motion.div variants={fadeUp}>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-secondary-2 mb-4">
              <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
              {t('process.eyebrow')}
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              {t('process.title.1')}<br />
              <span className="text-gold">{t('process.title.2')}</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            {t('process.lede')}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="relative"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute top-[42px] left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-gold to-transparent origin-left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {STEPS.map((s) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={springSnappy}
                className="relative text-center lg:text-left group"
              >
                <div className="relative mx-auto lg:mx-0 mb-5 lg:mb-7 w-[84px] h-[84px]">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gold-gradient"
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    transition={springSnappy}
                  />
                  <div className="absolute inset-[3px] rounded-full bg-paper grid place-items-center">
                    <s.icon className="w-7 h-7 text-gold-deep" strokeWidth={1.8} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary text-gold-2 font-mono text-[11px] grid place-items-center font-bold shadow-medium">
                    {s.num}
                  </span>
                </div>

                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-gold-deep font-semibold mb-2">
                  {t(s.metaKey)}
                </div>
                <h3 className="font-heading font-bold text-[18px] lg:text-[17px] xl:text-[18.5px] text-primary mb-3 leading-tight">
                  {t(s.titleKey)}
                </h3>
                <p className="text-[14px] leading-[1.6] text-secondary">
                  {t(s.bodyKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
