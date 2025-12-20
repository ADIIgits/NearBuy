export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>All Shops</h2>

      <div style={{ display: "flex", gap: 20 }}>
        {/* Placeholder shop cards */}
        <div style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>Shop 1</h3>
          <p>Click to view items</p>
        </div>

        <div style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>Shop 2</h3>
          <p>Click to view items</p>
        </div>
      </div>
    </div>
  );
}
