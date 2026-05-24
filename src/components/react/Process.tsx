import { motion } from 'motion/react';
import { ClipboardList, Pencil, Truck, Wrench, ShieldCheck } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';

type Step = {
  num: string;
  icon: typeof ClipboardList;
  title: string;
  body: string;
  meta: string;
};

const STEPS: Step[] = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Brief & Site Survey',
    body: 'We start with a working session — scope, programme, budget — then a physical site survey to capture conditions, constraints and existing services. The outcome is a written brief everyone signs off.',
    meta: 'Week 1',
  },
  {
    num: '02',
    icon: Pencil,
    title: 'Design & Coordination',
    body: 'Integrated drawings — architectural, structural, MEPF — produced in-house and coordinated to eliminate clashes before procurement. Energy modeling, code compliance, and approvals included.',
    meta: 'Weeks 2–6',
  },
  {
    num: '03',
    icon: Truck,
    title: 'Procurement & Logistics',
    body: 'Direct relationships with VRF, electrical, plumbing and fire-system manufacturers. We size, specify, ship and store materials so the install crew never waits on parts.',
    meta: 'Parallel',
  },
  {
    num: '04',
    icon: Wrench,
    title: 'Installation',
    body: 'In-house trades for civil works, MEPF first-fix and second-fix. Daily quality checks, weekly client walks, snag list tracked from day one — not handed over as a surprise at the end.',
    meta: 'On-programme',
  },
  {
    num: '05',
    icon: ShieldCheck,
    title: 'Commissioning & Handover',
    body: 'Witnessed testing of every system, balanced air & water flow, full O&M manuals, as-built drawings, and operator training. We commission to NFPA, ASHRAE, IET and BS standards.',
    meta: 'Sign-off',
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 lg:py-28 bg-paper relative overflow-hidden">
      <div
        className="absolute -right-[8%] top-1/4 w-[40%] h-[40%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.10), transparent 60%)' }}
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
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-secondary-2 mb-4">
              <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
              How we work · 04
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              Five steps from<br />
              <span className="text-gold-gradient">brief to handover.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            A disciplined sequence that keeps programme and quality under control —
            with the same team accountable from the first sketch through to commissioning.
          </motion.p>
        </motion.div>

        {/* Timeline — desktop horizontal, mobile vertical */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="relative"
        >
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute top-[42px] left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-gold to-transparent origin-left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {STEPS.map((s) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={springSnappy}
                className="relative text-center lg:text-left group"
              >
                {/* Step circle */}
                <div className="relative mx-auto lg:mx-0 mb-5 lg:mb-7 w-[84px] h-[84px]">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gold-gradient"
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    transition={springSnappy}
                  />
                  <div className="absolute inset-[3px] rounded-full bg-paper grid place-items-center">
                    <s.icon className="w-7 h-7 text-gold-deep" strokeWidth={1.8} />
                  </div>
                  {/* Number badge */}
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary text-gold-2 font-mono text-[11px] grid place-items-center font-bold shadow-medium">
                    {s.num}
                  </span>
                </div>

                <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-gold-deep font-semibold mb-2">
                  {s.meta}
                </div>
                <h3 className="font-heading font-bold text-[18px] lg:text-[17px] xl:text-[18.5px] text-primary mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-secondary">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
