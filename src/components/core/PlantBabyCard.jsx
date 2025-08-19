import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function PlantBabyCard({ plant }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <Link to={`/plant/${plant.id}`}>
        <img src={plant.img} alt={plant.name} />
      </Link>
      <div className="content">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h4>{plant.name}</h4>
          <span className="price">₹{plant.price}</span>
        </div>
        <small>{plant.segment}</small>
        <button className="btn primary" onClick={() => addToCart(plant.id, 1)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
