import { Link } from "react-router-dom";

export default function ShopCard({ shop }) {
  return (
    <Link 
      to={`/shop/${shop._id}`} 
      style={{
        border: "1px solid #ccc",
        padding: 15,
        borderRadius: 8,
        width: 200,
        textDecoration: "none",
        color: "black",
        display: "block"
      }}
    >
      <img 
        src={shop.shopIcon || "https://via.placeholder.com/150"} 
        alt="icon" 
        style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 5 }} 
      />

      <h3 style={{ margin: "10px 0 5px" }}>{shop.shopName}</h3>
      <p style={{ color: "#555" }}>@{shop.username}</p>
    </Link>
  );
}
