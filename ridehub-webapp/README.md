# RideHub — Premium Vehicle Showcase

A premium corporate catalog website for bicycles, electric scooters, and motorcycles. Presentation-only — no backend, checkout, or payments.

## Tech Stack

- React 19 + TypeScript + Vite
- React Router, Tailwind CSS v4, shadcn/ui patterns
- Framer Motion, GSAP + ScrollTrigger, Lenis
- React Three Fiber + Drei (3D hero)
- React Leaflet (store map)
- i18next (EN / FR / DE)
- React Hook Form + Zod (contact form)

## Run Locally

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
| `/products` | Product catalog |
| `/products/:slug` | Product detail |
| `/gallery` | Image gallery |
| `/about` | About Us |
| `/contact` | Contact |
| `/faq` | FAQ |
| `*` | 404 |

## Editable Config

| File | Contents |
|------|----------|
| `src/config/site.ts` | Company info, address, phone, email, social links, stats |
| `src/data/products.ts` | Brands, 12+ products, specs |
| `src/data/faq.ts` | FAQ items |
| `src/data/gallery.ts` | Gallery images |
| `src/i18n/locales/*.json` | Translations (EN, FR, DE) |

## Assets

Images live under `public/assets/`:

- `images/` — hero, about, contact
- `products/` — product photos (Unsplash)
- `brands/` — brand logos (SVG)
- `gallery/` — gallery photos
- `models/` — hero GLB vehicle models

### 3D model attribution

Hero GLB files (`public/assets/models/`) are low-poly vehicles from **Poly by Google** (CC Attribution), sourced via [GetGLB](https://www.getglb.com). Tune transforms in `src/config/models.ts`.

## Features

- Light/dark theme (persisted in localStorage)
- Multilingual navbar switcher
- Mega menu with featured product
- 3D floating vehicles hero
- GSAP scroll animations & progress bar
- Product filters, search, sort
- FAQ accordion with search
- Leaflet map on About page
- Contact form with validation
