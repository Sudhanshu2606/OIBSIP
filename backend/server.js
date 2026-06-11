const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/pizza-delivery")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// Routes - MAKE SURE THESE EXIST
app.use("/api/auth", require("./routes/auth"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/payment", require("./routes/payment"));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
