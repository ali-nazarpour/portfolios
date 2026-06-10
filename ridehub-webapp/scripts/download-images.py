"""Download HQ mobility-themed images for RideHub (Pexels, free to use)."""
import os

import requests

PEXELS = "https://images.pexels.com/photos"
HQ = "?auto=compress&cs=tinysrgb&w=1920"
PORTRAIT = "?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
SQUARE = "?auto=compress&cs=tinysrgb&w=1080&h=1080&fit=crop"
AVATAR = "?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"

IMAGES = {
    # Gallery
    "public/assets/gallery/bike-trail.jpg": f"{PEXELS}/2908458/pexels-photo-2908458.jpeg{HQ}",
    "public/assets/gallery/bike-mountain.jpg": f"{PEXELS}/100582/pexels-photo-100582.jpeg{HQ}",
    "public/assets/gallery/bike-road.jpg": f"{PEXELS}/248547/pexels-photo-248547.jpeg{HQ}",
    "public/assets/gallery/bike-gravel.jpg": f"{PEXELS}/2762247/pexels-photo-2762247.jpeg{HQ}",
    "public/assets/gallery/scooter-urban.jpg": f"{PEXELS}/208736/pexels-photo-208736.jpeg{HQ}",
    "public/assets/gallery/scooter-city.jpg": f"{PEXELS}/1592384/pexels-photo-1592384.jpeg{HQ}",
    "public/assets/gallery/motorcycle-road.jpg": f"{PEXELS}/1413414/pexels-photo-1413414.jpeg{HQ}",
    "public/assets/gallery/motorcycle-adventure.jpg": f"{PEXELS}/2116475/pexels-photo-2116475.jpeg{HQ}",
    "public/assets/gallery/showroom-1.jpg": f"{PEXELS}/3807277/pexels-photo-3807277.jpeg{HQ}",
    "public/assets/gallery/showroom-2.jpg": f"{PEXELS}/4480505/pexels-photo-4480505.jpeg{HQ}",
    "public/assets/gallery/lifestyle-1.jpg": f"{PEXELS}/1365425/pexels-photo-1365425.jpeg{HQ}",
    "public/assets/gallery/lifestyle-2.jpg": f"{PEXELS}/296282/pexels-photo-296282.jpeg{HQ}",
    "public/assets/gallery/tech-1.jpg": f"{PEXELS}/1592384/pexels-photo-1592384.jpeg{HQ}",
    "public/assets/gallery/tech-2.jpg": f"{PEXELS}/2116475/pexels-photo-2116475.jpeg{HQ}",
    # Page heroes
    "public/assets/images/cinematic-reveal.jpg": f"{PEXELS}/1413414/pexels-photo-1413414.jpeg{HQ}",
    "public/assets/images/hero-bg.jpg": f"{PEXELS}/2908458/pexels-photo-2908458.jpeg{HQ}",
    "public/assets/images/about-showroom.jpg": f"{PEXELS}/3807277/pexels-photo-3807277.jpeg{HQ}",
    "public/assets/images/contact-hero.jpg": f"{PEXELS}/4480505/pexels-photo-4480505.jpeg{HQ}",
    # Products
    "public/assets/products/trek-fuel-exe.jpg": f"{PEXELS}/2908458/pexels-photo-2908458.jpeg{HQ}",
    "public/assets/products/trek-fuel-exe-2.jpg": f"{PEXELS}/100582/pexels-photo-100582.jpeg{HQ}",
    "public/assets/products/trek-domane.jpg": f"{PEXELS}/248547/pexels-photo-248547.jpeg{HQ}",
    "public/assets/products/giant-trance.jpg": f"{PEXELS}/100582/pexels-photo-100582.jpeg{HQ}",
    "public/assets/products/giant-revolt.jpg": f"{PEXELS}/2762247/pexels-photo-2762247.jpeg{HQ}",
    "public/assets/products/specialized-levo.jpg": f"{PEXELS}/2908458/pexels-photo-2908458.jpeg{HQ}",
    "public/assets/products/specialized-tarmac.jpg": f"{PEXELS}/248547/pexels-photo-248547.jpeg{HQ}",
    "public/assets/products/segway-max-g2.jpg": f"{PEXELS}/208736/pexels-photo-208736.jpeg{HQ}",
    "public/assets/products/segway-gt3.jpg": f"{PEXELS}/1592384/pexels-photo-1592384.jpeg{HQ}",
    "public/assets/products/xiaomi-4-pro.jpg": f"{PEXELS}/208736/pexels-photo-208736.jpeg{HQ}",
    "public/assets/products/xiaomi-5-max.jpg": f"{PEXELS}/1592384/pexels-photo-1592384.jpeg{HQ}",
    "public/assets/products/zero-srf.jpg": f"{PEXELS}/1413414/pexels-photo-1413414.jpeg{HQ}",
    "public/assets/products/zero-dsrx.jpg": f"{PEXELS}/2116475/pexels-photo-2116475.jpeg{HQ}",
    # Team headshots
    "public/assets/team/sarah-chen.jpg": f"{PEXELS}/774909/pexels-photo-774909.jpeg{PORTRAIT}",
    "public/assets/team/marcus-webb.jpg": f"{PEXELS}/2379004/pexels-photo-2379004.jpeg{PORTRAIT}",
    "public/assets/team/elena-rodriguez.jpg": f"{PEXELS}/1181686/pexels-photo-1181686.jpeg{PORTRAIT}",
    "public/assets/team/james-okonkwo.jpg": f"{PEXELS}/1222271/pexels-photo-1222271.jpeg{PORTRAIT}",
    "public/assets/team/amy-foster.jpg": f"{PEXELS}/1239291/pexels-photo-1239291.jpeg{PORTRAIT}",
    "public/assets/team/david-kim.jpg": f"{PEXELS}/220453/pexels-photo-220453.jpeg{PORTRAIT}",
    # Social feed
    "public/assets/social/post-1.jpg": f"{PEXELS}/2908458/pexels-photo-2908458.jpeg{SQUARE}",
    "public/assets/social/post-2.jpg": f"{PEXELS}/208736/pexels-photo-208736.jpeg{SQUARE}",
    "public/assets/social/post-3.jpg": f"{PEXELS}/3807277/pexels-photo-3807277.jpeg{SQUARE}",
    "public/assets/social/post-4.jpg": f"{PEXELS}/1413414/pexels-photo-1413414.jpeg{SQUARE}",
    "public/assets/social/post-5.jpg": f"{PEXELS}/2762247/pexels-photo-2762247.jpeg{SQUARE}",
    "public/assets/social/post-6.jpg": f"{PEXELS}/100582/pexels-photo-100582.jpeg{SQUARE}",
    # Blog
    "public/assets/blog/ebike-guide.jpg": f"{PEXELS}/2908458/pexels-photo-2908458.jpeg{HQ}",
    "public/assets/blog/scooter-commute.jpg": f"{PEXELS}/208736/pexels-photo-208736.jpeg{HQ}",
    "public/assets/blog/motorcycle-future.jpg": f"{PEXELS}/1413414/pexels-photo-1413414.jpeg{HQ}",
    "public/assets/blog/showroom-tips.jpg": f"{PEXELS}/3807277/pexels-photo-3807277.jpeg{HQ}",
    # Case studies
    "public/assets/case-studies/municipal-1.jpg": f"{PEXELS}/208736/pexels-photo-208736.jpeg{HQ}",
    "public/assets/case-studies/fleet-1.jpg": f"{PEXELS}/1758144/pexels-photo-1758144.jpeg{HQ}",
    "public/assets/case-studies/corporate-1.jpg": f"{PEXELS}/3807277/pexels-photo-3807277.jpeg{HQ}",
    # Testimonial avatars
    "public/assets/testimonials/avatar-1.jpg": f"{PEXELS}/774909/pexels-photo-774909.jpeg{AVATAR}",
    "public/assets/testimonials/avatar-2.jpg": f"{PEXELS}/1222271/pexels-photo-1222271.jpeg{AVATAR}",
    "public/assets/testimonials/avatar-3.jpg": f"{PEXELS}/1239291/pexels-photo-1239291.jpeg{AVATAR}",
    "public/assets/testimonials/avatar-4.jpg": f"{PEXELS}/220453/pexels-photo-220453.jpeg{AVATAR}",
    "public/assets/testimonials/avatar-5.jpg": f"{PEXELS}/1181686/pexels-photo-1181686.jpeg{AVATAR}",
}

session = requests.Session()
session.headers.update({"User-Agent": "RideHub-Asset-Downloader/1.0"})

for path, url in IMAGES.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    response = session.get(url, timeout=120)
    response.raise_for_status()
    with open(path, "wb") as handle:
        handle.write(response.content)
    print(f"Downloaded {path} ({len(response.content):,} bytes)")

print(f"Done. {len(IMAGES)} images saved.")
