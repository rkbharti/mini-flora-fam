import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject("Razorpay SDK failed to load");
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { lines, subtotal, updateQty, removeFromCart } = useCart();
  const [info, setInfo] = useState({ name:"", phone:"", address:"", pincode:"" });
  const [loading, setLoading] = useState(false);
  const deliveryFee = useMemo(() => (subtotal > 599 ? 0 : 39), [subtotal]);
  const total = subtotal + deliveryFee;

  useEffect(() => { loadRazorpay().catch(console.error); }, []);

  const placeOrder = async () => {
    if (!lines.length) return alert("Cart is empty");
    if (!info.name || !info.phone || !info.address || !info.pincode) return alert("Fill all address fields");

    try {
      setLoading(true);

      // 1) Create order on server (amount in paise)
      const res = await axios.post("/create-order", {
        amountInPaise: total * 100,
        receipt: `order_${Date.now()}`
      });
      const order = res.data;

      // 2) Open Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Mini Flora Fam",
        description: "Plant order",
        order_id: order.id,
        prefill: {
          name: info.name,
          contact: info.phone
        },
        handler: async function (response) {
          // 3) Save order to Firestore
          await addDoc(collection(db, "orders"), {
            user: info,
            items: lines.map(l => ({ id:l.id, name:l.name, price:l.price, qty:l.qty })),
            amounts: { subtotal, deliveryFee, total },
            razorpay: {
              orderId: order.id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            },
            status: "paid",
            createdAt: serverTimestamp()
          });
          alert("Payment successful! Order placed.");
        },
        theme: { color: "#16a34a" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      console.error(e);
      alert("Payment failed to start. Check server & keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>Checkout</h2>

      <div className="section">
        <h3>Delivery Details (6–12 hrs)</h3>
        <div className="form">
          <input className="input" placeholder="Full name" value={info.name} onChange={e=>setInfo({...info, name:e.target.value})} />
          <input className="input" placeholder="Phone" value={info.phone} onChange={e=>setInfo({...info, phone:e.target.value})} />
          <input className="input" placeholder="Address" value={info.address} onChange={e=>setInfo({...info, address:e.target.value})} />
          <input className="input" placeholder="Pincode" value={info.pincode} onChange={e=>setInfo({...info, pincode:e.target.value})} />
        </div>
      </div>

      <div className="section">
        <h3>Your Cart</h3>
        <div className="list">
          {lines.map(l => (
            <div className="row" key={l.id}>
              <div style={{display:"flex", gap:12, alignItems:"center"}}>
                <img src={l.img} alt={l.name} width="56" height="56" style={{borderRadius:8, objectFit:"cover"}} />
                <div>
                  <div>{l.name}</div>
                  <small>₹{l.price}</small>
                </div>
              </div>
              <div className="row" style={{gap:8}}>
                <input className="input" type="number" min="1" value={l.qty}
                  onChange={e=>updateQty(l.id, Math.max(1, Number(e.target.value)))} style={{width:72}} />
                <button className="btn secondary" onClick={()=>removeFromCart(l.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{marginTop:12}}>
          <span>Subtotal</span><span>₹{subtotal}</span>
        </div>
        <div className="row">
          <span>Delivery Fee {deliveryFee===0 ? "(Free over ₹599)" : ""}</span><span>₹{deliveryFee}</span>
        </div>
        <div className="row total">
          <span>Total</span><span>₹{total}</span>
        </div>
      </div>

      <button className="btn primary" onClick={placeOrder} disabled={loading}>
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
    </div>
  );
}
