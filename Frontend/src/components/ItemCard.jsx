import { useEffect, useState } from "react";

export default function ItemCard({ item, onChange }) {
  const [qty, setQty] = useState(0);
  const [note, setNote] = useState("");

  const images =
    item.images?.length > 0
      ? item.images
      : item.itemIcon
      ? [item.itemIcon]
      : ["https://via.placeholder.com/300"];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    onChange(item._id, qty, note);
  }, [qty, note]);

  const nextImg = () =>
    setCurrentImg((i) => (i + 1) % images.length);

  const prevImg = () =>
    setCurrentImg((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      {/* CARD */}
      <div
        className={`w-64 rounded-xl overflow-hidden shadow-md bg-white border-2 transition
          ${qty > 0 ? "border-green-500" : "border-transparent"}
        `}
      >
        {/* IMAGE */}
        <div className="relative h-44">
          <img
            src={images[0]}
            alt={item.itemName}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setModalOpen(true)}
          />

          {/* QUANTITY CONTROLS */}
          <div
            className="absolute top-3 right-3 z-10 flex items-center gap-2
              bg-black/50 text-white px-3 py-1 rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(0, q - 1))}
            >
              −
            </button>
            <span className="min-w-[16px] text-center">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
            >
              +
            </button>
          </div>

          {/* GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* TEXT */}
          <div className="absolute bottom-3 left-3 z-10 text-white">
            <p className="text-lg font-medium">{item.itemName}</p>
            <p className="text-sm">₹{item.price}</p>
          </div>
        </div>
      </div>

      {/* ================= MODAL CAROUSEL ================= */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGE */}
            <img
              src={images[currentImg]}
              alt="item"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />

            {/* CLOSE */}
            <button
              className="absolute top-3 right-3 text-white text-xl"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            {/* PREV */}
            {images.length > 1 && (
              <button
                onClick={prevImg}
                className="absolute left-2 top-1/2 -translate-y-1/2
                  bg-black/60 text-white rounded-full px-3 py-1"
              >
                ‹
              </button>
            )}

            {/* NEXT */}
            {images.length > 1 && (
              <button
                onClick={nextImg}
                className="absolute right-2 top-1/2 -translate-y-1/2
                  bg-black/60 text-white rounded-full px-3 py-1"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
