import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import UserOrderCard from "../components/UserOrderCard";
import {
  getAllUserOrders,
  cancelOrder as cancelOrderService
} from "../services/orderService";

export default function UserOrders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ❌ DO NOT RETURN BEFORE HOOKS
  // Instead handle unauthorized AFTER hooks run

  const cancelOrder = async (orderId) => {
    try {
      console.log("Cancelling order:", orderId);
      const res = await cancelOrderService(orderId);

      setOrders(prev =>
        prev.map(o =>
          o._id === orderId ? { ...o, status: "canceled" } : o
        )
      );

      console.log(res.data.message);
    } catch (err) {
      console.log("Cancel error:", err);
    }
  };

  useEffect(() => {
    if (!user || user.type !== "user") return; // 👈 SAFE inside effect

    getAllUserOrders()
      .then((res) => {
        const arr = Array.isArray(res.data)
          ? res.data
          : res.data.orders || [];
        setOrders(arr);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, [user]);

  // Now it's safe to block UI
  if (!user || user.type !== "user") {
    return <p style={{ padding: 20 }}>Unauthorized</p>;
  }

  if (loading) {
    return <p style={{ padding: 20 }}>Loading orders...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginTop: 20
        }}>
          {orders.map(order => (
            <UserOrderCard
              key={order._id}
              order={order}
              onCancel={cancelOrder}
            />
          ))}
        </div>
      )}
    </div>
  );
}
