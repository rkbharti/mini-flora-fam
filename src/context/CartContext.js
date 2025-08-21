import { createContext, useContext, useState, useEffect } from "react";
import { fetchPlants } from "../data/plantsApi";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {id, qty}
  const [catalog, setCatalog] = useState(new Map()); // map for quick lookup

  // load catalog from fetchPlants
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPlants(); // fetch data
        const map = new Map();
        data.forEach(p => map.set(p.id, p));
        setCatalog(map);
      } catch (err) {
        console.error("Error fetching plants:", err.message);
      }
    };
    load();
  }, []);

  const addToCart = (id, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { id, qty }];
    });
  };

  const removeFromCart = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));

  const lines = items.map(i => {
    const plant = catalog.get(i.id);
    return plant ? { ...plant, qty: i.qty } : null;
  }).filter(Boolean);

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const totalQty = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, updateQty, lines, subtotal, totalQty }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
