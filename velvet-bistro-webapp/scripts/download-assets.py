"""Download restaurant-themed images for Velvet Bistro (Pexels, free to use)."""
import os
import shutil
import time

import requests

PEXELS = "https://images.pexels.com/photos"
HQ = "?auto=compress&cs=tinysrgb&w=1920"
CARD = "?auto=compress&cs=tinysrgb&w=800"
SQUARE = "?auto=compress&cs=tinysrgb&w=1080&h=1080&fit=crop"
AVATAR = "?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"

IMAGES = {
    "public/assets/images/hero.jpg": f"{PEXELS}/262047/pexels-photo-262047.jpeg{HQ}",
    "public/assets/images/ambiance.jpg": f"{PEXELS}/262978/pexels-photo-262978.jpeg{HQ}",
    "public/assets/images/chef.jpg": f"{PEXELS}/887783/pexels-photo-887783.jpeg{CARD}",
    "public/assets/images/story.jpg": f"{PEXELS}/941861/pexels-photo-941861.jpeg{HQ}",
    "public/assets/images/interior.jpg": f"{PEXELS}/941864/pexels-photo-941864.jpeg{HQ}",
    "public/assets/images/dining.jpg": f"{PEXELS}/941873/pexels-photo-941873.jpeg{HQ}",
    "public/assets/images/about-hero.jpg": f"{PEXELS}/262047/pexels-photo-262047.jpeg{HQ}",
    "public/assets/images/contact-hero.jpg": f"{PEXELS}/941861/pexels-photo-941861.jpeg{HQ}",
    "public/assets/images/private-dining.jpg": f"{PEXELS}/941873/pexels-photo-941873.jpeg{HQ}",
    "public/assets/images/timeline-2012.jpg": f"{PEXELS}/262047/pexels-photo-262047.jpeg{HQ}",
    "public/assets/images/timeline-2015.jpg": f"{PEXELS}/262978/pexels-photo-262978.jpeg{HQ}",
    "public/assets/images/timeline-2023.jpg": f"{PEXELS}/941864/pexels-photo-941864.jpeg{HQ}",
    "public/assets/images/timeline-2025.jpg": f"{PEXELS}/941861/pexels-photo-941861.jpeg{HQ}",
    "public/assets/images/blog-espresso.jpg": f"{PEXELS}/302899/pexels-photo-302899.jpeg{HQ}",
    "public/assets/images/blog-tasting.jpg": f"{PEXELS}/941873/pexels-photo-941873.jpeg{HQ}",
    "public/assets/images/blog-sustainability.jpg": f"{PEXELS}/143133/pexels-photo-143133.jpeg{HQ}",
    "public/assets/images/award-michelin.jpg": f"{PEXELS}/941873/pexels-photo-941873.jpeg{CARD}",
    "public/assets/images/award-world-luxury.jpg": f"{PEXELS}/262047/pexels-photo-262047.jpeg{CARD}",
    "public/assets/images/award-gault.jpg": f"{PEXELS}/941861/pexels-photo-941861.jpeg{CARD}",
    "public/assets/images/award-tripadvisor.jpg": f"{PEXELS}/262978/pexels-photo-262978.jpeg{CARD}",
    "public/assets/images/award-sustainable.jpg": f"{PEXELS}/143133/pexels-photo-143133.jpeg{CARD}",
    "public/assets/images/award-wine.jpg": f"{PEXELS}/1283219/pexels-photo-1283219.jpeg{CARD}",
    "public/assets/images/value-craft.jpg": f"{PEXELS}/887783/pexels-photo-887783.jpeg{CARD}",
    "public/assets/images/value-hospitality.jpg": f"{PEXELS}/262978/pexels-photo-262978.jpeg{CARD}",
    "public/assets/images/value-sustainability.jpg": f"{PEXELS}/143133/pexels-photo-143133.jpeg{CARD}",
    "public/assets/images/value-community.jpg": f"{PEXELS}/941864/pexels-photo-941864.jpeg{CARD}",
    "public/assets/images/case-corporate.jpg": f"{PEXELS}/941873/pexels-photo-941873.jpeg{HQ}",
    "public/assets/images/case-launch.jpg": f"{PEXELS}/1283219/pexels-photo-1283219.jpeg{HQ}",
    "public/assets/images/testimonial-01.jpg": f"{PEXELS}/774909/pexels-photo-774909.jpeg{AVATAR}",
    "public/assets/images/testimonial-02.jpg": f"{PEXELS}/1181686/pexels-photo-1181686.jpeg{AVATAR}",
    "public/assets/images/testimonial-03.jpg": f"{PEXELS}/2379004/pexels-photo-2379004.jpeg{AVATAR}",
    "public/assets/images/testimonial-04.jpg": f"{PEXELS}/1239291/pexels-photo-1239291.jpeg{AVATAR}",
    "public/assets/images/testimonial-05.jpg": f"{PEXELS}/220453/pexels-photo-220453.jpeg{AVATAR}",
    "public/assets/menu/truffle-croissant-benedict.jpg": f"{PEXELS}/2135/pexels-photo-2135.jpeg{CARD}",
    "public/assets/menu/golden-brioche-french-toast.jpg": f"{PEXELS}/376464/pexels-photo-376464.jpeg{CARD}",
    "public/assets/menu/velvet-breakfast-board.jpg": f"{PEXELS}/6293/pexels-photo-6293.jpeg{CARD}",
    "public/assets/menu/wagyu-tenderloin.jpg": f"{PEXELS}/361184/pexels-photo-361184.jpeg{CARD}",
    "public/assets/menu/pan-seared-sea-bass.jpg": f"{PEXELS}/46239/pexels-photo-46239.jpeg{CARD}",
    "public/assets/menu/herb-crusted-lamb-rack.jpg": f"{PEXELS}/361184/pexels-photo-361184.jpeg{CARD}",
    "public/assets/menu/dark-chocolate-souffle.jpg": f"{PEXELS}/45202/pexels-photo-45202.jpeg{CARD}",
    "public/assets/menu/pistachio-rose-tart.jpg": f"{PEXELS}/291528/pexels-photo-291528.jpeg{CARD}",
    "public/assets/menu/creme-brulee-royale.jpg": f"{PEXELS}/45202/pexels-photo-45202.jpeg{CARD}",
    "public/assets/menu/signature-velvet-espresso.jpg": f"{PEXELS}/302899/pexels-photo-302899.jpeg{CARD}",
    "public/assets/menu/caramel-affogato.jpg": f"{PEXELS}/302899/pexels-photo-302899.jpeg{CARD}",
    "public/assets/menu/lavender-latte.jpg": f"{PEXELS}/302899/pexels-photo-302899.jpeg{CARD}",
    "public/assets/menu/golden-negroni.jpg": f"{PEXELS}/1283219/pexels-photo-1283219.jpeg{CARD}",
    "public/assets/menu/smoked-old-fashioned.jpg": f"{PEXELS}/1283219/pexels-photo-1283219.jpeg{CARD}",
    "public/assets/menu/velvet-sparkling-rose.jpg": f"{PEXELS}/1283219/pexels-photo-1283219.jpeg{CARD}",
    "public/assets/menu/chefs-tasting-omakase.jpg": f"{PEXELS}/941873/pexels-photo-941873.jpeg{CARD}",
    "public/assets/menu/lobster-thermidor.jpg": f"{PEXELS}/46239/pexels-photo-46239.jpeg{CARD}",
    "public/assets/menu/black-truffle-risotto.jpg": f"{PEXELS}/143133/pexels-photo-143133.jpeg{CARD}",
    "public/assets/gallery/gallery-01.jpg": f"{PEXELS}/361184/pexels-photo-361184.jpeg{SQUARE}",
    "public/assets/gallery/gallery-02.jpg": f"{PEXELS}/376464/pexels-photo-376464.jpeg{SQUARE}",
    "public/assets/gallery/gallery-03.jpg": f"{PEXELS}/262978/pexels-photo-262978.jpeg{SQUARE}",
    "public/assets/gallery/gallery-04.jpg": f"{PEXELS}/941873/pexels-photo-941873.jpeg{SQUARE}",
    "public/assets/gallery/gallery-05.jpg": f"{PEXELS}/46239/pexels-photo-46239.jpeg{SQUARE}",
    "public/assets/gallery/gallery-06.jpg": f"{PEXELS}/1283219/pexels-photo-1283219.jpeg{SQUARE}",
    "public/assets/gallery/gallery-07.jpg": f"{PEXELS}/302899/pexels-photo-302899.jpeg{SQUARE}",
    "public/assets/gallery/gallery-08.jpg": f"{PEXELS}/941864/pexels-photo-941864.jpeg{SQUARE}",
    "public/assets/gallery/gallery-09.jpg": f"{PEXELS}/887783/pexels-photo-887783.jpeg{SQUARE}",
    "public/assets/gallery/gallery-10.jpg": f"{PEXELS}/45202/pexels-photo-45202.jpeg{SQUARE}",
    "public/assets/gallery/gallery-11.jpg": f"{PEXELS}/262047/pexels-photo-262047.jpeg{SQUARE}",
    "public/assets/gallery/gallery-12.jpg": f"{PEXELS}/941861/pexels-photo-941861.jpeg{SQUARE}",
    "public/assets/branches/geneva-flagship.jpg": f"{PEXELS}/941861/pexels-photo-941861.jpeg{HQ}",
    "public/assets/branches/zurich-lounge.jpg": f"{PEXELS}/262978/pexels-photo-262978.jpeg{HQ}",
    "public/assets/branches/paris-atelier.jpg": f"{PEXELS}/941864/pexels-photo-941864.jpeg{HQ}",
}

