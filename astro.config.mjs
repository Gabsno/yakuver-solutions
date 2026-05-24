// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// =============================================================================
// Astro config — static multi-page site for Yakuver Solutions LTD.
//
//  * Each .astro page renders to its own /<route>/index.html at build time
//    (proper static HTML — great for SEO).
//  * React components used via `client:visible` / `client:idle` for
//    interactive islands (Hero animations, WhatsApp button, etc.).
//  * Tailwind via the official Astro integration.
//
// Base path:
//   * GitHub Pages project page: '/yakuver-solutions/'
//   * Custom domain (yakuversolutions.com) flip CUSTOM_DOMAIN=1 in env: '/'
// =============================================================================
/** @type {boolean} */
// eslint-disable-next-line no-undef
const isCustomDomain = (typeof process !== 'undefined' && process.env?.CUSTOM_DOMAIN) === '1';

export default defineConfig({
  site: isCustomDomain ? 'https://yakuversolutions.com' : 'https://gabsno.github.io',
  base: isCustomDomain ? '/' : '/yakuver-solutions',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  vite: {
    server: { port: 5174 },
  },
});
