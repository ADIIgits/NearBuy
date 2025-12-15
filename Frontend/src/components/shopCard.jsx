import { Link } from "react-router-dom";

export default function ShopCard({ shop, distance }) {
  return (
    <Link
      to={`/shop/${shop._id}`}
      className="w-[240px] rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
    >
      {/* IMAGE */}
      <div className="relative h-[160px]">
        <img
          src={shop.shopIcon || "https://via.placeholder.com/300"}
          alt={shop.shopName}
          className="w-full h-full object-cover"
        />

        {/* DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* TEXT OVER IMAGE */}
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="font-semibold text-lg leading-tight">
            {shop.shopName}
          </h3>
          <p className="text-sm opacity-90">@{shop.username}</p>
          {distance && (
            <p className="text-xs opacity-80 mt-1">
              {distance} km away
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
