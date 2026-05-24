import { motion } from 'motion/react';

const ITEMS = [
  'Architectural Design',
  'Civil Engineering',
  'HVAC Installation',
  'Electrical Systems',
  'Plumbing & Drainage',
  'Fire Detection & Suppression',
  'MEPF Consultancy',
  'Project Management',
  'Commissioning & Maintenance',
];

export function Marquee() {
  // Duplicate items so the loop is seamless
  const reel = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-background-2 border-y border-line overflow-hidden py-4">
      <motion.div
        className="flex gap-14 whitespace-nowrap font-mono text-[12px] tracking-[0.16em] uppercase text-primary"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {reel.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3.5 shrink-0">
            {it} <span className="text-gold text-[10px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
