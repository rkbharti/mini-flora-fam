// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import supabase from "./supabaseClient";
import { getImageUrl } from "./utils/getImageUrl";
import PlantBio from "./pages/Nursery/PlantBio";

function Home() {
  const [plants, setPlants] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const { data, error } = await supabase
        .from("plants")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Supabase fetch error:", error.message);
      } else {
        setPlants(data || []);
      }
    };
    fetchPlants();
  }, []);

  const addToCart = (plant) => setCart((c) => [...c, plant]);

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
            <Link
              to={`/plant/${p.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={
                  p.image_url?.startsWith("http")
                    ? p.image_url
                    : getImageUrl(p.image_url)
                }
                alt={p.name}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  height: 140,
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <h3 style={{ marginTop: 8 }}>{p.name}</h3>
              <p>₹{p.price}</p>
            </Link>

            <button onClick={() => addToCart(p)} style={{ marginTop: 8 }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.map((c, i) => (
            <li key={i}>
              {c.name} - ₹{c.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plant/:id" element={<PlantBio />} />
    </Routes>
  );
}
