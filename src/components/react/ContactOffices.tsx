import { useT } from '../../lib/i18n';

const OFFICES = [
  { cityKey: 'contact.office.accra',  countryKey: 'contact.office.accra.c',  noteKey: 'contact.office.accra.n' },
  { cityKey: 'contact.office.kumasi', countryKey: 'contact.office.kumasi.c', noteKey: 'contact.office.kumasi.n' },
  { cityKey: 'contact.office.lome',   countryKey: 'contact.office.lome.c',   noteKey: 'contact.office.lome.n' },
];

export function ContactOffices() {
  const { t } = useT();
  return (
    <section className="py-16 lg:py-20 bg-paper border-t border-line">
      <div className="max-w-[1480px] mx-auto px-6 lg:px-10">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-secondary-2 mb-4">
          <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
          {t('contact.where')}
        </div>
        <h2 className="font-heading font-black text-[clamp(1.8rem,3.6vw,2.6rem)] text-primary leading-[1.1] mb-10">
          {t('contact.where.title.1')} <span className="text-gold">{t('contact.where.title.2')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OFFICES.map((o) => (
            <div key={o.cityKey} className="bg-white border border-line rounded-lg+ p-7 shadow-soft hover:shadow-medium hover:border-gold/30 transition-all">
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-gold-deep font-semibold mb-3">
                {t(o.countryKey)}
              </div>
              <h3 className="font-heading font-black text-[1.8rem] text-primary leading-none mb-3">{t(o.cityKey)}</h3>
              <p className="text-secondary text-[14.5px] leading-[1.6]">{t(o.noteKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
