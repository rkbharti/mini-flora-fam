import axios from "axios";

function Checkout() {
  const handlePayment = async () => {
    const { data } = await axios.post("http://localhost:5000/create-order"); // baad me Render link

    const options = {
      key: "rzp_test_R7CSUsNPuVQW7j", // ye public key hai (.env wali secret wali yahan nahi aati!)
      amount: data.amount,
      currency: data.currency,
      name: "Mini Flora Fam",
      description: "Test Transaction",
      order_id: data.id,
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="checkout">
      <h2>Checkout Page</h2>
      <button onClick={handlePayment}>Pay ₹10</button>
    </div>
  );
}

export default Checkout;
