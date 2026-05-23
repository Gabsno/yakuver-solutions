import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// =============================================================================
// Vite config — GitHub Pages aware.
//   * Local dev:   base = '/'           (npm run dev)
//   * Build:       base = '/yakuver-solutions/'
//
// When a custom domain (e.g. yakuversolutions.com) is wired up via Pages,
// set CUSTOM_DOMAIN=1 in the deploy env to flip base back to '/'.
// =============================================================================
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base:
    command === 'serve' || process.env.CUSTOM_DOMAIN === '1'
      ? '/'
      : '/yakuver-solutions/',
  server: { port: 5174, strictPort: true },
  build: { outDir: 'dist', sourcemap: false, chunkSizeWarningLimit: 1200 },
}));
