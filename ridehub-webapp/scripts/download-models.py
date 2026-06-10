import os
import shutil
import subprocess
import sys

import requests

MODELS = {
    "bicycle.glb": "https://www.get3dmodels.com/download/Bicycle.glb",
    "scooter.glb": "https://www.get3dmodels.com/download/Scooter-1_by_get3dmodels.glb",
    "motorcycle.glb": "https://www.get3dmodels.com/download/Motorcycle_by_get3dmodels.glb",
}

os.makedirs("public/assets/models", exist_ok=True)


def convert_to_pbr(path: str) -> None:
    """Convert legacy specular-glossiness GLB to metallic-roughness for Three.js."""
    tmp = f"{path}.pbr.tmp"
    try:
        subprocess.run(
            ["npx", "--yes", "@gltf-transform/cli", "metalrough", path, tmp],
            check=True,
            capture_output=True,
        )
        shutil.move(tmp, path)
        print(f"  Converted {path} to PBR metallic-roughness")
    except (subprocess.CalledProcessError, FileNotFoundError) as exc:
        if os.path.exists(tmp):
            os.remove(tmp)
        print(f"  Warning: PBR conversion skipped for {path}: {exc}", file=sys.stderr)


for filename, url in MODELS.items():
    response = requests.get(url, timeout=120)
    response.raise_for_status()
    out = f"public/assets/models/{filename}"
    with open(out, "wb") as handle:
        handle.write(response.content)
    print(f"Downloaded {out} ({len(response.content)} bytes)")
    convert_to_pbr(out)

print("Done. Attribution: Poly by Google (CC Attribution) via GetGLB / Get3DModels.")
