import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';

type Member = {
  name: string;
  role: string;
  bio: string;
  /** Optional headshot path; falls back to initials avatar if undefined */
  photo?: string;
  linkedin?: string;
  email?: string;
};

// =============================================================================
// Placeholder team - replace with real names, roles, bios, photos.
// Drop photos in src/assets/team/ and set `photo: teamPhotoNameHere` after import.
// =============================================================================
const TEAM: Member[] = [
  {
    name: 'Name pending',
    role: 'Managing Director · Principal Engineer',
    bio: 'Leads the firm\'s strategy and oversees major project delivery across architecture, civil and MEPF disciplines. Direct contact for complex tenders.',
    email: 'info@yakuversolutions.com',
  },
  {
    name: 'Name pending',
    role: 'Head of MEPF',
    bio: 'Twenty-plus years on mechanical and electrical systems in West Africa. Oversees design, sizing and commissioning for all HVAC, electrical, plumbing and fire scopes.',
    email: 'info@yakuversolutions.com',
  },
  {
    name: 'Name pending',
    role: 'Head of Civil & Architecture',
    bio: 'Civil and structural engineering lead. Coordinates between architectural design intent and what the structure, drainage and ground conditions will allow.',
    email: 'info@yakuversolutions.com',
  },
  {
    name: 'Name pending',
    role: 'Operations Lead',
    bio: 'Runs day-to-day site programmes, in-house trade crews, procurement logistics and quality assurance. The reason projects close on schedule.',
    email: 'info@yakuversolutions.com',
  },
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
              Team
            </div>
            <h2 className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-primary">
              The people<br />
              <span className="text-gold">behind every project.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-secondary text-[16px] leading-[1.65] max-w-[58ch]">
            A small, accountable in-house team of engineers and tradespeople - not a brokerage
            of subcontractors. The people on the drawings are the people on site.
            <span className="block mt-1 text-[13px] font-mono uppercase tracking-[0.12em] text-gold-deep opacity-70">
              ◆ headshots & full bios coming soon
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
          {TEAM.map((m) => (
            <motion.div
              key={m.role}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={springSnappy}
              className="group relative bg-paper rounded-lg+ border border-line shadow-soft hover:shadow-medium hover:border-gold/30 transition-all duration-300 overflow-hidden"
            >
              {/* Photo / initials avatar */}
              <div className="aspect-[4/5] relative overflow-hidden bg-primary">
                {m.photo ? (
                  <img
                    src={(m.photo as any)?.src ?? (m.photo as unknown as string)}
                    alt={`${m.name}, ${m.role}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary via-primary-2 to-primary-3">
                    <div className="text-center">
                      <div className="font-heading font-black text-[clamp(3rem,8vw,5rem)] text-gold leading-none">
                        {initials(m.name)}
                      </div>
                      <div className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-on-primary/40">
                        photo pending
                      </div>
                    </div>
                    {/* Decorative blueprint hatching */}
                    <div className="absolute inset-0 paper-grid-dark opacity-30 pointer-events-none" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-gradient" />
              </div>

              <div className="p-5 lg:p-6">
                <h3 className="font-heading font-bold text-[16px] text-primary leading-tight mb-1">
                  {m.name}
                </h3>
                <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-gold-deep font-semibold mb-3">
                  {m.role}
                </div>
                <p className="text-[13.5px] leading-[1.6] text-secondary mb-4">{m.bio}</p>

                <div className="flex gap-2 pt-3 border-t border-line">
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      aria-label={`Email ${m.name}`}
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
                      aria-label={`${m.name} on LinkedIn`}
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
