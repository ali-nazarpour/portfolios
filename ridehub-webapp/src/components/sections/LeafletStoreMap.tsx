import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { siteConfig } from '@/config/site'

const icon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="width:40px;height:40px;background:hsl(250,84%,54%);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(99,102,241,0.5);border:3px solid white;"><span style="color:white;font-weight:bold;font-size:16px;">R</span></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
})

export function LeafletStoreMap() {
  const { lat, lng } = siteConfig.coordinates
  const address = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`

  return (
    <div className="h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-border shadow-lg">
      <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
          <Popup>
            <strong>{siteConfig.name}</strong>
            <br />
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
