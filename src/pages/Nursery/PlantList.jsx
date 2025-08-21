import { useEffect, useState } from "react";
import supabase from "../../data/plantsApi";
import { getImageUrl } from "../../utils/getImageUrl";

export default function PlantList() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      let { data, error } = await supabase.from("plants").select("*");
      if (error) console.error("Error fetching plants:", error);
      else setPlants(data);
    };
    fetchPlants();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {plants.map((plant) => (
        <div key={plant.id} className="border rounded-lg p-3 shadow">
          <img
            src={getImageUrl(plant.image_url)}
            alt={plant.name}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-lg font-bold mt-2">{plant.name}</h2>
          <p className="text-gray-600">₹{plant.price}</p>
        </div>
      ))}
    </div>
  );
}
