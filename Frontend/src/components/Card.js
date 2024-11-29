import React, { useState, useContext } from "react";
import { CartContext } from "../CartContext"; // Import your cart context

const Card = ({ ImgSrc, foodName, foodId, price, description }) => {
  // Debugging log to ensure foodId is received correctly in the Card component
  console.log("Received foodId in Card:", foodId); // Log foodId to verify it's passed correctly

  const [quantity, setQuantity] = useState(1); // Track quantity state
  const [size, setSize] = useState("half"); // Track size state
  const { dispatch } = useContext(CartContext); // Access the dispatch function from the context

  // Handle "Add to Cart" logic
  const handleAddToCart = () => {
    const totalPrice = price * quantity * (size === "full" ? 2 : 1); // Calculate the total price
    const cartItem = {
      id: foodId, // This should now be correctly set
      name: foodName,
      qty: quantity,
      size: size,
      price: totalPrice,
      img: ImgSrc,
    };

    // Dispatch the item to the cart context
    dispatch({
      type: "ADD_TO_CART",
      payload: cartItem, // Send the entire cart item as the payload
    });

    console.log("Added to Cart:", cartItem); // Debugging log to verify cart item
  };

  return (
    <div className="card mt-3" style={{ width: "18rem" }}>
      <img src={ImgSrc} className="card-img-top" alt={foodName} />
      <div className="card-body">
        <h5 className="card-title">{foodName}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          {/* Quantity Selection */}
          <select
            className="m-2 h-100 bg-success rounded"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* Size Selection */}
          <select
            className="m-2 h-100 bg-success rounded"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="half">Half</option>
            <option value="full">Full</option>
          </select>

          {/* Total Price */}
          <div className="d-inline h-100 fs-5">
            Total Price: ₹{price * quantity * (size === "full" ? 2 : 1)}
          </div>
        </div>

        {/* Add to Cart Button */}
        <hr />
        <button
          className="btn bg-white text-success mt-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
