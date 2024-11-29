import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = (props) => {
  // Make sure cartItems is always an array, even if it's undefined
  const { cartItems } = useContext(CartContext) || { cartItems: [] };

  const [cartView, setCartView] = useState(false);
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
    console.log("loadCart");
  };

  // Styled Badge component to customize the badge position
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-dot": {
      backgroundColor: "red", // Red color for the badge
    },
  }));

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg position-sticky"
        style={{
          boxShadow: "0px 10px 20px black",
          position: "fixed",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 mx-3 active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" to="/myorder">
                    My Orders
                  </Link>
                </li>
              ) : null}
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  Signup
                </Link>
              </form>
            ) : (
              <div>
                <Link to={"/cart"}>
                  <div
                    className="btn bg-white text-success mx-2"
                    onClick={loadCart}
                  >
                    <StyledBadge
                      badgeContent={
                        Array.isArray(cartItems) ? cartItems.length : 0
                      }
                      color="secondary"
                    >
                      <ShoppingCartIcon />
                    </StyledBadge>
                    <span>
                      Cart Items{" "}
                      
                    </span>
                  </div>
                </Link>

                {cartView ? <></> : null}

                <button
                  onClick={handleLogout}
                  className="btn bg-white text-success"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
