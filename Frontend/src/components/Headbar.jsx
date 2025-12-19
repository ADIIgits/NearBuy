import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Headbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header
      className="
        sticky top-0 z-50
        h-14 w-full
        flex items-center justify-between px-6
        bg-transparent shadow-md
      "
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/src/assets/icons/nearbuyicon.png"
          alt="cart"
          className="w-9 h-9"
        />
        <span className="text-lg font-semibold">NearBuy</span>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <button
            onClick={logout}
            className="px-4 py-1 rounded-lg bg-gray-300"
          >
            Logout
          </button>
        ) : (
          <>
            <button className="px-4 py-1 rounded-lg bg-gray-300" onClick={() => navigate("/register")}>
              Register
            </button>
            <button className="px-4 py-1 rounded-lg bg-gray-300" onClick={() => navigate("/login")}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
}
