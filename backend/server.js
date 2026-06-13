const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection - YEH ADD KARO
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "PizzaExpress API is running!" });
});

// Health check for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Import routes
try {
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/inventory", require("./routes/inventory"));
  app.use("/api/orders", require("./routes/orders"));
  app.use("/api/payment", require("./routes/payment"));
} catch (error) {
  console.log("Route error:", error.message);
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
