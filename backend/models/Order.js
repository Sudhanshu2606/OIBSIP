const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pizza: {
    base: String,
    sauce: String,
    cheese: String,
    veggies: [String],
    meat: String,
  },
  totalAmount: Number,
  paymentId: String,
  orderId: String,
  status: {
    type: String,
    enum: [
      "pending",
      "received",
      "in-kitchen",
      "out-for-delivery",
      "delivered",
    ],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
