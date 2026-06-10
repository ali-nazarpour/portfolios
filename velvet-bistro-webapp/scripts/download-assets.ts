import { mkdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const assets: Record<string, string> = {
  'assets/images/hero.jpg': U('1414235077428-338989a2e8c0', 1920),
  'assets/images/ambiance.jpg': U('1517248135467-4c7edcad34c4'),
  'assets/images/chef.jpg': U('1577219491135-ab25a1e5500b', 800),
  'assets/images/story.jpg': U('1559339352-11d035aa65de'),
  'assets/images/interior.jpg': U('1600891964594-f61a49de5549'),
  'assets/images/dining.jpg': U('1552566626-52f8b828add9'),
  'assets/images/about-hero.jpg': U('1555396273-367ea4eb4db5', 1920),
  'assets/images/contact-hero.jpg': U('1551218808-94e220e084d2', 1920),
  'assets/images/private-dining.jpg': U('1414235077428-338989a2e8c0'),
  'assets/images/timeline-2012.jpg': U('1559339352-11d035aa65de'),
  'assets/images/timeline-2015.jpg': U('1555396273-367ea4eb4db5'),
  'assets/images/timeline-2023.jpg': U('1517248135467-4c7edcad34c4'),
  'assets/images/timeline-2025.jpg': U('1600891964594-f61a49de5549'),
  'assets/images/blog-espresso.jpg': U('1514432324607-09a9bf096aef'),
  'assets/images/blog-tasting.jpg': U('1579876437438-9dff1b3b3099'),
  'assets/images/blog-sustainability.jpg': U('1497935586351-b67a49e494bf'),
  'assets/images/award-michelin.jpg': U('1579876437438-9dff1b3b3099', 800),
  'assets/images/award-world-luxury.jpg': U('1414235077428-338989a2e8c0', 800),
  'assets/images/award-gault.jpg': U('1552566626-52f8b828add9', 800),
  'assets/images/award-tripadvisor.jpg': U('1517248135467-4c7edcad34c4', 800),
  'assets/images/award-sustainable.jpg': U('1497935586351-b67a49e494bf', 800),
  'assets/images/award-wine.jpg': U('1510812431400-5740e4510a72', 800),
  'assets/images/value-craft.jpg': U('1577219491135-ab25a1e5500b', 800),
  'assets/images/value-hospitality.jpg': U('1559339352-11d035aa65de', 800),
  'assets/images/value-sustainability.jpg': U('1497935586351-b67a49e494bf', 800),
  'assets/images/value-community.jpg': U('1554118811-1e0d58224f24', 800),
  'assets/images/case-corporate.jpg': U('1551218808-94e220e084d2'),
  'assets/images/case-launch.jpg': U('1514362545857-3bc16c4c7d1b'),
  'assets/images/testimonial-01.jpg': U('1472099645785-5658abf4ff4e', 400),
  'assets/images/testimonial-02.jpg': U('1580489944761-15a19d654956', 400),
  'assets/images/testimonial-03.jpg': U('1507003211169-0a1dd7228f2d', 400),
  'assets/images/testimonial-04.jpg': U('1573496359142-b8d87734a5a2', 400),
  'assets/images/testimonial-05.jpg': U('1594744803329-e58b31de8bf5', 400),
  'assets/menu/truffle-croissant-benedict.jpg': U('1482049010765-37163dbda165', 800),
  'assets/menu/golden-brioche-french-toast.jpg': U('1484723091739-30a097c8ef60', 800),
  'assets/menu/velvet-breakfast-board.jpg': U('1533089860890-a1d0b45a100d', 800),
  'assets/menu/wagyu-tenderloin.jpg': U('1546833999-b9f581a1996d', 800),
  'assets/menu/pan-seared-sea-bass.jpg': U('1519708227418-c8fd9a32b7a2', 800),
  'assets/menu/herb-crusted-lamb-rack.jpg': U('1603360946369-dc9bb6258143', 800),
  'assets/menu/dark-chocolate-souffle.jpg': U('1624353365286-3f8d62daad51', 800),
  'assets/menu/pistachio-rose-tart.jpg': U('1565958011703-44f9829ba187', 800),
  'assets/menu/creme-brulee-royale.jpg': U('1551024506-0bccd828d307', 800),
  'assets/menu/signature-velvet-espresso.jpg': U('1514432324607-09a9bf096aef', 800),
  'assets/menu/caramel-affogato.jpg': U('1461023058943-07fcbe16d735', 800),
  'assets/menu/lavender-latte.jpg': U('1495474472287-4d71bcdd2085', 800),
  'assets/menu/golden-negroni.jpg': U('1514362545857-3bc16c4c7d1b', 800),
  'assets/menu/smoked-old-fashioned.jpg': U('1470337458703-46ad1756a187', 800),
  'assets/menu/velvet-sparkling-rose.jpg': U('1510812431400-5740e4510a72', 800),
  'assets/menu/chefs-tasting-omakase.jpg': U('1579876437438-9dff1b3b3099', 800),
  'assets/menu/lobster-thermidor.jpg': U('1559847844-d721426d6edc', 800),
  'assets/menu/black-truffle-risotto.jpg': U('1476124369491-c7addf454114', 800),
  'assets/gallery/gallery-01.jpg': U('1504674900247-0877df9cc836', 800),
  'assets/gallery/gallery-02.jpg': U('1506089676908-3592f738119d', 800),
  'assets/gallery/gallery-03.jpg': U('1554118811-1e0d58224f24', 800),
  'assets/gallery/gallery-04.jpg': U('1493857671505-7291e2e2763a', 800),
  'assets/gallery/gallery-05.jpg': U('1445118770665-371b34625864', 800),
  'assets/gallery/gallery-06.jpg': U('1455619452474-d2be1b5570eb', 800),
  'assets/gallery/gallery-07.jpg': U('1509042239860-f550ce710b93', 800),
  'assets/gallery/gallery-08.jpg': U('1497935586351-b67a49e494bf', 800),
  'assets/gallery/gallery-09.jpg': U('1442512595331-e89e73853f31', 800),
  'assets/gallery/gallery-10.jpg': U('1521017432531-f67cfd54d404', 800),
  'assets/gallery/gallery-11.jpg': U('1559925393-8be0ec4767c8', 800),
  'assets/gallery/gallery-12.jpg': U('1550966871-3ed3cdba6389', 800),
  'assets/branches/geneva-flagship.jpg': U('1559339352-11d035aa65de', 900),
  'assets/branches/zurich-lounge.jpg': U('1555396273-367ea4eb4db5', 900),
  'assets/branches/paris-atelier.jpg': U('1551218808-94e220e084d2', 900),
}

async function downloadAsset(relativePath: string, url: string) {
  const filePath = join(publicDir, relativePath)
  await mkdir(dirname(filePath), { recursive: true })

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'VelvetBistro-Asset-Downloader/1.0' },
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const buffer = Buffer.from(await response.arrayBuffer())
    await writeFile(filePath, buffer)
    console.log(`✓ ${relativePath}`)
  } catch (error) {
    console.error(`✗ ${relativePath}:`, error)
  }
}

console.log(`Downloading ${Object.keys(assets).length} Velvet Bistro assets...\n`)
for (const [path, url] of Object.entries(assets)) {
  await downloadAsset(path, url)
  await new Promise((r) => setTimeout(r, 200))
}
console.log('\nDone.')
