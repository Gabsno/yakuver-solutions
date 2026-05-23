/** @type {import('tailwindcss').Config} */
// =============================================================================
// YAKUVER SOLUTIONS — palette derived from the actual brand mark.
// Metallic gold/bronze on a near-black base. The Y/A interlock mark sits on
// dark surfaces; bone-cream is used for paper sections.
// =============================================================================
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:       '#0a0a0a',
        'primary-2':   '#141414',
        'primary-3':   '#1f1f1f',
        'on-primary':  '#f5f1e8',
        secondary:     '#4a4a4a',
        'secondary-2': '#6b6b6b',

        // Metallic gold spectrum sourced from the logo gradient
        gold:          '#c8932e',
        'gold-2':      '#d4af37',
        'gold-3':      '#e6c478',
        'gold-deep':   '#8b6914',
        'gold-soft':   '#f0d896',

        background:    '#f5f1e8',
        'background-2':'#ebe6d7',
        paper:         '#fbfaf5',
        foreground:    '#0a0a0a',
        muted:         '#ebe6d7',
        'muted-2':     '#d6d0bd',
        line:          'rgba(10,10,10,0.10)',
        'line-soft':   'rgba(10,10,10,0.06)',
        'line-dark':   'rgba(245,241,232,0.12)',

        // Discipline accents
        arch:          '#c2410c',
        mep:           '#0891b2',
        fire:          '#dc2626',
        elec:          '#ea580c',
      },
      fontFamily: {
        heading: ['Archivo', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'sm-': '4px',
        'md+': '8px',
        'lg+': '14px',
        'xl+': '24px',
      },
      boxShadow: {
        'soft':   '0 6px 16px -8px rgba(10,10,10,0.12)',
        'medium': '0 14px 32px -14px rgba(10,10,10,0.18)',
        'deep':   '0 30px 60px -30px rgba(10,10,10,0.5)',
        'gold':   '0 14px 40px -14px rgba(200,147,46,0.55)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #8b6914 0%, #c8932e 30%, #e6c478 55%, #c8932e 75%, #8b6914 100%)',
        'gold-shine':    'linear-gradient(90deg, #b8860b 0%, #d4af37 40%, #f0d896 50%, #d4af37 60%, #b8860b 100%)',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
