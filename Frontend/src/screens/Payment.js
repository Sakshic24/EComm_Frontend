import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch order details from the backend using the order ID
    axios.get(`http://localhost:4000/api/order/${orderId}`)
      .then(response => {
        setOrder(response.data);
      })
      .catch(error => {
        alert('Error fetching order details: ' + error.message);
      });
  }, [orderId]);

  const handlePayment = async () => {
    const orderId = localStorage.getItem("orderId");  // Ensure that the orderId is set
  
    if (!orderId) {
      console.error("Order ID is missing!");
      return;  // Prevent making the API call if orderId is missing
    }
  
    try {
      const response = await axios.get(`http://localhost:4000/api/order/${orderId}`);
      console.log("Order details:", response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  

  if (!order) {
    return <div>Loading...</div>;
  }

  const itemCount = order.items.length;  // Calculate number of items

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="text-center p-4 rounded" style={{ 
          backgroundColor: '#f8f9fa', 
          width: '100%', 
          maxWidth: '600px', 
          boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' 
        }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'black' }}>Payment for Order #{orderId}</h2>
        <h3 style={{ fontSize: '1.8rem', color: 'black' }}>Total Amount: ₹{order.totalAmount}/-</h3>
        <p style={{ fontSize: '1.2rem', color: 'black' }}>Sweet treat coming your way! 🍰</p>
        <p style={{ fontSize: '1.5rem', color: 'black' }}>
          You've added <strong>{itemCount}</strong> item{itemCount > 1 ? 's' : ''} to your cart. Enjoy!
        </p>
        
        {/* Razorpay Payment Button */}
        <button className="btn btn-primary btn-lg" onClick={handlePayment} style={{ padding: '10px 30px', fontSize: '1.1rem', marginTop: '20px' }}>
          Pay Now with Razorpay
        </button>

        <div className="mt-4">
          <h4 style={{ color: 'black' }}>Thank you for visiting! 💖</h4>
          <p style={{ color: 'black' }}>We hope you enjoy your meal. Your support means the world to us!</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
