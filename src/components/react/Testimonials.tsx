import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';
import { useT } from '../../lib/i18n';

type Testimonial = {
  quoteKey: string;
  nameKey: string;
  roleKey: string;
  companyKey: string;
  accent: string;
};

const TESTIMONIALS: Testimonial[] = [
  { quoteKey: 'test.quote.1', nameKey: 'test.name.pending', roleKey: 'test.role.director', companyKey: 'test.co.au',          accent: '#c8932e' },
  { quoteKey: 'test.quote.2', nameKey: 'test.name.pending', roleKey: 'test.role.engineer', companyKey: 'test.co.chu',         accent: '#0891b2' },
  { quoteKey: 'test.quote.3', nameKey: 'test.name.pending', roleKey: 'test.role.owner',    companyKey: 'test.co.residential', accent: '#dc2626' },
];

export function Testimonials() {
  const { t } = useT();
  return (
    <section className="py-24 lg:py-28 bg-paper relative overflow-hidden">
      <div
        className="absolute -left-[10%] top-1/4 w-[35%] h-[40%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.08), transparent 60%)' }}
      />
      <div className="absolute top-12 right-8 lg:right-20 pointer-events-none opacity-[0.06]">
        <Quote className="w-44 h-44 lg:w-72 lg:h-72 text-primary" strokeWidth={1.2} />
      </div>

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
              {t('test.eyebrow')}
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              {t('test.title.1')}<br />
              <span className="text-gold">{t('test.title.2')}</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            {t('test.lede')}
            <span className="block mt-1 text-[13px] font-mono uppercase tracking-[0.12em] text-gold-deep opacity-70">
              {t('test.lede.pending')}
            </span>
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
        >
          {TESTIMONIALS.map((tt, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={springSnappy}
              className="group relative bg-white border border-line rounded-lg+ p-7 lg:p-8 shadow-soft hover:shadow-medium hover:border-gold/30 transition-all duration-300"
            >
              <Quote
                className="absolute top-5 right-5 w-9 h-9 opacity-15 group-hover:opacity-30 transition-opacity"
                style={{ color: tt.accent }}
                strokeWidth={1.5}
              />
              <blockquote className="text-primary text-[15px] lg:text-[16px] leading-[1.65] mb-7 relative z-[1]">
                <span className="text-gold-deep font-heading text-[32px] leading-none align-top mr-1">"</span>
                {t(tt.quoteKey)}
              </blockquote>
              <figcaption className="border-t border-line pt-5 flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full grid place-items-center font-heading font-bold text-[14px] text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${tt.accent}, ${tt.accent}cc)` }}
                >
                  {t(tt.companyKey).charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-bold text-[14px] text-primary truncate">{t(tt.nameKey)}</div>
                  <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-secondary-2 truncate">
                    {t(tt.roleKey)} · {t(tt.companyKey)}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
