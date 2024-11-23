const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Define Mongoose models for food_items and foodCategory (replace with your schema)
const FoodItem = mongoose.model(
  "food_items",
  new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
  })
);

const FoodCategory = mongoose.model(
  "foodCategory",
  new mongoose.Schema({
    name: String,
    description: String,
  })
);

// Endpoint to get food items and categories
router.post("/foodData", async (req, res) => {
  try {
    // Fetch data from MongoDB
    const foodItems = await FoodItem.find({});
    const foodCategories = await FoodCategory.find({});

    // Return the fetched data
    res.send([foodItems, foodCategories]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
