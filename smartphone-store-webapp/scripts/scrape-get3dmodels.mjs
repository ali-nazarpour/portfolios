const tags = ['device', 'electronics', 'phone', 'smartphone', 'samsung', 'xiaomi', 'apple', 'iphone']
const found = new Set()

for (const tag of tags) {
  const html = await fetch(`https://www.get3dmodels.com/tag/${tag}/`).then((r) => r.text())
  const links = [...html.matchAll(/href="(\/[^"]+\/)"/gi)]
    .map((m) => m[1])
    .filter((p) => !p.includes('/tag/') && !p.includes('/page/'))
  for (const link of links) {
    const page = await fetch(`https://www.get3dmodels.com${link}`).then((r) => r.text())
    const title = page.match(/<title>([^<]+)<\/title>/i)?.[1] ?? link
    const glbs = [...page.matchAll(/https?:\/\/www\.get3dmodels\.com\/download\/[^"'\s>]+\.glb/gi)].map((m) => m[0])
    if (/phone|iphone|samsung|xiaomi|galaxy|ultra/i.test(title) || glbs.length) {
      found.add(JSON.stringify({ title, link, glbs }))
    }
  }
}

console.log([...found].map((s) => JSON.parse(s)))
