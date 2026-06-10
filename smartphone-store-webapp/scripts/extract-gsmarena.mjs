const pages = [
  ['s26', 'https://www.gsmarena.com/samsung_galaxy_s26_ultra-14320.php'],
  ['xiaomi15', 'https://www.gsmarena.com/xiaomi_15_ultra-13657.php'],
  ['iphone17', 'https://www.gsmarena.com/apple_iphone_17_pro_max-13964.php'],
]

for (const [name, url] of pages) {
  const html = await fetch(url).then((r) => r.text())
  const glbs = [...new Set([...html.matchAll(/https?:\/\/[^"'\s>]+\.glb/gi)].map((m) => m[0]))]
  const binkiesIds = [...new Set([...html.matchAll(/sBinkiesID=([a-z0-9-]+)/gi)].map((m) => m[1]))]
  const embed = [...new Set([...html.matchAll(/binkies3d\.php3\?[^"'\s>]+/gi)].map((m) => m[0]))]
  console.log('\n==', name, '==')
  console.log('glb', glbs)
  console.log('binkiesIds', binkiesIds)
  console.log('embed', embed.slice(0, 5))
}
