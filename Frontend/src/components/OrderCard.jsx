import { useEffect, useState } from "react";
import { reverseGeocode } from "../services/geoService";

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

export default function OrderCard({ order, shopLat, shopLng, onStatusChange }) {
  const coords = order.user?.location?.coordinates;
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

  return (
    <div className="bg-red-200 rounded-2xl p-6 flex gap-6">
      {/* LEFT */}
      <div className="flex-1">
        {/* USER */}
        <div className="flex items-center gap-3">
          <img
            src={order.user?.userIcon}
            alt="user"
            className="w-12 h-12 rounded-full object-cover bg-gray-300"
          />
          <div>
            <p className="font-medium">@{order.user?.username}</p>
            <p className="text-sm text-gray-600">
              Order id: {order._id.slice(-6)}
            </p>
            {coords && (
              <p className="text-xs text-gray-500">
                📏 {distKm} km away
              </p>
            )}
          </div>
        </div>

        {/* ITEMS */}
        <p className="mt-4 font-medium">Items</p>

        <div className="flex gap-4 mt-2">
          {order.items.map((itm) => (
            <div
              key={itm._id}
              className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-300"
            >
              {/* IMAGE */}
              <img
                src={itm.item?.itemIcon}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* DARK GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* QTY BADGE */}
              <div className="absolute top-1 right-1 z-10 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                {itm.quantity}
              </div>

              {/* TEXT */}
              <div className="absolute bottom-2 left-2 z-10 text-white text-xs leading-tight">
                <p className="font-medium">{itm.item?.itemName}</p>
                <p>₹{itm.item?.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL + STATUS */}
        <div className="mt-4 text-sm">
          <p>Total Price : ₹{order.totalAmount}</p>

          <div className="flex items-center gap-2 mt-1">
            <span>Status :</span>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                onStatusChange(order._id, e.target.value);
              }}
              className="bg-transparent border-none outline-none font-medium cursor-pointer"
            >
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="delivering">Delivering</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      {coords && (
        <div className="w-56 text-sm text-gray-600">
          <div className="w-full h-40 bg-gray-300 rounded-xl overflow-hidden">
            <iframe
              title="map"
              className="w-full h-full pointer-events-none"
              src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            />
          </div>

          <p className="mt-2">
            Lat : {lat} &nbsp; Lng : {lng}
          </p>
          <p className="mt-1">{address}</p>
        </div>
      )}
    </div>
  );
}
