import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';
import logo from '../assets/yakuver-logo.png';
import { springSnappy, springTap } from '../lib/motion-presets';
import { useT } from '../lib/i18n';

const LINKS = [
  { href: '#capabilities', key: 'nav.capabilities' },
  { href: '#about',        key: 'nav.about' },
  { href: '#process',      key: 'nav.process' },
  { href: '#projects',     key: 'nav.projects' },
  { href: '#team',         key: 'nav.team' },
  { href: '#clients',      key: 'nav.clients' },
  { href: '#contact',      key: 'nav.contact' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...springSnappy, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary/85 backdrop-saturate-150 backdrop-blur-lg border-b border-line-dark shadow-deep'
          : 'bg-transparent'
      }`}
    >
      {/* TOP CONTACT STRIP — blended, transparent over hero */}
      <div
        className={`transition-all duration-500 ${
          scrolled ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-20 opacity-100'
        }`}
      >
        <div className="max-w-[1480px] mx-auto px-6 lg:px-10 py-3 flex justify-between items-center gap-6 flex-wrap font-mono text-[11.5px] tracking-[0.06em] text-on-primary/70">
          <div className="flex gap-6 items-center flex-wrap">
            <a href="tel:+233240145460" className="inline-flex items-center gap-1.5 hover:text-gold-3 transition-colors">
              <Phone className="w-3 h-3" /> +233 24 014 5460
            </a>
            <a href="tel:+233302301233" className="inline-flex items-center gap-1.5 hover:text-gold-3 transition-colors">
              <Phone className="w-3 h-3" /> +233 30 230 1233
            </a>
            <a href="mailto:info@yakuversolutions.com" className="inline-flex items-center gap-1.5 hover:text-gold-3 transition-colors hidden md:inline-flex">
              <Mail className="w-3 h-3" /> info@yakuversolutions.com
            </a>
          </div>
          <div className="flex gap-5 items-center flex-wrap">
            <motion.span
              className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 rounded-full bg-gold/[0.08]"
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#16a34a]" />
              {t('nav.availability')}
            </motion.span>
            <span className="hidden sm:inline">{t('nav.locations')}</span>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-on-primary/15 to-transparent" />
      </div>

      {/* MAIN NAV */}
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10 py-3 lg:py-4 flex items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-3 group shrink-0 relative" aria-label="Yakuver Solutions home">
          {/* Soft gold halo so the logo blends with the dark hero */}
          {!scrolled && (
            <motion.span
              aria-hidden="true"
              className="absolute -inset-x-4 -inset-y-3 rounded-[24px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(212,175,55,0.22), transparent 70%)' }}
              animate={{ opacity: [0.55, 0.9, 0.55] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <motion.img
            src={logo}
            alt="Yakuver Solutions LTD logo"
            className="relative h-20 md:h-24 lg:h-[110px] xl:h-[120px] w-auto drop-shadow-[0_6px_24px_rgba(212,175,55,0.5)]"
            whileHover={{ scale: 1.04 }}
            transition={springSnappy}
          />
        </a>

        <ul className="hidden lg:flex items-center gap-7 xl:gap-9">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative font-heading text-[15.5px] xl:text-[16.5px] font-semibold transition-colors py-2 group whitespace-nowrap ${
                  scrolled ? 'text-on-primary hover:text-gold-3' : 'text-on-primary/90 hover:text-gold-3'
                }`}
              >
                {t(l.key)}
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-gold-gradient group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 shrink-0">
          {/* EN / FR toggle */}
          <div
            role="group"
            aria-label="Language"
            className={`hidden md:inline-flex items-center rounded-full p-1 text-[11.5px] font-mono tracking-[0.06em] uppercase border ${
              scrolled ? 'border-line-dark bg-on-primary/[0.04]' : 'border-on-primary/15 bg-on-primary/[0.04]'
            }`}
          >
            {(['en', 'fr'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === l
                    ? 'bg-gold-gradient text-primary font-bold'
                    : 'text-on-primary/70 hover:text-on-primary'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={springTap}
            className="hidden md:inline-flex items-center gap-2.5 px-6 py-3 rounded-md+ bg-gold-gradient text-primary text-[14.5px] xl:text-[15.5px] font-heading font-bold shadow-gold hover:shadow-[0_20px_55px_-14px_rgba(200,147,46,0.75)] transition-shadow"
          >
            {t('nav.cta')} <ArrowRight className="w-4 h-4" />
          </motion.a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-12 h-12 grid place-items-center rounded-md+ bg-gold-gradient text-primary shadow-gold"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-line-dark bg-primary/95 backdrop-blur"
          >
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-line-dark/40">
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block px-7 py-5 font-heading text-[17px] font-semibold text-on-primary hover:text-gold-3 hover:bg-on-primary/[0.04]"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
            <li className="px-5 py-4 flex items-center justify-center gap-2 border-b border-line-dark/40">
              {(['en', 'fr'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2 rounded-full font-mono text-[12px] tracking-[0.06em] transition-all ${
                    lang === l
                      ? 'bg-gold-gradient text-primary font-bold'
                      : 'text-on-primary/70 border border-line-dark'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </li>
            <li className="p-5">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-5 py-4 rounded-md+ bg-gold-gradient text-primary text-[15px] font-heading font-bold"
              >
                {t('nav.cta')} →
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
