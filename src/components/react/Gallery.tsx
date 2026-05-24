import { motion } from 'motion/react';
import { staggerFast, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';

import vrfArray from '../../assets/projects/vrf-array-rooftop.jpg';
import brazing from '../../assets/projects/refrigerant-brazing.jpg';
import cassette from '../../assets/projects/ceiling-cassette.jpg';
import splitAc from '../../assets/projects/split-ac-install.jpg';
import vrf1 from '../../assets/projects/vrf-rooftop-01.jpg';
import scaffold from '../../assets/projects/ceiling-tradesman.jpg';
import cassette2 from '../../assets/projects/ceiling-cassette-02.jpg';
import indoor from '../../assets/projects/indoor-unit-install.jpg';

const ITEMS = [
  { src: vrfArray, caption: 'VRF rooftop array · Accra commercial',  span: 'lg:col-span-2 lg:row-span-2' },
  { src: brazing,  caption: 'Refrigerant brazing',                   span: 'lg:col-span-2' },
  { src: cassette, caption: 'Ceiling cassette install',              span: 'lg:col-span-2' },
  { src: splitAc,  caption: 'Split AC install',                      span: 'lg:col-span-2' },
  { src: vrf1,     caption: 'VRF outdoor unit',                      span: 'lg:col-span-2' },
  { src: scaffold, caption: 'Ceiling services · first-fix',          span: 'lg:col-span-2 lg:row-span-2' },
  { src: cassette2,caption: 'Cassette second-fix',                   span: 'lg:col-span-2' },
  { src: indoor,   caption: 'Indoor unit install',                   span: 'lg:col-span-2' },
];

export function Gallery() {
  return (
    <section className="pb-24 lg:pb-28 bg-background">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerFast}
          className="grid grid-cols-2 lg:grid-cols-6 grid-rows-[180px] lg:auto-rows-[180px] gap-3 lg:gap-4"
        >
          {ITEMS.map((it, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.015 }}
              transition={springSnappy}
              className={`group relative rounded-lg+ overflow-hidden bg-primary ${it.span ?? ''}`}
            >
              <motion.img
                src={(it.src as any).src ?? (it.src as unknown as string)}
                alt={it.caption}
                loading="lazy"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-on-primary">
                  {it.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
