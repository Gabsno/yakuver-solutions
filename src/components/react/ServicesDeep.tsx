import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';
import { ServiceIcon3D, type IconKind } from './ServiceIcon3D';
import { useT } from '../../lib/i18n';

type Service = {
  id: string;
  kind: IconKind;
  accent: string;
  catKey: 'svc.cat.design' | 'svc.cat.systems';
  nameKey: string;
  ledeKey: string;
  bulletKeys: string[];
  relKey: string;
};

const SERVICES: Service[] = [
  {
    id: 'architecture', kind: 'architecture', accent: '#c8932e', catKey: 'svc.cat.design',
    nameKey: 'disc.svc.arch', ledeKey: 'svc.svc1.lede',
    bulletKeys: ['svc.svc1.b1', 'svc.svc1.b2', 'svc.svc1.b3', 'svc.svc1.b4', 'svc.svc1.b5'],
    relKey: 'svc.svc1.rel',
  },
  {
    id: 'civil', kind: 'civil', accent: '#c8932e', catKey: 'svc.cat.design',
    nameKey: 'disc.svc.civil', ledeKey: 'svc.svc2.lede',
    bulletKeys: ['svc.svc2.b1', 'svc.svc2.b2', 'svc.svc2.b3', 'svc.svc2.b4', 'svc.svc2.b5'],
    relKey: 'svc.svc2.rel',
  },
  {
    id: 'hvac', kind: 'hvac', accent: '#0891b2', catKey: 'svc.cat.systems',
    nameKey: 'disc.svc.hvac', ledeKey: 'svc.svc3.lede',
    bulletKeys: ['svc.svc3.b1', 'svc.svc3.b2', 'svc.svc3.b3', 'svc.svc3.b4', 'svc.svc3.b5', 'svc.svc3.b6', 'svc.svc3.b7'],
    relKey: 'svc.svc3.rel',
  },
  {
    id: 'electrical', kind: 'electrical', accent: '#0891b2', catKey: 'svc.cat.systems',
    nameKey: 'disc.svc.elec', ledeKey: 'svc.svc4.lede',
    bulletKeys: ['svc.svc4.b1', 'svc.svc4.b2', 'svc.svc4.b3', 'svc.svc4.b4', 'svc.svc4.b5', 'svc.svc4.b6'],
    relKey: 'svc.svc4.rel',
  },
  {
    id: 'plumbing', kind: 'plumbing', accent: '#0891b2', catKey: 'svc.cat.systems',
    nameKey: 'disc.svc.plumb', ledeKey: 'svc.svc5.lede',
    bulletKeys: ['svc.svc5.b1', 'svc.svc5.b2', 'svc.svc5.b3', 'svc.svc5.b4', 'svc.svc5.b5'],
    relKey: 'svc.svc5.rel',
  },
  {
    id: 'fire', kind: 'fire', accent: '#dc2626', catKey: 'svc.cat.systems',
    nameKey: 'disc.svc.fire', ledeKey: 'svc.svc6.lede',
    bulletKeys: ['svc.svc6.b1', 'svc.svc6.b2', 'svc.svc6.b3', 'svc.svc6.b4', 'svc.svc6.b5', 'svc.svc6.b6'],
    relKey: 'svc.svc6.rel',
  },
];

export function ServicesDeep({ base = '/' }: { base?: string }) {
  const { t } = useT();
  const b = base.endsWith('/') ? base : base + '/';
  return (
    <section className="py-20 lg:py-28 bg-paper">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid gap-16 lg:gap-20"
        >
          {SERVICES.map((s, i) => (
            <motion.article
              id={s.id}
              key={s.id}
              variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-14 pb-14 lg:pb-16 border-b border-line last:border-b-0"
            >
              <div className="flex lg:flex-col items-start gap-5 lg:gap-6">
                <ServiceIcon3D kind={s.kind} accent={s.accent} size={84} />
                <div className="flex flex-col gap-1">
                  <div className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: s.accent }}>
                    {String(i + 1).padStart(2, '0')} / {t(s.catKey)}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-black text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] text-primary mb-4">
                  {t(s.nameKey)}
                </h2>
                <p className="text-secondary text-[16px] leading-[1.65] max-w-[66ch] mb-7">
                  {t(s.ledeKey)}
                </p>

                <h3 className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-secondary-2 mb-3">
                  {t('svc.what_we_do')}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-7">
                  {s.bulletKeys.map((k) => (
                    <li key={k} className="text-[14.5px] text-secondary leading-[1.55] flex gap-2.5 items-start">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.accent }} />
                      <span>{t(k)}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line pt-4 mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-secondary-2 mb-1">
                      {t('svc.recent')}
                    </div>
                    <div className="text-[14px] text-primary font-medium">{t(s.relKey)}</div>
                  </div>
                  <motion.a
                    href={b + 'projects/'}
                    whileHover={{ x: 3 }}
                    transition={springSnappy}
                    className="inline-flex items-center gap-1.5 font-heading font-semibold text-[14px] text-gold-deep hover:text-gold transition-colors"
                  >
                    {t('svc.see_projects')} <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
