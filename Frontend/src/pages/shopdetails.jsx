import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopById } from "../services/shopService";
import { getItemsByShop } from "../services/itemService";
import { createOrder } from "../services/orderService";
import ItemCard from "../components/ItemCard";

export default function ShopDetails() {
  const { id } = useParams();

  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ store qty + note for each item
  const [orderData, setOrderData] = useState({});

  // ⭐ store order response
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleItemChange = (itemId, qty, note) => {
    setOrderData(prev => ({
      ...prev,
      [itemId]: { qty, note }
    }));
  };

  const placeOrder = async () => {
    const filteredItems = Object.entries(orderData)
      .filter(([_, data]) => data.qty > 0)
      .map(([itemId, data]) => ({
        itemId,
        quantity: data.qty,
        note: data.note,
      }));

    if (filteredItems.length === 0) {
      alert("No items selected!");
      return;
    }

    const payload = {
      shopId: id,
      items: filteredItems,
    };

    try {
      const res = await createOrder(payload);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      setResponse(null);
    }
  };

  useEffect(() => {
    Promise.all([getShopById(id), getItemsByShop(id)])
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
      {/* Top Section with button */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>{shop.shopName}</h2>
        <button
          onClick={placeOrder}
          style={{ height: 40, padding: "0 20px", cursor: "pointer" }}
        >
          Place Order
        </button>
      </div>

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
            <ItemCard
              key={item._id}
              item={item}
              onChange={handleItemChange}
            />
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>

      {/* ⭐ API RESPONSE SECTION */}
      <div style={{ marginTop: 30 }}>
        {response && (
          <div style={{ color: "green" }}>
            <h3>Order Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        {error && (
          <div style={{ color: "red" }}>
            <h3>Error:</h3>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
