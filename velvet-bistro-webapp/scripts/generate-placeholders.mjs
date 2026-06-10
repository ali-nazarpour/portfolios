import { mkdir, writeFile, access } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const palette = [
  ["#1a1209", "#3d2b1f", "#c9a962"],
  ["#0f0f14", "#2a1f3d", "#d4a574"],
  ["#141010", "#3a2020", "#e8c4a0"],
  ["#0d1117", "#1f2937", "#b8860b"],
  ["#120e0a", "#2c1810", "#daa520"],
];

const labels = {
  "public/assets/images/hero.jpg": "Velvet Bistro",
  "public/assets/images/ambiance.jpg": "Ambiance",
  "public/assets/images/chef.jpg": "Executive Chef",
  "public/assets/images/story.jpg": "Our Story",
  "public/assets/images/interior.jpg": "Interior",
  "public/assets/images/dining.jpg": "Fine Dining",
  "public/assets/images/about-hero.jpg": "About Us",
  "public/assets/images/contact-hero.jpg": "Contact",
};

function svg(label, w, h, seed = 0) {
  const [c1, c2, c3] = palette[seed % palette.length];
  const safe = label.replace(/[<>&"]/g, "");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="45%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}" stop-opacity="0.35"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="30%" r="50%">
      <stop offset="0%" stop-color="${c3}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${c1}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <circle cx="${w * 0.2}" cy="${h * 0.75}" r="${Math.min(w, h) * 0.15}" fill="${c3}" opacity="0.08"/>
  <circle cx="${w * 0.85}" cy="${h * 0.2}" r="${Math.min(w, h) * 0.2}" fill="${c3}" opacity="0.06"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
    fill="${c3}" font-family="Georgia, serif" font-size="${Math.min(w, h) * 0.06}" opacity="0.9">${safe}</text>
  <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
    fill="#ffffff" font-family="system-ui, sans-serif" font-size="${Math.min(w, h) * 0.025}" opacity="0.4">Velvet Bistro</text>
</svg>`;
}

const allPaths = [
  ...Object.keys(labels),
  "public/assets/menu/truffle-croissant-benedict.jpg",
  "public/assets/menu/golden-brioche-french-toast.jpg",
  "public/assets/menu/velvet-breakfast-board.jpg",
  "public/assets/menu/wagyu-tenderloin.jpg",
  "public/assets/menu/pan-seared-sea-bass.jpg",
  "public/assets/menu/herb-crusted-lamb-rack.jpg",
  "public/assets/menu/dark-chocolate-souffle.jpg",
  "public/assets/menu/pistachio-rose-tart.jpg",
  "public/assets/menu/creme-brulee-royale.jpg",
  "public/assets/menu/signature-velvet-espresso.jpg",
  "public/assets/menu/caramel-affogato.jpg",
  "public/assets/menu/lavender-latte.jpg",
  "public/assets/menu/golden-negroni.jpg",
  "public/assets/menu/smoked-old-fashioned.jpg",
  "public/assets/menu/velvet-sparkling-rose.jpg",
  "public/assets/menu/chefs-tasting-omakase.jpg",
  "public/assets/menu/lobster-thermidor.jpg",
  "public/assets/menu/black-truffle-risotto.jpg",
  ...Array.from({ length: 12 }, (_, i) => `public/assets/gallery/gallery-${String(i + 1).padStart(2, "0")}.jpg`),
  "public/assets/branches/geneva-flagship.jpg",
  "public/assets/branches/zurich-lounge.jpg",
  "public/assets/branches/paris-atelier.jpg",
  ...Array.from({ length: 5 }, (_, i) => `public/assets/images/testimonial-0${i + 1}.jpg`),
  "public/assets/images/award-michelin.jpg",
  "public/assets/images/award-world-luxury.jpg",
  "public/assets/images/award-gault.jpg",
  "public/assets/images/award-tripadvisor.jpg",
  "public/assets/images/award-sustainable.jpg",
  "public/assets/images/award-wine.jpg",
  "public/assets/images/timeline-2012.jpg",
  "public/assets/images/timeline-2015.jpg",
  "public/assets/images/timeline-2023.jpg",
  "public/assets/images/timeline-2025.jpg",
  "public/assets/images/blog-espresso.jpg",
  "public/assets/images/blog-tasting.jpg",
  "public/assets/images/blog-sustainability.jpg",
  "public/assets/images/case-corporate.jpg",
  "public/assets/images/case-launch.jpg",
  "public/assets/images/value-craft.jpg",
  "public/assets/images/value-hospitality.jpg",
  "public/assets/images/value-sustainability.jpg",
  "public/assets/images/value-community.jpg",
  "public/assets/images/private-dining.jpg",
];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

let created = 0;
for (let i = 0; i < allPaths.length; i++) {
  const rel = allPaths[i];
  const full = join(root, rel);
  if (await exists(full)) continue;
  const svgPath = full.replace(/\.jpg$/, ".svg");
  const label =
    labels[rel] ??
    rel
      .split("/")
      .pop()
      .replace(/\.jpg$/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  const w = rel.includes("hero") || rel.includes("about") || rel.includes("contact") ? 1920 : 800;
  const h = rel.includes("hero") || rel.includes("about") || rel.includes("contact") ? 1080 : 600;
  await mkdir(dirname(full), { recursive: true });
  await writeFile(svgPath, svg(label, w, h, i));
  created++;
  console.log("Created", svgPath);
}
console.log(`Placeholders created: ${created}`);
