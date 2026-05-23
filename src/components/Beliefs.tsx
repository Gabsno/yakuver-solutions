import { motion } from 'motion/react';
import { staggerContainer, fadeUp, sectionViewport } from '../lib/motion-presets';

const BELIEFS = [
  { num: '01 / INNOVATION', title: 'Forward-thinking, by default.', body: 'We embrace new technologies and continuously explore better methods, materials and systems to stay ahead in a rapidly evolving construction landscape.' },
  { num: '02 / PRECISION',  title: 'Every detail matters.', body: 'Our work is defined by accuracy, consistency, and a commitment to delivering high-quality results without compromise — from setting out to snag-list close-out.' },
  { num: '03 / CLIENT SATISFACTION', title: 'Tailored. Communicated. Delivered.', body: "We prioritise our clients' needs, ensuring clear communication, tailored solutions, and a seamless experience from start to finish — and a building that performs after handover." },
];

export function Beliefs() {
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
              Core Beliefs · 03
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-on-primary">
              We don't define our beliefs.<br />
              <span className="text-gold-gradient">We live them.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-on-primary/65 text-[16px] leading-[1.65] max-w-[58ch]">
            Three principles govern every drawing we issue, every fitting we install
            and every conversation with a client. They are non-negotiable.
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
              key={b.title}
              variants={fadeUp}
              whileHover={{ backgroundColor: 'rgba(245,241,232,0.04)' }}
              className={`p-10 lg:p-12 ${i > 0 ? 'lg:border-l border-line-dark' : ''} ${
                i > 0 ? 'border-t lg:border-t-0 border-line-dark' : ''
              } transition-colors`}
            >
              <div className="font-mono text-[11px] tracking-[0.18em] text-gold-2 mb-5">{b.num}</div>
              <h4 className="font-heading font-black text-[1.55rem] mb-4 text-on-primary leading-[1.15]">{b.title}</h4>
              <p className="text-on-primary/65 text-[14.5px] leading-[1.7]">{b.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
