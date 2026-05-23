import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';
import { staggerContainer, fadeUp, sectionViewport } from '../lib/motion-presets';

const STATS = [
  { value: 60,  unit: 'GH₵',  label: 'Active portfolio (millions)' },
  { value: 10,  unit: '+',    label: 'Live projects' },
  { value: 2,   unit: '',     label: 'Countries delivered' },
  { value: 6,   unit: '',     label: 'Disciplines under one roof' },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Stats() {
  return (
    <section className="py-20 border-b border-line bg-background">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className={`px-4 lg:px-8 py-4 ${i > 0 ? 'lg:border-l border-line' : ''} ${
                i % 2 === 1 ? 'border-l border-line lg:border-l' : ''
              }`}
            >
              <div className="font-heading text-[clamp(2.4rem,4.4vw,3.6rem)] font-black leading-none tracking-[-0.03em] text-primary">
                <Counter to={s.value} />
                {s.unit && (
                  <span className="text-gold font-bold align-super text-[0.45em] ml-1">{s.unit}</span>
                )}
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-secondary-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
