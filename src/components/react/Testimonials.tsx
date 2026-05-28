import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Optional avatar/initial colour */
  accent?: string;
};

// =============================================================================
// Placeholder testimonials - replace `quote`, `name`, `role`, `company` with
// real client feedback. Layout, motion and styling will work as-is.
// =============================================================================
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Yakuver took our full MEP scope from drawings to commissioning and didn't miss a single milestone. The level of coordination between their architectural, electrical and HVAC teams meant we never had to chase three separate contractors - they brought one programme and owned the result.",
    name: 'Client name pending',
    role: 'Project Director',
    company: 'AU Project',
    accent: '#c8932e',
  },
  {
    quote:
      "Bringing in a Ghanaian team for a cross-border chilled-water install was a risk on paper - but the CHU plant was commissioned, witnessed and handed over on programme, and our facility team had full O&M documentation from day one. That's the difference.",
    name: 'Client name pending',
    role: 'Facility Engineer',
    company: 'CHU Hospital · Lomé',
    accent: '#0891b2',
  },
  {
    quote:
      "What we appreciated most was the discipline. Daily quality checks, weekly walks, snag list updated in real time - by the time we got to handover there were no surprises. We've already engaged them for the next phase.",
    name: 'Client name pending',
    role: 'Owner',
    company: 'Residential development',
    accent: '#dc2626',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-28 bg-paper relative overflow-hidden">
      <div
        className="absolute -left-[10%] top-1/4 w-[35%] h-[40%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.08), transparent 60%)' }}
      />
      {/* Giant decorative quote mark */}
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
              In their words
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              What clients say<br />
              <span className="text-gold">about working with us.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            Selected feedback from a cross-section of recent projects.
            <span className="block mt-1 text-[13px] font-mono uppercase tracking-[0.12em] text-gold-deep opacity-70">
              ◆ live quotes coming soon - pending client approval
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
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={springSnappy}
              className="group relative bg-white border border-line rounded-lg+ p-7 lg:p-8 shadow-soft hover:shadow-medium hover:border-gold/30 transition-all duration-300"
            >
              <Quote
                className="absolute top-5 right-5 w-9 h-9 opacity-15 group-hover:opacity-30 transition-opacity"
                style={{ color: t.accent ?? '#c8932e' }}
                strokeWidth={1.5}
              />
              <blockquote className="text-primary text-[15px] lg:text-[16px] leading-[1.65] mb-7 relative z-[1]">
                <span className="text-gold-deep font-heading text-[32px] leading-none align-top mr-1">"</span>
                {t.quote}
              </blockquote>
              <figcaption className="border-t border-line pt-5 flex items-center gap-3">
                {/* Initial badge in place of avatar */}
                <div
                  className="w-11 h-11 rounded-full grid place-items-center font-heading font-bold text-[14px] text-white shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.accent ?? '#c8932e'}, ${t.accent ?? '#c8932e'}cc)`,
                  }}
                >
                  {t.company.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-bold text-[14px] text-primary truncate">{t.name}</div>
                  <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-secondary-2 truncate">
                    {t.role} · {t.company}
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
