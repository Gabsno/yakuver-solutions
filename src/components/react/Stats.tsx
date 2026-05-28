import { motion, animate } from 'motion/react';
import { useEffect, useState } from 'react';
import { fadeUp, sectionViewport } from '../../lib/motion-presets';

// =============================================================================
// Anchor statement, not a 4-tile metric grid.
// The previous "60 / 10+ / 2 / 6" grid was the textbook hero-metric template
// banned by impeccable + design-taste-frontend (big number, small label,
// supporting stats, repeated four times). Replaced with one prose statement
// that surfaces the same numbers as inline emphasis - reads like a sentence
// a person would say, not a marketing dashboard.
// =============================================================================

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  // Parent island uses client:visible so by the time this mounts, it's in
  // viewport. Animate on mount via animate().onUpdate -> setState; no
  // MotionValue-as-child rendering, no inner IntersectionObserver.
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

export function Stats() {
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
          {/* Left: prose anchor statement */}
          <p className="font-heading font-bold text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.25] tracking-[-0.018em] text-primary text-balance max-w-[28ch]">
            Right now we have{' '}
            <span className="text-gold-deep">
              <Counter to={10} suffix="+" />
            </span>{' '}
            live builds in commission across{' '}
            <span className="text-gold-deep">Ghana and Togo</span>,
            adding up to roughly{' '}
            <span className="text-gold-deep">
              GH₵ <Counter to={60} />M
            </span>{' '}
            in active scope.
          </p>

          {/* Right: short qualifier, no stat tiles */}
          <div className="lg:pl-8 lg:border-l border-line">
            <p className="text-secondary text-[15px] leading-[1.65] max-w-[36ch]">
              Architecture, civil, mechanical, electrical, plumbing and fire
              protection - six disciplines under one accountable team. The
              same people on the drawings are the people on site.
            </p>
            <a
              href="projects/"
              className="inline-flex items-center gap-1.5 mt-5 font-heading font-semibold text-[14px] text-primary hover:text-gold-deep transition-colors"
            >
              See the portfolio
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
