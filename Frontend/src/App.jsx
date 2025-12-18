import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Headbar from "./components/Headbar";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shops from "./pages/Shops";
import ShopDetails from "./pages/ShopDetails";
import ShopOrders from "./pages/ShopOrders";
import UserOrders from "./pages/UserOrders";
import NearestShops from "./pages/NearestShops";
import CreateItem from "./pages/CreateItem";
import UserSettings from "./pages/UserSettings";
import ShopSettings from "./pages/ShopSettings";
import ListedItems from "./pages/ListedItems";
import UpdateItem from "./pages/UpdateItem";
import NotFound from "./pages/NotFound";

// changes in main branch
function App() {
  return (
    <Router>
      <Headbar />

      <div className="flex h-screen overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-white">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/shop/all" element={<Shops />} />
            <Route path="/shop/:id" element={<ShopDetails />} />
            <Route path="/shop/nearest" element={<NearestShops />} />
            <Route path="/shop/me/items" element={<ListedItems />} />

            <Route path="/order/shop/me" element={<ShopOrders />} />
            <Route path="/order/user/me" element={<UserOrders />} />

            <Route path="/item/create" element={<CreateItem />} />
            <Route path="/settings/user" element={<UserSettings />} />
            <Route path="/settings/shop" element={<ShopSettings />} />
            <Route path="/item/update/:id" element={<UpdateItem />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
