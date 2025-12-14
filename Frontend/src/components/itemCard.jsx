import { useState, useEffect } from "react";

export default function ItemCard({ item, onChange }) {
  const [qty, setQty] = useState(0);
  const [note, setNote] = useState("");

  // Images array fallback
  const images = item.images?.length > 0
    ? item.images
    : item.itemIcon
    ? [item.itemIcon]
    : ["https://via.placeholder.com/300"];

  const [currentImg, setCurrentImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => (q > 0 ? q - 1 : 0));

  useEffect(() => {
    onChange(item._id, qty, note);
  }, [qty, note]);

  const nextImg = () => {
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImg = () => {
    setCurrentImg((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      style={{
        border: `1.5px solid ${qty > 0 ? "green" : "#ccc"}`,
        padding: 10,
        width: 230,
        borderRadius: 8,
        transition: "border-color 0.2s ease",
      }}
    >
      {/* 🔥 IMAGE SLIDER */}
      <div style={{ position: "relative" }}>
        <img
          onClick={() => setModalOpen(true)}
          src={images[currentImg]}
          alt="item"
          style={{
            width: "100%",
            height: 140,
            objectFit: "cover",
            borderRadius: 5,
            cursor: "pointer",
          }}
        />

        {/* PREV BUTTON */}
        {images.length > 1 && (
          <button
            onClick={prevImg}
            style={{
              position: "absolute",
              top: "50%",
              left: 5,
              transform: "translateY(-50%)",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "50%",
              padding: "4px 8px",
              cursor: "pointer",
            }}
          >
            ◀
          </button>
        )}

        {/* NEXT BUTTON */}
        {images.length > 1 && (
          <button
            onClick={nextImg}
            style={{
              position: "absolute",
              top: "50%",
              right: 5,
              transform: "translateY(-50%)",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "50%",
              padding: "4px 8px",
              cursor: "pointer",
            }}
          >
            ▶
          </button>
        )}
      </div>

      {/* TITLE & PRICE */}
      <h4 style={{ marginTop: 10 }}>{item.itemName}</h4>
      <p>₹{item.price}</p>

      {/* Quantity controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 8,
        }}
      >
        <button type="button" onClick={dec}>-</button>
        <span>{qty}</span>
        <button type="button" onClick={inc}>+</button>
      </div>

      {/* Note input */}
      <div style={{ marginTop: 8 }}>
        <label
          style={{
            display: "block",
            fontSize: 14,
            marginBottom: 4,
          }}
        >
          Note
        </label>
        <input
          type="text"
          placeholder="extra cheese, no mayo..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      {/* 🔥 FULLSCREEN IMAGE MODAL */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            cursor: "zoom-out",
          }}
        >
          <img
            src={images[currentImg]}
            alt="large"
            style={{
              width: "90%",
              maxWidth: "500px",
              maxHeight: "90%",
              borderRadius: 10,
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
}
