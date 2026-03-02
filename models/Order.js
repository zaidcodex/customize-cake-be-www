const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    trackingId: {
      type: Number,
      unique: true,
      required: true,
    },

    customer: {
      name: String,
      phone: String,
      address: String,
    },

    items: [
      {
        productName: String,
        quantity: Number,
        price: Number,
        selectedSize: String,
        selectedFlavour: String,
        selectedShape: String,
      },
    ],

    totalAmount: Number,
    advanceAmount: Number,
    remainingAmount: Number,

    paymentMethod: {
      type: String,
      enum: ["COD", "ADVANCE"],
    },

    // ── Advance payment screenshot (Cloudinary URL) ──────────────────────
    paymentScreenshotUrl: {
      type: String,
      default: null,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Baking",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    deliveryDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);