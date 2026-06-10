const url = 'https://embed.binkies3d.com/integrations/MNwaX7Qx/yiy0yc1z/script.js'
const js = await fetch(url).then((r) => r.text())
const hits = [...new Set([...js.matchAll(/https?:\/\/[^"'`\s]+/g)].map((m) => m[0]))]
for (const u of hits.filter((u) => /glb|gltf|model|asset|cdn|content|phone/i.test(u)).slice(0, 40)) {
  console.log(u)
}
