// import React, { useEffect, useState } from "react";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import Card from "../components/Card";

// const Home = () => {
//   const [foodCat, setFoodCat] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);
//   const [search, setSearch] = useState("");

//   const loadFoodItems = async () => {
//     let response = await fetch("http://localhost:4000/api/auth/foodData", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     response = await response.json();
//     setFoodItems(response[0]);
//     setFoodCat(response[0]);
//   };

//   useEffect(() => {
//     loadFoodItems();
//   }, []);
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// console.log(Navbar);
import Card from "../components/Card";

const Home = () => {
  const [foodData, setFoodData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  // Load Food Items
  const loadFoodItems = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      // Extract categories and food data
      const foodItems = data[0]; // First array contains the food items
      const uniqueCategories = [
        ...new Set(foodItems.map((item) => item.CategoryName)),
      ]; // Extract unique category names
      setCategories(uniqueCategories);
      setFoodData(foodItems);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  
  return (
    <div>
      <Navbar />

      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn text-white bg-danger"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                style={{
                  filter: "brightness(70%)",
                  height: "800px", // Adjust height here
                  objectFit: "cover",
                }}
                alt="Carousel Image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/1341905237/photo/chinese-food-veg-pizza.jpg?s=2048x2048&w=is&k=20&c=JfRXRAxEq0Npvj5CDf1YgfvHu5UeZwP8Blo1HdhuUmo="
                className="d-block w-100"
                style={{ filter: "brightness(80%)" }}
                alt="Carousel Image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://media.istockphoto.com/id/1205283639/photo/mother-and-daughter-eating-pizza-stock-photo.jpg?s=2048x2048&w=is&k=20&c=A1h_1bhBIW-gdjF3sIcwIGPux6mfs6PG-EnNwPuLOnY="
                className="d-block w-100"
                style={{ filter: "brightness(70%)" }}
                alt="Carousel Image"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container" >
        {/* Loop through each category */}
        {categories.map((category, index) => (
          <div key={index} className="mb-5">
            {/* Render Category Name */}
            <h3 className="mb-3">{category}</h3>
            <hr />
            <div className="row">
              {/* Filter and render food items belonging to the current category */}
              {foodData
                .filter(
                  (item) =>
                    item.CategoryName === category &&
                    item.name.toLowerCase().includes(search.toLowerCase()) // Apply search filter
                )
                .map((filteredItem) => (
                  <div
                    key={filteredItem._id}
                    className="col-12 col-md-6 col-lg-3 mb-4"
                  >
                    <Card                       foodName={filteredItem.name}
                      item={filteredItem}
                      options={filteredItem.options[0]} // Send the first options object
                      ImgSrc={filteredItem.img}
                      price={filteredItem.options[0].half}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};
export default Home;

// {" "}
//         {/* boootstrap is mobile first */}
//         {foodCat.length > 0
//           ? foodCat?.map((data) => {
//               return (
//                 // justify-content-center
//                 <div className="row mb-3">
//                   <div key={data.id} className="fs-3 m-3">
//                     {data.CategoryName}
//                   </div>
//                   <hr
//                     id="hr-success"
//                     style={{
//                       height: "4px",
//                       backgroundImage:
//                         "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
//                     }}
//                   />
//                   {foodItems.length > 0 ? (
//                     foodItems
//                       .filter(
//                         (items) =>
//                           items.CategoryName === data.CategoryName &&
//                           items.name
//                             .toLowerCase()
//                             .includes(search.toLowerCase())
//                       )
//                       .map((filterItems) => {
//                         return (
//                           <div
//                             key={filterItems.id}
//                             className="col-12 col-md-6 col-lg-3"
//                           >
//                             {/* {console.log(filterItems.url)} */}
//                             <Card
//                               foodName={filterItems.name}
//                               item={filterItems}
//                               options={filterItems.options[0]}
//                               ImgSrc={filterItems.img}
//                             ></Card>
//                           </div>
//                         );
//                       })
//                   ) : (
//                     <div> No Such Data </div>
//                   )}
//                 </div>
//               );
//             })
//           : ""}
