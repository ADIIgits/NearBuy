import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { findNearestShops } from "../services/shopService";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNearestShops = async () => {
    try {
      if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const res = await findNearestShops(lat, lng);

        navigate("/shop/nearest", { state: { shops: res.data.shops } });
      });
    } catch (err) {
      console.log("Nearest shops error:", err);
    }
  };

  const goToSettings = () => {
    if (!user) return;

    const path =
      user.type === "shop" ? "/settings/shop" : "/settings/user";

    navigate(path);
  };

  return (
    <nav
      style={{
        padding: 12,
        background: "#eee",
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Link to="/">Landing</Link>
      <Link to="/shop/all">Shops</Link>

      {user && user.type === "shop" && (
        <Link to="/item/create">Create Item</Link>
      )}

      <button onClick={handleNearestShops} style={{ cursor: "pointer" }}>
        Nearest Shops
      </button>

      {user && (
        <Link
          to={user.type === "shop" ? "/order/shop/me" : "/order/user/me"}
          style={{ cursor: "pointer" }}
        >
          Orders
        </Link>
      )}

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <img
            src={
              user.type === "user"
                ? user.userIcon || "https://via.placeholder.com/40"
                : user.shopIcon || "https://via.placeholder.com/40"
            }
            alt="profile"
            onClick={goToSettings}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
              border: "2px solid #ddd",
            }}
            title="Go to settings"
          />

          <span>@{user.username}</span>
          <button onClick={logout}>Logout</button>
      </div>
      )}
    </nav>
  );
}
