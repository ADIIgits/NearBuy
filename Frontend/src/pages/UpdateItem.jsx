import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { uploadImageToCloudinary } from "../services/uploadService";
import { getItemById, updateItemById } from "../services/itemService";

export default function UpdateItem() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [itemIcon, setItemIcon] = useState("");
  const [images, setImages] = useState([]);

  const [message, setMessage] = useState("");

  /* ================= FETCH ITEM ================= */
  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await getItemById(id);
        const item = res.data.item || res.data;

        setItemName(item.itemName);
        setPrice(item.price);
        setItemIcon(item.itemIcon);
        setImages(item.images || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      console.log(item);
    }

    fetchItem();
  }, [id]);

  /* ================= ICON UPLOAD ================= */
  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const res = await uploadImageToCloudinary(file);
    if (res.secure_url) {
      setItemIcon(res.secure_url);
    }
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const res = await uploadImageToCloudinary(file);
    if (res.secure_url) {
      setImages((prev) => [...prev, res.secure_url]);
    }
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async () => {
    setSaving(true);
    setMessage("");

    try {
      await updateItemById(id, {
        itemName,
        price: Number(price),
        itemIcon,
        images,
      });
      setMessage("✅ Item updated successfully");
    } catch {
      setMessage("❌ Failed to update item");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-8">Loading item…</p>;

  return (
    <div className="p-8">
      <p className="text-sm text-gray-500">Update Item</p>
      <h1 className="text-4xl font-medium mb-8">Update Item</h1>

      {/* ===== CARD ===== */}
      <div className="w-[420px] bg-gray-200 rounded-3xl overflow-hidden shadow">

        {/* ===== ICON PREVIEW (VISIBLE) ===== */}
        <label className="relative block cursor-pointer group">
          <input
            type="file"
            accept="image/*"
            onChange={handleIconUpload}
            className="hidden"
          />

          <img
            src={itemIcon}
            alt="item icon"
            className="w-full h-56 object-cover"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium transition">
            Click to change icon
          </div>
        </label>

        {/* ===== DETAILS ===== */}
        <div className="p-6 space-y-5">

          {/* ITEM NAME */}
          <div>
            <p className="text-gray-600 font-medium mb-2">Item Name</p>
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full h-12 rounded-xl bg-gray-300 px-4 outline-none"
            />
          </div>

          {/* IMAGES (VISIBLE FROM DB) */}
          <div>
            <p className="text-gray-600 font-medium mb-2">Images</p>

            <div className="flex gap-4 flex-wrap items-center">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover"
                />
              ))}

              {/* ADD IMAGE */}
              <label className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl cursor-pointer">
                +
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* PRICE */}
          <div>
            <p className="text-gray-600 font-medium mb-2">Price</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-12 rounded-xl bg-gray-300 px-4 outline-none"
            />
          </div>

          {/* ACTION */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`px-8 py-3 rounded-full font-medium ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {saving ? "Saving..." : "Update"}
            </button>
          </div>

          {message && (
            <p className="text-sm font-medium text-green-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
