const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Get all inventory
router.get("/", authMiddleware, async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update inventory (admin only)
router.put("/:category", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { category } = req.params;
    const { items } = req.body;

    let inventory = await Inventory.findOne({ category });
    if (!inventory) {
      inventory = new Inventory({ category, items });
    } else {
      inventory.items = items;
      inventory.updatedAt = Date.now();
    }

    await inventory.save();

    // Check for low stock
    const lowStockItems = items.filter((item) => item.stock <= item.threshold);
    if (lowStockItems.length > 0) {
      const admin = await User.findOne({ role: "admin" });
      if (admin) {
        const lowStockList = lowStockItems
          .map(
            (item) =>
              `${item.name}: Only ${item.stock} left (Threshold: ${item.threshold})`,
          )
          .join("\n");

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: admin.email,
          subject: "⚠️ Low Stock Alert - PizzaExpress",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e31837; border-radius: 10px;">
              <h2 style="color: #e31837;">⚠️ Low Stock Alert!</h2>
              <p>The following items are below threshold:</p>
              <ul>
                ${lowStockItems.map((item) => `<li><strong>${item.name}</strong> - Only ${item.stock} left (Threshold: ${item.threshold})</li>`).join("")}
              </ul>
              <p>Please restock immediately to avoid order delays.</p>
              <hr>
              <p style="color: #666;">PizzaExpress Inventory System</p>
            </div>
          `,
        });
        console.log("Low stock email sent to admin");
      }
    }

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Initialize default inventory
router.post(
  "/initialize",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const defaultInventory = [
        {
          category: "base",
          items: [
            { name: "Thin Crust", stock: 50, threshold: 20, price: 0 },
            { name: "Cheese Burst", stock: 50, threshold: 20, price: 2 },
            { name: "Thick Crust", stock: 50, threshold: 20, price: 1 },
            { name: "Whole Wheat", stock: 50, threshold: 20, price: 1 },
            { name: "Gluten Free", stock: 50, threshold: 20, price: 3 },
          ],
        },
        {
          category: "sauce",
          items: [
            { name: "Marinara", stock: 100, threshold: 30, price: 0 },
            { name: "BBQ", stock: 100, threshold: 30, price: 0.5 },
            { name: "Pesto", stock: 100, threshold: 30, price: 1 },
            { name: "Alfredo", stock: 100, threshold: 30, price: 1 },
            { name: "Spicy Arrabiata", stock: 100, threshold: 30, price: 0.5 },
          ],
        },
        {
          category: "cheese",
          items: [
            { name: "Mozzarella", stock: 100, threshold: 30, price: 0 },
            { name: "Cheddar", stock: 80, threshold: 25, price: 1 },
            { name: "Parmesan", stock: 80, threshold: 25, price: 1.5 },
            { name: "Vegan Cheese", stock: 60, threshold: 20, price: 2 },
          ],
        },
        {
          category: "veggie",
          items: [
            { name: "Bell Peppers", stock: 100, threshold: 30, price: 0.5 },
            { name: "Onions", stock: 100, threshold: 30, price: 0.5 },
            { name: "Mushrooms", stock: 100, threshold: 30, price: 0.75 },
            { name: "Olives", stock: 100, threshold: 30, price: 0.75 },
            { name: "Jalapenos", stock: 100, threshold: 30, price: 0.5 },
            { name: "Spinach", stock: 100, threshold: 30, price: 0.75 },
            { name: "Tomatoes", stock: 100, threshold: 30, price: 0.5 },
            { name: "Corn", stock: 100, threshold: 30, price: 0.5 },
          ],
        },
        {
          category: "meat",
          items: [
            { name: "Pepperoni", stock: 80, threshold: 25, price: 1.5 },
            { name: "Sausage", stock: 80, threshold: 25, price: 1.5 },
            { name: "Chicken", stock: 80, threshold: 25, price: 1.5 },
            { name: "Bacon", stock: 80, threshold: 25, price: 1.5 },
            { name: "Beef", stock: 80, threshold: 25, price: 2 },
          ],
        },
      ];

      for (const inv of defaultInventory) {
        await Inventory.findOneAndUpdate(
          { category: inv.category },
          { $set: { items: inv.items } },
          { upsert: true, new: true },
        );
      }

      res.json({ message: "Inventory initialized successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

module.exports = router;
