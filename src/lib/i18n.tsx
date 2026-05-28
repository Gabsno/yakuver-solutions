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
};

const FR: Dict = {
  // (Sparse - falls back to EN on miss. Filled out properly in a later pass.)
  'nav.home':         'Accueil',
  'nav.about':        'À propos',
  'nav.services':     'Services',
  'nav.projects':     'Projets',
  'nav.contact':      'Contact',
  'nav.cta':          'Démarrer un projet',
  'nav.availability': 'Projets ouverts T2 / T3 2026',

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
