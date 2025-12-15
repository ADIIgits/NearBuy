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

  const cancelOrder = async (orderId) => {
    await cancelOrderService(orderId);
    setOrders(prev =>
      prev.map(o =>
        o._id === orderId ? { ...o, status: "canceled" } : o
      )
    );
  };

  useEffect(() => {
    if (!user || user.type !== "user") return;

    getAllUserOrders().then((res) => {
      setOrders(res.data.orders || res.data || []);
      setLoading(false);
    });
  }, [user]);

  if (!user || user.type !== "user")
    return <p className="p-6">Unauthorized</p>;

  if (loading)
    return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <p className="text-sm text-gray-500">Orders</p>
      <h1 className="text-3xl font-medium mb-6">Recent Orders</h1>

      <div className="flex flex-col gap-6 max-w-5xl">
        {orders.map(order => (
          <UserOrderCard
            key={order._id}
            order={order}
            onCancel={cancelOrder}
          />
        ))}
      </div>
    </div>
  );
}
