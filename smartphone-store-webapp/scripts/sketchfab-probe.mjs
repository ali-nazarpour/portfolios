const modelId = "15023522b9e342a194454fb371163f8e";
const r = await fetch(`https://api.sketchfab.com/v3/models/${modelId}`);
console.log(await r.json());
