import { useEffect, useState } from "react";

export default function ItemCard({ item, onChange }) {
  const [qty, setQty] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    onChange(item._id, qty, note);
  }, [qty, note]);

  return (
    <div
      className={`w-64 rounded-xl overflow-hidden shadow-md bg-white border-2 transition
        ${qty > 0 ? "border-green-500" : "border-transparent"}
      `}
    >
      {/* IMAGE */}
      <div className="relative h-44">
        <img
          src={item.itemIcon || "https://via.placeholder.com/300"}
          className="w-full h-full object-cover"
          alt={item.itemName}
        />

        {/* QUANTITY CONTROLS */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(0, q - 1))}
            className="px-1"
          >
            −
          </button>
          <span className="min-w-[16px] text-center">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-1"
          >
            +
          </button>
        </div>

        {/* GRADIENT (NON-CLICKABLE) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* TEXT */}
        <div className="absolute bottom-3 left-3 z-10 text-white">
          <p className="text-lg font-medium">{item.itemName}</p>
          <p className="text-sm">₹{item.price}</p>
        </div>
      </div>
    </div>
  );
}
