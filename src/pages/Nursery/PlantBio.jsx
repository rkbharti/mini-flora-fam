// src/pages/Nursery/PlantBio.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabaseClient";      // 1 folder bahar aana tha
import { getImageUrl } from "../../utils/getImageUrl";  // utils bhi bahar hai

const PlantBio = () => {
  const { id } = useParams(); // URL se id aayegi
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Supabase se ek hi plant fetch karna id ke basis par
  useEffect(() => {
    const fetchPlant = async () => {
      const { data, error } = await supabase
        .from("plants")
        .select("*")
        .eq("id", id)     // filter by id
        .single();        // ek hi record le

      if (error) {
        console.error("Error fetching plant:", error.message);
      } else {
        setPlant(data);
      }
      setLoading(false);
    };

    fetchPlant();
  }, [id]);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (!plant) return <p style={{ padding: "20px" }}>Plant not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{plant.name}</h2>
      <img
        src={
          plant.image_url.startsWith("http")
            ? plant.image_url
            : getImageUrl(plant.image_url)
        }
        alt={plant.name}
        style={{ width: "300px", borderRadius: "10px", marginBottom: "15px" }}
      />
      <p><b>Price:</b> ₹{plant.price}</p>
      <p><b>Segment:</b> {plant.segment}</p>
      <p><b>Description:</b> {plant.description || "No description available."}</p>
    </div>
  );
};

export default PlantBio;
