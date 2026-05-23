import { motion } from 'motion/react';
import { ArrowRight, Phone, Mail, Globe } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy, springTap } from '../lib/motion-presets';

const ROWS = [
  { type: 'Mobile', value: '+233 24 014 5460',       href: 'tel:+233240145460',  icon: Phone  },
  { type: 'Office', value: '+233 30 230 1233',       href: 'tel:+233302301233',  icon: Phone  },
  { type: 'Email',  value: 'info@yakuversolutions.com', href: 'mailto:info@yakuversolutions.com', icon: Mail },
  { type: 'Web',    value: 'www.yakuversolutions.com',  href: 'https://www.yakuversolutions.com', icon: Globe },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24 lg:py-28 bg-primary text-on-primary overflow-hidden">
      <div className="absolute inset-0 paper-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div
        className="absolute -right-[5%] top-[10%] w-[50%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.18), transparent 60%)' }}
      />

      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-7 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="font-mono text-[11px] tracking-[0.18em] uppercase text-on-primary/55 mb-4">
            <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
            Contact · 06
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] mb-6">
            Let's talk about <span className="text-gold-gradient">your project.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-on-primary/70 text-[16px] leading-[1.65] max-w-[58ch] mb-10">
            Whether it's a 4-villa cluster, a 13-story tower or a chilled-water hospital
            retrofit — send the scope, drawings or sketch and we'll come back within
            24 hours with a route forward.
          </motion.p>

          <motion.div variants={fadeUp} className="border-t border-line-dark">
            {ROWS.map((r) => (
              <motion.a
                key={r.value}
                href={r.href}
                target={r.type === 'Web' ? '_blank' : undefined}
                rel="noopener"
                whileHover={{ paddingLeft: 10 }}
                transition={springSnappy}
                className="grid grid-cols-[110px_1fr_auto] gap-4 items-center py-5 border-b border-line-dark group transition-all"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-on-primary/45 inline-flex items-center gap-2">
                  <r.icon className="w-3 h-3" /> {r.type}
                </span>
                <span className="font-heading text-[17px] font-semibold text-on-primary group-hover:text-gold-2 transition-colors">
                  {r.value}
                </span>
                <motion.span
                  className="text-gold-2"
                  whileHover={{ x: 4 }}
                  transition={springSnappy}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={{ ...springSnappy, delay: 0.15 }}
          whileHover={{ y: -4 }}
          className="relative bg-gold-gradient text-primary rounded-lg+ p-9 lg:p-10 overflow-hidden shadow-gold"
        >
          <div
            className="absolute -right-10 -bottom-10 w-52 h-52 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(10,10,10,0.14), transparent 70%)' }}
          />
          <div className="relative">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary/65 mb-4">
              Request a quote
            </div>
            <h3 className="font-heading font-black text-[clamp(1.6rem,2.4vw,2rem)] mb-4 text-primary leading-[1.15]">
              Get a structured proposal in 5–7 working days.
            </h3>
            <p className="text-primary/75 text-[15px] leading-[1.6] mb-7">
              We'll review your scope, walk the site if needed, and return a costed
              proposal with programme, scope clarifications and exclusions —
              professionally documented from day one.
            </p>
            <motion.a
              href="mailto:info@yakuversolutions.com?subject=Project%20enquiry%20—%20Yakuver%20Solutions"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springTap}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md+ bg-primary text-on-primary text-[14px] font-heading font-semibold w-full justify-center"
            >
              Email the team <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
