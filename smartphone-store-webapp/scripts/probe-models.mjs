const html = await fetch('https://www.get3dmodels.com/tools-and-gadgets/phone/').then((r) => r.text())
const glbs = [...new Set([...html.matchAll(/https?:\/\/www\.get3dmodels\.com\/download\/[^"'\s>]+\.glb/gi)].map((m) => m[0]))]
console.log(glbs)
for (const url of glbs) {
  const res = await fetch(url, { method: 'HEAD' })
  console.log(res.status, url, res.headers.get('content-length'))
}
