// =============================================================================
// Framer Motion presets - shared across the site for consistent rhythm.
// Springs (tuned per stiffness/damping, not duration) and viewport defaults.
// =============================================================================
import type { Variants, Transition } from 'motion/react';

export const springGentle: Transition = { type: 'spring', stiffness: 110, damping: 22 };
export const springSnappy: Transition = { type: 'spring', stiffness: 320, damping: 28 };
export const springSoftBounce: Transition = { type: 'spring', stiffness: 220, damping: 18 };
export const springTap: Transition = { type: 'spring', stiffness: 420, damping: 22 };

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { ...springGentle } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { ...springSoftBounce } },
};

export const wordReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 180, damping: 24 } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { ...springGentle } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { ...springGentle } },
};

export const sectionViewport = { once: true, margin: '-80px' } as const;

export const tapSpring = { scale: 0.97 };
export const hoverLift = { y: -3, transition: springSnappy };
