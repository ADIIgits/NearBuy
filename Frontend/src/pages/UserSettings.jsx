import { useEffect, useState } from "react";
import {
  getLoggedInUser,
  updateUsername,
  updatePassword,
  updateUserIcon,
  updateUserLocation,
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
  const [usernameError, setUsernameError] = useState("");

  /* ---------------- FETCH USER ---------------- */
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
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  /* ---------------- USERNAME ---------------- */
  const handleUsernameSave = async () => {
    try {
      setUsernameError("");
      await updateUsername(username);
      setMessage("Username updated!");
    } catch {
      setUsernameError("username not available");
    }
  };

  /* ---------------- PASSWORD ---------------- */
  const handlePasswordSave = async () => {
    if (!newPassword.trim()) return;
    try {
      await updatePassword(newPassword);
      setNewPassword("");
      setMessage("Password updated!");
    } catch {
      setMessage("Error updating password");
    }
  };

  /* ---------------- ICON ---------------- */
  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewIcon(URL.createObjectURL(file));

    try {
      const cloudRes = await uploadImageToCloudinary(file);
      await updateUserIcon(cloudRes.secure_url);
      setMessage("Profile picture updated!");
    } catch {
      setMessage("Error updating picture");
    }
  };

  /* ---------------- LOCATION ---------------- */
  const updateLocationGPS = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setLocation({ lat, lng });
      await updateUserLocation(lat, lng);
      setMessage("Location updated!");
    });
  };

  return (
    <div className="p-10 max-w-3xl">
      {/* TITLE */}
      <p className="text-sm text-gray-500">Settings</p>
      <h1 className="text-4xl font-light mb-10">Profile</h1>

      {/* PROFILE HEADER */}
      <div className="flex gap-10 items-center mb-10">
        <div className="flex flex-col items-center gap-3">
          <img
            src={previewIcon || "https://via.placeholder.com/150"}
            className="w-32 h-32 rounded-full object-cover bg-gray-200"
          />

          <label className="px-5 py-2 rounded-full bg-gray-200 cursor-pointer text-sm">
            choose file
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleIconUpload}
            />
          </label>
        </div>

        <p className="text-xl text-gray-600">@{username}</p>
      </div>

      {/* USERNAME */}
      <div className="mb-8">
        <label className="block text-gray-600 mb-2">Username</label>

        <div className="flex gap-4 items-center">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-200 w-72 outline-none"
          />

          <button
            onClick={handleUsernameSave}
            className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            Save Username
          </button>
        </div>

        {usernameError && (
          <p className="text-red-500 text-sm mt-2">{usernameError}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="mb-8">
        <label className="block text-gray-600 mb-2">Change Password</label>

        <div className="flex gap-4 items-center">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-200 w-72 outline-none"
          />

          <button
            onClick={handlePasswordSave}
            className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            Save Password
          </button>
        </div>
      </div>

      {/* LOCATION */}
      <div>
        <label className="block text-gray-600 mb-2">
          Save current Location
        </label>

        <button
          onClick={updateLocationGPS}
          className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          get location
        </button>
      </div>

      {message && (
        <p className="mt-6 text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
}
