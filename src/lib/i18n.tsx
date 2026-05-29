import { useEffect, useSyncExternalStore } from 'react';

// =============================================================================
// Provider-free i18n - works across Astro page navigations and inside any React
// island. State lives in localStorage and broadcasts via a 'storage' event so
// all islands on the page stay in sync.
//
// EN dictionary is the source of truth; FR dictionary is sparse and falls back
// to EN at lookup time. Add keys to either dictionary as needed.
// =============================================================================

export type Lang = 'en' | 'fr';

type Dict = Record<string, string>;

const EN: Dict = {
  // Nav
  'nav.home':         'Home',
  'nav.about':        'About',
  'nav.services':     'Services',
  'nav.projects':     'Projects',
  'nav.contact':      'Contact',
  'nav.cta':          'Start a project',
  'nav.availability': 'Accepting Q2 / Q3 2026 projects',
  'nav.locations':    'Accra · Kumasi · Lomé',

  // Hero
  'hero.eyebrow':     'Yakuver Solutions LTD · Est. Ghana',
  'hero.title.1':     'Architecture, Civil &',
  'hero.title.2':     'MEPF',
  'hero.title.3':     'delivered',
  'hero.title.4':     'as one.',
  'hero.lede':
    'A multidisciplinary engineering and construction firm building durable, well-designed environments across Ghana and West Africa. From foundations to commissioning - architecture, civil, mechanical, electrical, plumbing and fire protection under one disciplined team.',
  'hero.tag.arch':       'Architecture',
  'hero.tag.civil':      'Civil Engineering',
  'hero.tag.hvac':       'HVAC & R',
  'hero.tag.electrical': 'Electrical',
  'hero.tag.plumbing':   'Plumbing',
  'hero.tag.fire':       'Fire Protection',
  'hero.cta.primary':   'Request a quotation',
  'hero.cta.secondary': 'See our projects',
  'hero.meta.live':     'live projects',
  'hero.meta.portfolio':'active portfolio',
  'hero.meta.footprint':'footprint',
  'hero.chip.residential': 'Residential · Modern villa',
  'hero.chip.cluster':     '4-Villa cluster · Accra',
  'hero.stamp.in':         'IN COMMISSION',
  'hero.stamp.activeportfolio': 'active portfolio',
  'hero.disciplineMeta':   'ARCHITECTURE · CIVIL · MEPF',
  'hero.disciplineLabel':  'All six disciplines',
  'hero.disciplineSub':    'one accountable team',

  // WhatsApp
  'wa.eyebrow':  'Quick chat',
  'wa.title':    'Talk to the Yakuver team',
  'wa.body':     'Send scope, drawings or a sketch on WhatsApp - we typically reply within an hour during work hours.',
  'wa.btn':      'Open WhatsApp →',

  // Contact page
  'contact.label':        'Contact',
  'contact.title.1':      "Let's talk about",
  'contact.title.2':      'your project.',
  'contact.lede':
    "Whether it's a 4-villa cluster, a 13-story tower or a chilled-water hospital retrofit, send the scope, drawings or sketch and we'll come back within 24 hours with a route forward.",
  'contact.row.mobile':   'Mobile',
  'contact.row.office':   'Office',
  'contact.row.email':    'Email',
  'contact.row.web':      'Web',
  'contact.form.eyebrow': 'Request a quote',
  'contact.form.title':   'Tell us about your project.',
  'contact.form.lede':    "Quick intake. We'll come back within 24 hours.",
  'contact.form.name':    'Your name *',
  'contact.form.email':   'Email *',
  'contact.form.scope':   'Scope *',
  'contact.form.message': 'Tell us about the project: location, size, programme *',
  'contact.form.send':    'Send via email',
  'contact.form.sending': 'Sending...',
  'contact.form.sent.title': 'Thanks. Got it.',
  'contact.form.sent.body':  "We'll reply within 24 hours.",
  'contact.form.fallback':   'Opens your email client or call',

  // ---- Stats prose ----
  'stats.line.1': 'Right now we have',
  'stats.line.2': 'live builds in commission across',
  'stats.geo':    'Ghana and Togo',
  'stats.line.3': ', adding up to roughly',
  'stats.line.4': 'in active scope.',
  'stats.qualifier':
    'Architecture, civil, mechanical, electrical, plumbing and fire protection: six disciplines under one accountable team. The same people on the drawings are the people on site.',
  'stats.see_portfolio': 'See the portfolio',

  // ---- Disciplines (Capabilities preview) ----
  'disc.eyebrow':   'Capabilities',
  'disc.title.1':   'Two disciplines.',
  'disc.title.2':   'One accountable team.',
  'disc.lede':
    "Most projects fail in the seams between consultants, contractors and trades. Yakuver closes that gap: architecture, civil and full MEPF delivered by an in-house team, coordinated from concept through commissioning.",
  'disc.pillar.1.num':   '01 / DESIGN & BUILD',
  'disc.pillar.1.title': 'Architectural & Civil Engineering',
  'disc.pillar.1.lede':
    'From conceptual planning to site development: integrated architectural design and structural engineering with aesthetic, structural and regulatory rigour.',
  'disc.pillar.2.num':   '02 / SYSTEMS',
  'disc.pillar.2.title': 'MEPF Engineering & Installation',
  'disc.pillar.2.lede':
    'End-to-end Mechanical, Electrical, Plumbing and Fire systems: designed for energy efficiency, code compliance and long-term reliability in West African conditions.',
  'disc.svc.arch':   'Architectural Consultancy',
  'disc.svc.arch.d': 'Conceptual design, planning approvals, BIM-coordinated drawings and material specification.',
  'disc.svc.civil':  'Civil & Structural Works',
  'disc.svc.civil.d':'Foundations, RC frame, retaining structures, drainage and site infrastructure to local codes.',
  'disc.svc.pm':     'Project Management',
  'disc.svc.pm.d':   'Programme, cost and quality control across the full delivery lifecycle, in-house QS reporting.',
  'disc.svc.hvac':   'HVAC & R Systems',
  'disc.svc.hvac.d': 'Heating, ventilation, air-conditioning and refrigeration: splits, ducted, VRF, chilled water and commercial refrigeration, sized and commissioned for tropical performance.',
  'disc.svc.elec':   'Electrical Systems',
  'disc.svc.elec.d': 'Distribution boards, containment, lighting, power, LV/MV, generator integration and standby systems.',
  'disc.svc.plumb':  'Plumbing & Drainage',
  'disc.svc.plumb.d':'Hot & cold water, soil & vent, pumped systems, fixture installation, rainwater and grey-water capture.',
  'disc.svc.fire':   'Fire Protection',
  'disc.svc.fire.d': 'Fire detection, alarm, hose reels, hydrants, sprinklers and suppression: designed to NFPA / local fire service requirements.',

  // ---- Anatomy / About panel ----
  'about.eyebrow':       'About',
  'about.title.1':       'A firm built on',
  'about.title.accent':  'engineering, not on excuses.',
  'about.lede':
    "Yakuver Solutions LTD is a multidisciplinary firm with a strong focus on Architectural and Civil Engineering, delivering well-designed, durable and sustainable built environments. We provide integrated services from planning and construction to MEPF systems: including HVAC, electrical, plumbing and fire protection, ensuring safety, efficiency and high performance across every project.",
  'about.mission.eyebrow': 'Mission',
  'about.mission.title':   'Integrated engineering that transcends conventional thinking.',
  'about.mission.body':    'Deliver innovative architectural, civil and MEPF solutions that ensure client satisfaction through exceptional service and integrated design excellence.',
  'about.vision.eyebrow':  'Vision',
  'about.vision.title':    "The leading multidisciplinary firm in West Africa's built environment.",
  'about.vision.body':     'Delivering cutting-edge built environments with excellence and fostering long-term client partnerships through holistic engineering and design.',
  'about.see_projects':    "See what we've delivered",
  'about.caption':         'Rooftop VRF condenser · Accra commercial · commissioning',

  // ---- Beliefs ----
  'beliefs.eyebrow':  'Core Beliefs',
  'beliefs.title.1':  "We don't define our beliefs.",
  'beliefs.title.2':  'We live them.',
  'beliefs.lede':     'Three principles govern every drawing we issue, every fitting we install and every conversation with a client. They are non-negotiable.',
  'beliefs.1.num':    '01 / INNOVATION',
  'beliefs.1.title':  'Forward-thinking, by default.',
  'beliefs.1.body':   'We embrace new technologies and continuously explore better methods, materials and systems to stay ahead in a rapidly evolving construction landscape.',
  'beliefs.2.num':    '02 / PRECISION',
  'beliefs.2.title':  'Every detail matters.',
  'beliefs.2.body':   'Our work is defined by accuracy, consistency, and a commitment to delivering high-quality results without compromise: from setting out to snag-list close-out.',
  'beliefs.3.num':    '03 / CLIENT SATISFACTION',
  'beliefs.3.title':  'Tailored. Communicated. Delivered.',
  'beliefs.3.body':   "We prioritise our clients' needs, ensuring clear communication, tailored solutions, and a seamless experience from start to finish: and a building that performs after handover.",

  // ---- Clients ----
  'clients.eyebrow': 'Clients',
  'clients.title.1': 'Trusted by institutions,',
  'clients.title.2': 'developers & industry.',
  'clients.lede':
    "Government, hospitality, manufacturing, education, religious institutions and private developers: a cross-section of Ghana's built environment.",
  'clients.more':    '+ many',
  'clients.more.lbl':'more clients',
  'clients.hint':    "click any logo to visit the client's website",

  // ---- Closing CTA strip on home ----
  'cta.eyebrow':  'Ready to start?',
  'cta.title.1':  'One brief in.',
  'cta.title.2':  'One responsible team out.',
  'cta.body':
    "Send your scope, drawings or a sketch. We come back within 24 hours with a route forward: engineered, costed and programme-ready.",
  'cta.primary':  'Request a quotation',
  'cta.secondary':'See our projects',

  // ---- Process (How We Work) ----
  'process.eyebrow':  'How we work',
  'process.title.1':  'Five steps from',
  'process.title.2':  'brief to handover.',
  'process.lede':
    'A disciplined sequence that keeps programme and quality under control: with the same team accountable from the first sketch through to commissioning.',
  'process.1.title':  'Brief & Site Survey',
  'process.1.body':
    'We start with a working session: scope, programme, budget. Then a physical site survey to capture conditions, constraints and existing services. The outcome is a written brief everyone signs off.',
  'process.1.meta':   'Week 1',
  'process.2.title':  'Design & Coordination',
  'process.2.body':
    'Integrated drawings (architectural, structural, MEPF) produced in-house and coordinated to eliminate clashes before procurement. Energy modeling, code compliance, and approvals included.',
  'process.2.meta':   'Weeks 2-6',
  'process.3.title':  'Procurement & Logistics',
  'process.3.body':
    'Direct relationships with VRF, electrical, plumbing and fire-system manufacturers. We size, specify, ship and store materials so the install crew never waits on parts.',
  'process.3.meta':   'Parallel',
  'process.4.title':  'Installation',
  'process.4.body':
    'In-house trades for civil works, MEPF first-fix and second-fix. Daily quality checks, weekly client walks, snag list tracked from day one - not handed over as a surprise at the end.',
  'process.4.meta':   'On-programme',
  'process.5.title':  'Commissioning & Handover',
  'process.5.body':
    'Witnessed testing of every system, balanced air & water flow, full O&M manuals, as-built drawings, and operator training. We commission to NFPA, ASHRAE, IET and BS standards.',
  'process.5.meta':   'Sign-off',

  // ---- FeaturedProject (CHU Hospital home highlight) ----
  'feat.eyebrow':   'Featured project',
  'feat.title.1':   'Cross-border',
  'feat.title.2':   'chilled-water plant.',
  'feat.lede':
    'A 380 kW chilled-water installation for the CHU Campus Hospital in Lomé, Togo: two parallel chillers, pumps, headers and BMS controls, delivered through a cross-border programme that finished on schedule.',
  'feat.location':  'Location',
  'feat.location.v':'Lomé, Togo',
  'feat.programme': 'Programme',
  'feat.programme.v':'Jul → Nov 2025',
  'feat.scope':     'Scope',
  'feat.scope.v':   'MEPF · HVAC · Plumbing',
  'feat.contract':  'Contract value',
  'feat.status':    'ongoing',
  'feat.challenge': 'The challenge',
  'feat.challenge.body':
    "An operating hospital in a neighbouring country needed a complete chilled-water upgrade: two new 190 kW units installed in parallel, with no disruption to existing wards and rigid programme constraints driven by clinical operations.",
  'feat.approach':  'How we delivered',
  'feat.approach.1':'In-house design and full BIM coordination with Lomé site team',
  'feat.approach.2':'Phased commissioning: chiller 1 brought online while chiller 2 was being installed',
  'feat.approach.3':'Cross-border logistics: equipment landed at Lomé port, on-site stores managed',
  'feat.approach.4':"Live BMS integration with the hospital's building management system",
  'feat.approach.5':'Witnessed commissioning with hospital engineering team',
  'feat.stat.1.lbl':'Chilled-water capacity',
  'feat.stat.2.lbl':'190 kW chillers in parallel',
  'feat.stat.3.lbl':'Operating duty cycle',
  'feat.stat.4.lbl':'Design → commissioning',
  'feat.see_more':  'See the rest of the portfolio',

  // ---- Testimonials ----
  'test.eyebrow':         'In their words',
  'test.title.1':         'What clients say',
  'test.title.2':         'about working with us.',
  'test.lede':            'Selected feedback from a cross-section of recent projects.',
  'test.lede.pending':    '◆ live quotes coming soon: pending client approval',
  'test.role.director':   'Project Director',
  'test.role.engineer':   'Facility Engineer',
  'test.role.owner':      'Owner',
  'test.co.au':           'AU Project',
  'test.co.chu':          'CHU Hospital · Lomé',
  'test.co.residential':  'Residential development',
  'test.name.pending':    'Client name pending',
  'test.quote.1':
    "Yakuver took our full MEP scope from drawings to commissioning and didn't miss a single milestone. The level of coordination between their architectural, electrical and HVAC teams meant we never had to chase three separate contractors: they brought one programme and owned the result.",
  'test.quote.2':
    "Bringing in a Ghanaian team for a cross-border chilled-water install was a risk on paper, but the CHU plant was commissioned, witnessed and handed over on programme, and our facility team had full O&M documentation from day one. That's the difference.",
  'test.quote.3':
    "What we appreciated most was the discipline. Daily quality checks, weekly walks, snag list updated in real time: by the time we got to handover there were no surprises. We've already engaged them for the next phase.",

  // ---- Team ----
  'team.eyebrow':         'Team',
  'team.title.1':         'The people',
  'team.title.2':         'behind every project.',
  'team.lede':
    'A small, accountable in-house team of engineers and tradespeople: not a brokerage of subcontractors. The people on the drawings are the people on site.',
  'team.lede.pending':    '◆ headshots & full bios coming soon',
  'team.name.pending':    'Name pending',
  'team.role.md':         'Managing Director · Principal Engineer',
  'team.role.mepf':       'Head of MEPF',
  'team.role.civil':      'Head of Civil & Architecture',
  'team.role.ops':        'Operations Lead',
  'team.bio.md':
    "Leads the firm's strategy and oversees major project delivery across architecture, civil and MEPF disciplines. Direct contact for complex tenders.",
  'team.bio.mepf':
    'Twenty-plus years on mechanical and electrical systems in West Africa. Oversees design, sizing and commissioning for all HVAC, electrical, plumbing and fire scopes.',
  'team.bio.civil':
    'Civil and structural engineering lead. Coordinates between architectural design intent and what the structure, drainage and ground conditions will allow.',
  'team.bio.ops':
    'Runs day-to-day site programmes, in-house trade crews, procurement logistics and quality assurance. The reason projects close on schedule.',
  'team.photo_pending':   'photo pending',

  // ---- ServicesDeep ----
  'svc.what_we_do':       'What we do',
  'svc.recent':           'Recent applications',
  'svc.see_projects':     'See projects',
  'svc.cat.design':       'DESIGN',
  'svc.cat.systems':      'SYSTEMS',
  'svc.svc1.lede':
    'Conceptual design through to construction-issue drawings, planning approvals and material specification: coordinated with structural and MEPF from day one.',
  'svc.svc1.b1':'Conceptual & schematic design, mood-boards and material palettes',
  'svc.svc1.b2':'BIM-coordinated working drawings, sections, elevations and details',
  'svc.svc1.b3':'Planning, building permit and EPA submissions in Ghana',
  'svc.svc1.b4':'Interior finish specification and FF&E coordination',
  'svc.svc1.b5':'Site visits and design-stage value engineering',
  'svc.svc1.rel':'Residential clusters · Hospitality refurbishments · Commercial mid-rise',
  'svc.svc2.lede':
    'Foundations, RC frame, retaining structures, drainage and site infrastructure: sized and detailed to local codes and verified site conditions.',
  'svc.svc2.b1':'Geotechnical interpretation and foundation design',
  'svc.svc2.b2':'Reinforced-concrete frame, slab and shear-wall design',
  'svc.svc2.b3':'Retaining structures, basements and waterproofing strategy',
  'svc.svc2.b4':'Site drainage, soakaways, stormwater attenuation',
  'svc.svc2.b5':'Roads, paving and external works',
  'svc.svc2.rel':'Apartment blocks · Hospital infrastructure · Industrial slabs',
  'svc.svc3.lede':
    'Split, ducted, VRF and chilled-water installations: sized, commissioned and maintained for West African tropical performance.',
  'svc.svc3.b1':'Cooling-load calculations and equipment selection',
  'svc.svc3.b2':'VRF outdoor + indoor unit pairing, refnet branch design',
  'svc.svc3.b3':'Chilled-water plant rooms with primary/secondary loops',
  'svc.svc3.b4':'Commercial refrigeration: cold rooms, walk-ins, blast chillers',
  'svc.svc3.b5':'Ducting layouts, diffuser selection and air balancing',
  'svc.svc3.b6':'Commissioning, witnessed testing and operator handover',
  'svc.svc3.b7':'Planned-preventive maintenance contracts',
  'svc.svc3.rel':'CHU Hospital · Lomé (380 kW chilled-water) · Office VRF retrofits',
  'svc.svc4.lede':
    'Distribution boards, containment, lighting, power, LV/MV, generator integration and standby systems: designed for safety, reliability and long-term performance.',
  'svc.svc4.b1':'Power distribution from incomer to final circuits (LV/MV)',
  'svc.svc4.b2':'Lighting layouts with photometric calcs and lux verification',
  'svc.svc4.b3':'Containment: cable tray, basket, conduit, trunking',
  'svc.svc4.b4':'Generator sizing, AMF panel and ATS integration',
  'svc.svc4.b5':'Earthing, lightning protection and surge protection',
  'svc.svc4.b6':'Low-voltage systems: data, CCTV, access control',
  'svc.svc4.rel':'Apartment blocks · Office fit-outs · Industrial installs',
  'svc.svc5.lede':
    'Hot & cold water, soil & vent, pumped systems, fixture installation, rainwater and grey-water capture: designed to perform from day one and to maintain easily.',
  'svc.svc5.b1':'Cold-water, hot-water and pumped boosted-water systems',
  'svc.svc5.b2':'Soil, vent and waste stack design',
  'svc.svc5.b3':'Storm-water drainage and rainwater harvesting',
  'svc.svc5.b4':'Above-ground and below-ground pipework, valves, isolation',
  'svc.svc5.b5':'Sanitaryware and fixture installation',
  'svc.svc5.rel':'Hospitality · Residential clusters · Mixed-use developments',
  'svc.svc6.lede':
    'Fire detection, alarm, hose reels, hydrants, sprinklers and suppression: designed to NFPA and Ghana National Fire Service requirements.',
  'svc.svc6.b1':'Fire detection (smoke, heat, multi-criteria) and addressable alarm',
  'svc.svc6.b2':'Hose-reel and hydrant networks with pump-set sizing',
  'svc.svc6.b3':'Wet/dry riser systems for high-rise',
  'svc.svc6.b4':'Sprinkler hydraulic design and approval submissions',
  'svc.svc6.b5':'Kitchen, server room and IT-cabinet suppression',
  'svc.svc6.b6':'Witnessed commissioning with GNFS',
  'svc.svc6.rel':'Kempinski Apartment (13-story) · Oak Apartment · Rivonia',

  // ---- Footer ----
  'footer.tagline':
    'Multidisciplinary architecture, civil engineering and MEPF contractor delivering integrated projects across Ghana & West Africa.',
  'footer.col.sitemap':       'Sitemap',
  'footer.col.capabilities':  'Capabilities',
  'footer.col.contact':       'Contact',
  'footer.link.home':         'Home',
  'footer.link.about':        'About',
  'footer.link.services':     'Services',
  'footer.link.projects':     'Projects',
  'footer.link.contact':      'Contact',
  'footer.cap.arch':          'Architectural design',
  'footer.cap.civil':         'Civil engineering',
  'footer.cap.hvac':          'HVAC & R',
  'footer.cap.electrical':    'Electrical systems',
  'footer.cap.plumbing':      'Plumbing & drainage',
  'footer.cap.fire':          'Fire protection',
  'footer.locations':         'Accra · Kumasi · Lomé',
  'footer.rights':            'All rights reserved.',
  'footer.tagline.short':     'Architecture · Civil · MEPF - Delivered as one.',

  // ---- PageHero (sub-page hero) ----
  'crumb.home':               'Home',
  'crumb.about':              'About',
  'crumb.services':           'Services',
  'crumb.projects':           'Projects',
  'crumb.contact':            'Contact',
  'page.about.eyebrow':       'About',
  'page.about.title':         'A firm built on engineering,',
  'page.about.accent':        'not on excuses.',
  'page.about.lede':
    'Yakuver Solutions LTD is a multidisciplinary firm with a strong focus on Architectural and Civil Engineering, delivering well-designed, durable and sustainable built environments. We provide integrated services from planning and construction to MEPF systems: HVAC, electrical, plumbing and fire protection.',
  'page.services.eyebrow':    'Services',
  'page.services.title':      'Six disciplines.',
  'page.services.accent':     'One accountable team.',
  'page.services.lede':
    "Architecture, civil and full MEPF: designed, procured, installed and commissioned in-house. Below is a deeper look at each capability and where we've applied it.",
  'page.projects.eyebrow':    'Projects',
  'page.projects.title':      'A live portfolio',
  'page.projects.accent':     'across Ghana & Togo.',
  'page.projects.lede':
    'Commercial complexes, hospitals, residential apartments and institutional buildings. A representative selection of work in commission or recently delivered.',
  'page.contact.eyebrow':     'Contact',
  'page.contact.title':       "Let's talk about",
  'page.contact.accent':      'your project.',
  'page.contact.lede':
    "Whether it's a 4-villa cluster, a 13-story tower or a chilled-water hospital retrofit: send the scope, drawings or sketch and we'll come back within 24 hours with a route forward.",

  // ---- Contact page offices ----
  'contact.where':            'Where we work',
  'contact.where.title.1':    'Three cities.',
  'contact.where.title.2':    'One responsive team.',
  'contact.office.accra':     'Accra',
  'contact.office.accra.c':   'Ghana - HQ',
  'contact.office.accra.n':   'Engineering, project management, principal team',
  'contact.office.kumasi':    'Kumasi',
  'contact.office.kumasi.c':  'Ghana',
  'contact.office.kumasi.n':  'Active site presence - Oak Apartment + sister projects',
  'contact.office.lome':      'Lomé',
  'contact.office.lome.c':    'Togo',
  'contact.office.lome.n':    'Cross-border delivery - CHU Hospital chilled-water plant',

  // ---- Services quick-link nav ----
  'svc.quick.arch':           'Architecture',
  'svc.quick.civil':          'Civil & Structural',
  'svc.quick.hvac':           'HVAC & R',
  'svc.quick.electrical':     'Electrical',
  'svc.quick.plumbing':       'Plumbing',
  'svc.quick.fire':           'Fire Protection',

  // ---- 404 ----
  'err.status':               'Error 404 · Not found',
  'err.heading':              '404',
  'err.title':                'Lost on site.',
  'err.body':
    "That page isn't in our drawings. Head back to the homepage or drop us a line and we'll point you the right way.",
  'err.home':                 'Take me home',
  'err.email':                'Email the team',
};

