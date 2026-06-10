# Velvet Bistro — Luxury Restaurant Showcase

A premium, multilingual React frontend for presenting a luxury café and fine dining brand. Presentation-only — no backend, booking, or payments.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/menu` | Menu catalog |
| `/menu/:slug` | Menu item detail |
| `/gallery` | Gallery |
| `/about` | About |
| `/branches` | Branches |
| `/contact` | Contact |
| `/faq` | FAQ |
| `*` | 404 |

## Languages

- English (default)
- French
- German

Use the language switcher in the navbar or set via `localStorage` key `i18nextLng`.

## Editable Config Files

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Restaurant name, contact info, nav links |
| `src/config/social.ts` | Instagram, X, Facebook, WhatsApp, YouTube |
| `src/data/menu.ts` | 18 menu items (categories, prices, images) |
| `src/data/branches.ts` | Branch locations, hours, coordinates |
| `src/data/gallery.ts` | Gallery images and categories |
| `src/data/faq.ts` | FAQ items by category |
| `src/data/about.ts` | Team, stats, awards |
| `src/i18n/locales/*.json` | UI translations (EN, FR, DE) |

## Assets

Place images under:

- `public/assets/images/` — hero, about, contact
- `public/assets/menu/` — menu item photos
- `public/assets/gallery/` — gallery photos
- `public/assets/branches/` — branch photos

Run `node scripts/download-assets.mjs` to fetch Unsplash images, or `node scripts/generate-placeholders.mjs` for premium SVG placeholders.

## Installed Libraries

- React 19 + TypeScript + Vite
- React Router
- Tailwind CSS v4
- shadcn/ui (Radix primitives)
- Framer Motion
- GSAP + ScrollTrigger
- Lenis smooth scroll
- Three.js + React Three Fiber + Drei
- React Leaflet + Leaflet
- react-i18next
- React Hook Form + Zod
- Lucide React

## Stack Features

- Sticky navbar with mega menu
- Dark / light theme toggle
- 3D cinematic hero
- Menu search, filter, sort
- Gallery masonry + lightbox
- Leaflet branch maps
- Contact form (frontend-only submit)
- FAQ accordion with categories
