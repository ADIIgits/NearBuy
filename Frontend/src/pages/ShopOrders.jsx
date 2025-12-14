import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import OrderCard from "../components/OrderCard";
import { getAllShopOrders, getLoggedInShop, updateOrderStatus } from "../services/orderService";

export default function ShopOrders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopCoords, setShopCoords] = useState(null);

  // ❗ ALWAYS RUN HOOKS. DO NOT CONDITIONALIZE THEM.

  // Fetch shop coordinates
  useEffect(() => {
    if (!user || user.type !== "shop") return;

    getLoggedInShop()
      .then((res) => {
        const loc = res.data.shop?.location?.coordinates;
        if (loc) {
          setShopCoords({ lng: loc[0], lat: loc[1] });
        }
      })
      .catch((err) => console.log("Error fetching shop location:", err));
  }, [user]);

  // Fetch orders for shop
  useEffect(() => {
    if (!user || user.type !== "shop") return;

    getAllShopOrders()
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : res.data.orders || [];
        setOrders(arr);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching orders:", err);
        setLoading(false);
      });
  }, [user]);

  // Update status function
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );

      return "Updated successfully";
    } catch (err) {
      console.log("Error updating order status:", err);
      return "Failed to update";
    }
  };

  // ❗ Only return unauthorized AFTER hooks have run
  if (!user || user.type !== "shop") {
    return <p style={{ padding: 20 }}>Unauthorized</p>;
  }

  if (!shopCoords)
    return <p style={{ padding: 20 }}>Loading shop location...</p>;

  if (loading)
    return <p style={{ padding: 20 }}>Loading orders...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Shop Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              shopLat={shopCoords.lat}
              shopLng={shopCoords.lng}
              onStatusChange={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
