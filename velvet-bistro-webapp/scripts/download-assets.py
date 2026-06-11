"""Download restaurant-themed images for Velvet Bistro (Pexels, free to use)."""
import os
import time

import requests

PEXELS = "https://images.pexels.com/photos"
HQ = "?auto=compress&cs=tinysrgb&w=1920"
CARD = "?auto=compress&cs=tinysrgb&w=1200"
SQUARE = "?auto=compress&cs=tinysrgb&w=1200&h=1200&fit=crop"
AVATAR = "?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
PORTRAIT = "?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"


def pexels(photo_id: int, size: str = CARD) -> str:
    return f"{PEXELS}/{photo_id}/pexels-photo-{photo_id}.jpeg{size}"


IMAGES = {
    # ── Site heroes & pages ──────────────────────────────────────────────
    "public/assets/images/hero.jpg": pexels(941861, HQ),
    "public/assets/images/ambiance.jpg": pexels(262978, HQ),
    "public/assets/images/chef.jpg": pexels(769331, PORTRAIT),
    "public/assets/images/story.jpg": pexels(262047, HQ),
    "public/assets/images/interior.jpg": pexels(941864, HQ),
    "public/assets/images/dining.jpg": pexels(941873, HQ),
    "public/assets/images/about-hero.jpg": pexels(941864, HQ),
    "public/assets/images/contact-hero.jpg": pexels(262047, HQ),
    "public/assets/images/private-dining.jpg": pexels(941873, HQ),
    # ── Team portraits ───────────────────────────────────────────────────
    "public/assets/images/team-laurent.jpg": pexels(769331, PORTRAIT),
    "public/assets/images/team-sophie.jpg": pexels(3756620, PORTRAIT),
    "public/assets/images/team-marco.jpg": pexels(2746469, PORTRAIT),
    # ── Timeline ─────────────────────────────────────────────────────────
    "public/assets/images/timeline-2012.jpg": pexels(262047, HQ),
    "public/assets/images/timeline-2015.jpg": pexels(262978, HQ),
    "public/assets/images/timeline-2023.jpg": pexels(941864, HQ),
    "public/assets/images/timeline-2025.jpg": pexels(941861, HQ),
    # ── Blog ─────────────────────────────────────────────────────────────
    "public/assets/images/blog-espresso.jpg": pexels(302899, HQ),
    "public/assets/images/blog-tasting.jpg": pexels(941873, HQ),
    "public/assets/images/blog-sustainability.jpg": pexels(143133, HQ),
    # ── Awards ───────────────────────────────────────────────────────────
    "public/assets/images/award-michelin.jpg": pexels(941873, CARD),
    "public/assets/images/award-world-luxury.jpg": pexels(262047, CARD),
    "public/assets/images/award-gault.jpg": pexels(941861, CARD),
    "public/assets/images/award-tripadvisor.jpg": pexels(262978, CARD),
    "public/assets/images/award-sustainable.jpg": pexels(143133, CARD),
    "public/assets/images/award-wine.jpg": pexels(1283219, CARD),
    # ── Brand values ─────────────────────────────────────────────────────
    "public/assets/images/value-craft.jpg": pexels(769331, CARD),
    "public/assets/images/value-hospitality.jpg": pexels(262978, CARD),
    "public/assets/images/value-sustainability.jpg": pexels(143133, CARD),
    "public/assets/images/value-community.jpg": pexels(941864, CARD),
    # ── Case studies ─────────────────────────────────────────────────────
    "public/assets/images/case-corporate.jpg": pexels(941873, HQ),
    "public/assets/images/case-launch.jpg": pexels(1283219, HQ),
    # ── Testimonials ─────────────────────────────────────────────────────
    "public/assets/images/testimonial-01.jpg": pexels(774909, AVATAR),
    "public/assets/images/testimonial-02.jpg": pexels(1181686, AVATAR),
    "public/assets/images/testimonial-03.jpg": pexels(2379004, AVATAR),
    "public/assets/images/testimonial-04.jpg": pexels(1239291, AVATAR),
    "public/assets/images/testimonial-05.jpg": pexels(220453, AVATAR),
    # ── Menu (unique dish photo per item) ────────────────────────────────
    "public/assets/menu/truffle-croissant-benedict.jpg": pexels(793786, CARD),
    "public/assets/menu/golden-brioche-french-toast.jpg": pexels(376464, CARD),
    "public/assets/menu/velvet-breakfast-board.jpg": pexels(704571, CARD),
    "public/assets/menu/wagyu-tenderloin.jpg": pexels(3535385, CARD),
    "public/assets/menu/pan-seared-sea-bass.jpg": pexels(691114, CARD),
    "public/assets/menu/herb-crusted-lamb-rack.jpg": pexels(769289, CARD),
    "public/assets/menu/dark-chocolate-souffle.jpg": pexels(6889919, CARD),
    "public/assets/menu/pistachio-rose-tart.jpg": pexels(291528, CARD),
    "public/assets/menu/creme-brulee-royale.jpg": pexels(2271106, CARD),
    "public/assets/menu/signature-velvet-espresso.jpg": pexels(302899, CARD),
    "public/assets/menu/caramel-affogato.jpg": pexels(8473213, CARD),
    "public/assets/menu/lavender-latte.jpg": pexels(3121775, CARD),
    "public/assets/menu/golden-negroni.jpg": pexels(1283219, CARD),
    "public/assets/menu/smoked-old-fashioned.jpg": pexels(1040828, CARD),
    "public/assets/menu/velvet-sparkling-rose.jpg": pexels(1964781, CARD),
    "public/assets/menu/chefs-tasting-omakase.jpg": pexels(941873, CARD),
    "public/assets/menu/lobster-thermidor.jpg": pexels(566566, CARD),
    "public/assets/menu/black-truffle-risotto.jpg": pexels(2085661, CARD),
    # ── Gallery (12 unique shots) ────────────────────────────────────────
    "public/assets/gallery/gallery-01.jpg": pexels(3535385, SQUARE),
    "public/assets/gallery/gallery-02.jpg": pexels(376464, SQUARE),
    "public/assets/gallery/gallery-03.jpg": pexels(262978, SQUARE),
    "public/assets/gallery/gallery-04.jpg": pexels(941873, SQUARE),
    "public/assets/gallery/gallery-05.jpg": pexels(691114, SQUARE),
    "public/assets/gallery/gallery-06.jpg": pexels(1283219, SQUARE),
    "public/assets/gallery/gallery-07.jpg": pexels(302899, SQUARE),
    "public/assets/gallery/gallery-08.jpg": pexels(941864, SQUARE),
    "public/assets/gallery/gallery-09.jpg": pexels(769331, SQUARE),
    "public/assets/gallery/gallery-10.jpg": pexels(6889919, SQUARE),
    "public/assets/gallery/gallery-11.jpg": pexels(262047, SQUARE),
    "public/assets/gallery/gallery-12.jpg": pexels(941861, SQUARE),
    # ── Branches ─────────────────────────────────────────────────────────
    "public/assets/branches/geneva-flagship.jpg": pexels(941861, HQ),
    "public/assets/branches/zurich-lounge.jpg": pexels(262978, HQ),
    "public/assets/branches/paris-atelier.jpg": pexels(941864, HQ),
}

session = requests.Session()
session.headers.update({"User-Agent": "VelvetBistro-Asset-Downloader/1.0"})

failed: list[str] = []
for path, url in IMAGES.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    try:
        response = session.get(url, timeout=120)
        response.raise_for_status()
        content = response.content
        if len(content) < 5000:
            raise requests.RequestException(f"Response too small ({len(content)} bytes)")
        with open(path, "wb") as handle:
            handle.write(content)
        print(f"OK  {path} ({len(content):,} bytes)")
    except requests.RequestException as error:
        failed.append(path)
        print(f"FAIL {path}: {error}")
    time.sleep(0.15)

print(f"\nDone. {len(IMAGES) - len(failed)}/{len(IMAGES)} images saved.")
if failed:
    print("Failed paths:")
    for path in failed:
        print(f"  - {path}")
    raise SystemExit(1)
