import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 12, background: "#eee" }}>
      <Link to="/">Landing</Link> |{" "}
      <Link to="/shop">Shops</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link>

    </nav>
  );
}
