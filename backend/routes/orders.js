const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Inventory = require("../models/Inventory");
const User = require("../models/User");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const nodemailer = require("nodemailer");

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Update inventory stock after order
async function updateInventoryStock(pizza) {
  try {
    // Update base stock
    const baseInventory = await Inventory.findOne({ category: "base" });
    const baseItem = baseInventory.items.find(
      (item) => item.name === pizza.base,
    );
    if (baseItem) {
      baseItem.stock -= 1;
      await baseInventory.save();
    }

    // Update sauce stock
    const sauceInventory = await Inventory.findOne({ category: "sauce" });
    const sauceItem = sauceInventory.items.find(
      (item) => item.name === pizza.sauce,
    );
    if (sauceItem) {
      sauceItem.stock -= 1;
      await sauceInventory.save();
    }

    // Update cheese stock
    const cheeseInventory = await Inventory.findOne({ category: "cheese" });
    const cheeseItem = cheeseInventory.items.find(
      (item) => item.name === pizza.cheese,
    );
    if (cheeseItem) {
      cheeseItem.stock -= 1;
      await cheeseInventory.save();
    }

    // Update veggies stock
    const veggieInventory = await Inventory.findOne({ category: "veggie" });
    pizza.veggies.forEach((veggie) => {
      const veggieItem = veggieInventory.items.find(
        (item) => item.name === veggie,
      );
      if (veggieItem) veggieItem.stock -= 0.5;
    });
    await veggieInventory.save();

    // Update meat stock
    if (pizza.meat) {
      const meatInventory = await Inventory.findOne({ category: "meat" });
      const meatItem = meatInventory.items.find(
        (item) => item.name === pizza.meat,
      );
      if (meatItem) {
        meatItem.stock -= 1;
        await meatInventory.save();
      }
    }

    // Check for low stock and send email
    const allCategories = ["base", "sauce", "cheese", "veggie", "meat"];
    for (const cat of allCategories) {
      const inv = await Inventory.findOne({ category: cat });
      const lowStockItems = inv.items.filter(
        (item) => item.stock <= item.threshold,
      );

      if (lowStockItems.length > 0) {
        const admin = await User.findOne({ role: "admin" });
        if (admin) {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: admin.email,
            subject: `⚠️ Low Stock Alert - ${cat.toUpperCase()}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e31837; border-radius: 10px;">
                <h2 style="color: #e31837;">⚠️ Low Stock Alert!</h2>
                <p>The following items in <strong>${cat}</strong> category are below threshold:</p>
                <ul>
                  ${lowStockItems.map((item) => `<li><strong>${item.name}</strong> - Only ${item.stock} left (Threshold: ${item.threshold})</li>`).join("")}
                </ul>
                <p>Please restock immediately to avoid order delays.</p>
                <hr>
                <p style="color: #666;">PizzaExpress Inventory System</p>
              </div>
            `,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error updating inventory:", error);
  }
}

// Create order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { pizza, totalAmount, paymentId, orderId } = req.body;

    const order = new Order({
      user: req.user.id,
      pizza,
      totalAmount,
      paymentId,
      orderId,
      status: "received",
    });

    await order.save();

    // Update inventory stocks
    await updateInventoryStock(pizza);

    // Send email to admin about new order
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: admin.email,
        subject: "🆕 New Order Received!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e31837; border-radius: 10px;">
            <h2 style="color: #e31837;">🆕 New Order Received!</h2>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
            <p><strong>Pizza Details:</strong></p>
            <ul>
              <li>Base: ${pizza.base}</li>
              <li>Sauce: ${pizza.sauce}</li>
              <li>Cheese: ${pizza.cheese}</li>
              <li>Veggies: ${pizza.veggies.join(", ")}</li>
              ${pizza.meat ? `<li>Meat: ${pizza.meat}</li>` : ""}
            </ul>
            <p>Please login to admin panel to update order status.</p>
            <hr>
            <p style="color: #666;">PizzaExpress Order System</p>
          </div>
        `,
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user orders
router.get("/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders (admin)
router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update order status (admin) - sends email notification to user
router.put(
  "/:orderId/status",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        { status, updatedAt: Date.now() },
        { new: true },
      ).populate("user", "name email");

      // Send email notification to user about status update
      if (order && order.user) {
        const statusMessages = {
          received: "Your order has been received and will be prepared soon!",
          "in-kitchen": "Your pizza is being prepared in the kitchen!",
          "out-for-delivery": "Your pizza is out for delivery!",
          delivered: "Your pizza has been delivered. Enjoy your meal!",
        };

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: order.user.email,
          subject: `Order Status Update - PizzaExpress`,
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e31837; border-radius: 10px;">
            <h2 style="color: #e31837;">Order Status Updated!</h2>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>New Status:</strong> <span style="background: #e31837; color: white; padding: 5px 10px; border-radius: 5px;">${status.toUpperCase()}</span></p>
            <p>${statusMessages[status] || "Your order status has been updated."}</p>
            <p>Track your order in real-time from your dashboard.</p>
            <hr>
            <p style="color: #666;">PizzaExpress - Fast, Fresh & Delicious!</p>
          </div>
        `,
        });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

module.exports = router;
