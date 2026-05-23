import { motion } from 'motion/react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../lib/motion-presets';
import { ServiceIcon3D, type IconKind } from './ServiceIcon3D';

type Service = { kind: IconKind; name: string; desc: string };

const ARCH_CIVIL: Service[] = [
  { kind: 'architecture', name: 'Architectural Consultancy', desc: 'Conceptual design, planning approvals, BIM-coordinated drawings and material specification.' },
  { kind: 'civil',        name: 'Civil & Structural Works',  desc: 'Foundations, RC frame, retaining structures, drainage and site infrastructure to local codes.' },
  { kind: 'pm',           name: 'Project Management',        desc: 'Programme, cost and quality control across the full delivery lifecycle, in-house QS reporting.' },
];

const MEPF: Service[] = [
  { kind: 'hvac',       name: 'HVAC & VRF Systems', desc: 'Split, ducted, VRF and chilled-water installations — sized, commissioned and maintained for tropical performance.' },
  { kind: 'electrical', name: 'Electrical Systems', desc: 'Distribution boards, containment, lighting, power, LV/MV, generator integration and standby systems.' },
  { kind: 'plumbing',   name: 'Plumbing & Drainage',desc: 'Hot & cold water, soil & vent, pumped systems, fixture installation, rainwater and grey-water capture.' },
  { kind: 'fire',       name: 'Fire Protection',    desc: 'Fire detection, alarm, hose reels, hydrants, sprinklers and suppression — designed to NFPA / local fire service requirements.' },
];

function Pillar({
  num, title, lede, services, accent, delay = 0,
}: {
  num: string; title: string; lede: string; services: Service[]; accent: string; delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className="relative bg-primary text-on-primary rounded-lg+ p-8 lg:p-10 overflow-hidden border border-primary-3"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: accent }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="font-mono text-[11px] tracking-[0.2em] mb-5" style={{ color: accent }}>
        {num}
      </div>
      <h3 className="font-heading font-bold text-[clamp(1.5rem,2.4vw,2.1rem)] mb-3 text-on-primary">
        {title}
      </h3>
      <p className="text-on-primary/70 text-[15px] leading-[1.6] mb-8 pb-7 border-b border-line-dark">
        {lede}
      </p>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        className="grid gap-7"
      >
        {services.map((s) => (
          <motion.div
            key={s.name}
            variants={fadeUp}
            whileHover={{ x: 4 }}
            transition={springSnappy}
            className="grid grid-cols-[72px_1fr] gap-5 items-start group"
          >
            <ServiceIcon3D kind={s.kind} accent={accent} size={64} />
            <div className="pt-2">
              <div className="font-heading font-bold text-[15.5px] text-on-primary mb-1.5 group-hover:text-gold-3 transition-colors">{s.name}</div>
              <div className="text-[13.5px] text-on-primary/60 leading-[1.6]">{s.desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Disciplines() {
  return (
    <section id="capabilities" className="py-24 lg:py-28 bg-background">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-end mb-14"
        >
          <motion.div variants={fadeUp}>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-secondary-2 mb-4">
              <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
              Capabilities · 01
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              Two disciplines.<br />
              <span className="text-gold-gradient">One accountable team.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            Most projects fail in the seams between consultants, contractors and trades.
            Yakuver closes that gap — architecture, civil and full MEPF delivered by an
            in-house team, coordinated from concept through commissioning.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Pillar
            num="01 / DESIGN & BUILD"
            title="Architectural & Civil Engineering"
            lede="From conceptual planning to site development — integrated architectural design and structural engineering with aesthetic, structural and regulatory rigour."
            services={ARCH_CIVIL}
            accent="#c8932e"
          />
          <Pillar
            num="02 / SYSTEMS"
            title="MEPF Engineering & Installation"
            lede="End-to-end Mechanical, Electrical, Plumbing and Fire systems — designed for energy efficiency, code compliance and long-term reliability in West African conditions."
            services={MEPF}
            accent="#0891b2"
            delay={0.1}
          />
        </motion.div>
      </div>
    </section>
  );
}
