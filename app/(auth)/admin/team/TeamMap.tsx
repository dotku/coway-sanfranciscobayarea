"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

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

// Dynamically import map to avoid SSR issues
const MapContent = dynamic(() => import("./MapContent"), { ssr: false });

export default function TeamMap() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const geocacheRef = useRef<Map<string, { lat: number; lng: number }>>(new Map());

  useEffect(() => {
    fetch("/api/team/locations")
      .then((res) => res.json())
      .then(async (data) => {
        if (!Array.isArray(data)) return;

        // Geocode zip codes
        const geocoded: Location[] = [];
        for (const loc of data) {
          const key = loc.zip_code || loc.address;
          if (!key) {
            geocoded.push(loc);
            continue;
          }

          if (geocacheRef.current.has(key)) {
            const cached = geocacheRef.current.get(key)!;
            geocoded.push({ ...loc, lat: cached.lat, lng: cached.lng });
            continue;
          }

          try {
            const query = loc.zip_code
              ? `${loc.zip_code}, USA`
              : loc.address;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
              { headers: { "User-Agent": "CowayBayArea/1.0" } }
            );
            const results = await res.json();
            if (results.length > 0) {
              const { lat, lon } = results[0];
              const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
              geocacheRef.current.set(key, coords);
              geocoded.push({ ...loc, ...coords });
            } else {
              geocoded.push(loc);
            }
          } catch {
            geocoded.push(loc);
          }

          // Small delay to respect Nominatim rate limits
          await new Promise((r) => setTimeout(r, 300));
        }

        setLocations(geocoded);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading map...</div>;
  }

  if (locations.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
        <p className="text-gray-500 mb-2">No locations found</p>
        <p className="text-sm text-gray-400">
          Team members need to add addresses in their dashboard.
        </p>
      </div>
    );
  }

  return <MapContent locations={locations} />;
}
