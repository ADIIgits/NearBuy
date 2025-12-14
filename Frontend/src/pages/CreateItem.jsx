import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { createNewItem } from "../services/itemService";
import { uploadImageToCloudinary } from "../services/uploadService";

export default function CreateItem() {
  const { user } = useContext(AuthContext);

  if (!user || user.type !== "shop")
    return <p style={{ padding: 20 }}>Unauthorized – Only shop owners can create items.</p>;

  const [itemName, setItemName] = useState("");
  const [itemIcon, setItemIcon] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");

  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadRes = await uploadImageToCloudinary(file);

    if (uploadRes.secure_url) {
      setImages((prev) => [...prev, uploadRes.secure_url]);
    }

    setUploading(false);
  };

  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadRes = await uploadImageToCloudinary(file);

    if (uploadRes.secure_url) {
      setItemIcon(uploadRes.secure_url);
    }

    setUploading(false);
  };

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
    <div style={{ padding: 20, maxWidth: 450 }}>
      <h2>Create Item</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        {/* Name */}
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />

        {/* Icon Upload */}
        <label><b>Item Icon</b></label>
        <input type="file" accept="image/*" onChange={handleIconUpload} />
        {itemIcon && <img src={itemIcon} width="80" alt="icon" />}

        {/* Item Images Upload */}
        <label><b>Item Images</b></label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <p>Uploading...</p>}

        {images.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                width="70"
                height="70"
                style={{ borderRadius: 6, objectFit: "cover" }}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button type="submit">Create Item</button>
      </form>

      {response && (
        <pre style={{ marginTop: 20, color: "green" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
