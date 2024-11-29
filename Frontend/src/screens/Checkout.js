// frontend/src/screens/Checkout.js

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const cart = JSON.parse(localStorage.getItem("cart")); // Assuming cart data is stored in local storage

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Create the order in the database
      const response = await axios.post("http://localhost:4000/api/myorder", {
        items: cart,
        totalAmount,
      });

      // Redirect to the payment page with the order ID
      history.push(`/payment/${response.data.orderId}`);
    } catch (err) {
      setLoading(false);
      alert("Error during checkout: " + err.message);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Total Amount: ₹{totalAmount}</p>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
};

export default Checkout;
