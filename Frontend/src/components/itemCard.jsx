export default function ItemCard({ item }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: 10,
      width: 180,
      borderRadius: 8
    }}>
      <img 
        src={item.itemImage || "https://via.placeholder.com/150"} 
        alt="item" 
        style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 5 }} 
      />

      <h4 style={{ marginTop: 10 }}>{item.itemName}</h4>
      <p>₹{item.price}</p>
    </div>
  );
}
