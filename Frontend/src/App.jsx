import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ShopDetails from "./pages/ShopDetails";
import Shops from "./pages/shops";
import NotFound from "./pages/NotFound";

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
        <Route path="/shop" element={<Shops />} />
        <Route path="/shop/:id" element={<ShopDetails />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
