// =============================================================================
// Single source of truth for the Yakuver project portfolio.
// Used by /projects, /projects/[slug], and the homepage's featured-project pull.
// =============================================================================

export type ProjectStatus = 'ongoing' | 'completed';

export interface ProjectCard {
  slug: string;        // empty string for projects without a dedicated case study
  idx: string;
  name: string;
  desc: string;
  value: string;
  status: ProjectStatus;
}

export interface ProjectCaseStudy extends ProjectCard {
  slug: string;       // required
  location: string;
  sector:   string;
  duration: string;
  /** Headline numbers shown as a stats grid on the case study page */
  stats: { num: string; unit?: string; label: string }[];
  /** Short marketing summary (160ch) used in the page meta description */
  summary: string;
  /** Long-form sections of the case study */
  challenge: string;
  approach: string[];   // bulleted steps
  outcome: string;
  /** Image filenames (relative to src/assets/projects/) used in the gallery */
  gallery: string[];
  /** Hero image filename (relative to src/assets/projects/) */
  hero: string;
}

export const PROJECTS: ProjectCard[] = [
  { slug: 'au-project',                idx: '01', name: 'AU Project',                       desc: 'Commercial & residential — full architectural, civil and MEPF · since Jan 2024', value: 'GH₵ 25,000,000', status: 'ongoing'  },
  { slug: 'esp-heights',               idx: '02', name: 'ESP Heights',                      desc: 'Commercial & residential development — integrated delivery',                     value: 'GH₵ 15,000,000', status: 'completed' },
  { slug: '',                          idx: '03', name: '4-Villa Housing Project',          desc: 'Residential cluster — architectural, civil & MEP',                               value: 'GH₵ 4,000,000',  status: 'completed' },
  { slug: '',                          idx: '04', name: 'Imaani Homes',                     desc: 'Full MEP installation across residential development',                           value: 'GH₵ 6,000,000',  status: 'ongoing'  },
  { slug: '',                          idx: '05', name: 'DGL Complex',                      desc: 'HVAC & fire-fighting installation',                                               value: 'GH₵ 6,500,000',  status: 'ongoing'  },
  { slug: 'kempinski',                 idx: '06', name: 'Kempinski Apartment',              desc: 'Fire-fighting system for 13-story apartment building · since Nov 2025',           value: 'GH₵ 1,000,000',  status: 'ongoing'  },
  { slug: '',                          idx: '07', name: 'Oak Apartment, Kumasi',            desc: 'Air-conditioning and fire-fighting system installation · since Aug 2025',         value: 'GH₵ 700,000',    status: 'ongoing'  },
  { slug: '',                          idx: '08', name: '2681 Project · Regus',             desc: 'Design & installation of ventilation, A/C and fire safety — 5-story office, since May 2024', value: 'GH₵ 2,000,000', status: 'ongoing'  },
  { slug: 'chu-hospital',              idx: '09', name: 'CHU Campus Hospital · Lomé, Togo', desc: 'Two 190 kW chilled-water installations · July → November 2025',                   value: 'GH₵ 1,500,000',  status: 'ongoing'  },
  { slug: '',                          idx: '10', name: 'Rivonia',                          desc: 'Fire-fighting system installation',                                               value: 'GH₵ 1,820,000',  status: 'ongoing'  },
];

