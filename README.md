# Portfolios

A collection of three premium showcase websites built with React, TypeScript, and Vite. Each project is a self-contained frontend — no backend, payments, or real checkout.

| Project | Theme | Folder |
|---------|-------|--------|
| **RideHub** | Bicycles, scooters & motorcycles | `ridehub-webapp/` |
| **Smartphone Store** | Apple, Samsung & Xiaomi phones | `smartphone-store-webapp/` |
| **Velvet Bistro** | Luxury café & fine dining | `velvet-bistro-webapp/` |

---

## Prerequisites

Install these once on your machine:

| Tool | Version | Why |
|------|---------|-----|
| **Node.js** | 18 or newer | Run the app, install npm packages |
| **npm** | Comes with Node | Package manager |
| **Python** | 3.8+ | Download image assets |
| **requests** (Python) | Latest | Used by all image download scripts |

```bash
pip install requests
```

> **Note:** Large images and 3D models are **not stored in the repo**. After cloning, you must download them using the scripts below.

---

## Quick Start (any project)

Pick one project, `cd` into its folder, then run these steps in order:

```bash
# 1. Go into the project
cd ridehub-webapp          # or smartphone-store-webapp / velvet-bistro-webapp

# 2. Install JavaScript dependencies
npm install

# 3. Download images
npm run download-assets

# 4. Download 3D models (see per-project commands below)

# 5. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Per-Project Setup

### RideHub (`ridehub-webapp/`)

Premium vehicle catalog — bikes, e-scooters, motorcycles.

```bash
cd ridehub-webapp
npm install
npm run download-assets          # images from Pexels
python scripts/download-models.py  # 3D vehicle models (bicycle, scooter, motorcycle)
npm run dev
```

**3D models downloaded:**
- `public/assets/models/bicycle.glb`
- `public/assets/models/scooter.glb`
- `public/assets/models/motorcycle.glb`

**Routes:** `/` · `/products` · `/products/:slug` · `/gallery` · `/about` · `/contact` · `/faq` · `/blog` · `/blog/:slug`

---

### Smartphone Store (`smartphone-store-webapp/`)

Premium phone retailer showcase — Apple, Samsung, Xiaomi.

```bash
cd smartphone-store-webapp
npm install
npm run download-assets    # images from Pexels
npm run download-models    # 3D phone models (uses tsx)
npm run dev
```

**3D models downloaded:**
- `public/assets/models/apple/iphone-17-pro-max.glb` (auto)
- `public/assets/models/samsung/galaxy-s26-ultra.glb` (fallback mesh)
- `public/assets/models/xiaomi/xiaomi-15-ultra.glb` (procedural fallback if Sketchfab GLB is missing)

> The download script prints instructions for optional **manual Sketchfab downloads** (higher-quality Samsung/Xiaomi models). These require a free Sketchfab account.

**Routes:** `/` · `/products` · `/products/:slug` · `/gallery` · `/about` · `/contact` · `/faq` · `/blog` · `/blog/:slug`

---

### Velvet Bistro (`velvet-bistro-webapp/`)

Luxury restaurant & café brand showcase.

```bash
cd velvet-bistro-webapp
npm install
npm run download-assets           # images from Pexels
node scripts/download-models.mjs  # 3D coffee cup for hero
npm run dev
```

**3D model downloaded:**
- `public/assets/models/coffee-cup.glb`

**Routes:** `/` · `/menu` · `/menu/:slug` · `/gallery` · `/about` · `/branches` · `/contact` · `/faq` · `/blog` · `/blog/:slug`

---

## Shared Project Structure

All three apps follow the same layout:

```
<project>/
├── public/                  # Static files served as-is
│   └── assets/              # Images, 3D models, SVGs (download or add manually)
├── scripts/                 # Asset & model download scripts
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, MegaMenu, MobileMenu
│   │   ├── sections/        # Page sections (Hero, Gallery, FAQ, etc.)
│   │   ├── ui/              # Reusable UI (Button, Dialog, Accordion…)
│   │   └── three/           # 3D hero components (React Three Fiber)
│   ├── config/              # Site settings, 3D model paths & transforms
│   ├── data/                # All editable content (products, menu, FAQ…)
│   ├── hooks/               # Custom hooks (theme, smooth scroll, motion)
│   ├── i18n/                # Translations (EN, FR, DE)
│   ├── pages/               # One file per route
│   ├── routes/              # React Router setup
│   ├── lib/                 # Utility helpers
│   └── styles/              # Global CSS / Tailwind
├── package.json
└── vite.config.ts
```

### What each folder does

| Folder | Purpose |
|--------|---------|
| `src/pages/` | Top-level page components — one per URL |
| `src/data/` | **Main place to edit content** — products, menu items, FAQ, gallery entries |
| `src/config/` | Company name, contact info, nav links, 3D model settings |
| `src/i18n/locales/` | UI text translations (`en.json`, `fr.json`, `de.json`) |
| `public/assets/` | Image and model files referenced by `src/data/` and `src/config/` |
| `scripts/` | One-time setup scripts to fetch assets from the internet |

---

## How to Update Images

There are two ways to change images:

### Option A — Replace the file (fastest)

1. Put your new image in the correct `public/assets/` subfolder.
2. Keep the **same filename** so existing data files still work.

Example — change a RideHub product photo:

```
public/assets/products/trek-fuel-exe.jpg   ← replace this file
```

The reference in `src/data/products.ts` stays unchanged:

```ts
image: '/assets/products/trek-fuel-exe.jpg'
```

### Option B — Use a new filename

1. Add your image to `public/assets/…`
2. Update the path in the matching `src/data/*.ts` file.

Example — Velvet Bistro menu item in `src/data/menu.ts`:

```ts
image: '/assets/menu/wagyu-tenderloin.jpg'   // change this path
```

### Image folders per project

| Project | Folders |
|---------|---------|
| **RideHub** | `images/`, `products/`, `gallery/`, `team/`, `blog/`, `case-studies/`, `social/`, `testimonials/`, `brands/` (SVG), `partners/` (SVG), `awards/` (SVG) |
| **Smartphone Store** | `images/`, `products/`, `gallery/`, `brands/`, `team/`, `social/`, `hero/`, `wallpapers/`, `partners/` |
| **Velvet Bistro** | `images/`, `menu/`, `gallery/`, `branches/`, `partners/` |

### Re-download all images from Pexels

```bash
npm run download-assets
```

This overwrites existing images with the versions defined in `scripts/download-images.py` (or `download-assets.py` for Velvet Bistro).

---

## How to Update 3D Models

### Replace a model file

1. Place your `.glb` file in `public/assets/models/` (use the same subfolder structure).
2. Update the path in `src/config/heroModels.ts` if the filename changed.
3. Tune position, rotation, and scale in the same file if the model looks wrong in the hero.

**RideHub** — `src/config/heroModels.ts`:

```ts
bicycle: {
  path: '/assets/models/bicycle.glb',
  scale: 0.012,
  rotation: [0, Math.PI / 4, 0],
  position: [0.2, -0.35, 0],
}
```

**Smartphone Store** — `src/config/heroModels.ts`:

```ts
path: '/assets/models/apple/iphone-17-pro-max.glb',
targetSize: 2.75,
```

**Velvet Bistro** — `src/config/heroModels.ts`:

```ts
path: '/assets/models/coffee-cup.glb',
targetSize: 1.05,
```

### Re-download models

| Project | Command |
|---------|---------|
| RideHub | `python scripts/download-models.py` |
| Smartphone Store | `npm run download-models` |
| Velvet Bistro | `node scripts/download-models.mjs` |

---

## Editable Content Files

### RideHub

| File | What to edit |
|------|-------------|
| `src/config/site.ts` | Company info, address, phone, social links |
| `src/data/products.ts` | Brands, vehicles, specs, images |
| `src/data/gallery.ts` | Gallery images |
| `src/data/faq.ts` | FAQ items |
| `src/data/blog.ts` | Blog posts |
| `src/config/heroModels.ts` | 3D hero model paths & transforms |
| `src/i18n/locales/*.json` | UI translations |

### Smartphone Store

| File | What to edit |
|------|-------------|
| `src/config/site.ts` | Store info, contact, nav |
| `src/data/products.ts` | Phone catalog, specs, images |
| `src/data/gallery.ts` | Gallery images |
| `src/data/faq.ts` | FAQ items |
| `src/data/blog.ts` | Blog posts |
| `src/config/heroModels.ts` | 3D phone model config |
| `src/i18n/locales/*.json` | UI translations |

### Velvet Bistro

| File | What to edit |
|------|-------------|
| `src/config/site.ts` | Restaurant name, contact, nav |
| `src/data/menu.ts` | Menu items, prices, images |
| `src/data/branches.ts` | Branch locations, hours, map coords |
| `src/data/gallery.ts` | Gallery images |
| `src/data/faq.ts` | FAQ items |
| `src/data/about.ts` | Team, stats, awards |
| `src/config/heroModels.ts` | 3D coffee cup config |
| `src/i18n/locales/*.json` | UI translations |

---

## Tech Stack (all projects)

- React 19 + TypeScript + Vite
- React Router · Tailwind CSS v4 · Radix UI (shadcn patterns)
- Framer Motion · GSAP · Lenis smooth scroll
- React Three Fiber + Drei (3D heroes)
- React Leaflet (maps)
- i18next (EN / FR / DE)
- React Hook Form + Zod (contact forms)

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Images are broken / 404 | Run `npm run download-assets` inside the project folder |
| 3D hero is empty | Run the model download command for that project (see above) |
| `python: command not found` | Install Python 3 and add it to your PATH |
| `ModuleNotFoundError: requests` | Run `pip install requests` |
| Port 5173 already in use | Stop the other Vite server or use `npm run dev -- --port 5174` |
| RideHub models look untextured | Re-run `python scripts/download-models.py` — it converts models to PBR format |

---

## 10 Ideas for Further Development

1. **Add a root `package.json`** with workspace scripts (`npm run dev:ridehub`, etc.) to manage all three apps from one command.
2. **Commit SVG assets** (brand logos, partner icons, awards) to the repo — they are small and rarely change.
3. **Add a CI check** that verifies required assets exist before build (fail fast on missing images/models).
4. **Create a unified asset download script** at the repo root that sets up all three projects in one go.
5. **Add Docker support** — a `Dockerfile` per project for consistent deploys without local Python/Node setup.
6. **Implement a CMS layer** (Sanity, Contentful, or local JSON + admin UI) so non-developers can edit `src/data/` content.
7. **Add E2E tests** with Playwright to catch broken image paths and 404 routes after asset changes.
8. **Optimize images** — add a post-download step (Sharp or `vite-plugin-image-optimizer`) for WebP/AVIF variants.
9. **Add SEO** — per-page meta tags, Open Graph images, and a `sitemap.xml` generator for each showcase.
10. **Deploy previews** — connect each app to Vercel/Netlify with a build step that runs asset downloads automatically.
