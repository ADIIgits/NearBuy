import { useState, useEffect } from "react";
import { reverseGeocode } from "../services/geoService";


// Haversine formula
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

function formatDateWithAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  // Absolute date (10 Jan 2025)
  const absolute = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Time difference
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  let ago = "";
  if (diffDay > 0) {
    ago = `${diffDay} d ago`;
  } else if (diffHr > 0) {
    ago = `${diffHr} h ${diffMin % 60} min ago`;
  } else {
    ago = `${diffMin} min ago`;
  }

  return `${absolute}, ${ago}`;
}


export default function OrderCard({ order, shopLat, shopLng, onStatusChange }) {
  const coords = order.user?.location?.coordinates;
  console.log("coords:", coords);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(order.status);

  let lat, lng, distKm;
  if (coords) {
    [lng, lat] = coords;
    distKm = getDistanceKm(shopLat, shopLng, lat, lng);
  }

  useEffect(() => {
  if (!coords) return;

  reverseGeocode(lat, lng)
    .then((res) => setAddress(res.data.address))
    .catch(() => setAddress("Address unavailable"));
  }, [lat, lng]);


  const mapUrl = coords
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : null;

  const STATUS_OPTIONS = [
    "pending",
    "preparing",
    "delivering",
    "completed",
    "canceled",
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        border: "1px solid #ccc",
        padding: 15,
        borderRadius: 8,
        background: "#fff",
      }}
    >
      {/* LEFT: ORDER DETAILS */}
      <div style={{ flex: 1 }}>
        {/* USER INFO */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={order.user?.userIcon}
            alt="user"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <div>
            <b>@{order.user?.username}</b>
            {coords && (
              <p style={{ fontSize: 13, margin: 0, color: "#555" }}>
                📏 {distKm} km away
              </p>
            )}
          </div>
        </div>

        {/* META */}
        <p style={{ fontSize: 14, color: "#666", marginTop: 6 }}>
          Order #{order._id.slice(-6)} •{" "}
          {formatDateWithAgo(order.createdAt)}
        </p>


        {/* ITEMS */}
        <div style={{ marginTop: 10 }}>
          {order.items?.map((itm) => (
            <div
              key={itm._id}
              style={{
                border: "1px solid #eee",
                padding: 8,
                borderRadius: 6,
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{itm.item?.itemName}</span>
                <span>Qty: {itm.quantity}</span>
              </div>
            </div>
          ))}
        </div>

        <p>
          <b>Total:</b> ₹{order.totalAmount}
        </p>

        {/* STATUS */}
        <div>
          <b>Status:</b>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              onStatusChange(order._id, e.target.value);
            }}
            style={{ marginLeft: 6 }}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {order.note && (
          <p style={{ fontStyle: "italic", color: "#444" }}>
            Note: {order.note}
          </p>
        )}
      </div>

      {/* RIGHT: MAP PREVIEW */}
      {coords && (
        <div style={{ width: 220 }}>
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <iframe
              title="map"
              width="220"
              height="140"
              style={{
                border: 0,
                borderRadius: 6,
                pointerEvents: "none", // prevents scroll hijack
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            />
          </a>

          <div style={{ marginTop: 6, fontSize: 12, color: "#555" }}>
            <div>📍 {lat}, {lng}</div>
            <div style={{ marginTop: 4 }}>{address}</div>
          </div>
        </div>
      )}
    </div>
  );
}
