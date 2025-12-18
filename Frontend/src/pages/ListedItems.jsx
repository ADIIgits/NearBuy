import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInShopItems } from "../services/shopService";
import { deleteItemById } from "../services/itemService";

import updateblackIcon from "../assets/icons/editblack.png";
import deleteblackIcon from "../assets/icons/binblack.png";

export default function ListedItems() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoggedInShopItems()
      .then((res) => {
        const arr = Array.isArray(res.data)
          ? res.data
          : res.data.items || [];
        setItems(arr);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching items:", err);
        setLoading(false);
      });
  }, []);

  /* ================= DELETE ITEM ================= */
  const handleDelete = async (itemId) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm) return;

    try {
      await deleteItemById(itemId);

      // Remove from UI immediately
      setItems((prev) => prev.filter((i) => i._id !== itemId));
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item");
    }
  };

  if (loading) {
    return <p className="p-8">Loading items...</p>;
  }

  return (
    <div className="p-8">
      {/* TITLE */}
      <p className="text-sm text-gray-500">Listed Items</p>
      <h1 className="text-3xl font-semibold mb-8">Listed Items</h1>

      {/* GRID */}
      <div className="flex gap-8 flex-wrap items-start">
        {/* ITEM CARDS */}
        {items.map((item) => (
          <div
            key={item._id}
            className="relative w-64 h-72 rounded-2xl overflow-hidden shadow-md cursor-pointer"
            onClick={() => navigate(`/item/update/${item._id}`)}
          >
            {/* IMAGE */}
            <img
              src={item.itemIcon || "https://via.placeholder.com/300"}
              alt={item.itemName}
              className="w-full h-full object-cover"
            />

            {/* GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* ACTION BUTTONS */}
            <div
              className="absolute top-3 right-3 flex gap-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* UPDATE */}
              <button
                onClick={() => navigate(`/item/update/${item._id}`)}
                className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition"
              >
                <img
                  src={updateblackIcon}
                  alt="update"
                  className="w-4 h-4"
                />
              </button>

              {/* DELETE */}
              <button
                onClick={() => handleDelete(item._id)}
                className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition"
              >
                <img
                  src={deleteblackIcon}
                  alt="delete"
                  className="w-4 h-4"
                />
              </button>
            </div>

            {/* TEXT */}
            <div className="absolute bottom-4 left-4 text-white z-10">
              <p className="text-lg font-medium">{item.itemName}</p>
              <p className="text-sm">₹{item.price}</p>
            </div>
          </div>
        ))}

        {/* ADD NEW ITEM */}
        <div
          onClick={() => navigate("/item/create")}
          className="w-64 h-72 flex items-center justify-center rounded-2xl cursor-pointer"
        >
          <div className="w-20 h-20 rounded-full bg-gray-800 text-white flex items-center justify-center text-4xl hover:bg-gray-700 transition">
            +
          </div>
        </div>
      </div>
    </div>
  );
}
