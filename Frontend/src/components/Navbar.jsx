import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import homeIcon from "../assets/icons/home.png";
import orderIcon from "../assets/icons/order.png";
import shopIcon from "../assets/icons/shop.png";
import nearbyShopIcon from "../assets/icons/nearbyshop.png";
import createIcon from "../assets/icons/createblack.png";
import listedItemsIcon from "../assets/icons/listeditems.png";

const linkBase =
  "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <aside className="w-56 h-full bg-gray-100 flex flex-col justify-between p-4">
      {/* NAV LINKS */}
      <div className="flex flex-col gap-2">
        <NavLink to="/" className={linkBase}>
          <span><img src={homeIcon} alt="" className="h-7 w-7"/></span> Home
        </NavLink>

        <NavLink
          to={
            user.type === "shop"
              ? "/order/shop/me"
              : "/order/user/me"
          }
          className={linkBase}
        >
          <span><img src={orderIcon} alt="" className="h-7 w-7"/></span>Orders
        </NavLink>

        {/* USER-ONLY LINKS */}
        {user.type === "user" && (
          <>
            <NavLink to="/shop/all" className={linkBase}>
              <span><img src={shopIcon} alt="" className="h-7 w-7"/></span>Shops
            </NavLink>

            <NavLink to="/shop/nearest" className={linkBase}>
              <span><img src={nearbyShopIcon} alt="" className="h-7 w-7"/></span>Nearest Shops
            </NavLink>
          </>
        )}

        {/* SHOP-ONLY LINKS */}
        {user.type === "shop" && (
          <>
            <NavLink to="/item/create" className={linkBase}>
              <span><img src={createIcon} alt="" className="h-7 w-7"/></span> Create Item
            </NavLink>

            <NavLink to="/shop/me/items" className={linkBase}>
              <span><img src={listedItemsIcon} alt="" className="h-7 w-7"/></span> Listed Items
            </NavLink>
          </>
        )}
      </div>

      {/* PROFILE (BOTTOM) */}
      <div
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
        onClick={() =>
          navigate(
            user.type === "shop"
              ? "/settings/shop"
              : "/settings/user"
          )
        }
      >
        <img
          src={
            user.type === "shop"
              ? user.shopIcon
              : user.userIcon
          }
          alt="profile"
          className="w-10 h-10 rounded-full object-cover bg-gray-300"
        />
        <span className="text-sm font-medium">
          @{user.username}
        </span>
      </div>
    </aside>
  );
}
