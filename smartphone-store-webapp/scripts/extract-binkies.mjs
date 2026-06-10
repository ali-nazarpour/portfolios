const pages = [
  'https://www.gsmarena.com/binkies3d.php3?idPhone=14320&sBinkiesID=samsung-galaxy-s26-ultra',
  'https://www.gsmarena.com/binkies3d.php3?idPhone=13322&sBinkiesID=samsung-galaxy-s25-ultra-titanium-silver-blue',
  'https://www.gsmarena.com/binkies3d.php3?idPhone=13657&sBinkiesID=xiaomi-15-ultra',
  'https://www.gsmarena.com/binkies3d.php3?idPhone=14000&sBinkiesID=apple-iphone-17-pro-max',
]

for (const url of pages) {
  const html = await fetch(url).then((r) => r.text())
  const glbs = [...new Set([...html.matchAll(/https?:\/\/[^"'\s>]+\.glb/gi)].map((m) => m[0]))]
  const gltfs = [...new Set([...html.matchAll(/https?:\/\/[^"'\s>]+\.gltf/gi)].map((m) => m[0]))]
  const assets = [...new Set([...html.matchAll(/https?:\/\/[^"'\s>]*binkies[^"'\s>]*/gi)].map((m) => m[0]))]
  console.log('\nURL:', url)
  console.log('glb:', glbs)
  console.log('gltf:', gltfs.slice(0, 5))
  console.log('binkies:', assets.slice(0, 10))
}
