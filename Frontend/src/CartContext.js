import React, { createContext, useReducer, useContext } from "react";

// Create the Cart Context
export const CartContext = createContext();

// Initial state of the cart
const initialState = {
  cartItems: [], // Default empty cart
};

// Cart Reducer function to update the state
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((_, index) => index !== action.index),
      };
    case "DROP": // Clears the cart
      return {
        ...state,
        cartItems: [], // Clears the cart items array
      };
    default:
      return state;
  }
};


// Custom hook to use the Cart Context
export const useCart = () => {
  const { cartItems, dispatch } = useContext(CartContext);
  return { cartItems, dispatch };
};

// CartProvider component to wrap your app with the CartContext
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
