// shops.jsx
import { useEffect, useState } from "react";
import { getAllShops } from "../services/shopService";
import ShopCard from "../components/ShopCard";

export default function Shops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllShops()
      .then(res => {
        // ⭐ UPDATED LINE: Access the 'shops' array property inside the response data
        const shopsArray = res.data.shops;
        
        // Ensure the value is actually an array before setting state
        if (Array.isArray(shopsArray)) {
          setShops(shopsArray);
        } else {
          console.error("API response data is missing the 'shops' array:", res.data);
          // Set to empty array to prevent map error
          setShops([]);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching shops:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading shops...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>All Shops</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        marginTop: 20
      }}>
        {/* The map function will now work correctly */}
        {shops.map(shop => (
          <ShopCard key={shop._id} shop={shop} />
        ))}
      </div>
    </div>
  );
}