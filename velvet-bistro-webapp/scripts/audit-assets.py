import os
import re

root = os.path.join(os.path.dirname(__file__), "..")
src = os.path.join(root, "src")
paths = set()
pattern = re.compile(r'["\'](/assets/[^"\']+\.(?:jpg|jpeg|png|webp|svg))["\']')

for dirpath, _, files in os.walk(src):
    for name in files:
        if not name.endswith((".ts", ".tsx")):
            continue
        with open(os.path.join(dirpath, name), encoding="utf-8") as handle:
            paths.update(pattern.findall(handle.read()))

missing = []
for path in sorted(paths):
    full = os.path.join(root, "public", path.lstrip("/"))
    if os.path.isfile(full):
        continue
    svg = re.sub(r"\.(jpg|jpeg|png|webp)$", ".svg", full)
    status = "svg-only" if os.path.isfile(svg) else "missing"
    missing.append((path, status))

print("MISSING OR SVG-ONLY:")
for path, status in missing:
    print(f"  {status}: {path}")
print(f"\nTotal refs: {len(paths)}, problems: {len(missing)}")
