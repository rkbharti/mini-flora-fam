import { useParams } from "react-router-dom";
import plants from "../../data/plants";
import { useCart } from "../../context/CartContext";

export default function PlantDetail() {
  const { id } = useParams();
  const plant = plants.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!plant) return <p>Plant not found.</p>;

  return (
    <div className="section">
      <div className="row" style={{gap:20, alignItems:"flex-start"}}>
        <img src={plant.img} alt={plant.name} style={{width:360, borderRadius:16, border:"1px solid #eee"}} />
        <div style={{flex:1}}>
          <h2>{plant.name}</h2>
          <p className="price">₹{plant.price}</p>
          <p>Stock: {plant.stock} pcs</p>
          <p>Delivery: within 6–12 hours (slot shown at checkout).</p>
          <div style={{display:"flex", gap:12, marginTop:12}}>
            <button className="btn primary" onClick={() => addToCart(plant.id, 1)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
