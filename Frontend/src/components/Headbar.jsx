import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Headbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-gray-200 flex items-center justify-between px-6">
      {/* Brand */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-xl"><img src="/src/assets/icons/nearbuyicon.png" alt="cart" className="w-9 h-9" /></span>
        <span className="text-lg font-semibold">NearBuy</span>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-3">
        {!user && (
          <>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-1 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Registration
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Login
            </button>
            <button className="px-4 py-1 rounded-lg bg-gray-300">
              About
            </button>
          </>
        )}

        {user && (
          <button
            onClick={logout}
            className="px-4 py-1 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
