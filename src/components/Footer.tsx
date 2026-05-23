import { motion } from 'motion/react';
import logo from '../assets/yakuver-logo.png';
import { staggerFast, fadeUp, sectionViewport } from '../lib/motion-presets';

const SECTIONS = [
  {
    title: 'Capabilities',
    links: [
      ['Architectural design', '#capabilities'],
      ['Civil engineering',    '#capabilities'],
      ['HVAC & VRF',           '#capabilities'],
      ['Electrical systems',   '#capabilities'],
      ['Plumbing',             '#capabilities'],
      ['Fire protection',      '#capabilities'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About',    '#about'],
      ['Projects', '#projects'],
      ['Clients',  '#clients'],
      ['Contact',  '#contact'],
    ],
  },
  {
    title: 'Contact',
    links: [
      ['+233 24 014 5460',          'tel:+233240145460'],
      ['+233 30 230 1233',          'tel:+233302301233'],
      ['info@yakuversolutions.com', 'mailto:info@yakuversolutions.com'],
      ['Accra · Kumasi · Lomé',     '#contact'],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#050505] text-on-primary/70 pt-20 pb-7 border-t border-line-dark">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerFast}
          className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-16 pb-14 border-b border-line-dark"
        >
          <motion.div variants={fadeUp}>
            <a href="#" className="inline-block">
              <img src={logo} alt="Yakuver Solutions LTD" className="h-12 w-auto brightness-0 invert opacity-90" />
            </a>
            <p className="text-on-primary/55 text-[14px] leading-[1.7] mt-5 max-w-[36ch]">
              Multidisciplinary architecture, civil engineering and MEPF contractor
              delivering integrated projects across Ghana &amp; West Africa.
            </p>
          </motion.div>

          {SECTIONS.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <h5 className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold-2 mb-5 font-medium">
                {s.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {s.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-[14px] text-on-primary/65 hover:text-gold-2 transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="pt-6 flex flex-wrap justify-between items-center gap-4 font-mono text-[11px] tracking-[0.14em] text-on-primary/45">
          <div>© {new Date().getFullYear()} Yakuver Solutions LTD — All rights reserved.</div>
          <div>Architecture · Civil · MEPF — Delivered as one.</div>
        </div>
      </div>
    </footer>
  );
}
