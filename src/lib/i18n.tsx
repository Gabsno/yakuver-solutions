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
};

const DICTS: Record<Lang, Dict> = { en: EN, fr: FR };
const STORAGE_KEY = 'yakuver-lang';

// ---- vanilla store the hook subscribes to (no Provider needed) ----
function getInitial(): Lang {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'fr') return saved;
  if (navigator.language?.toLowerCase().startsWith('fr')) return 'fr';
  return 'en';
}

let _lang: Lang | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Lang {
  if (_lang === null) _lang = getInitial();
  return _lang;
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      _lang = getInitial();
      listeners.forEach((l) => l());
    }
  };
  if (typeof window !== 'undefined') window.addEventListener('storage', storageHandler);
  return () => {
    listeners.delete(cb);
    if (typeof window !== 'undefined') window.removeEventListener('storage', storageHandler);
  };
}
function getServerSnapshot(): Lang {
  return 'en';
}

export function setLang(l: Lang) {
  _lang = l;
  try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  if (typeof document !== 'undefined') document.documentElement.lang = l;
  listeners.forEach((cb) => cb());
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
