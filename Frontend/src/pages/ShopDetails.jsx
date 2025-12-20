import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShopById } from "../services/shopService";
import { getItemsByShop } from "../services/itemService";
import { createOrder } from "../services/orderService";
import ItemCard from "../components/ItemCard";




export default function ShopDetails() {

  const placeOrder = async () => {
    const filteredItems = Object.entries(orderData)
      .filter(([_, d]) => d.qty > 0)
      .map(([itemId, d]) => ({
        itemId,
        quantity: d.qty,
        note: d.note,
      }));

    if (!filteredItems.length) {
      setOrderError("Please select at least one item");
      return;
    }

    try {
      setPlacingOrder(true);
      setOrderError(null);
      setOrderSuccess(null);

      await createOrder({
        shopId: id,
        items: filteredItems,
      });

      setOrderSuccess("✅ Order placed successfully!");
      setOrderData({});
    } catch (err) {
      setOrderError(
        err.response?.data?.message || "❌ Failed to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };
  const { id } = useParams();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [orderError, setOrderError] = useState(null);


  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [orderData, setOrderData] = useState({});

  const handleItemChange = (itemId, qty, note) => {
    setOrderData((prev) => ({
      ...prev,
      [itemId]: { qty, note },
    }));
  };



  useEffect(() => {
    Promise.all([getShopById(id), getItemsByShop(id)]).then(
      ([shopRes, itemRes]) => {
        setShop(shopRes.data.shop || shopRes.data);
        setItems(itemRes.data.items || itemRes.data);
        setLoading(false);
      }
    );
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!shop) return <p className="p-6">Shop not found</p>;

  return (
    <div className="p-8">
      {/* PAGE TITLE */}
      <p className="text-sm text-gray-500">Shops</p>

      {/* SHOP HEADER */}
      <div className="flex justify-between items-start mt-4">
        <div className="flex gap-6 items-center">
          <img
            src={shop.shopIcon || "https://via.placeholder.com/150"}
            className="w-28 h-28 rounded-full object-cover bg-gray-200"
          />

          <div>
            <h1 className="text-3xl font-medium">{shop.shopName}</h1>
            <p className="text-gray-500">@{shop.username}</p>
            <p className="text-sm text-gray-400 mt-2">
              Since {new Date(shop.createdAt).getFullYear()}
            </p>
          </div>
        </div>

        <div>
            <button
            onClick={placeOrder}
            disabled={placingOrder}
            className={`px-6 py-2 rounded-full transition
              ${
                placingOrder
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
          >
            {placingOrder ? "Placing..." : "Place Order"}
          </button>

          {/* ORDER FEEDBACK */}
          {orderSuccess && (
            <div className="mt-4 text-green-600 font-medium">
              {orderSuccess}
            </div>
          )}

          {orderError && (
            <div className="mt-4 text-red-600 font-medium">
              {orderError}
            </div>
          )}
        </div>
        
      </div>

      {/* ITEMS */}
      <h2 className="text-2xl font-medium mt-10 mb-6">Items</h2>

      <div className="flex flex-wrap gap-6">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onChange={handleItemChange}
          />
        ))}
      </div>
    </div>
  );
}
