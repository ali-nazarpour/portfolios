const ids = [
  '15023522b9e342a194454fb371163f8e', // S26 Ultra
  '68794884eb674ea2b3cc6cbd1c668b03', // Xiaomi Redmi 9T
]

for (const id of ids) {
  const urls = [
    `https://media.sketchfab.com/models/${id}/files/autoconverted.glb`,
    `https://media.sketchfab.com/models/${id}/files/${id}.glb`,
    `https://media.sketchfab.com/models/${id}/files/model.glb`,
    `https://sketchfab.com/models/${id}/embed`,
  ]
  for (const url of urls) {
    const r = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    if (r.ok) console.log('OK', r.status, r.headers.get('content-length'), url)
  }
}
