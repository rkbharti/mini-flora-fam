// src/data/plantsApi.js
import supabase from "../supabaseClient";   // ✅ default import, curly braces hatao

export async function fetchPlants(segment = null) {
  let q = supabase.from("plants").select("*").order("id", { ascending: true });
  if (segment) q = q.eq("segment", segment);
  const { data, error } = await q;
  if (error) {
    console.error("Supabase fetch error:", error.message);
    return [];
  }
  return data;
}
