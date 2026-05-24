import { motion } from 'motion/react';
import { staggerFast, fadeUp, sectionViewport, springSnappy } from '../lib/motion-presets';

import presidency from '../assets/clients/presidency-ghana.png';
import kasapreko from '../assets/clients/kasapreko.png';
import lmi from '../assets/clients/lmi-holdings.png';
import egl from '../assets/clients/egl.png';
import voltaserene from '../assets/clients/voltaserene.png';
import kelmghanna from '../assets/clients/kelm-ghanna.png';
import hvactech from '../assets/clients/hvac-tech.png';
import teco from '../assets/clients/teco-africa.png';
import structcon from '../assets/clients/structcon.png';
import nasy from '../assets/clients/nasy-construction.png';
import keyArch from '../assets/clients/key-architectural.png';
import skol from '../assets/clients/skol-consult.png';
import yedent from '../assets/clients/yedent-agro.png';
import starbites from '../assets/clients/starbites.jpg';
import uca from '../assets/clients/unique-child-academy.png';
import ipc from '../assets/clients/international-palace-church.png';
import methodist from '../assets/clients/methodist-bread-of-life.png';

const CLIENTS = [
  { src: presidency,  name: 'Presidency, Republic of Ghana',     url: 'https://presidency.gov.gh' },
  { src: kasapreko,   name: 'Kasapreko Company',                 url: 'https://kasapreko.com' },
  { src: lmi,         name: 'LMI Holdings',                      url: 'https://lmi-ghana.com' },
  { src: egl,         name: 'Electroland Ghana (EGL)',           url: 'https://electrolandgh.com' },
  { src: voltaserene, name: 'Volta Serene Hotel · Ho',           url: 'https://voltaserenehotel.com' },
  { src: kelmghanna,  name: 'KELM Engineering Ghana',            url: 'https://www.kelmenggh.com' },
  { src: hvactech,    name: 'HVAC Technical',                    url: 'https://hvactechnicalgh.com' },
  { src: teco,        name: 'TECO Africa Ltd',                   url: 'https://www.etccogroup.com' },
  { src: structcon,   name: 'Structcon Projects',                url: 'https://structcon.com' },
  { src: nasy,        name: 'NASY Construction Ltd',             url: 'http://nasyconstruction.com' },
  { src: keyArch,     name: 'KEY Architectural Group',           url: 'https://www.keyarchitect.com' },
  { src: skol,        name: 'SKOL Consult',                      url: 'https://skol.com.gh' },
  { src: yedent,      name: 'YEDENT Agro Group',                 url: 'https://yedentghana.com' },
  { src: starbites,   name: 'Starbites Food & Drink',            url: 'https://starbitesgh.com' },
  { src: uca,         name: 'Unique Child Academy',              url: 'http://uniquechild.edu.gh' },
  { src: ipc,         name: "International Palace Church",       url: 'https://www.internationalpalacechurch.org' },
  { src: methodist,   name: 'Methodist · Bread of Life Society', url: 'https://www.facebook.com/breadoflifemethodistgh/' },
];

export function Clients() {
  return (
    <section id="clients" className="py-24 lg:py-28 bg-paper relative overflow-hidden">
      <div
        className="absolute -left-[10%] top-1/3 w-[40%] h-[40%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.08), transparent 60%)' }}
      />

      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerFast}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-end mb-14"
        >
          <motion.div variants={fadeUp}>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-secondary-2 mb-4">
              <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
              Clients · 09
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              Trusted by institutions,<br />
              <span className="text-gold-gradient">developers &amp; industry.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            Government, hospitality, manufacturing, education, religious institutions
            and private developers — a cross-section of Ghana's built environment.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerFast}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4"
        >
          {CLIENTS.map((c) => (
            <motion.a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${c.name} website (opens in new tab)`}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.04 }}
              transition={springSnappy}
              className="group relative h-[160px] lg:h-[185px] rounded-lg+ bg-white border border-line shadow-soft hover:shadow-gold hover:border-gold/40 transition-all duration-300 grid place-items-center p-6 cursor-pointer overflow-hidden"
            >
              {/* Gold sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-soft/0 via-gold-soft/0 to-gold-soft/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* "Visit" indicator on hover */}
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-primary/0 group-hover:bg-gold/95 grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-primary">
                  <path d="M7 17 L17 7" />
                  <path d="M9 7 L17 7 L17 15" />
                </svg>
              </div>

              <img
                src={c.src}
                alt={c.name}
                loading="lazy"
                className="relative z-[1] max-w-[82%] max-h-[72%] object-contain transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Animated name pill on hover */}
              <motion.span
                className="absolute bottom-2.5 left-2.5 right-2.5 text-center font-mono text-[10px] tracking-[0.08em] uppercase text-primary/85 bg-background/95 backdrop-blur border border-line rounded-sm- px-2 py-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 truncate"
              >
                {c.name}
              </motion.span>
            </motion.a>
          ))}

          {/* + many more cell */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.04 }}
            transition={springSnappy}
            className="group relative h-[160px] lg:h-[185px] rounded-lg+ bg-gold-gradient text-primary shadow-gold grid place-items-center p-5 cursor-default overflow-hidden"
          >
            <div className="text-center">
              <div className="font-heading font-black text-[1.55rem] leading-none mb-1.5">+ many</div>
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase font-semibold">more clients</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={sectionViewport}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-10 font-mono text-[12px] tracking-[0.16em] uppercase text-secondary-2"
        >
          ◆ click any logo to visit the client's website ◆
        </motion.p>
      </div>
    </section>
  );
}
