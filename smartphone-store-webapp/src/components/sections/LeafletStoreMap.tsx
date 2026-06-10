import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { siteConfig } from '@/config/site'
import { useTheme } from '@/hooks/useTheme'

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export function LeafletStoreMap() {
  const { theme } = useTheme()
  const { lat, lng, zoom } = siteConfig.location

  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  const tileUrl =
    theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  return (
    <div className="h-[400px] rounded-2xl overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={tileUrl}
        />
        <Marker position={[lat, lng]} icon={icon}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{siteConfig.name}</p>
              <p className="mt-1">{siteConfig.address.full}</p>
              <p className="mt-1">{siteConfig.phone}</p>
              <p className="mt-1 text-muted-foreground">{siteConfig.workingHours.weekdays}</p>
              <p className="text-muted-foreground">{siteConfig.workingHours.weekend}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
