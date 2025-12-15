// src/pages/NearestShops.jsx
import { useEffect, useState } from "react";
import NearestShopCard from "../components/NearestShopCard";
import { findNearestShops } from "../services/shopService";

// Haversine distance
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
}

export default function NearestShops() {
  const [userCoords, setUserCoords] = useState(null);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => setLoading(false)
    );
  }, []);

  // 2️⃣ Fetch nearest shops from backend
  useEffect(() => {
    if (!userCoords) return;

    const fetchShops = async () => {
      try {
        const res = await findNearestShops(
          userCoords.lat,
          userCoords.lng
        );
        setShops(res.data.shops || []);
      } catch (err) {
        console.error("Nearest shops error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [userCoords]);

  /* ---------------- STATES ---------------- */

  if (loading)
    return <p className="p-6">Finding nearby shops...</p>;

  if (!shops.length)
    return <p className="p-6">No nearby shops found.</p>;

  /* ---------------- UI ---------------- */

  return (
    <div className="p-8">
      <p className="text-sm text-gray-500">Nearest Shops</p>
      <h1 className="text-3xl font-semibold mb-6">
        Nearest Shops
      </h1>

      <div className="flex gap-6 flex-wrap">
        {shops.map((shop) => {
          let distance = "N/A";

          if (shop.location?.coordinates) {
            const [lng, lat] = shop.location.coordinates;
            distance = getDistanceKm(
              userCoords.lat,
              userCoords.lng,
              lat,
              lng
            );
          }

          return (
            <NearestShopCard
              key={shop._id}
              shop={shop}
              distance={distance}
            />
          );
        })}
      </div>
    </div>
  );
}
