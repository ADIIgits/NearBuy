import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { createNewItem } from "../services/itemService";
import { uploadImageToCloudinary } from "../services/uploadService";

export default function CreateItem() {
  const { user } = useContext(AuthContext);

  if (!user || user.type !== "shop")
    return (
      <p className="p-6">
        Unauthorized – Only shop owners can create items.
      </p>
    );

  const [itemName, setItemName] = useState("");
  const [itemIcon, setItemIcon] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");

  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);

  /* ---------------- ICON UPLOAD ---------------- */
  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const res = await uploadImageToCloudinary(file);
    if (res.secure_url) setItemIcon(res.secure_url);
    setUploading(false);
  };

  /* ---------------- IMAGES UPLOAD ---------------- */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const res = await uploadImageToCloudinary(file);
    if (res.secure_url) setImages((prev) => [...prev, res.secure_url]);
    setUploading(false);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      itemName,
      itemIcon,
      images,
      price: Number(price),
    };

    const res = await createNewItem(payload);
    setResponse(res.data);
  };

  return (
    <div className="p-8">
      {/* PAGE TITLE */}
      <p className="text-sm text-gray-500">Create Item</p>
      <h1 className="text-3xl font-medium mb-6">Create Item</h1>

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="w-[420px] bg-gray-200 rounded-2xl overflow-hidden p-6 space-y-4"
      >
        {/* ICON UPLOAD / PREVIEW */}
        <label className="w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-400 transition">
          {itemIcon ? (
            <img
              src={itemIcon}
              alt="icon"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 font-medium">
              image icon
            </span>
          )}

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            accept="image/*"
            onChange={handleIconUpload}
            hidden
          />
        </label>


        {/* ITEM NAME */}
        <div>
          <p className="text-sm font-medium mb-1">Item Name</p>
          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-300 outline-none"
            required
          />
        </div>

        {/* IMAGES */}
        <div>
          <p className="text-sm font-medium mb-2">Images</p>

          <div className="flex gap-3 items-center">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-16 h-16 rounded-lg object-cover bg-gray-300"
              />
            ))}

            {/* ADD IMAGE */}
            <label className="w-16 h-16 rounded-lg bg-gray-300 flex items-center justify-center cursor-pointer">
              <span className="text-2xl">+</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>

          {uploading && (
            <p className="text-xs text-gray-600 mt-1">
              Uploading...
            </p>
          )}
        </div>

        {/* PRICE + BUTTON */}
        <div className="flex justify-between items-center pt-2">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-300 outline-none w-32"
            required
          />

          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 font-medium"
          >
            Create
          </button>
        </div>
      </form>

      {/* RESPONSE */}
      {response && (
        <pre className="mt-6 text-green-700 bg-green-50 p-4 rounded-lg text-sm">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
