import React, { useEffect, useState } from "react";
import { fetchPlants } from "../../data/plantsApi";
import { Link } from "react-router-dom";

function PlantList() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function loadPlants() {
      try {
        const data = await fetchPlants();
        setPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    }
    loadPlants();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🌱 Mini Flora Fam</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {/* 👇 Ye image local /public/images/ se uthayega */}
            <img
              src={`/images/${plant.image_url}`}
              alt={plant.name}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="text-lg font-semibold mt-2">{plant.name}</h2>
            <p className="text-gray-600">₹{plant.price}</p>

            {/* Plant detail page ka link */}
            <Link
              to={`/plant/${plant.id}`}
              className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlantList;
