import { useEffect, useState } from "react";
import {
  getLoggedInUser,
  updateUsername,
  updatePassword,
  updateUserIcon,
  updateUserLocation
} from "../services/userService";
import { uploadImageToCloudinary } from "../services/uploadService";

export default function UserSettings() {
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [userIcon, setUserIcon] = useState("");
  const [previewIcon, setPreviewIcon] = useState("");

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const [message, setMessage] = useState("");

  // Fetch logged-in user on load
  useEffect(() => {
    getLoggedInUser()
      .then((res) => {
        const u = res.data.user;

        setUsername(u.username);
        setUserIcon(u.userIcon);
        setPreviewIcon(u.userIcon);

        if (u.location?.coordinates) {
          setLocation({
            lng: u.location.coordinates[0],
            lat: u.location.coordinates[1],
          });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching user:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  // -----------------------------
  // ✔ Update username
  // -----------------------------
  const handleUsernameSave = async () => {
    try {
      await updateUsername(username);
      setMessage("Username updated!");
    } catch (err) {
      setMessage("Error updating username");
    }
  };

  // -----------------------------
  // ✔ Update password
  // -----------------------------
  const handlePasswordSave = async () => {
    if (!newPassword.trim()) {
      setMessage("Password cannot be empty!");
      return;
    }
    try {
      await updatePassword(newPassword);
      setNewPassword("");
      setMessage("Password updated!");
    } catch (err) {
      setMessage("Error updating password");
    }
  };

  // -----------------------------
  // ✔ Upload + update profile image
  // -----------------------------
const handleIconUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Local preview
  const preview = URL.createObjectURL(file);
  setPreviewIcon(preview);

  try {
    // 1️⃣ Upload to Cloudinary
    const cloudRes = await uploadImageToCloudinary(file);
    const imageUrl = cloudRes.secure_url;

    if (!imageUrl) {
      setMessage("Cloudinary upload failed.");
      return;
    }

    // 2️⃣ Send URL to backend
    await updateUserIcon(imageUrl);

    setMessage("Profile picture updated!");

  } catch (err) {
    console.log(err);
    setMessage("Error updating picture");
  }
};


  // -----------------------------
  // ✔ Update location using browser GPS
  // -----------------------------
  const updateLocationGPS = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setLocation({ lat, lng });

      try {
        await updateUserLocation(lat, lng);
        setMessage("Location updated!");
      } catch (err) {
        setMessage("Error updating location");
      }
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>User Settings</h2>

      {message && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}

      {/* ------------------- USER ICON ------------------- */}
      <section style={{ marginTop: 20 }}>
        <h3>Profile Picture</h3>

        <img
          src={previewIcon || "https://via.placeholder.com/120"}
          alt="profile"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

        <br />

        <input type="file" accept="image/*" onChange={handleIconUpload} />
      </section>

      {/* ------------------- USERNAME ------------------- */}
      <section style={{ marginTop: 20 }}>
        <h3>Username</h3>
        <input
          style={{ padding: 8, width: "100%", marginBottom: 8 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleUsernameSave}>Save Username</button>
      </section>

      {/* ------------------- PASSWORD ------------------- */}
      <section style={{ marginTop: 20 }}>
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="New password"
          style={{ padding: 8, width: "100%", marginBottom: 8 }}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordSave}>Save Password</button>
      </section>

      {/* ------------------- LOCATION ------------------- */}
      <section style={{ marginTop: 20 }}>
        <h3>Location</h3>
        <p>
          Lat: {location.lat} <br />
          Lng: {location.lng}
        </p>

        <button onClick={updateLocationGPS}>Update Using GPS</button>
      </section>
    </div>
  );
}
