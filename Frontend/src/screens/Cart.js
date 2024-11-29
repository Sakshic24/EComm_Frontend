import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false); // Track success message
  const [loading, setLoading] = useState(false); // Track loading state

  // Debugging - Log cartItems to check data
  console.log("Cart Items:", cartItems);

  if (cartItems.length === 0) {
    return <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>;
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
  
    if (!userEmail) {
      alert("Please log in to proceed with the order.");
      return;
    }
  
    // 1. Clear the cart immediately when checkout is clicked
    dispatch({ type: "DROP" });
  
    try {
      // 2. Send the cart items to your backend for order processing
      let response = await fetch("http://localhost:4000/api/myorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: cartItems,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });
  
      console.log("Response:", response.status);
  
      if (response.status === 200) {
        // 3. Show the success message to the user
        alert("Thank you for ordering! Your order has been placed successfully.");
  
        // 4. Redirect to login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Delay 2 seconds to allow the user to see the message
  
      } else {
        console.error("Failed to place order");
        alert("There was an issue placing your order. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };
  

  const totalPrice = cartItems.reduce(
    (total, food) => total + (food?.price || 0) * (food?.qty || 1),
    0
  );

  return (
   
    <div className="container m-auto mt-5 table-responsive">
      {orderSuccess && (
        <div className="alert alert-success text-center fs-4" role="alert">
          Thank you for your order!!!
          You want it shortly.
        </div>
      )}
      <table className="table table-hover">
        <thead className="text-success fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((food, index) => {
            if (!food || !food.name || !food.qty || !food.price) {
              return null; // Skip this item if invalid
            }
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", index })
                    }
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1 className="fs-2">Total Price: ₹{totalPrice}/-</h1>
      <div>
        <button
          className="btn bg-success mt-5"
          onClick={handleCheckOut}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Processing..." : "Check Out"}
        </button>
      </div>
    </div>
  );
}

export default Cart;
