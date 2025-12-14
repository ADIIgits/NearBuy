import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ShopDetails from "./pages/ShopDetails";
import Shops from "./pages/Shops";
import NotFound from "./pages/NotFound";
import ShopOrders from "./pages/ShopOrders";
import UserOrders from "./pages/UserOrders";
import NearestShops from "./pages/NearestShops";
import CreateItem from "./pages/CreateItem";
import UserSettings from "./pages/UserSettings";
import ShopSettings from "./pages/ShopSettings";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/shops" element={<Home />} /> */}
        {/* <Route path="/shops/:id" element={<ShopDetails />} /> */}
        <Route path="/shop/all" element={<Shops />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/shop/nearest" element={<NearestShops />} />
        <Route path="/order/shop/me" element={<ShopOrders />} />
        <Route path="/order/user/me" element={<UserOrders />} />
        <Route path="/item/create" element={<CreateItem />} />
        <Route path="/settings/user" element={<UserSettings />} />
        <Route path="/settings/shop" element={<ShopSettings />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
