import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';
import { useT } from '../../lib/i18n';

type Member = {
  nameKey: string;
  roleKey: string;
  bioKey: string;
  email?: string;
  linkedin?: string;
  photo?: string;
};

const TEAM: Member[] = [
  { nameKey: 'team.name.pending', roleKey: 'team.role.md',    bioKey: 'team.bio.md',    email: 'info@yakuversolutions.com' },
  { nameKey: 'team.name.pending', roleKey: 'team.role.mepf',  bioKey: 'team.bio.mepf',  email: 'info@yakuversolutions.com' },
  { nameKey: 'team.name.pending', roleKey: 'team.role.civil', bioKey: 'team.bio.civil', email: 'info@yakuversolutions.com' },
  { nameKey: 'team.name.pending', roleKey: 'team.role.ops',   bioKey: 'team.bio.ops',   email: 'info@yakuversolutions.com' },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('') || '·';
}

export function Team() {
  const { t } = useT();
  return (
    <section id="team" className="py-24 lg:py-28 bg-background relative overflow-hidden">
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
              {t('team.eyebrow')}
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              {t('team.title.1')}<br />
              <span className="text-gold">{t('team.title.2')}</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            {t('team.lede')}
            <span className="block mt-1 text-[13px] font-mono uppercase tracking-[0.12em] text-gold-deep opacity-70">
              {t('team.lede.pending')}
            </span>
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {TEAM.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={springSnappy}
              className="group relative bg-paper rounded-lg+ border border-line shadow-soft hover:shadow-medium hover:border-gold/30 transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-primary">
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary via-primary-2 to-primary-3">
                  <div className="text-center">
                    <div className="font-heading font-black text-[clamp(3rem,8vw,5rem)] text-gold leading-none">
                      {initials(t(m.nameKey))}
                    </div>
                    <div className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-on-primary/40">
                      {t('team.photo_pending')}
                    </div>
                  </div>
                  <div className="absolute inset-0 paper-grid-dark opacity-30 pointer-events-none" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-gradient" />
              </div>

              <div className="p-5 lg:p-6">
                <h3 className="font-heading font-bold text-[16px] text-primary leading-tight mb-1">
                  {t(m.nameKey)}
                </h3>
                <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-gold-deep font-semibold mb-3">
                  {t(m.roleKey)}
                </div>
                <p className="text-[13.5px] leading-[1.6] text-secondary mb-4">{t(m.bioKey)}</p>

                <div className="flex gap-2 pt-3 border-t border-line">
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      aria-label={`Email ${t(m.nameKey)}`}
                      className="w-8 h-8 grid place-items-center rounded-md+ border border-line text-secondary hover:bg-primary hover:text-on-primary hover:border-primary transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t(m.nameKey)} on LinkedIn`}
                      className="w-8 h-8 grid place-items-center rounded-md+ border border-line text-secondary hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
