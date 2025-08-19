import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Razorpay Setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

// Example payment route
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
