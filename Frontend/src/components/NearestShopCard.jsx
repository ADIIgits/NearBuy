// src/components/NearestShopCard.jsx
import { Link } from "react-router-dom";

export default function NearestShopCard({ shop, distance }) {
  return (
    <Link to={`/shop/${shop._id}`} className="block">
      <div className="relative w-[260px] h-[260px] rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition">
        
        {/* Image */}
        <img
          src={shop.shopIcon || "https://via.placeholder.com/300"}
          alt={shop.shopName}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-semibold">{shop.shopName}</h3>
          <p className="text-sm text-gray-200">@{shop.username}</p>
          <p className="text-xs text-gray-300 mt-1">
            {distance} km away
          </p>
        </div>
      </div>
    </Link>
  );
}
