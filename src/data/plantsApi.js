// example: src/utils/plants.js
import { supabase } from "../supabaseClient";

const plants = [
  { id: 1, name: "Peace Lily", price: 199 },
  { id: 2, name: "Snake Plant", price: 299 },
  { id: 3, name: "Aloe Vera", price: 399 }
];

// supabase fetch function

export async function fetchPlants(segment = null) {
  let q = supabase.from("plants").select("*").order("created_at", { ascending: true });
  if (segment) q = q.eq("segment", segment);
  const { data, error } = await q;
  if (error) throw error;
  return data?.length ? data : plants; // agar supabase khali ho to static plants bhej do
}

// 👇 ab ye default export bhi hai
export default plants;