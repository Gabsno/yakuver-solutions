# Yakuver Solutions LTD — Website

Marketing site for [Yakuver Solutions LTD](mailto:info@yakuversolutions.com),
a multidisciplinary Architectural · Civil · MEPF contractor operating across
Ghana and West Africa.

**Live preview:** https://&lt;your-username&gt;.github.io/yakuver-solutions/

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS 3** — design tokens in `tailwind.config.js` (gold-on-black palette derived from the brand mark)
- **Framer Motion v12** (`motion/react`) — scroll-reveal, word-stagger heroes, hover micro-interactions, count-up stats
- **Three.js 0.160** — parked in `src/components/VillaScene.tsx` for re-enabling later
- **lucide-react** — line icons in the nav / contact rows

## Develop

```bash
npm install
npm run dev          # http://localhost:5174
npm run build        # tsc + Vite production build → dist/
npm run preview      # Serve dist/ for sanity-check
```

## Deploy

See [DEPLOY.md](./DEPLOY.md) — GitHub Pages via Actions, with notes on attaching
the `yakuversolutions.com` domain later.

## Structure

```
src/
  App.tsx              # Section composition
  main.tsx             # React mount
  index.css            # Tailwind + global type rules
  lib/
    motion-presets.ts  # Shared spring/variant presets
  components/
    Nav.tsx            # Fixed transparent nav with gold-halo logo, contact strip integrated
    Hero.tsx           # Hero with villa image + integrated chips and gold stamp
    Marquee.tsx        # Infinite-loop capabilities strip
    Stats.tsx          # Count-up stat tiles (in-view animated)
    Disciplines.tsx    # Architecture+Civil / MEPF pillars
    ServiceIcon3D.tsx  # Custom isometric SVG icons with depth + motion
    Anatomy.tsx        # About + Mission/Vision cards with project image
    Beliefs.tsx        # Innovation · Precision · Client Satisfaction
    Projects.tsx       # Live portfolio table with status pills
    Gallery.tsx        # Bento grid of site photos
    Clients.tsx        # 17-logo grid linked to each client's website
    Contact.tsx        # Contact rows + gold-gradient CTA card
    Footer.tsx         # Sitemap + dark footer
    VillaScene.tsx     # Three.js villa scene (parked, not currently rendered)
  assets/
    yakuver-logo.png
    clients/           # 17 client logos
    projects/          # Real Yakuver site photos
public/
  prompts.html                  # Scroll-stop AI prompts for VRF outdoor unit
  prompts-chilled-water.html    # Scroll-stop AI prompts for CHU chilled-water plant
```
