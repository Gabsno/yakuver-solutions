import { motion } from 'motion/react';
import { staggerContainer, fadeUp, staggerFast, sectionViewport } from '../lib/motion-presets';

type Status = 'ongoing' | 'completed';
type Row = { idx: string; name: string; desc: string; value: string; status: Status };

// FIXED: Rivonia is Ongoing (per client correction 2026-05-23)
const ROWS: Row[] = [
  { idx: '01', name: 'AU Project',                       desc: 'Commercial & residential — full architectural, civil and MEPF · since Jan 2024',                value: 'GH₵ 25,000,000', status: 'ongoing'  },
  { idx: '02', name: 'ESP Heights',                      desc: 'Commercial & residential development — integrated delivery',                                     value: 'GH₵ 15,000,000', status: 'completed' },
  { idx: '03', name: '4-Villa Housing Project',          desc: 'Residential cluster — architectural, civil & MEP',                                                value: 'GH₵ 4,000,000',  status: 'completed' },
  { idx: '04', name: 'Imaani Homes',                     desc: 'Full MEP installation across residential development',                                            value: 'GH₵ 6,000,000',  status: 'ongoing'  },
  { idx: '05', name: 'DGL Complex',                      desc: 'HVAC & fire-fighting installation',                                                               value: 'GH₵ 6,500,000',  status: 'ongoing'  },
  { idx: '06', name: 'Kempinski Apartment',              desc: 'Fire-fighting system for 13-story apartment building · since Nov 2025',                            value: 'GH₵ 1,000,000',  status: 'ongoing'  },
  { idx: '07', name: 'Oak Apartment, Kumasi',            desc: 'Air-conditioning and fire-fighting system installation · since Aug 2025',                          value: 'GH₵ 700,000',    status: 'ongoing'  },
  { idx: '08', name: '2681 Project · Regus',             desc: 'Design & installation of ventilation, A/C and fire safety — 5-story office, since May 2024',      value: 'GH₵ 2,000,000',  status: 'ongoing'  },
  { idx: '09', name: 'CHU Campus Hospital · Lomé, Togo', desc: 'Two 190 kW chilled-water installations · July → November 2025',                                    value: 'GH₵ 1,500,000',  status: 'ongoing'  },
  { idx: '10', name: 'Rivonia',                          desc: 'Fire-fighting system installation',                                                                value: 'GH₵ 1,820,000',  status: 'ongoing'  },
];

const STATUS_CLASS: Record<Status, string> = {
  ongoing:   'bg-gold/10 text-gold-deep border border-gold/30',
  completed: 'bg-green-500/10 text-green-700 border border-green-500/30',
};

export function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-28 bg-background">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-7">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-end mb-12"
        >
          <motion.div variants={fadeUp}>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-secondary-2 mb-4">
              <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
              Projects · 05
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              A live portfolio<br />
              <span className="text-gold-gradient">across Ghana &amp; Togo.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            Commercial complexes, hospitals, residential apartments and institutional
            buildings. A representative selection of work in commission or recently
            delivered.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerFast}
          className="rounded-lg+ overflow-hidden border border-line bg-paper shadow-soft"
        >
          <div className="hidden lg:grid grid-cols-[60px_1.5fr_2fr_1fr_120px] px-6 py-4 bg-primary text-on-primary/60 font-mono text-[10.5px] tracking-[0.18em] uppercase gap-4">
            <div>#</div>
            <div>Project</div>
            <div>Scope &amp; phase</div>
            <div>Value</div>
            <div className="text-right">Status</div>
          </div>

          {ROWS.map((r) => (
            <motion.div
              key={r.idx}
              variants={fadeUp}
              whileHover={{ backgroundColor: 'rgba(200,147,46,0.06)', paddingLeft: 32 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-[60px_1.5fr_2fr_1fr_120px] gap-2 lg:gap-4 px-6 py-5 lg:py-6 border-b border-line last:border-b-0 items-center transition-all"
            >
              <div className="font-mono text-[12px] text-gold-deep font-semibold">{r.idx}</div>
              <div className="font-heading font-bold text-[16px] text-primary">{r.name}</div>
              <div className="text-[13.5px] text-secondary leading-[1.5]">{r.desc}</div>
              <div className="font-mono font-semibold text-primary text-[14px]">{r.value}</div>
              <div className="lg:text-right">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm- font-mono text-[10px] tracking-[0.12em] uppercase font-semibold ${STATUS_CLASS[r.status]}`}>
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-current"
                    animate={r.status === 'ongoing' ? { opacity: [0.4, 1, 0.4] } : {}}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {r.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
