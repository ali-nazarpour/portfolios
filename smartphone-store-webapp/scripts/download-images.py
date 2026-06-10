"""Download HQ smartphone-themed images (Pexels, free to use)."""
import os
import time

import requests

PEXELS = "https://images.pexels.com/photos"
HQ = "?auto=compress&cs=tinysrgb&w=1920"
PRODUCT = "?auto=compress&cs=tinysrgb&w=800"
GALLERY = "?auto=compress&cs=tinysrgb&w=1000"
PORTRAIT = "?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
SQUARE = "?auto=compress&cs=tinysrgb&w=1080&h=1080&fit=crop"


def p(photo_id: int, params: str) -> str:
    return f"{PEXELS}/{photo_id}/pexels-photo-{photo_id}.jpeg{params}"


IMAGES = {
    "public/assets/images/showroom.jpg": p(3807277, HQ),
    "public/assets/images/technology.jpg": p(1092644, HQ),
    "public/assets/images/retail.jpg": p(5532661, HQ),
    "public/assets/images/contact.jpg": p(4480505, HQ),
    "public/assets/brands/apple.jpg": p(788946, PRODUCT),
    "public/assets/brands/samsung.jpg": p(5059213, PRODUCT),
    "public/assets/brands/xiaomi.jpg": p(607812, PRODUCT),
    "public/assets/products/apple-iphone-16-pro.jpg": p(1092644, PRODUCT),
    "public/assets/products/apple-iphone-16.jpg": p(788946, PRODUCT),
    "public/assets/products/apple-iphone-15-pro-max.jpg": p(699122, PRODUCT),
    "public/assets/products/apple-iphone-se.jpg": p(1092671, PRODUCT),
    "public/assets/products/samsung-galaxy-s25-ultra.jpg": p(5059213, PRODUCT),
    "public/assets/products/samsung-galaxy-s25.jpg": p(607812, PRODUCT),
    "public/assets/products/samsung-galaxy-z-fold6.jpg": p(404280, PRODUCT),
    "public/assets/products/samsung-galaxy-a55.jpg": p(1295036, PRODUCT),
    "public/assets/products/xiaomi-15-ultra.jpg": p(1476321, PRODUCT),
    "public/assets/products/xiaomi-15.jpg": p(699122, PRODUCT),
    "public/assets/products/xiaomi-14t-pro.jpg": p(1092644, PRODUCT),
    "public/assets/products/xiaomi-redmi-note-14-pro.jpg": p(788946, PRODUCT),
    "public/assets/gallery/apple-hero-1.jpg": p(1092644, GALLERY),
    "public/assets/gallery/apple-hero-2.jpg": p(788946, GALLERY),
    "public/assets/gallery/apple-hero-3.jpg": p(699122, GALLERY),
    "public/assets/gallery/apple-hero-4.jpg": p(1092671, GALLERY),
    "public/assets/gallery/apple-detail-1.jpg": p(607812, GALLERY),
    "public/assets/gallery/apple-detail-2.jpg": p(404280, GALLERY),
    "public/assets/gallery/apple-detail-3.jpg": p(1295036, GALLERY),
    "public/assets/gallery/apple-detail-4.jpg": p(1476321, GALLERY),
    "public/assets/gallery/samsung-hero-1.jpg": p(5059213, GALLERY),
    "public/assets/gallery/samsung-hero-2.jpg": p(607812, GALLERY),
    "public/assets/gallery/samsung-hero-3.jpg": p(404280, GALLERY),
    "public/assets/gallery/samsung-hero-4.jpg": p(1295036, GALLERY),
    "public/assets/gallery/samsung-detail-1.jpg": p(699122, GALLERY),
    "public/assets/gallery/samsung-detail-2.jpg": p(1092644, GALLERY),
    "public/assets/gallery/samsung-detail-3.jpg": p(788946, GALLERY),
    "public/assets/gallery/samsung-detail-4.jpg": p(699122, GALLERY),
    "public/assets/gallery/xiaomi-hero-1.jpg": p(1476321, GALLERY),
    "public/assets/gallery/xiaomi-hero-2.jpg": p(699122, GALLERY),
    "public/assets/gallery/xiaomi-hero-3.jpg": p(1092671, GALLERY),
    "public/assets/gallery/xiaomi-hero-4.jpg": p(5059213, GALLERY),
    "public/assets/gallery/xiaomi-detail-1.jpg": p(607812, GALLERY),
    "public/assets/gallery/xiaomi-detail-2.jpg": p(404280, GALLERY),
    "public/assets/gallery/xiaomi-detail-3.jpg": p(1295036, GALLERY),
    "public/assets/gallery/xiaomi-detail-4.jpg": p(788946, GALLERY),
    "public/assets/team/david-kim.jpg": p(220453, PORTRAIT),
    "public/assets/team/sarah-chen.jpg": p(774909, PORTRAIT),
    "public/assets/team/marcus-weber.jpg": p(2379004, PORTRAIT),
    "public/assets/team/elena-rodriguez.jpg": p(1181686, PORTRAIT),
    "public/assets/team/james-park.jpg": p(1222271, PORTRAIT),
    "public/assets/team/amira-hassan.jpg": p(1239291, PORTRAIT),
    "public/assets/social/post-1.jpg": p(1092644, SQUARE),
    "public/assets/social/post-2.jpg": p(5059213, SQUARE),
    "public/assets/social/post-3.jpg": p(3807277, SQUARE),
    "public/assets/social/post-4.jpg": p(5532661, SQUARE),
    "public/assets/social/post-5.jpg": p(607812, SQUARE),
    "public/assets/social/post-6.jpg": p(788946, SQUARE),
}

session = requests.Session()
session.headers.update({"User-Agent": "SmartphoneStore-Asset-Downloader/1.0"})

print(f"Downloading {len(IMAGES)} assets...\n")

for path, url in IMAGES.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    for attempt in range(1, 4):
        try:
            response = session.get(url, timeout=120)
            response.raise_for_status()
            with open(path, "wb") as handle:
                handle.write(response.content)
            print(f"OK {path.replace('public/', '')}")
            break
        except Exception as error:
            if attempt == 3:
                print(f"FAIL {path.replace('public/', '')}: {error}")
            else:
                time.sleep(0.5 * attempt)
    time.sleep(0.2)

print(f"\nDone.")
