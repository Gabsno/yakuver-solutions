# Deploying Yakuver Solutions to GitHub Pages

Preview hosting for the marketing site. Domain (`yakuversolutions.com`) can be
attached later without rebuilding.

---

## One-time setup

### 1. Create the repo on GitHub

Go to https://github.com/new and create a **public** repo:

| Field          | Value                |
| -------------- | -------------------- |
| Repository name | `yakuver-solutions` |
| Visibility      | Public               |
| Init readme    | **Leave unchecked** (we already have one) |

Click **Create repository**, then copy the HTTPS or SSH URL it gives you, e.g.
`git@github.com:<your-username>/yakuver-solutions.git`.

### 2. Push this code

From the project root:

```bash
git remote add origin git@github.com:<your-username>/yakuver-solutions.git
git push -u origin main
```

### 3. Enable GitHub Pages with GitHub Actions

In the new repo on github.com:

1. **Settings → Pages**
2. **Source**: `GitHub Actions` (NOT "Deploy from a branch")
3. Save.

The `.github/workflows/deploy.yml` workflow runs automatically on every push to
`main`. First run takes ~2 minutes. When it finishes, the site is live at:

> **https://&lt;your-username&gt;.github.io/yakuver-solutions/**

Subsequent commits to `main` redeploy automatically.

---

## Local development

```bash
npm install
npm run dev          # → http://localhost:5174
```

Base URL is `/` locally (set by `vite.config.ts` `command === 'serve'`).
Production build uses `/yakuver-solutions/`.

## Production build (local sanity check)

```bash
npm run build
npm run preview      # Serves dist/ at http://localhost:4173/yakuver-solutions/
```

---

## Attaching a custom domain (later)

When you're ready to point `www.yakuversolutions.com` at the site:

### 1. DNS

At your domain registrar, add either:

**Apex (yakuversolutions.com)** — four A records pointing at GitHub:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**`www` subdomain** — a CNAME pointing to `<your-username>.github.io`.

### 2. In the repo

1. **Settings → Pages → Custom domain**: enter `www.yakuversolutions.com`, save.
2. Wait for DNS check ✓ to appear.
3. Tick **Enforce HTTPS** once available (5–30 min after DNS resolves).

### 3. Flip the Vite base path

Edit `.github/workflows/deploy.yml`, change:

```yaml
env:
  CUSTOM_DOMAIN: '0'
```

to:

```yaml
env:
  CUSTOM_DOMAIN: '1'
```

Commit + push. The next deploy serves assets from `/` instead of
`/yakuver-solutions/`, which is what a custom domain expects.

---

## Bonus pages

Two scroll-stop prompt pages ship alongside the main site:

- `/<base>/prompts.html` — VRF outdoor unit prompts (3 AI prompts + transition)
- `/<base>/prompts-chilled-water.html` — CHU chilled-water plant prompts

Useful for generating marketing imagery later (Midjourney / Flux / Runway / Kling).

---

## Troubleshooting

**Site loads but logo / CSS / images are missing** — Vite base path mismatch.
Check that the URL you're hitting matches the `base` in `vite.config.ts`.

**Workflow fails on first run with `Pages not enabled`** — go to Settings → Pages,
set Source to "GitHub Actions", then re-run the workflow under the Actions tab.

**Logo or photos look pixelated** — they're served as PNG/JPG. For higher-quality
icons consider SVG conversion later (some client logos are large PNGs that could
be slimmed down — see the build output for sizes).
