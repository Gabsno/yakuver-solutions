import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Mail, Globe } from 'lucide-react';
import { staggerContainer, fadeUp, sectionViewport, springSnappy, springTap } from '../../lib/motion-presets';
import { useT } from '../../lib/i18n';

const ROWS = [
  { typeKey: 'contact.row.mobile', value: '+233 24 014 5460',         href: 'tel:+233240145460',                       icon: Phone  },
  { typeKey: 'contact.row.office', value: '+233 30 230 1233',         href: 'tel:+233302301233',                       icon: Phone  },
  { typeKey: 'contact.row.email',  value: 'info@yakuversolutions.com',href: 'mailto:info@yakuversolutions.com',         icon: Mail   },
  { typeKey: 'contact.row.web',    value: 'www.yakuversolutions.com', href: 'https://www.yakuversolutions.com',         icon: Globe  },
];

// =============================================================================
// To enable a real server-side form:
//   1. Sign up at https://formspree.io (free tier - 50 submissions/month)
//   2. Create a new form pointed at info@yakuversolutions.com
//   3. Paste the action URL below (format: https://formspree.io/f/xxxxxxxx)
// Until then, submissions fall back to a pre-filled mailto draft.
// =============================================================================
const FORMSPREE_ENDPOINT = '';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { t } = useT();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (FORMSPREE_ENDPOINT) {
      setSubmitting(true);
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name, email, scope, message }),
        });
        if (res.ok) { setSent(true); setName(''); setEmail(''); setScope(''); setMessage(''); }
      } finally {
        setSubmitting(false);
      }
    } else {
      // Mailto fallback - builds a structured email draft
      const body =
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Scope: ${scope}\n\n` +
        `${message}`;
      window.location.href =
        `mailto:info@yakuversolutions.com?subject=${encodeURIComponent('Project enquiry - ' + (scope || 'Yakuver Solutions'))}&body=${encodeURIComponent(body)}`;
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-28 bg-primary text-on-primary overflow-hidden">
      <div className="absolute inset-0 paper-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div
        className="absolute -right-[5%] top-[10%] w-[50%] h-[60%] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,147,46,0.18), transparent 60%)' }}
      />

      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-7 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        {/* LEFT - Headline + contact rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="font-mono text-[11px] tracking-[0.18em] uppercase text-on-primary/55 mb-4">
            <span className="inline-block w-7 h-px bg-current mr-3 align-middle opacity-50" />
            {t('contact.label')}
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading font-black text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] tracking-[-0.025em] mb-6">
            {t('contact.title.1')} <span className="text-gold">{t('contact.title.2')}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-on-primary/70 text-[16px] leading-[1.65] max-w-[52ch] mb-10">
            {t('contact.lede')}
          </motion.p>

          <motion.div variants={fadeUp} className="border-t border-line-dark">
            {ROWS.map((r) => (
              <motion.a
                key={r.value}
                href={r.href}
                target={r.typeKey === 'contact.row.web' ? '_blank' : undefined}
                rel="noopener"
                whileHover={{ paddingLeft: 10 }}
                transition={springSnappy}
                className="grid grid-cols-[minmax(80px,auto)_1fr_auto] gap-x-5 sm:gap-x-8 items-center py-5 border-b border-line-dark group transition-all"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-on-primary/45 inline-flex items-center gap-2 whitespace-nowrap">
                  <r.icon className="w-3 h-3 shrink-0" /> {t(r.typeKey)}
                </span>
                <span className="font-heading text-[16px] sm:text-[17px] font-semibold text-on-primary group-hover:text-gold-2 transition-colors truncate">
                  {r.value}
                </span>
                <motion.span
                  className="text-gold-2"
                  whileHover={{ x: 4 }}
                  transition={springSnappy}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT - Real form (mailto fallback until Formspree wired) */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          transition={{ ...springSnappy, delay: 0.15 }}
          whileHover={{ y: -4 }}
          className="relative bg-gold-gradient text-primary rounded-lg+ p-7 lg:p-9 overflow-hidden shadow-gold"
        >
          <div
            className="absolute -right-10 -bottom-10 w-52 h-52 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(10,10,10,0.14), transparent 70%)' }}
          />

          <div className="relative">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-primary/70 mb-3">
              {t('contact.form.eyebrow')}
            </div>
            <h3 className="font-heading font-black text-[clamp(1.55rem,2.4vw,1.95rem)] mb-3 text-primary leading-[1.15]">
              {t('contact.form.title')}
            </h3>
            <p className="text-primary/75 text-[14px] leading-[1.55] mb-6">
              {t('contact.form.lede')}
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary text-on-primary p-5 rounded-md+ text-center"
              >
                <div className="font-heading font-bold text-[16px] mb-1">{t('contact.form.sent.title')}</div>
                <div className="text-[13px] text-on-primary/70">{t('contact.form.sent.body')}</div>
              </motion.div>
            ) : (
              <div className="grid gap-3">
                <input
                  required
                  type="text"
                  placeholder={t('contact.form.name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-md+ bg-primary/10 border border-primary/15 text-primary placeholder-primary/55 text-[14.5px] focus:outline-none focus:border-primary focus:bg-primary/20 transition-all"
                />
                <input
                  required
                  type="email"
                  placeholder={t('contact.form.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md+ bg-primary/10 border border-primary/15 text-primary placeholder-primary/55 text-[14.5px] focus:outline-none focus:border-primary focus:bg-primary/20 transition-all"
                />
                <select
                  required
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full px-4 py-3 rounded-md+ bg-primary/10 border border-primary/15 text-primary text-[14.5px] focus:outline-none focus:border-primary focus:bg-primary/20 transition-all appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'><path d='M2 4l4 4 4-4' fill='none' stroke='%230a0a0a' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 14px center',
                    backgroundSize: '12px',
                    paddingRight: '36px',
                  }}
                >
                  <option value="">{t('contact.form.scope')}</option>
                  <option value="Architecture & Civil">Architecture &amp; Civil</option>
                  <option value="HVAC & R">HVAC & R (incl. VRF, chillers, refrigeration)</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Fire Protection">Fire Protection</option>
                  <option value="Full MEPF">Full MEPF package</option>
                  <option value="Other">Other / not sure</option>
                </select>
                <textarea
                  required
                  rows={4}
                  placeholder={t('contact.form.message')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-md+ bg-primary/10 border border-primary/15 text-primary placeholder-primary/55 text-[14.5px] focus:outline-none focus:border-primary focus:bg-primary/20 transition-all resize-none"
                />

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springTap}
                  className="inline-flex items-center gap-2.5 justify-center px-6 py-3.5 rounded-md+ bg-primary text-on-primary text-[14.5px] font-heading font-bold w-full mt-2 disabled:opacity-60 hover:bg-[#1a1a1a] transition-colors"
                >
                  {submitting ? t('contact.form.sending') : t('contact.form.send')}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {!FORMSPREE_ENDPOINT && (
                  <div className="text-center text-primary/55 text-[11px] font-mono tracking-[0.06em] mt-1">
                    {t('contact.form.fallback')} <a className="underline hover:text-primary" href="tel:+233240145460">+233 24 014 5460</a>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
