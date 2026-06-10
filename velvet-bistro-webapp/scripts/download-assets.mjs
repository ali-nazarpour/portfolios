import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const downloads = {
  // Hero & general
  "public/assets/images/hero.jpg":
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80",
  "public/assets/images/ambiance.jpg":
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  "public/assets/images/chef.jpg":
    "https://images.unsplash.com/photo-1577219491135-ab25a1e5500b?auto=format&fit=crop&w=800&q=80",
  "public/assets/images/story.jpg":
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  "public/assets/images/interior.jpg":
    "https://images.unsplash.com/photo-1600891964594-f61a49de5549?auto=format&fit=crop&w=1200&q=80",
  "public/assets/images/dining.jpg":
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
  "public/assets/images/about-hero.jpg":
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80",
  "public/assets/images/contact-hero.jpg":
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1920&q=80",
  // Menu - breakfast
  "public/assets/menu/truffle-croissant-benedict.jpg":
    "https://images.unsplash.com/photo-1482049010765-37163dbda165?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/golden-brioche-french-toast.jpg":
    "https://images.unsplash.com/photo-1484723091739-30a097c8ef60?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/velvet-breakfast-board.jpg":
    "https://images.unsplash.com/photo-1533089860890-a1d0b45a100d?auto=format&fit=crop&w=800&q=80",
  // Menu - mains
  "public/assets/menu/wagyu-tenderloin.jpg":
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/pan-seared-sea-bass.jpg":
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/herb-crusted-lamb-rack.jpg":
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80",
  // Menu - desserts
  "public/assets/menu/dark-chocolate-souffle.jpg":
    "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/pistachio-rose-tart.jpg":
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/creme-brulee-royale.jpg":
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
  // Menu - coffee
  "public/assets/menu/signature-velvet-espresso.jpg":
    "https://images.unsplash.com/photo-1514432324607-09a9bf096aef?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/caramel-affogato.jpg":
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/lavender-latte.jpg":
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  // Menu - signature drinks
  "public/assets/menu/golden-negroni.jpg":
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/smoked-old-fashioned.jpg":
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/velvet-sparkling-rose.jpg":
    "https://images.unsplash.com/photo-1510812431400-5740e4510a72?auto=format&fit=crop&w=800&q=80",
  // Menu - fine dining
  "public/assets/menu/chefs-tasting-omakase.jpg":
    "https://images.unsplash.com/photo-1579876437438-9dff1b3b3099?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/lobster-thermidor.jpg":
    "https://images.unsplash.com/photo-1559847844-d721426d6edc?auto=format&fit=crop&w=800&q=80",
  "public/assets/menu/black-truffle-risotto.jpg":
    "https://images.unsplash.com/photo-1476124369491-c7addf454114?auto=format&fit=crop&w=800&q=80",
  // Gallery
  "public/assets/gallery/gallery-01.jpg":
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-02.jpg":
    "https://images.unsplash.com/photo-1506089676908-3592f738119d?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-03.jpg":
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-04.jpg":
    "https://images.unsplash.com/photo-1493857671505-7291e2e2763a?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-05.jpg":
    "https://images.unsplash.com/photo-1445118770665-371b34625864?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-06.jpg":
    "https://images.unsplash.com/photo-1455619452474-d2be1b5570eb?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-07.jpg":
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-08.jpg":
    "https://images.unsplash.com/photo-1497935586351-b67a49e494bf?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-09.jpg":
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-10.jpg":
    "https://images.unsplash.com/photo-1521017432531-f67cfd54d404?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-11.jpg":
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80",
  "public/assets/gallery/gallery-12.jpg":
    "https://images.unsplash.com/photo-1550966871-3ed3cdba6389?auto=format&fit=crop&w=800&q=80",
  // Branches
  "public/assets/branches/geneva-flagship.jpg":
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
  "public/assets/branches/zurich-lounge.jpg":
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
  "public/assets/branches/paris-atelier.jpg":
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80",
};

async function download(path, url) {
  const fullPath = join(root, path);
  await mkdir(dirname(fullPath), { recursive: true });
  const res = await fetch(url, {
    headers: { "User-Agent": "VelvetBistroAssetScript/1.0" },
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(fullPath, buf);
  console.log("OK", path);
}

let failed = 0;
for (const [path, url] of Object.entries(downloads)) {
  try {
    await download(path, url);
  } catch (e) {
    failed++;
    console.error("FAIL", path, e);
  }
}
console.log(`Done. Failed: ${failed}`);
