const queries = [
  'samsung+galaxy+s25+ultra+extension:glb',
  'samsung+galaxy+s26+ultra+extension:glb',
  'xiaomi+15+ultra+extension:glb',
  'xiaomi+phone+extension:glb',
]

for (const q of queries) {
  const url = `https://github.com/search?q=${q}&type=code`
  const html = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  }).then((r) => r.text())
  const hits = [...html.matchAll(/href="(\/[^"]+\.glb)"/gi)].map((m) => m[1]).slice(0, 5)
  console.log(q, hits)
}
