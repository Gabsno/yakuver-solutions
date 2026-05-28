import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { springSnappy, springTap } from '../../lib/motion-presets';
import { useT } from '../../lib/i18n';

const WHATSAPP_NUMBER = '233240145460'; // +233 24 014 5460 (international format, no +)

export function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen]       = useState(false);
  const { t, lang } = useT();

  const prefill =
    lang === 'fr'
      ? "Bonjour Yakuver - j'aimerais discuter d'un projet. Pourrions-nous prévoir un appel ?"
      : "Hi Yakuver - I'd like to discuss a project. Could we set up a call?";
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="wa-fab"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={springSnappy}
          className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3"
        >
          {/* Tooltip / mini-CTA bubble */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="wa-bubble"
                initial={{ opacity: 0, x: 8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="bg-primary text-on-primary rounded-xl+ p-4 max-w-[280px] shadow-deep border border-gold/20 relative"
              >
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute top-2 right-2 w-6 h-6 grid place-items-center rounded-full hover:bg-on-primary/10 text-on-primary/60 hover:text-on-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold-2 mb-1.5 font-bold">
                  {t('wa.eyebrow')}
                </div>
                <div className="font-heading font-bold text-[15px] mb-1 leading-snug">
                  {t('wa.title')}
                </div>
                <p className="text-[12.5px] text-on-primary/70 leading-[1.5] mb-3">
                  {t('wa.body')}
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2.5 rounded-md+ bg-[#25D366] text-white text-[13px] font-heading font-bold hover:bg-[#1ebe5d] transition-colors"
                >
                  {t('wa.btn')}
                </a>
                <div className="mt-2 text-center font-mono text-[10px] text-on-primary/50">
                  +233 24 014 5460
                </div>
                {/* Speech-bubble pointer */}
                <span className="absolute -bottom-2 right-7 w-4 h-4 bg-primary border-r border-b border-gold/20 transform rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* The FAB itself */}
          <motion.button
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={springTap}
            aria-label={open ? 'Close WhatsApp chat prompt' : 'Open WhatsApp chat prompt'}
            className="relative w-[60px] h-[60px] rounded-full bg-[#25D366] text-white shadow-deep grid place-items-center"
          >
            {/* Pulse ring */}
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{ background: '#25D366' }}
              animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{ background: '#25D366' }}
              animate={{ scale: [1, 1.6, 1.6], opacity: [0.35, 0, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />
            {/* Icon swap */}
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="relative z-[1]"
                >
                  <X className="w-6 h-6" strokeWidth={2.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="wa"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="relative z-[1]"
                >
                  {/* WhatsApp glyph (inline SVG) */}
                  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden="true">
                    <path d="M16.003 3.2c-7.062 0-12.8 5.737-12.8 12.799 0 2.253.59 4.453 1.713 6.396L3.2 28.8l6.591-1.722a12.762 12.762 0 0 0 6.211 1.585h.005c7.062 0 12.8-5.738 12.8-12.8 0-3.421-1.331-6.638-3.748-9.057a12.715 12.715 0 0 0-9.056-3.606zm0 23.272h-.004a10.625 10.625 0 0 1-5.413-1.482l-.388-.23-4.028 1.054 1.073-3.926-.252-.402a10.61 10.61 0 0 1-1.625-5.689c0-5.871 4.778-10.65 10.654-10.65 2.845 0 5.518 1.108 7.529 3.121a10.581 10.581 0 0 1 3.121 7.534c-.003 5.872-4.782 10.67-10.667 10.67zm5.836-7.984c-.32-.16-1.892-.933-2.184-1.04-.293-.107-.506-.16-.72.16-.213.32-.825 1.04-1.012 1.253-.187.213-.373.24-.693.08-.32-.16-1.351-.498-2.574-1.587-.952-.849-1.594-1.897-1.781-2.217-.187-.32-.02-.493.14-.652.144-.144.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.624-.524-.54-.72-.55-.187-.008-.4-.01-.613-.01-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.666 0 1.572 1.146 3.092 1.306 3.306.16.213 2.258 3.447 5.474 4.836.764.33 1.36.527 1.825.673.767.244 1.465.21 2.017.127.615-.092 1.892-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z"/>
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
