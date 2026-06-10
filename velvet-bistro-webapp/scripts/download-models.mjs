import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const MODELS = {
  "public/assets/models/coffee-cup.glb":
    "https://www.get3dmodels.com/download/Coffee-cup_1_by_get3dmodels.glb",
};

async function download(path, url) {
  const fullPath = join(root, path);
  await mkdir(dirname(fullPath), { recursive: true });
  const res = await fetch(url, {
    headers: { "User-Agent": "VelvetBistroModelScript/1.0" },
  });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(fullPath, buf);
  console.log("OK", path, `(${buf.length} bytes)`);
}

let failed = 0;
for (const [path, url] of Object.entries(MODELS)) {
  try {
    await download(path, url);
  } catch (error) {
    failed++;
    console.error("FAIL", path, error);
  }
}

console.log(
  failed
    ? `Done with ${failed} failure(s).`
    : "Done. Attribution: Poly by Google (CC Attribution) via Get3DModels.",
);
