const uids = [
  ['s26', '15023522b9e342a194454fb371163f8e'],
  ['xiaomi', '95745b7868604ddfafd465c0d990f7d8'],
]

for (const [name, uid] of uids) {
  const urls = [
    `https://sketchfab.com/models/${uid}/embed`,
    `https://sketchfab.com/i/models/${uid}/embed`,
  ]

  for (const pageUrl of urls) {
    const html = await fetch(pageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    }).then((r) => r.text())

    const hits = new Set()
    for (const m of html.matchAll(/https?:\/\/[^"'\s>]+\.(?:glb|gltf)/gi)) hits.add(m[0])
    for (const m of html.matchAll(/https?:\/\/media\.sketchfab\.com[^"'\s>]+/gi)) hits.add(m[0])

    console.log(`\n${name} ${pageUrl} -> ${hits.size} urls`)
    for (const u of [...hits].slice(0, 8)) console.log(' ', u.slice(0, 140))
  }
}
