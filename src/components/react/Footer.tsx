import { motion } from 'motion/react';
import logo from '../../assets/yakuver-logo.png';
import { staggerFast, fadeUp, sectionViewport } from '../../lib/motion-presets';
import { useT } from '../../lib/i18n';

export function Footer() {
  const { t } = useT();

  const sections = [
    {
      title: t('footer.col.capabilities'),
      links: [
        [t('footer.cap.arch'),       '#capabilities'],
        [t('footer.cap.civil'),      '#capabilities'],
        [t('footer.cap.hvac'),       '#capabilities'],
        [t('footer.cap.electrical'), '#capabilities'],
        [t('footer.cap.plumbing'),   '#capabilities'],
        [t('footer.cap.fire'),       '#capabilities'],
      ],
    },
    {
      title: t('footer.col.company'),
      links: [
        [t('footer.co.about'),    '#about'],
        [t('footer.co.process'),  '#process'],
        [t('footer.co.projects'), '#projects'],
        [t('footer.co.team'),     '#team'],
        [t('footer.co.clients'),  '#clients'],
        [t('footer.co.contact'),  '#contact'],
      ],
    },
    {
      title: t('footer.col.contact'),
      links: [
        ['+233 24 014 5460',          'tel:+233240145460'],
        ['+233 30 230 1233',          'tel:+233302301233'],
        ['info@yakuversolutions.com', 'mailto:info@yakuversolutions.com'],
        [t('footer.contact.locations'), '#contact'],
      ],
    },
  ];

  return (
    <footer className="bg-[#050505] text-on-primary/70 pt-20 pb-7 border-t border-line-dark">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerFast}
          className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-16 pb-14 border-b border-line-dark"
        >
          <motion.div variants={fadeUp}>
            <a href="#" className="inline-block" aria-label="Yakuver Solutions LTD">
              <img
                src={logo.src}
                alt="Yakuver Solutions LTD"
                className="h-14 lg:h-16 w-auto brightness-0 invert opacity-90 drop-shadow-[0_4px_14px_rgba(245,241,232,0.18)]"
              />
            </a>
            <p className="text-on-primary/55 text-[14px] leading-[1.7] mt-6 max-w-[36ch]">
              {t('footer.tagline')}
            </p>
          </motion.div>

          {sections.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold-2 mb-5 font-medium">
                {s.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {s.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-[14px] text-on-primary/65 hover:text-gold-2 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="pt-6 flex flex-wrap justify-between items-center gap-4 font-mono text-[11px] tracking-[0.14em] text-on-primary/45">
          <div>© {new Date().getFullYear()} Yakuver Solutions LTD — {t('footer.rights')}</div>
          <div>{t('footer.tagline.short')}</div>
        </div>
      </div>
    </footer>
  );
}
