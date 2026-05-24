import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// =============================================================================
// Lightweight i18n — no library. Two dictionaries (en, fr) and a useT() hook.
// Currently translates the most visible marketing strings (nav, hero, CTAs,
// contact). Body copy in long-form sections (Anatomy, Beliefs, Process,
// Featured Project, Testimonials, Team) is English-only for now — fall back
// gracefully via t('key') returning the key if no translation exists.
//
// To translate more strings:
//   1. Add the key + value to both EN and FR dictionaries below
//   2. Replace the literal string in the component with `t('your.key')`
// =============================================================================

export type Lang = 'en' | 'fr';

type Dict = Record<string, string>;

const EN: Dict = {
  // Nav
  'nav.capabilities': 'Capabilities',
  'nav.about':        'About',
  'nav.process':      'Process',
  'nav.projects':     'Projects',
  'nav.team':         'Team',
  'nav.clients':      'Clients',
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
    'A multidisciplinary engineering and construction firm building durable, well-designed environments across Ghana and West Africa. From foundations to commissioning — architecture, civil, mechanical, electrical, plumbing and fire protection under one disciplined team.',
  'hero.tag.arch':       'Architecture',
  'hero.tag.civil':      'Civil Engineering',
  'hero.tag.hvac':       'HVAC',
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

  // Contact form
  'contact.label':        'Contact · 10',
  'contact.title.1':      "Let's talk about",
  'contact.title.2':      'your project.',
  'contact.lede':
    "Whether it's a 4-villa cluster, a 13-story tower or a chilled-water hospital retrofit — send the scope, drawings or sketch and we'll come back within 24 hours with a route forward.",
  'contact.row.mobile': 'Mobile',
  'contact.row.office': 'Office',
  'contact.row.email':  'Email',
  'contact.row.web':    'Web',
  'contact.form.eyebrow': 'Request a quote',
  'contact.form.title':   'Tell us about your project.',
  'contact.form.lede':    "Quick intake — we'll come back within 24 hours.",
  'contact.form.name':    'Your name *',
  'contact.form.email':   'Email *',
  'contact.form.scope':   'Scope *',
  'contact.form.message': 'Tell us about the project — location, size, programme *',
  'contact.form.send':    'Send via email',
  'contact.form.sending': 'Sending…',
  'contact.form.sent.title': 'Thanks — got it.',
  'contact.form.sent.body':  "We'll reply within 24 hours.",
  'contact.form.fallback':   'Opens your email client · or call',

  // WhatsApp FAB
  'wa.eyebrow':  'Quick chat',
  'wa.title':    'Talk to the Yakuver team',
  'wa.body':     'Send scope, drawings or a sketch on WhatsApp — we typically reply within an hour during work hours.',
  'wa.btn':      'Open WhatsApp →',
};

const FR: Dict = {
  // Nav
  'nav.capabilities': 'Compétences',
  'nav.about':        'À propos',
  'nav.process':      'Processus',
  'nav.projects':     'Projets',
  'nav.team':         'Équipe',
  'nav.clients':      'Clients',
  'nav.contact':      'Contact',
  'nav.cta':          'Démarrer un projet',
  'nav.availability': 'Projets ouverts T2 / T3 2026',
  'nav.locations':    'Accra · Kumasi · Lomé',

  // Hero
  'hero.eyebrow':     'Yakuver Solutions LTD · Basée au Ghana',
  'hero.title.1':     'Architecture, Génie civil &',
  'hero.title.2':     'MEPF',
  'hero.title.3':     'livrés',
  'hero.title.4':     'comme un seul.',
  'hero.lede':
    "Un cabinet multidisciplinaire d'ingénierie et de construction qui bâtit des environnements durables et bien conçus à travers le Ghana et l'Afrique de l'Ouest. Des fondations à la mise en service — architecture, génie civil, mécanique, électricité, plomberie et protection incendie au sein d'une seule équipe disciplinée.",
  'hero.tag.arch':       'Architecture',
  'hero.tag.civil':      'Génie civil',
  'hero.tag.hvac':       'CVC',
  'hero.tag.electrical': 'Électricité',
  'hero.tag.plumbing':   'Plomberie',
  'hero.tag.fire':       'Protection incendie',
  'hero.cta.primary':   'Demander un devis',
  'hero.cta.secondary': 'Voir nos projets',
  'hero.meta.live':     'projets en cours',
  'hero.meta.portfolio':'portefeuille actif',
  'hero.meta.footprint':'présence',
  'hero.chip.residential': 'Résidentiel · Villa moderne',
  'hero.chip.cluster':     'Lotissement 4 villas · Accra',
  'hero.stamp.in':         'EN COURS',
  'hero.stamp.activeportfolio': 'portefeuille actif',
  'hero.disciplineMeta':   'ARCHITECTURE · GÉNIE CIVIL · MEPF',
  'hero.disciplineLabel':  'Les six disciplines',
  'hero.disciplineSub':    'une seule équipe responsable',

  // Contact form
  'contact.label':        'Contact · 10',
  'contact.title.1':      'Parlons de',
  'contact.title.2':      'votre projet.',
  'contact.lede':
    "Qu'il s'agisse d'un lotissement de 4 villas, d'une tour de 13 étages ou d'une rénovation d'eau glacée pour un hôpital — envoyez le périmètre, les plans ou un croquis et nous revenons vers vous sous 24 heures avec une feuille de route.",
  'contact.row.mobile': 'Mobile',
  'contact.row.office': 'Bureau',
  'contact.row.email':  'E-mail',
  'contact.row.web':    'Web',
  'contact.form.eyebrow': 'Demander un devis',
  'contact.form.title':   'Parlez-nous de votre projet.',
  'contact.form.lede':    "Formulaire rapide — réponse sous 24 heures.",
  'contact.form.name':    'Votre nom *',
  'contact.form.email':   'E-mail *',
  'contact.form.scope':   'Périmètre *',
  'contact.form.message': "Décrivez le projet — lieu, taille, calendrier *",
  'contact.form.send':    'Envoyer par e-mail',
  'contact.form.sending': 'Envoi…',
  'contact.form.sent.title': 'Merci — bien reçu.',
  'contact.form.sent.body':  'Réponse sous 24 heures.',
  'contact.form.fallback':   'Ouvre votre client mail · ou appelez',

  // WhatsApp FAB
  'wa.eyebrow':  'Chat rapide',
  'wa.title':    "Parlez à l'équipe Yakuver",
  'wa.body':     'Envoyez périmètre, plans ou croquis sur WhatsApp — nous répondons généralement sous une heure en journée.',
  'wa.btn':      'Ouvrir WhatsApp →',
};

const DICTS: Record<Lang, Dict> = { en: EN, fr: FR };

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
});

const STORAGE_KEY = 'yakuver-lang';

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fr') return saved;
    // Default to French if browser language starts with 'fr'
    if (navigator.language?.toLowerCase().startsWith('fr')) return 'fr';
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  const t = (key: string) => DICTS[lang][key] ?? DICTS.en[key] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  return useContext(LangContext);
}
