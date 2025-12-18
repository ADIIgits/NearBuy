import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import OrderCard from "../components/OrderCard";
import { getAllShopOrders, getLoggedInShop, updateOrderStatus } from "../services/orderService";

export default function ShopOrders() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopCoords, setShopCoords] = useState(null);

  useEffect(() => {
    if (!user || user.type !== "shop") return;

    getLoggedInShop().then((res) => {
      const loc = res.data.shop?.location?.coordinates;
      if (loc) setShopCoords({ lng: loc[0], lat: loc[1] });
    });
  }, [user]);

  useEffect(() => {
    if (!user || user.type !== "shop") return;

    getAllShopOrders().then((res) => {
      const arr = Array.isArray(res.data) ? res.data : res.data.orders || [];
      setOrders(arr);
      setLoading(false);
    });
  }, [user]);

  const handleStatusUpdate = async (orderId, status) => {
    await updateOrderStatus(orderId, status);
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, status } : o))
    );
  };

  if (!user || user.type !== "shop") return <p className="p-6">Unauthorized</p>;
  if (!shopCoords) return <p className="p-6">Loading shop location...</p>;
  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-8">
      <p className="text-sm text-gray-500">Orders</p>
      <h1 className="text-3xl font-light mb-6">Recent Orders</h1>

      <div className="flex flex-col gap-6">
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
    </div>
  );
}
