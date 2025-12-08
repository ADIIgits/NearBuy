import { useState } from "react";
import { registerUser } from "../services/authService";
import api from "../services/api";

export default function Register() {
  const [type, setType] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userIcon, setUserIcon] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopIcon, setShopIcon] = useState("");

  const [location, setLocation] = useState(null);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [userCheckMsg, setUserCheckMsg] = useState("");  // availability result

  // 📍 Fetch real location
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({
            type: "Point",
            coordinates: [longitude, latitude]   // GeoJSON requires [lng, lat]
        });

      },
      (err) => alert("Location access denied")
    );
  };

  // 🔍 Check if username exists
  const checkUsername = async () => {
  if (!username.trim()) {
    setUserCheckMsg("Enter a username first");
    return;
  }

  try {
    const res = await api.get(`/auth/checkuserexist?type=${type}&username=${username}`);

    if (res.data.exists) {
      setUserCheckMsg("❌ Username already taken");
    } else {
      setUserCheckMsg("✅ Username is available");
    }
  } catch (err) {
    setUserCheckMsg("Error checking username");
  }
};


  // 🎯 Submit final form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type,
      username,
      password,
      location,
    };

    if (type === "user") payload.userIcon = userIcon;
    if (type === "shop") {
      payload.shopName = shopName;
      payload.shopIcon = shopIcon;
    }

    try {
      const res = await registerUser(payload);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      setResponse(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <button onClick={fetchLocation}>📍 Get My Location</button>
      {location && (
        <p style={{ color: "green" }}>
          Location fetched: {location.coordinates[1]}, {location.coordinates[0]}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 10, maxWidth: 300 }}
      >
        {/* TYPE */}
        <label>User Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="user">User</option>
          <option value="shop">Shop</option>
        </select>

        {/* USERNAME + CHECK BUTTON */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="username"
            value={username}
            style={{ flex: 1 }}
            onChange={(e) => {
              setUsername(e.target.value);
              setUserCheckMsg(""); // clear result when typing
            }}
          />
          <button type="button" onClick={checkUsername}>
            Check
          </button>
        </div>

        {userCheckMsg && (
          <p
            style={{
              color: userCheckMsg.includes("available") ? "green" : "red",
              marginTop: -8,
              marginBottom: 0,
            }}
          >
            {userCheckMsg}
          </p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* USER-ONLY FIELD */}
        {type === "user" && (
          <input
            type="text"
            placeholder="user icon URL"
            value={userIcon}
            onChange={(e) => setUserIcon(e.target.value)}
          />
        )}

        {/* SHOP-ONLY FIELDS */}
        {type === "shop" && (
          <>
            <input
              type="text"
              placeholder="shop name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <input
              type="text"
              placeholder="shop icon URL"
              value={shopIcon}
              onChange={(e) => setShopIcon(e.target.value)}
            />
          </>
        )}

        <button type="submit">Register</button>
      </form>

      {/* DISPLAY RESPONSE */}
      {response && (
        <div style={{ marginTop: 20, color: "green" }}>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 20, color: "red" }}>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
