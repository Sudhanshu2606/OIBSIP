const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

// Get all pizza varieties
router.get("/varieties", async (req, res) => {
  try {
    // Default pizza varieties
    const pizzaVarieties = [
      {
        id: 1,
        name: "Margherita",
        description: "Fresh mozzarella, tomato sauce, basil",
        price: 299,
        image: "https://via.placeholder.com/300x200?text=Margherita",
      },
      {
        id: 2,
        name: "Pepperoni",
        description: "Pepperoni, mozzarella, tomato sauce",
        price: 399,
        image: "https://via.placeholder.com/300x200?text=Pepperoni",
      },
      {
        id: 3,
        name: "Farmhouse",
        description: "Bell peppers, onions, mushrooms, olives",
        price: 349,
        image: "https://via.placeholder.com/300x200?text=Farmhouse",
      },
      {
        id: 4,
        name: "BBQ Chicken",
        description: "BBQ sauce, chicken, onions, mozzarella",
        price: 449,
        image: "https://via.placeholder.com/300x200?text=BBQ+Chicken",
      },
      {
        id: 5,
        name: "Veg Supreme",
        description: "Corn, capsicum, onion, tomato, mushroom",
        price: 379,
        image: "https://via.placeholder.com/300x200?text=Veg+Supreme",
      },
    ];

    res.json(pizzaVarieties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get available options for custom pizza
router.get("/options", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    const options = {};

    inventory.forEach((category) => {
      options[category.category] = category.items.map((item) => ({
        name: item.name,
        price: item.price,
        available: item.stock > 0,
      }));
    });

    res.json(options);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
