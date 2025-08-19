import { Routes, Route, NavLink } from "react-router-dom";
import NurseryPage from "./pages/Nursery/NurseryPage";
import PlantDetail from "./pages/Nursery/PlantDetail";
import Checkout from "./pages/Checkout/Checkout";
import Family from "./pages/Family/Family";
import { useCart } from "./context/CartContext";

export default function App() {
  const { totalQty } = useCart();

  return (
    <div className="app">
      <header className="navbar">
        <NavLink to="/" className="brand">Mini Flora Fam</NavLink>
        <nav className="nav">
          <NavLink to="/">Nursery</NavLink>
          <NavLink to="/family">Family</NavLink>
          <NavLink to="/checkout">Cart ({totalQty})</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<NurseryPage />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/family" element={<Family />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>Delivery window: <strong>6–12 hours</strong> within serviceable areas.</p>
      </footer>
    </div>
  );
}