const FR: Dict = {
  // ---- Nav ----
  'nav.home':         'Accueil',
  'nav.about':        'À propos',
  'nav.services':     'Services',
  'nav.projects':     'Projets',
  'nav.contact':      'Contact',
  'nav.cta':          'Démarrer un projet',
  'nav.availability': 'Projets ouverts T2 / T3 2026',
  'nav.locations':    'Accra · Kumasi · Lomé',

  // ---- Hero ----
  'hero.eyebrow':     'Yakuver Solutions LTD · Basée au Ghana',
  'hero.title.1':     'Architecture, Génie civil &',
  'hero.title.2':     'MEPF',
  'hero.title.3':     'livrés',
  'hero.title.4':     "comme un seul.",
  'hero.lede':
    "Un cabinet multidisciplinaire d'ingénierie et de construction qui bâtit des environnements durables et bien conçus à travers le Ghana et l'Afrique de l'Ouest. Des fondations à la mise en service: architecture, génie civil, mécanique, électricité, plomberie et protection incendie au sein d'une seule équipe disciplinée.",
  'hero.tag.arch':       'Architecture',
  'hero.tag.civil':      'Génie civil',
  'hero.tag.hvac':       'CVC & R',
  'hero.tag.electrical': 'Électricité',
  'hero.tag.plumbing':   'Plomberie',
  'hero.tag.fire':       'Protection incendie',
  'hero.cta.primary':   'Demander un devis',
  'hero.cta.secondary': 'Voir nos projets',
  'hero.meta.live':     'projets en cours',
  'hero.meta.portfolio':'portefeuille actif',
  'hero.meta.footprint':'présence',
  'hero.chip.residential':     'Résidentiel · Villa moderne',
  'hero.chip.cluster':         'Lotissement 4 villas · Accra',
  'hero.stamp.in':             'EN COURS',
  'hero.stamp.activeportfolio':'portefeuille actif',
  'hero.disciplineMeta':       'ARCHITECTURE · GÉNIE CIVIL · MEPF',
  'hero.disciplineLabel':      'Les six disciplines',
  'hero.disciplineSub':        'une seule équipe responsable',

  // ---- WhatsApp ----
  'wa.eyebrow':  'Chat rapide',
  'wa.title':    "Parlez à l'équipe Yakuver",
  'wa.body':     'Envoyez périmètre, plans ou croquis sur WhatsApp. Réponse généralement sous une heure en journée.',
  'wa.btn':      'Ouvrir WhatsApp →',

  // ---- Stats prose ----
  'stats.line.1': 'Aujourd\'hui nous avons',
  'stats.line.2': 'chantiers en cours à travers',
  'stats.geo':    'le Ghana et le Togo',
  'stats.line.3': ', pour un total approximatif de',
  'stats.line.4': "de scope actif.",
  'stats.qualifier':
    "Architecture, génie civil, mécanique, électricité, plomberie et protection incendie: six disciplines au sein d'une seule équipe responsable. Les mêmes personnes sur les plans sont sur le chantier.",
  'stats.see_portfolio': 'Voir le portefeuille',

  // ---- Disciplines ----
  'disc.eyebrow':   'Compétences',
  'disc.title.1':   'Deux disciplines.',
  'disc.title.2':   'Une seule équipe responsable.',
  'disc.lede':
    'La plupart des projets échouent aux interfaces entre consultants, contractants et corps de métiers. Yakuver comble cette faille: architecture, génie civil et MEPF complet livrés par une équipe interne, coordonnés de la conception à la mise en service.',
  'disc.pillar.1.num':   '01 / CONCEPTION & RÉALISATION',
  'disc.pillar.1.title': 'Architecture & Génie civil',
  'disc.pillar.1.lede':
    "De la planification conceptuelle au développement du site: conception architecturale intégrée et génie structurel, avec rigueur esthétique, structurelle et réglementaire.",
  'disc.pillar.2.num':   '02 / SYSTÈMES',
  'disc.pillar.2.title': 'Ingénierie & installation MEPF',
  'disc.pillar.2.lede':
    "Systèmes mécaniques, électriques, plomberie et incendie de bout en bout: conçus pour l'efficacité énergétique, la conformité aux codes et la fiabilité à long terme dans les conditions ouest-africaines.",
  'disc.svc.arch':   'Conseil architectural',
  'disc.svc.arch.d': "Conception, autorisations d'urbanisme, plans coordonnés en BIM et spécifications matériaux.",
  'disc.svc.civil':  'Génie civil et structures',
  'disc.svc.civil.d':"Fondations, ossature béton armé, structures de soutènement, drainage et infrastructure de site aux normes locales.",
  'disc.svc.pm':     'Gestion de projet',
  'disc.svc.pm.d':   'Programme, coûts et qualité sur tout le cycle de livraison, reporting QS interne.',
  'disc.svc.hvac':   'CVC & R',
  'disc.svc.hvac.d': "Chauffage, ventilation, climatisation et réfrigération: splits, gainable, VRF, eau glacée et réfrigération commerciale, dimensionnés et mis en service pour les performances tropicales.",
  'disc.svc.elec':   'Systèmes électriques',
  'disc.svc.elec.d': 'Tableaux de distribution, chemins de câbles, éclairage, puissance, BT/MT, intégration groupe électrogène et systèmes de secours.',
  'disc.svc.plumb':  'Plomberie et drainage',
  'disc.svc.plumb.d':"Eau chaude et froide, EU/EV, surpresseurs, sanitaires, récupération d'eaux de pluie et grises.",
  'disc.svc.fire':   'Protection incendie',
  'disc.svc.fire.d': 'Détection, alarme, RIA, hydrants, sprinkler et extinction automatique: conçus selon NFPA et les exigences locales.',

  // ---- Anatomy / About ----
  'about.eyebrow':       'À propos',
  'about.title.1':       'Un cabinet bâti sur',
  'about.title.accent':  "l'ingénierie, pas sur les excuses.",
  'about.lede':
    "Yakuver Solutions LTD est un cabinet multidisciplinaire fortement orienté architecture et génie civil, qui livre des environnements bâtis durables et bien conçus. Nous fournissons des services intégrés de la planification et de la construction aux systèmes MEPF: CVC, électricité, plomberie et protection incendie, en assurant sécurité, efficacité et haute performance sur chaque projet.",
  'about.mission.eyebrow': 'Mission',
  'about.mission.title':   'Une ingénierie intégrée qui dépasse les schémas habituels.',
  'about.mission.body':    "Livrer des solutions innovantes en architecture, génie civil et MEPF qui garantissent la satisfaction client par un service exceptionnel et l'excellence de la conception intégrée.",
  'about.vision.eyebrow':  'Vision',
  'about.vision.title':    "Le cabinet multidisciplinaire de référence pour l'environnement bâti ouest-africain.",
  'about.vision.body':     "Livrer des environnements bâtis à la pointe avec excellence, et construire des partenariats clients de long terme par une ingénierie et un design holistiques.",
  'about.see_projects':    'Voir ce que nous avons livré',
  'about.caption':         'Unité VRF en toiture · commercial Accra · mise en service',

  // ---- Beliefs ----
  'beliefs.eyebrow':  'Convictions',
  'beliefs.title.1':  'Nous ne déclarons pas nos convictions.',
  'beliefs.title.2':  'Nous les vivons.',
  'beliefs.lede':     "Trois principes régissent chaque plan que nous émettons, chaque pièce que nous installons et chaque conversation avec un client. Non négociables.",
  'beliefs.1.num':    '01 / INNOVATION',
  'beliefs.1.title':  'Anticipation, par défaut.',
  'beliefs.1.body':   "Nous adoptons les nouvelles technologies et explorons en continu de meilleures méthodes, matériaux et systèmes pour rester en avance dans un secteur en mutation rapide.",
  'beliefs.2.num':    '02 / PRÉCISION',
  'beliefs.2.title':  'Chaque détail compte.',
  'beliefs.2.body':   "Notre travail est défini par la précision, la cohérence et l'engagement à livrer une qualité élevée sans compromis: de l'implantation à la clôture des réserves.",
  'beliefs.3.num':    '03 / SATISFACTION CLIENT',
  'beliefs.3.title':  'Sur mesure. Communiqué. Livré.',
  'beliefs.3.body':   "Nous plaçons les besoins du client au centre, en assurant une communication claire, des solutions sur mesure et une expérience fluide de bout en bout: et un bâtiment qui performe après la livraison.",

  // ---- Clients ----
  'clients.eyebrow': 'Clients',
  'clients.title.1': 'Institutions, développeurs',
  'clients.title.2': "et industrie nous font confiance.",
  'clients.lede':
    "Gouvernement, hôtellerie, industrie, éducation, institutions religieuses et promoteurs privés: une coupe transversale de l'environnement bâti ghanéen.",
  'clients.more':    '+ et bien',
  'clients.more.lbl':"d'autres",
  'clients.hint':    "cliquez sur un logo pour visiter le site du client",

  // ---- Closing CTA on home ----
  'cta.eyebrow':  'Prêt à démarrer ?',
  'cta.title.1':  'Un brief en entrée.',
  'cta.title.2':  'Une équipe responsable en sortie.',
  'cta.body':
    "Envoyez votre périmètre, vos plans ou un croquis. Réponse sous 24 heures avec une feuille de route: technique, chiffrée et programmée.",
  'cta.primary':  'Demander un devis',
  'cta.secondary':'Voir nos projets',

  // ---- Process ----
  'process.eyebrow':  'Notre méthode',
  'process.title.1':  'Cinq étapes du',
  'process.title.2':  'brief à la livraison.',
  'process.lede':
    "Une séquence disciplinée qui garde le programme et la qualité sous contrôle: la même équipe responsable du premier croquis à la mise en service.",
  'process.1.title':  'Brief & visite de site',
  'process.1.body':
    "On commence par une session de travail: périmètre, programme, budget. Puis une visite de site pour capter les conditions, contraintes et services existants. Le résultat est un brief écrit signé par tous.",
  'process.1.meta':   'Semaine 1',
  'process.2.title':  'Conception & coordination',
  'process.2.body':
    "Plans intégrés (architecture, structure, MEPF) produits en interne et coordonnés pour éliminer les conflits avant l'approvisionnement. Modélisation énergétique, conformité et autorisations incluses.",
  'process.2.meta':   'Semaines 2 à 6',
  'process.3.title':  'Approvisionnement & logistique',
  'process.3.body':
    "Relations directes avec les fabricants VRF, électricité, plomberie et incendie. Nous dimensionnons, spécifions, expédions et stockons les matériaux pour que l'équipe d'installation n'attende jamais.",
  'process.3.meta':   'En parallèle',
  'process.4.title':  'Installation',
  'process.4.body':
    "Corps de métiers internes pour le génie civil, le premier et le second œuvre MEPF. Contrôles qualité quotidiens, visites client hebdomadaires, liste de réserves suivie dès le premier jour: pas une mauvaise surprise à la fin.",
  'process.4.meta':   'Conforme au programme',
  'process.5.title':  'Mise en service & livraison',
  'process.5.body':
    "Tests témoins de chaque système, équilibrage air et eau, dossiers O&M complets, plans tels que construits et formation des opérateurs. Mise en service selon NFPA, ASHRAE, IET et BS.",
  'process.5.meta':   'Validation',

  // ---- FeaturedProject ----
  'feat.eyebrow':   'Projet phare',
  'feat.title.1':   'Centrale eau glacée',
  'feat.title.2':   'transfrontalière.',
  'feat.lede':
    "Une installation eau glacée de 380 kW pour le CHU Campus de Lomé, Togo: deux refroidisseurs en parallèle, pompes, collecteurs et contrôles GTB, livrée par un programme transfrontalier dans les délais.",
  'feat.location':  'Lieu',
  'feat.location.v':'Lomé, Togo',
  'feat.programme': 'Programme',
  'feat.programme.v':'Juil → Nov 2025',
  'feat.scope':     'Périmètre',
  'feat.scope.v':   'MEPF · CVC · Plomberie',
  'feat.contract':  'Valeur du contrat',
  'feat.status':    'en cours',
  'feat.challenge': 'Le défi',
  'feat.challenge.body':
    "Un hôpital en activité dans un pays voisin avait besoin d'une remise à niveau complète eau glacée: deux nouvelles unités 190 kW en parallèle, sans interruption des services et avec des contraintes de programme strictes liées au clinique.",
  'feat.approach':  'Comment nous avons livré',
  'feat.approach.1':"Conception interne et coordination BIM complète avec l'équipe site de Lomé",
  'feat.approach.2':'Mise en service phasée: refroidisseur 1 en service pendant la pose du 2',
  'feat.approach.3':"Logistique transfrontalière: équipement débarqué au port de Lomé, gestion des stocks sur site",
  'feat.approach.4':"Intégration GTB live avec le système de gestion technique de l'hôpital",
  'feat.approach.5':"Mise en service avec l'équipe ingénierie de l'hôpital",
  'feat.stat.1.lbl':'Puissance eau glacée',
  'feat.stat.2.lbl':'refroidisseurs 190 kW en parallèle',
  'feat.stat.3.lbl':'Cycle de fonctionnement',
  'feat.stat.4.lbl':'Conception → mise en service',
  'feat.see_more':  'Voir le reste du portefeuille',

  // ---- Testimonials ----
  'test.eyebrow':         'Ils en parlent',
  'test.title.1':         'Ce que nos clients disent',
  'test.title.2':         'de notre collaboration.',
  'test.lede':            'Retours sélectionnés sur une coupe transversale de projets récents.',
  'test.lede.pending':    "◆ témoignages à venir: en attente de validation client",
  'test.role.director':   'Directeur de projet',
  'test.role.engineer':   'Ingénieur exploitation',
  'test.role.owner':      'Propriétaire',
  'test.co.au':           'Projet AU',
  'test.co.chu':          'CHU Hôpital · Lomé',
  'test.co.residential':  'Développement résidentiel',
  'test.name.pending':    'Nom client à confirmer',
  'test.quote.1':
    "Yakuver a pris tout notre périmètre MEP des plans à la mise en service sans manquer un jalon. Le niveau de coordination entre leurs équipes architecturale, électrique et CVC nous a évité de courir après trois prestataires: un seul programme, un seul responsable.",
  'test.quote.2':
    "Faire venir une équipe ghanéenne pour une installation eau glacée transfrontalière était risqué sur le papier, mais la centrale CHU a été mise en service, testée et livrée dans les délais, avec une documentation O&M complète dès le jour 1.",
  'test.quote.3':
    "Ce que nous avons le plus apprécié, c'est la discipline. Contrôles quotidiens, visites hebdomadaires, liste de réserves à jour en temps réel: aucune surprise à la livraison. Nous les avons déjà engagés pour la phase suivante.",

  // ---- Team ----
  'team.eyebrow':         'Équipe',
  'team.title.1':         'Les personnes',
  'team.title.2':         'derrière chaque projet.',
  'team.lede':
    "Une équipe interne réduite et responsable, ingénieurs et compagnons: pas un courtier de sous-traitants. Les mêmes personnes sur les plans sont sur le chantier.",
  'team.lede.pending':    '◆ photos et biographies complètes à venir',
  'team.name.pending':    'Nom à confirmer',
  'team.role.md':         'Directeur Général · Ingénieur principal',
  'team.role.mepf':       'Responsable MEPF',
  'team.role.civil':      'Responsable Génie civil & Architecture',
  'team.role.ops':        'Responsable des opérations',
  'team.bio.md':
    "Dirige la stratégie du cabinet et supervise la livraison des grands projets en architecture, génie civil et MEPF. Contact direct pour les appels d'offres complexes.",
  'team.bio.mepf':
    "Plus de vingt ans sur les systèmes mécaniques et électriques en Afrique de l'Ouest. Supervise conception, dimensionnement et mise en service pour CVC, électricité, plomberie et incendie.",
  'team.bio.civil':
    "Lead génie civil et structures. Coordonne entre l'intention architecturale et ce que permettent la structure, le drainage et les conditions de sol.",
  'team.bio.ops':
    "Pilote les programmes de chantier au quotidien, les équipes internes, la logistique d'approvisionnement et l'assurance qualité. La raison pour laquelle les projets sont livrés à temps.",
  'team.photo_pending':   'photo à venir',

  // ---- ServicesDeep ----
  'svc.what_we_do':       'Ce que nous faisons',
  'svc.recent':           'Applications récentes',
  'svc.see_projects':     'Voir les projets',
  'svc.cat.design':       'CONCEPTION',
  'svc.cat.systems':      'SYSTÈMES',
  'svc.svc1.lede':
    "De la conception aux plans d'exécution, des autorisations aux spécifications matériaux: coordonné avec la structure et le MEPF dès le premier jour.",
  'svc.svc1.b1':'Conception et planches matériaux',
  'svc.svc1.b2':'Plans coordonnés en BIM, sections, élévations et détails',
  'svc.svc1.b3':"Soumissions d'urbanisme, permis de construire et EPA au Ghana",
  'svc.svc1.b4':'Spécifications de finitions intérieures et coordination FF&E',
  'svc.svc1.b5':"Visites de chantier et value engineering en phase conception",
  'svc.svc1.rel':"Lotissements résidentiels · Rénovations hôtelières · Bureaux de hauteur moyenne",
  'svc.svc2.lede':
    "Fondations, ossature béton armé, structures de soutènement, drainage et infrastructure: dimensionnés et détaillés aux normes locales et selon les conditions vérifiées sur site.",
  'svc.svc2.b1':"Interprétation géotechnique et conception des fondations",
  'svc.svc2.b2':"Conception ossature béton armé, dalles et voiles",
  'svc.svc2.b3':"Soutènements, sous-sols et stratégie d'étanchéité",
  'svc.svc2.b4':"Drainage du site, puisards, attenuation des eaux pluviales",
  'svc.svc2.b5':"Voirie, pavés et travaux extérieurs",
  'svc.svc2.rel':"Immeubles d'appartements · Infrastructure hospitalière · Dalles industrielles",
  'svc.svc3.lede':
    "Splits, gainables, VRF et eau glacée: dimensionnés, mis en service et entretenus pour les performances tropicales ouest-africaines.",
  'svc.svc3.b1':"Calculs de charge et sélection d'équipement",
  'svc.svc3.b2':'Appariement unités extérieures et intérieures VRF, conception refnet',
  'svc.svc3.b3':"Locaux techniques eau glacée avec boucles primaire/secondaire",
  'svc.svc3.b4':"Réfrigération commerciale: chambres froides, blast chillers",
  'svc.svc3.b5':"Tracés de gaines, sélection de diffuseurs et équilibrage d'air",
  'svc.svc3.b6':"Mise en service, tests témoins et formation opérateur",
  'svc.svc3.b7':"Contrats de maintenance préventive planifiée",
  'svc.svc3.rel':"CHU Hôpital · Lomé (380 kW eau glacée) · Rénovations VRF bureaux",
  'svc.svc4.lede':
    "Tableaux de distribution, chemins de câbles, éclairage, puissance, BT/MT, intégration groupe et systèmes de secours: conçus pour la sécurité, la fiabilité et la performance à long terme.",
  'svc.svc4.b1':"Distribution depuis l'arrivée jusqu'aux circuits terminaux (BT/MT)",
  'svc.svc4.b2':"Plans d'éclairage avec calculs photométriques et vérification lux",
  'svc.svc4.b3':"Chemins de câbles, paniers, conduits, goulottes",
  'svc.svc4.b4':"Dimensionnement groupe, AMF et intégration ATS",
  'svc.svc4.b5':"Mise à la terre, paratonnerre et protection contre les surtensions",
  'svc.svc4.b6':"Courants faibles: data, vidéosurveillance, contrôle d'accès",
  'svc.svc4.rel':"Immeubles · Aménagements bureaux · Installations industrielles",
  'svc.svc5.lede':
    "Eau chaude et froide, EU/EV, surpresseurs, sanitaires, récupération d'eau de pluie et grise: conçus pour performer dès le jour 1 et faciles à entretenir.",
  'svc.svc5.b1':"Réseaux eau froide, eau chaude et surpression",
  'svc.svc5.b2':'Réseaux EU, EV et ventilation primaire',
  'svc.svc5.b3':"Drainage pluvial et récupération d'eau de pluie",
  'svc.svc5.b4':"Tuyauterie aérienne et enterrée, vannes, isolement",
  'svc.svc5.b5':"Sanitaires et appareils",
  'svc.svc5.rel':"Hôtellerie · Résidentiel · Programmes mixtes",
  'svc.svc6.lede':
    "Détection incendie, alarme, RIA, hydrants, sprinkler et extinction automatique: conçus selon NFPA et les exigences du service incendie ghanéen.",
  'svc.svc6.b1':"Détection (fumée, chaleur, multi-critère) et alarme adressable",
  'svc.svc6.b2':"Réseaux RIA et hydrants avec dimensionnement pompe",
  'svc.svc6.b3':"Colonnes sèches/humides pour les IGH",
  'svc.svc6.b4':"Calcul hydraulique sprinkler et soumissions",
  'svc.svc6.b5':"Extinction cuisine, salle serveur et baies IT",
  'svc.svc6.b6':"Mise en service avec GNFS",
  'svc.svc6.rel':"Kempinski Apartment (13 étages) · Oak Apartment · Rivonia",

  // ---- Footer ----
  'footer.tagline':
    "Cabinet multidisciplinaire en architecture, génie civil et MEPF, livrant des projets intégrés à travers le Ghana et l'Afrique de l'Ouest.",
  'footer.col.sitemap':       'Plan du site',
  'footer.col.capabilities':  'Compétences',
  'footer.col.contact':       'Contact',
  'footer.link.home':         'Accueil',
  'footer.link.about':        'À propos',
  'footer.link.services':     'Services',
  'footer.link.projects':     'Projets',
  'footer.link.contact':      'Contact',
  'footer.cap.arch':          'Conception architecturale',
  'footer.cap.civil':         'Génie civil',
  'footer.cap.hvac':          'CVC & R',
  'footer.cap.electrical':    'Systèmes électriques',
  'footer.cap.plumbing':      'Plomberie et drainage',
  'footer.cap.fire':          'Protection incendie',
  'footer.locations':         'Accra · Kumasi · Lomé',
  'footer.rights':            'Tous droits réservés.',
  'footer.tagline.short':     'Architecture · Génie civil · MEPF - Livrés comme un seul.',

  // ---- PageHero ----
  'crumb.home':               'Accueil',
  'crumb.about':              'À propos',
  'crumb.services':           'Services',
  'crumb.projects':           'Projets',
  'crumb.contact':            'Contact',
  'page.about.eyebrow':       'À propos',
  'page.about.title':         "Un cabinet bâti sur l'ingénierie,",
  'page.about.accent':        'pas sur les excuses.',
  'page.about.lede':
    "Yakuver Solutions LTD est un cabinet multidisciplinaire fortement orienté architecture et génie civil, qui livre des environnements bâtis durables et bien conçus. Nous fournissons des services intégrés de la planification et de la construction aux systèmes MEPF: CVC, électricité, plomberie et protection incendie.",
  'page.services.eyebrow':    'Services',
  'page.services.title':      'Six disciplines.',
  'page.services.accent':     "Une seule équipe responsable.",
  'page.services.lede':
    "Architecture, génie civil et MEPF complet: conçus, approvisionnés, installés et mis en service en interne. Ci-dessous, un regard plus profond sur chaque capacité et où nous l'avons appliquée.",
  'page.projects.eyebrow':    'Projets',
  'page.projects.title':      'Un portefeuille en cours',
  'page.projects.accent':     'à travers le Ghana et le Togo.',
  'page.projects.lede':
    'Complexes commerciaux, hôpitaux, immeubles résidentiels et bâtiments institutionnels. Une sélection représentative de chantiers en cours ou récemment livrés.',
  'page.contact.eyebrow':     'Contact',
  'page.contact.title':       'Parlons de',
  'page.contact.accent':      'votre projet.',
  'page.contact.lede':
    "Lotissement de 4 villas, tour de 13 étages ou rénovation d'eau glacée pour un hôpital ? Envoyez le périmètre, les plans ou un croquis et nous revenons vers vous sous 24 heures avec une feuille de route.",

  // ---- Contact page offices ----
  'contact.where':            'Où nous opérons',
  'contact.where.title.1':    'Trois villes.',
  'contact.where.title.2':    'Une équipe réactive.',
  'contact.office.accra':     'Accra',
  'contact.office.accra.c':   'Ghana - Siège',
  'contact.office.accra.n':   'Ingénierie, gestion de projet, équipe principale',
  'contact.office.kumasi':    'Kumasi',
  'contact.office.kumasi.c':  'Ghana',
  'contact.office.kumasi.n':  'Présence chantier active - Oak Apartment et projets sœurs',
  'contact.office.lome':      'Lomé',
  'contact.office.lome.c':    'Togo',
  'contact.office.lome.n':    "Livraison transfrontalière - centrale eau glacée CHU Hôpital",

  // ---- Services quick-link nav ----
  'svc.quick.arch':           'Architecture',
  'svc.quick.civil':          'Génie civil',
  'svc.quick.hvac':           'CVC & R',
  'svc.quick.electrical':     'Électricité',
  'svc.quick.plumbing':       'Plomberie',
  'svc.quick.fire':           'Protection incendie',

  // ---- 404 ----
  'err.status':               'Erreur 404 · Page introuvable',
  'err.heading':              '404',
  'err.title':                'Perdu sur le chantier.',
  'err.body':
    "Cette page n'est pas dans nos plans. Retournez à l'accueil ou contactez-nous, nous vous orientons.",
  'err.home':                 "Retour à l'accueil",
  'err.email':                "Écrire à l'équipe",

  // Contact page (FR)
  'contact.label':        'Contact',
  'contact.title.1':      'Parlons de',
  'contact.title.2':      'votre projet.',
  'contact.lede':
    "Lotissement de 4 villas, tour de 13 étages ou rénovation d'eau glacée pour un hôpital ? Envoyez le périmètre, les plans ou un croquis et nous revenons vers vous sous 24 heures.",
  'contact.row.mobile':   'Mobile',
  'contact.row.office':   'Bureau',
  'contact.row.email':    'E-mail',
  'contact.row.web':      'Web',
  'contact.form.eyebrow': 'Demander un devis',
  'contact.form.title':   'Parlez-nous de votre projet.',
  'contact.form.lede':    'Formulaire rapide. Réponse sous 24 heures.',
  'contact.form.name':    'Votre nom *',
  'contact.form.email':   'E-mail *',
  'contact.form.scope':   'Périmètre *',
  'contact.form.message': 'Décrivez le projet : lieu, taille, calendrier *',
  'contact.form.send':    'Envoyer par e-mail',
  'contact.form.sending': 'Envoi...',
  'contact.form.sent.title': 'Merci. Bien reçu.',
  'contact.form.sent.body':  'Réponse sous 24 heures.',
  'contact.form.fallback':   "Ouvre votre client e-mail ou appelez",
};

