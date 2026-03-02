const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  trackingId: {
    type: Number,
    required: true,
    unique: true
  },

  customer: {
    name: String,
    phone: String,
    address: String
  },

  items: [
    {
      productId: String,
      productName: String,
      quantity: Number,
      price: Number,
      selectedSize: String,
      selectedFlavour: String,
      selectedShape: String
    }
  ],

  totalAmount: Number,
  advanceAmount: Number,
  remainingAmount: Number,

  paymentMethod: {
    type: String,
    enum: ["COD", "ADVANCE"]
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Partial", "Paid"],
    default: "Pending"
  },

  orderStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Baking", "Out For Delivery", "Delivered"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);