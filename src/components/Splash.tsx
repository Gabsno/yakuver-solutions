import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import logo from '../assets/yakuver-logo.png';

// =============================================================================
// Splash — a brief gold-logo intro that dissolves after first paint.
// Self-dismisses after ~1.4s. Reduced-motion / repeat visitors can be skipped
// via sessionStorage to avoid showing it on every navigation in-session.
// =============================================================================
export function Splash() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('yakuver-splash-seen') !== '1';
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem('yakuver-splash-seen', '1'); } catch {}
    }, 1400);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-primary"
          aria-hidden="true"
        >
          {/* Gold halo */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: '60vmin',
              height: '60vmin',
              background: 'radial-gradient(circle, rgba(212,175,55,0.28), transparent 65%)',
            }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.img
            src={logo}
            alt="Yakuver Solutions"
            className="relative h-[16vmin] w-auto max-w-[80vw] drop-shadow-[0_8px_30px_rgba(212,175,55,0.45)]"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          />

          {/* Gold underline draw */}
          <motion.span
            className="absolute h-[2px] bg-gold-gradient"
            style={{ marginTop: '20vmin' }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '20vmin', opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
