"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

interface Location {
  name: string;
  email: string;
  phone: string;
  referral_code: string;
  label: string;
  address: string;
  zip_code: string | null;
  lat?: number;
  lng?: number;
}

export default function MapContent({ locations }: { locations: Location[] }) {
  const withCoords = locations.filter((l) => l.lat && l.lng);

  // Default center: Bay Area
  const center: [number, number] =
    withCoords.length > 0
      ? [
          withCoords.reduce((s, l) => s + l.lat!, 0) / withCoords.length,
          withCoords.reduce((s, l) => s + l.lng!, 0) / withCoords.length,
        ]
      : [37.5485, -121.9886];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div style={{ height: "500px" }}>
          <MapContainer
            center={center}
            zoom={9}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {withCoords.map((loc, i) => (
              <Marker key={i} position={[loc.lat!, loc.lng!]}>
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">{loc.name}</p>
                    <p className="text-gray-500">{loc.label}</p>
                    <p className="text-gray-600 mt-1">{loc.address}</p>
                    {loc.zip_code && (
                      <p className="text-gray-600">{loc.zip_code}</p>
                    )}
                    <div className="mt-2 space-y-1">
                      <a
                        href={`mailto:${loc.email}`}
                        className="text-blue-600 block"
                      >
                        {loc.email}
                      </a>
                      <a
                        href={`tel:${loc.phone}`}
                        className="text-blue-600 block"
                      >
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Location list below map */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-[#005A7A]">
            All Locations ({locations.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <span className="font-medium text-gray-900">{loc.name}</span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-sm text-gray-500">{loc.label}</span>
                <p className="text-sm text-gray-500">
                  {loc.address}
                  {loc.zip_code ? ` ${loc.zip_code}` : ""}
                </p>
              </div>
              <div className="flex gap-3 text-sm flex-shrink-0">
                <a href={`mailto:${loc.email}`} className="text-[#00A8E3]">
                  {loc.email}
                </a>
                <a href={`tel:${loc.phone}`} className="text-[#00A8E3]">
                  {loc.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
