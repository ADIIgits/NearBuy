import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Distance calculator (Haversine)
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
  const location = useLocation();
  const shops = location.state?.shops || [];

  const [userCoords, setUserCoords] = useState(null);

  // get user live coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.log("Location error:", err)
    );
  }, []);

  if (!userCoords)
    return <p style={{ padding: 20 }}>Getting your location...</p>;

  if (!shops || shops.length === 0)
    return <p style={{ padding: 20 }}>No nearby shops found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Nearest Shops</h2>

      <p style={{ color: "#555" }}>
        Showing shops closest to your current location.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginTop: 20,
        }}
      >
        {shops.map((shop) => {
          const coords = shop.location?.coordinates;
          let dist = "N/A";

          if (coords) {
            const [lng, lat] = coords;
            dist = getDistanceKm(userCoords.lat, userCoords.lng, lat, lng);
          }

          return (
            <Link
              key={shop._id}
              to={`/shop/${shop._id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  width: 230,
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: 12,
                  background: "#fafafa",
                }}
              >
                <img
                  src={shop.shopIcon || "https://via.placeholder.com/200"}
                  alt="shop"
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />

                <h3 style={{ marginTop: 10 }}>{shop.shopName}</h3>
                <p style={{ margin: 0, color: "#555" }}>@{shop.username}</p>

                <p style={{ marginTop: 6 }}>
                  📏 <b>{dist} km</b> away
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
