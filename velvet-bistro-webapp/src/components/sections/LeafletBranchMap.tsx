import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Branch } from "@/types/product";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LeafletBranchMapProps {
  branches: Branch[];
  height?: string;
  zoom?: number;
  center?: [number, number];
}

export function LeafletBranchMap({
  branches,
  height = "400px",
  zoom = 5,
  center,
}: LeafletBranchMapProps) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
  }, []);

  const mapCenter: [number, number] =
    center ?? [
      branches.reduce((s, b) => s + b.lat, 0) / branches.length,
      branches.reduce((s, b) => s + b.lng, 0) / branches.length,
    ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/50" style={{ height }}>
      <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {branches.map((branch) => (
          <Marker key={branch.id} position={[branch.lat, branch.lng]} icon={icon}>
            <Popup>
              <strong>{branch.name}</strong>
              <br />
              {branch.address}, {branch.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
