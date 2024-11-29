import React, { useState, useEffect } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await fetch("http://localhost:4000/api/myorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet!</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h4>Order Date: {order.orderDate}</h4>
              <ul>
                {order.orderData.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - Quantity: {item.qty}, Price: ₹{item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
