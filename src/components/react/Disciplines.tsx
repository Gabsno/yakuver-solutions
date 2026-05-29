import { motion } from 'motion/react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';
import { ServiceIcon3D, type IconKind } from './ServiceIcon3D';
import { useT } from '../../lib/i18n';

type Service = { kind: IconKind; nameKey: string; descKey: string };

const ARCH_CIVIL: Service[] = [
  { kind: 'architecture', nameKey: 'disc.svc.arch',  descKey: 'disc.svc.arch.d' },
  { kind: 'civil',        nameKey: 'disc.svc.civil', descKey: 'disc.svc.civil.d' },
  { kind: 'pm',           nameKey: 'disc.svc.pm',    descKey: 'disc.svc.pm.d' },
];

const MEPF: Service[] = [
  { kind: 'hvac',       nameKey: 'disc.svc.hvac',  descKey: 'disc.svc.hvac.d' },
  { kind: 'electrical', nameKey: 'disc.svc.elec',  descKey: 'disc.svc.elec.d' },
  { kind: 'plumbing',   nameKey: 'disc.svc.plumb', descKey: 'disc.svc.plumb.d' },
  { kind: 'fire',       nameKey: 'disc.svc.fire',  descKey: 'disc.svc.fire.d' },
];

function Pillar({
  numKey, titleKey, ledeKey, services, accent, delay = 0,
}: {
  numKey: string; titleKey: string; ledeKey: string;
  services: Service[]; accent: string; delay?: number;
}) {
  const { t } = useT();
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
        {t(numKey)}
      </div>
      <h3 className="font-heading font-bold text-[clamp(1.5rem,2.4vw,2.1rem)] mb-3 text-on-primary">
        {t(titleKey)}
      </h3>
      <p className="text-on-primary/70 text-[15px] leading-[1.6] mb-8 pb-7 border-b border-line-dark">
        {t(ledeKey)}
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
            key={s.nameKey}
            variants={fadeUp}
            whileHover={{ x: 4 }}
            transition={springSnappy}
            className="grid grid-cols-[72px_1fr] gap-5 items-start group"
          >
            <ServiceIcon3D kind={s.kind} accent={accent} size={64} />
            <div className="pt-2">
              <div className="font-heading font-bold text-[15.5px] text-on-primary mb-1.5 group-hover:text-gold-3 transition-colors">
                {t(s.nameKey)}
              </div>
              <div className="text-[13.5px] text-on-primary/60 leading-[1.6]">
                {t(s.descKey)}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Disciplines() {
  const { t } = useT();
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
              {t('disc.eyebrow')}
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              {t('disc.title.1')}<br />
              <span className="text-gold">{t('disc.title.2')}</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            {t('disc.lede')}
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
            numKey="disc.pillar.1.num"
            titleKey="disc.pillar.1.title"
            ledeKey="disc.pillar.1.lede"
            services={ARCH_CIVIL}
            accent="#c8932e"
          />
          <Pillar
            numKey="disc.pillar.2.num"
            titleKey="disc.pillar.2.title"
            ledeKey="disc.pillar.2.lede"
            services={MEPF}
            accent="#0891b2"
            delay={0.1}
          />
        </motion.div>
      </div>
    </section>
  );
}