session = requests.Session()
session.headers.update({"User-Agent": "VelvetBistro-Asset-Downloader/1.0"})

FALLBACKS = {
    "public/assets/images/chef.jpg": "public/assets/gallery/gallery-09.jpg",
    "public/assets/images/value-craft.jpg": "public/assets/images/chef.jpg",
    "public/assets/menu/truffle-croissant-benedict.jpg": "public/assets/menu/golden-brioche-french-toast.jpg",
    "public/assets/menu/velvet-breakfast-board.jpg": "public/assets/menu/golden-brioche-french-toast.jpg",
    "public/assets/menu/wagyu-tenderloin.jpg": "public/assets/menu/pistachio-rose-tart.jpg",
    "public/assets/menu/pan-seared-sea-bass.jpg": "public/assets/menu/black-truffle-risotto.jpg",
    "public/assets/menu/herb-crusted-lamb-rack.jpg": "public/assets/menu/wagyu-tenderloin.jpg",
    "public/assets/menu/dark-chocolate-souffle.jpg": "public/assets/menu/pistachio-rose-tart.jpg",
    "public/assets/menu/creme-brulee-royale.jpg": "public/assets/menu/dark-chocolate-souffle.jpg",
    "public/assets/menu/lobster-thermidor.jpg": "public/assets/menu/pan-seared-sea-bass.jpg",
    "public/assets/gallery/gallery-01.jpg": "public/assets/gallery/gallery-02.jpg",
    "public/assets/gallery/gallery-05.jpg": "public/assets/gallery/gallery-04.jpg",
    "public/assets/gallery/gallery-09.jpg": "public/assets/images/chef.jpg",
    "public/assets/gallery/gallery-10.jpg": "public/assets/menu/pistachio-rose-tart.jpg",
}

failed = 0
for path, url in IMAGES.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    try:
        response = session.get(url, timeout=120)
        response.raise_for_status()
        with open(path, "wb") as handle:
            handle.write(response.content)
        print(f"Downloaded {path} ({len(response.content):,} bytes)")
    except requests.RequestException as error:
        failed += 1
        print(f"FAILED {path}: {error}")
    time.sleep(0.2)

for path, fallback in FALLBACKS.items():
    if not os.path.isfile(path) and os.path.isfile(fallback):
        shutil.copy2(fallback, path)
        print(f"Copied fallback {fallback} -> {path}")

print(f"Done. {len(IMAGES) - failed}/{len(IMAGES)} images saved.")
