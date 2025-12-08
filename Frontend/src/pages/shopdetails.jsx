import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopById } from "../services/shopService";
import { getItemsByShop } from "../services/itemService";
import ItemCard from "../components/itemCard";

export default function ShopDetails() {
  const { id } = useParams();

  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getShopById(id),
      getItemsByShop(id)
    ])
      .then(([shopRes, itemsRes]) => {
        setShop(shopRes.data.shop || shopRes.data);
        setItems(itemsRes.data.items || itemsRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error fetching shop details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!shop) return <p style={{ padding: 20 }}>Shop not found</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{shop.shopName}</h2>

      <section style={{ borderBottom: "1px solid #ddd", paddingBottom: 20 }}>
        <img
          src={shop.shopIcon || "https://via.placeholder.com/150"}
          alt="shop icon"
          style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
        />

        <p><b>Username:</b> @{shop.username}</p>
        <p><b>Joined:</b> {new Date(shop.createdAt).toLocaleDateString()}</p>
      </section>

      <h3 style={{ marginTop: 20 }}>Items</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {items.length > 0 ? (
          items.map(item => (
            <ItemCard key={item._id} item={item} />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}
