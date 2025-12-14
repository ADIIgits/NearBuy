export default function UserOrderCard({ order, onCancel }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 10,
        background: "#fff",
        position: "relative",
      }}
    >
      {/* ❌ CANCEL BUTTON (Always shown — backend validates) */}
      <button
        onClick={() => onCancel(order._id)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "#ffe6e6",
          color: "#b30000",
          border: "1px solid #b30000",
          borderRadius: 4,
          padding: "3px 8px",
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        ✕ Cancel
      </button>

      {/* SHOP INFO */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src={order.shop?.shopIcon}
          alt="shop"
          style={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <div>
          <b style={{ fontSize: 17 }}>{order.shop?.shopName}</b>
          <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
            Order #{order._id.slice(-6)} •{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* ITEMS */}
      <div style={{ marginTop: 15 }}>
        {order.items?.map((entry) => (
          <div
            key={entry._id}
            style={{
              padding: 10,
              border: "1px solid #eee",
              borderRadius: 6,
              marginBottom: 8,
              background: "#fafafa",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 15,
              }}
            >
              <span>{entry.item?.itemName}</span>
              <span>Qty: {entry.quantity}</span>
            </div>

            <p style={{ fontSize: 13, color: "#444", marginTop: 4 }}>
              ₹{entry.item?.price}
            </p>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <p style={{ marginTop: 10, fontSize: 16 }}>
        <b>Total Paid:</b> ₹{order.totalAmount}
      </p>

      {/* STATUS */}
      <p style={{ marginTop: 4 }}>
        <b>Status:</b>{" "}
        <span
          style={{
            color:
              order.status === "completed"
                ? "green"
                : order.status === "pending"
                ? "#d48806"
                : order.status === "delivering"
                ? "blue"
                : order.status === "canceled"
                ? "red"
                : "black",
            fontWeight: "bold",
          }}
        >
          {order.status}
        </span>
      </p>

      {/* NOTE */}
      {order.note && order.note.trim() !== "" && (
        <p
          style={{
            marginTop: 6,
            fontStyle: "italic",
            color: "#555",
          }}
        >
          Note: {order.note}
        </p>
      )}
    </div>
  );
}
