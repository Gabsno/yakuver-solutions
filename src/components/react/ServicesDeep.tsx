import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy } from '../../lib/motion-presets';
import { ServiceIcon3D, type IconKind } from './ServiceIcon3D';

type Service = {
  id: string;
  kind: IconKind;
  accent: string;
  name: string;
  lede: string;
  bullets: string[];
  /** Cross-link to projects this service shows up in */
  related?: string;
};

const SERVICES: Service[] = [
  {
    id: 'architecture',
    kind: 'architecture',
    accent: '#c8932e',
    name: 'Architectural Consultancy',
    lede: 'Conceptual design through to construction-issue drawings, planning approvals and material specification — coordinated with structural and MEPF from day one.',
    bullets: [
      'Conceptual & schematic design, mood-boards and material palettes',
      'BIM-coordinated working drawings, sections, elevations and details',
      'Planning, building permit and EPA submissions in Ghana',
      'Interior finish specification and FF&E coordination',
      'Site visits and design-stage value engineering',
    ],
    related: 'Residential clusters · Hospitality refurbishments · Commercial mid-rise',
  },
  {
    id: 'civil',
    kind: 'civil',
    accent: '#c8932e',
    name: 'Civil & Structural Works',
    lede: 'Foundations, RC frame, retaining structures, drainage and site infrastructure — sized and detailed to local codes and verified site conditions.',
    bullets: [
      'Geotechnical interpretation and foundation design',
      'Reinforced-concrete frame, slab and shear-wall design',
      'Retaining structures, basements and waterproofing strategy',
      'Site drainage, soakaways, stormwater attenuation',
      'Roads, paving and external works',
    ],
    related: 'Apartment blocks · Hospital infrastructure · Industrial slabs',
  },
  {
    id: 'hvac',
    kind: 'hvac',
    accent: '#0891b2',
    name: 'HVAC & VRF Systems',
    lede: 'Split, ducted, VRF and chilled-water installations — sized, commissioned and maintained for West African tropical performance.',
    bullets: [
      'Cooling-load calculations and equipment selection',
      'VRF outdoor + indoor unit pairing, refnet branch design',
      'Chilled-water plant rooms with primary/secondary loops',
      'Ducting layouts, diffuser selection and air balancing',
      'Commissioning, witnessed testing and operator handover',
      'Planned-preventive maintenance contracts',
    ],
    related: 'CHU Hospital · Lomé (380 kW chilled-water) · Office VRF retrofits',
  },
  {
    id: 'electrical',
    kind: 'electrical',
    accent: '#0891b2',
    name: 'Electrical Systems',
    lede: 'Distribution boards, containment, lighting, power, LV/MV, generator integration and standby systems — designed for safety, reliability and long-term performance.',
    bullets: [
      'Power distribution from incomer to final circuits (LV/MV)',
      'Lighting layouts with photometric calcs and lux verification',
      'Containment — cable tray, basket, conduit, trunking',
      'Generator sizing, AMF panel and ATS integration',
      'Earthing, lightning protection and surge protection',
      'Low-voltage systems: data, CCTV, access control',
    ],
    related: 'Apartment blocks · Office fit-outs · Industrial installs',
  },
  {
    id: 'plumbing',
    kind: 'plumbing',
    accent: '#0891b2',
    name: 'Plumbing & Drainage',
    lede: 'Hot & cold water, soil & vent, pumped systems, fixture installation, rainwater and grey-water capture — designed to perform from day one and to maintain easily.',
    bullets: [
      'Cold-water, hot-water and pumped boosted-water systems',
      'Soil, vent and waste stack design',
      'Storm-water drainage and rainwater harvesting',
      'Above-ground and below-ground pipework, valves, isolation',
      'Sanitaryware and fixture installation',
    ],
    related: 'Hospitality · Residential clusters · Mixed-use developments',
  },
  {
    id: 'fire',
    kind: 'fire',
    accent: '#dc2626',
    name: 'Fire Protection',
    lede: 'Fire detection, alarm, hose reels, hydrants, sprinklers and suppression — designed to NFPA and Ghana National Fire Service requirements.',
    bullets: [
      'Fire detection (smoke, heat, multi-criteria) and addressable alarm',
      'Hose-reel and hydrant networks with pump-set sizing',
      'Wet/dry riser systems for high-rise',
      'Sprinkler hydraulic design and approval submissions',
      'Kitchen, server room and IT-cabinet suppression',
      'Witnessed commissioning with GNFS',
    ],
    related: 'Kempinski Apartment (13-story) · Oak Apartment · Rivonia',
  },
];

export function ServicesDeep({ base = '/' }: { base?: string }) {
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
                    {String(i + 1).padStart(2, '0')} / {s.kind === 'architecture' || s.kind === 'civil' || s.kind === 'pm' ? 'DESIGN' : 'SYSTEMS'}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading font-black text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] text-primary mb-4">
                  {s.name}
                </h2>
                <p className="text-secondary text-[16px] leading-[1.65] max-w-[66ch] mb-7">
                  {s.lede}
                </p>

                <h3 className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-secondary-2 mb-3">
                  What we do
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-7">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="text-[14.5px] text-secondary leading-[1.55] flex gap-2.5 items-start">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.accent }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {s.related && (
                  <div className="border-t border-line pt-4 mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-secondary-2 mb-1">
                        Recent applications
                      </div>
                      <div className="text-[14px] text-primary font-medium">{s.related}</div>
                    </div>
                    <motion.a
                      href={b + 'projects/'}
                      whileHover={{ x: 3 }}
                      transition={springSnappy}
                      className="inline-flex items-center gap-1.5 font-heading font-semibold text-[14px] text-gold-deep hover:text-gold transition-colors"
                    >
                      See projects <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
