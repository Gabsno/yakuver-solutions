import { useT } from '../../lib/i18n';

const QUICK_LINKS = [
  { id: 'architecture', labelKey: 'svc.quick.arch' },
  { id: 'civil',        labelKey: 'svc.quick.civil' },
  { id: 'hvac',         labelKey: 'svc.quick.hvac' },
  { id: 'electrical',   labelKey: 'svc.quick.electrical' },
  { id: 'plumbing',     labelKey: 'svc.quick.plumbing' },
  { id: 'fire',         labelKey: 'svc.quick.fire' },
];

export function ServiceQuickLinks() {
  const { t } = useT();
  return (
    <nav aria-label="Service quick links" className="bg-background border-b border-line py-5 sticky top-[64px] lg:top-[96px] z-30 backdrop-blur">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 flex gap-2 lg:gap-3 overflow-x-auto">
        {QUICK_LINKS.map((q) => (
          <a
            key={q.id}
            href={`#${q.id}`}
            className="shrink-0 px-3.5 py-2 rounded-full border border-line text-[12.5px] font-mono tracking-[0.06em] uppercase text-secondary hover:border-gold hover:text-primary hover:bg-gold/10 transition-all whitespace-nowrap"
          >
            {t(q.labelKey)}
          </a>
        ))}
      </div>
    </nav>
  );
}