export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    ...PROJECTS.find((p) => p.slug === 'chu-hospital')!,
    location: 'Lomé, Togo',
    sector:   'Healthcare',
    duration: 'July → November 2025',
    summary:  'A 380 kW chilled-water plant upgrade for the CHU Campus Hospital — two parallel 190 kW chillers, delivered cross-border on a tight clinical-operations programme.',
    stats: [
      { num: '380', unit: 'kW',  label: 'Chilled-water capacity' },
      { num: '2',   unit: '×',   label: '190 kW chillers in parallel' },
      { num: '24',  unit: '/7',  label: 'Operating duty cycle' },
      { num: '5',   unit: 'mo.', label: 'Design → commissioning' },
    ],
    challenge:
      'An operating hospital in a neighbouring country needed a complete chilled-water upgrade — two new 190 kW units installed in parallel, with no disruption to existing wards and rigid programme constraints driven by clinical operations.',
    approach: [
      'In-house design and full BIM coordination with the Lomé site team',
      'Phased commissioning: chiller 1 brought online while chiller 2 was being installed',
      "Cross-border logistics — equipment landed at Lomé port, on-site stores managed",
      "Live BMS integration with the hospital's building management system",
      'Witnessed commissioning with the hospital engineering team',
    ],
    outcome:
      'Both chillers commissioned on schedule. The hospital now runs continuous chilled-water cooling across all clinical areas with full O&M documentation and operator training in place.',
    hero:    'vrf-rooftop-01.jpg',
    gallery: ['vrf-rooftop-01.jpg', 'vrf-array-rooftop.jpg', 'refrigerant-brazing.jpg', 'ceiling-cassette.jpg'],
  },
  {
    ...PROJECTS.find((p) => p.slug === 'au-project')!,
    location: 'Accra',
    sector:   'Commercial + Residential',
    duration: 'January 2024 → ongoing',
    summary:  'Yakuver\'s largest current programme — full architectural, civil and MEPF delivery on a major mixed-use Accra development.',
    stats: [
      { num: 'GH₵ 25M', label: 'Contract value' },
      { num: '6',       label: 'Disciplines on programme' },
      { num: '24+',     unit: 'mo.', label: 'Active duration' },
      { num: '1',       label: 'Accountable team' },
    ],
    challenge:
      'A large mixed-use Accra development needed a single integrated contractor across architecture, civil and MEPF — rather than coordinating six separate firms — to keep programme and quality under control.',
    approach: [
      'In-house architectural and civil design coordinated with MEPF from concept',
      'Phased construction sequenced to client release dates',
      'Weekly QS reporting and snag-list tracking from day one',
      'Single point of contact for the client engineering team',
    ],
    outcome:
      'Project is on programme with civil works substantially complete and MEPF first-fix progressing across multiple buildings. Client has engaged Yakuver for adjacent scope as a result.',
    hero:    'villa-ref.jpg',
    gallery: ['villa-ref.jpg', 'split-ac-install.jpg', 'ceiling-tradesman.jpg', 'indoor-unit-install.jpg'],
  },
  {
    ...PROJECTS.find((p) => p.slug === 'kempinski')!,
    location: 'Accra',
    sector:   'Hospitality / Residential',
    duration: 'November 2025 → ongoing',
    summary:  'Fire-protection system for a 13-story Kempinski apartment building — full detection, alarm, sprinkler and hose-reel coverage to NFPA standards.',
    stats: [
      { num: '13',      unit: 'F',  label: 'Stories covered' },
      { num: 'NFPA',    label: 'Standard' },
      { num: 'GH₵ 1M',  label: 'Contract value' },
    ],
    challenge:
      'A 13-story hospitality apartment building required a fully NFPA-compliant fire protection system — detection, alarm, sprinklers, hose reels and standpipes — sized and installed to GNFS approval.',
    approach: [
      'Hydraulic calculations and equipment selection for sprinkler & standpipe',
      'Addressable detection and alarm with central control panel',
      'Riser installation through every floor with isolation valves at each level',
      'GNFS-witnessed pressure testing and final certification',
    ],
    outcome:
      'Installation is currently in progress. Coordination meetings are weekly with the building developer and GNFS handover is on schedule.',
    hero:    'ceiling-tradesman.jpg',
    gallery: ['ceiling-tradesman.jpg', 'ceiling-cassette-02.jpg', 'indoor-unit-install-02.jpg'],
  },
  {
    ...PROJECTS.find((p) => p.slug === 'esp-heights')!,
    location: 'Accra',
    sector:   'Commercial + Residential',
    duration: 'Completed',
    summary:  'A completed commercial & residential development delivered as an integrated MEPF + civil package — handed over on programme and within budget.',
    stats: [
      { num: 'GH₵ 15M', label: 'Contract value' },
      { num: '✓',       label: 'Delivered on programme' },
    ],
    challenge:
      'Multi-use commercial and residential building needing integrated MEPF, electrical and civil delivery on a tight commercial schedule.',
    approach: [
      'Single-team delivery across architecture, civil and MEPF',
      'Weekly client walks and quality reporting',
      'Phased handover aligned with tenant move-in schedules',
    ],
    outcome:
      'Project handed over on programme. Now in operation; Yakuver retained for maintenance scope.',
    hero:    'split-ac-install.jpg',
    gallery: ['split-ac-install.jpg', 'indoor-unit-install-03.jpg', 'ceiling-cassette.jpg'],
  },
];

export function getCaseStudy(slug: string): ProjectCaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
