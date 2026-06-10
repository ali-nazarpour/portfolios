async function isGlb(path) {
  const r = await fetch(`http://127.0.0.1:3002${path}`, { headers: { Range: 'bytes=0-3' } })
  const b = await r.arrayBuffer()
  return {
    status: r.status,
    magic: new TextDecoder().decode(new Uint8Array(b)),
    ok: new TextDecoder().decode(new Uint8Array(b)) === 'glTF',
  }
}

for (const path of [
  '/assets/models/apple/iphone-17-pro-max.glb',
  '/assets/models/samsung/galaxy-s26-ultra.glb',
  '/assets/models/xiaomi/xiaomi-15-ultra.glb',
]) {
  console.log(path, await isGlb(path))
}