const DICTS: Record<Lang, Dict> = { en: EN, fr: FR };
const STORAGE_KEY = 'yakuver-lang';

// ---- vanilla store the hook subscribes to (no Provider needed) ----
//
// CRITICAL: Astro code-splits each React island into its own bundle, which
// means a module-level `let _lang` would be a separate variable per island.
// To stay in sync, we (a) read from localStorage on every snapshot, and
// (b) broadcast a custom window event whenever setLang is called so other
// islands re-render. Storage events alone don't work because they only
// fire CROSS-TAB, not within the same tab.
//
const CHANGE_EVENT = 'yakuver:lang-change';

function getInitial(): Lang {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'fr') return saved;
  if (navigator.language?.toLowerCase().startsWith('fr')) return 'fr';
  return 'en';
}

function getSnapshot(): Lang {
  // Always re-read from localStorage so this works across islands.
  return getInitial();
}

function subscribe(cb: () => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => cb();
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener('storage', (e) => { if (e.key === STORAGE_KEY) cb(); });
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
  };
}

function getServerSnapshot(): Lang {
  return 'en';
}

export function setLang(l: Lang) {
  try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  if (typeof document !== 'undefined') document.documentElement.lang = l;
  // Notify every subscriber in every island on the page
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { lang: l } }));
  }
}

export function useT() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => DICTS[lang][key] ?? DICTS.en[key] ?? key;
  return { lang, setLang, t };
}

// Plain helper for non-React contexts (e.g. Astro components, future SSR)
export function getLang(): Lang {
  return getSnapshot();
}
export function translate(key: string, lang: Lang = getSnapshot()): string {
  return DICTS[lang][key] ?? DICTS.en[key] ?? key;
}
