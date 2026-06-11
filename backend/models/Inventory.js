const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["base", "sauce", "cheese", "veggie", "meat"],
    required: true,
  },
  items: [
    {
      name: String,
      stock: Number,
      threshold: Number,
      price: Number,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);
