import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import vrf from '../assets/projects/vrf-rooftop-01.jpg';
import { staggerContainer, fadeUp, slideInLeft, sectionViewport, springSnappy } from '../lib/motion-presets';

const VM = [
  {
    eyebrow: 'Mission',
    title: 'Integrated engineering that transcends conventional thinking.',
    body: 'Deliver innovative architectural, civil, and MEPF solutions that ensure client satisfaction through exceptional service and integrated design excellence.',
  },
  {
    eyebrow: 'Vision',
    title: "The leading multidisciplinary firm in West Africa's built environment.",
    body: 'Delivering cutting-edge built environments with excellence and fostering long-term client partnerships through holistic engineering and design.',
  },
];

export function Anatomy() {
  return (
    <section id="anatomy" className="py-24 lg:py-28 bg-paper">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-7 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="relative aspect-[4/5] rounded-lg+ overflow-hidden shadow-medium"
        >
          <motion.img
            src={vrf}
            alt="Yakuver engineer commissioning a rooftop VRF outdoor unit on a commercial site"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
            <span className="px-3 py-2 rounded-sm- bg-primary/60 backdrop-blur border border-line-dark font-mono text-[10px] uppercase tracking-[0.16em] text-on-primary">
              Rooftop VRF condenser · Accra commercial · commissioning
            </span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          id="about"
        >
          <motion.div variants={fadeUp} className="font-mono text-[11px] tracking-[0.18em] uppercase text-secondary-2 mb-4">
            <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
            About · 02
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary mb-6">
            A firm built on <span className="text-gold-gradient">engineering</span>, not on excuses.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[60ch] mb-8">
            Yakuver Solutions LTD is a multidisciplinary firm with a strong focus on
            Architectural and Civil Engineering, delivering well-designed, durable, and
            sustainable built environments. We provide integrated services from planning
            and construction to MEPF systems — including HVAC, electrical, plumbing, and
            fire protection — ensuring safety, efficiency and high performance across every project.
          </motion.p>

          <div className="grid gap-4">
            {VM.map((v, i) => (
              <motion.div
                key={v.eyebrow}
                variants={fadeUp}
                whileHover={{ y: -3, borderColor: '#c8932e' }}
                transition={springSnappy}
                className="p-7 bg-background border border-line rounded-lg+ relative"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold-deep mb-2.5">
                  {v.eyebrow}
                </div>
                <h4 className="font-heading text-[1.3rem] text-primary mb-2.5 leading-[1.2]">{v.title}</h4>
                <p className="text-secondary text-[14.5px] leading-[1.6]">{v.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            variants={fadeUp}
            href="#projects"
            whileHover={{ x: 4 }}
            transition={springSnappy}
            className="inline-flex items-center gap-2 mt-8 text-primary font-heading font-semibold text-[14px] hover:text-gold-deep transition-colors"
          >
            See what we've delivered <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
