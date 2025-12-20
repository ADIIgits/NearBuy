import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [type, setType] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser({ type, username, password });
    login(res.data.user);
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.response?.data ||
      "Login failed";

    setError(msg);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-[360px] flex flex-col gap-6"
      >
        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-center">Login</h1>

        {/* USER TYPE */}
        <div className="flex flex-col items-center gap-2">
          <label className="text-sm text-gray-600">User Type</label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-5 py-2 rounded-full bg-gray-300 appearance-none outline-none cursor-pointer"
          >
            <option value="user">User</option>
            <option value="shop">Shop</option>
          </select>
        </div>

        {/* USERNAME */}
        <div>
          <label className="text-sm text-gray-600">Username</label>
          <input
            type="text"
            className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-200 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          className="mt-6 py-3 rounded-full text-lg bg-teal-300 text-black transition hover:opacity-90"
        >
          Login
        </button>

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
}
