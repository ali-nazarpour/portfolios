const models = [
  ['s26', '15023522b9e342a194454fb371163f8e'],
  ['xiaomi', '95745b7868604ddfafd465c0d990f7d8'],
  ['s25', '24dc6725f97f4590a6309e9a48129ff2'],
]

const patterns = (uid) => [
  `https://media.sketchfab.com/models/${uid}/files/autoconverted.glb`,
  `https://media.sketchfab.com/models/${uid}/files/${uid}.glb`,
  `https://media.sketchfab.com/models/${uid}/files/model.glb`,
  `https://media.sketchfab.com/models/${uid}/files/model.gltf`,
]

for (const [name, uid] of models) {
  for (const url of patterns(uid)) {
    const r = await fetch(url, { method: 'HEAD' })
    if (r.ok) console.log('OK', name, r.status, r.headers.get('content-length'), url)
  }
}
