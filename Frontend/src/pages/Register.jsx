import { useState, useEffect } from "react";
import { registerUser } from "../services/authService";
import api from "../services/api";

import tick from "../assets/icons/tick.png";
import tickFilled from "../assets/icons/tickfilled.png";
import cross from "../assets/icons/cross.png";
import loading from "../assets/icons/loading.gif";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [type, setType] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null);

  const [usernameStatus, setUsernameStatus] = useState("idle");
  const [error, setError] = useState(null);

  /* ---------------- LOCATION ---------------- */
  const fetchLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        type: "Point",
        coordinates: [pos.coords.longitude, pos.coords.latitude],
      });
    });
  };

  /* ---------------- USERNAME CHECK (DEBOUNCE) ---------------- */
  useEffect(() => {
    if (!username.trim()) {
      setUsernameStatus("idle");
      return;
    }

    setUsernameStatus("checking");

    const timer = setTimeout(async () => {
      try {
        const res = await api.get(
          `/auth/checkuserexist?type=${type}&username=${username}`
        );

        setUsernameStatus(res.data.exists ? "taken" : "available");
      } catch {
        setUsernameStatus("idle");
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [username, type]);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameStatus !== "available") return;

    try {
      await registerUser({
        type,
        username,
        password,
        location,
      });
      Navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  /* ---------------- ICON PICKER ---------------- */
  const getStatusIcon = () => {
    if (usernameStatus === "checking") return loading;
    if (usernameStatus === "available") return tickFilled;
    if (usernameStatus === "taken") return cross;
    return tick; // idle
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-[360px] flex flex-col gap-5"
      >
        <h1 className="text-3xl font-semibold text-center">Register</h1>

      <div className="flex gap-3 justify-center items-center">
        {/* USER TYPE DROPDOWN */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 rounded-full bg-gray-300 text-black outline-none cursor-pointer"
        >
          <option value="user">User</option>
          <option value="shop">Shop</option>
        </select>

        {/* LOCATION BUTTON */}
        <button
          type="button"
          onClick={fetchLocation}
          className={`px-4 py-2 rounded-full ${
            location ? "bg-teal-300" : "bg-gray-100"
          }`}
        >
          get location
        </button>
      </div>

        {/* USERNAME */}
        <div className="relative">
          <label className="text-sm text-gray-600">Username</label>

          <input
            className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-200 outline-none pr-12"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* STATUS ICON */}
          <img
            src={getStatusIcon()}
            alt="status"
            className="absolute right-3 top-10 w-5 h-5"
          />

          {usernameStatus === "taken" && (
            <p className="text-sm text-red-500 mt-1">
              username not available
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-200 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={usernameStatus !== "available"}
          className={`mt-4 py-3 rounded-full text-lg transition
            ${
              usernameStatus === "available"
                ? "bg-teal-300 text-black"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Submit
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}
