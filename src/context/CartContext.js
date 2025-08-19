import { createContext, useContext, useMemo, useState } from "react";
import plants from "../data/plants";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {id, qty}

  const catalog = useMemo(() => {
    const map = new Map();
    plants.forEach(p => map.set(p.id, p));
    return map;
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

  const lines = items.map(i => ({ ...catalog.get(i.id), qty: i.qty }));
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const totalQty = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, updateQty, lines, subtotal, totalQty }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
