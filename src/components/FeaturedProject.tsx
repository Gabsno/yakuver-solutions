import { motion } from 'motion/react';
import { ArrowUpRight, MapPin, Calendar, Layers } from 'lucide-react';
import vrf from '../assets/projects/vrf-rooftop-01.jpg';
import vrfArray from '../assets/projects/vrf-array-rooftop.jpg';
import brazing from '../assets/projects/refrigerant-brazing.jpg';
import { staggerContainer, fadeUp, slideInLeft, sectionViewport, springSnappy } from '../lib/motion-presets';

const FACTS = [
  { label: 'Location',         value: 'Lomé, Togo',                icon: MapPin },
  { label: 'Programme',        value: 'Jul → Nov 2025',            icon: Calendar },
  { label: 'Scope',            value: 'MEPF · HVAC · Plumbing',    icon: Layers },
];

const STATS = [
  { num: '380', unit: 'kW',  label: 'Chilled-water capacity' },
  { num: '2',   unit: '×',   label: '190 kW chillers in parallel' },
  { num: '24',  unit: '/7',  label: 'Operating duty cycle' },
  { num: '5',   unit: 'mo.', label: 'Design → commissioning' },
];

export function FeaturedProject() {
  return (
    <section id="featured" className="relative py-24 lg:py-28 bg-primary text-on-primary overflow-hidden">
      <div className="absolute inset-0 paper-grid-dark opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div
        className="absolute -right-[10%] top-[5%] w-[50%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.18), transparent 60%)' }}
      />

      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-end mb-14"
        >
          <motion.div variants={fadeUp}>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold-2 mb-4">
              <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-60" />
              Featured project · 06
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-on-primary">
              Cross-border<br />
              <span className="text-gold-gradient">chilled-water plant.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-on-primary/70 text-[16px] leading-[1.65] max-w-[58ch]">
            A 380 kW chilled-water installation for the CHU Campus Hospital in Lomé, Togo —
            two parallel chillers, pumps, headers and BMS controls, delivered through a
            cross-border programme that finished on schedule.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
          {/* LEFT — Image collage */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="relative aspect-[5/6]"
          >
            <motion.div
              variants={slideInLeft}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-xl+ overflow-hidden border border-line-dark shadow-deep"
            >
              <img src={vrf} alt="CHU Hospital — rooftop chiller installation" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.04, rotate: -1 }}
              transition={springSnappy}
              className="absolute -bottom-6 -right-4 w-[55%] aspect-[4/5] rounded-lg+ overflow-hidden border-4 border-primary shadow-deep"
            >
              <img src={vrfArray} alt="CHU Hospital — VRF array detail" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.04, rotate: 2 }}
              transition={springSnappy}
              className="absolute -top-6 -left-4 w-[40%] aspect-square rounded-lg+ overflow-hidden border-4 border-primary shadow-deep"
            >
              <img src={brazing} alt="CHU Hospital — refrigerant brazing" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating value chip */}
            <motion.div
              variants={fadeUp}
              className="absolute bottom-2 left-2 z-10 bg-gold-gradient text-primary px-4 py-3 rounded-md+ shadow-gold"
            >
              <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase font-bold opacity-80">Contract value</div>
              <div className="font-heading font-black text-[1.45rem] leading-none mt-1">GH₵ 1.5M</div>
              <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase mt-1 opacity-80">ongoing</div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={staggerContainer}
            className="lg:pt-8"
          >
            {/* Project facts */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-9">
              {FACTS.map((f) => (
                <div key={f.label} className="p-4 rounded-md+ border border-line-dark bg-on-primary/[0.03]">
                  <div className="flex items-center gap-2 text-gold-2 mb-1.5">
                    <f.icon className="w-3.5 h-3.5" strokeWidth={2} />
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase">{f.label}</span>
                  </div>
                  <div className="font-heading font-bold text-[14px] text-on-primary">{f.value}</div>
                </div>
              ))}
            </motion.div>

            <motion.h3
              variants={fadeUp}
              className="font-heading font-black text-[1.5rem] mb-4 text-on-primary leading-tight"
            >
              The challenge
            </motion.h3>
            <motion.p
              variants={fadeUp}
              className="text-on-primary/70 text-[15.5px] leading-[1.7] mb-7"
            >
              An operating hospital in a neighbouring country needed a complete chilled-water
              upgrade — two new 190 kW units installed in parallel, with no disruption to
              existing wards and rigid programme constraints driven by clinical operations.
            </motion.p>

            <motion.h3
              variants={fadeUp}
              className="font-heading font-black text-[1.5rem] mb-4 text-on-primary leading-tight"
            >
              How we delivered
            </motion.h3>
            <motion.ul variants={fadeUp} className="space-y-3 mb-9">
              {[
                'In-house design and full BIM coordination with Lomé site team',
                'Phased commissioning: chiller 1 brought online while chiller 2 was being installed',
                'Cross-border logistics — equipment landed at Lomé port, on-site stores managed',
                'Live BMS integration with the hospital\'s building management system',
                'Witnessed commissioning with hospital engineering team',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start text-[14.5px] text-on-primary/75 leading-[1.6]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* Stats row */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-line-dark pt-6"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="px-3 first:pl-0 border-l border-line-dark first:border-l-0"
                >
                  <div className="font-heading text-[clamp(1.6rem,3.2vw,2.4rem)] font-black leading-none tracking-[-0.02em] text-on-primary">
                    {s.num}
                    <span className="text-gold-2 text-[0.55em] ml-0.5 font-bold">{s.unit}</span>
                  </div>
                  <div className="mt-2 font-mono text-[10.5px] tracking-[0.14em] uppercase text-on-primary/55 leading-tight">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#projects"
              whileHover={{ x: 4 }}
              transition={springSnappy}
              className="inline-flex items-center gap-2 mt-9 text-gold-2 font-heading font-semibold text-[14.5px] hover:text-gold-3 transition-colors group"
            >
              See the rest of the portfolio
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
