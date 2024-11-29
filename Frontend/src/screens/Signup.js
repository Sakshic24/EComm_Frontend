import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
const  Signup=()=> {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let [address, setAddress] = useState("");
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };
    let latlong = await navLocation().then((res) => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude];
    });
    // console.log(latlong)
    let [lat, long] = latlong;
    console.log(lat, long);
    const response = await fetch("http://localhost:4000/api/getlocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latlong: { lat, long } }),
    });
    const { location } = await response.json();
    console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:4000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        address: address, // Use address here
      }),
    });
  
    const json = await response.json();
    console.log("Response from backend:", json);  // Log the response for debugging
  
    if (json.success) {
      // Save the auth token and navigate
      localStorage.setItem("token", json.authToken);
      navigate("/login");
    } else {
      alert("Enter Valid Credentials");
    }
  };
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>

      <div className="container">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <fieldset>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder='"Click below for fetching address"'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-describedby="emailHelp"
              />
            </fieldset>
          </div>
          <div className="m-3">
            <button
              type="button"
              onClick={handleClick}
              name="geolocation"
              className=" btn btn-success"
            >
              Click for current Location{" "}
            </button>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success" onSubmit={handleSubmit}>
            Submit
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Signup;