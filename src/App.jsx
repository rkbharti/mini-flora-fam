import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [plants, setPlants] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const { data, error } = await supabase.from("plants").select("*");
      if (error) {
        console.error("Supabase fetch error:", error.message);
      } else {
        setPlants(data);
      }
    };

    fetchPlants();
  }, []);

  const addToCart = (plant) => {
    setCart([...cart, plant]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌱 Mini Flora Fam</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {plants.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              src={p.image_url}
              alt={p.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.map((c, index) => (
            <li key={index}>{c.name} - ₹{c.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
