import { useState } from "react";
import { loginUser } from "../services/authService";

export default function Login() {
  const [type, setType] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type,
      username,
      password,
    };

    try {
      const res = await loginUser(payload);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
      setResponse(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 300 }}>

        {/* TYPE */}
        <label>User Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="user">User</option>
          <option value="shop">Shop</option>
        </select>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
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
