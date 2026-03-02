const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ── Helper: generate unique tracking ID ─────────────────────────────────────
const generateTrackingId = async () => {
  const last = await Order.findOne().sort({ trackingId: -1 }).select("trackingId");
  return last ? last.trackingId + 1 : 1000; // starts from 1000
};

// ── POST /api/orders/create ──────────────────────────────────────────────────
router.post("/create", async (req, res) => {
  try {
    const {
      customer,
      items,
      totalAmount,
      paymentMethod,
      paymentScreenshotUrl,  // ← Cloudinary URL sent from frontend
      deliveryDate,
    } = req.body;

    // Validate: ADVANCE orders must have a screenshot
    if (paymentMethod === "ADVANCE" && !paymentScreenshotUrl) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required for advance payment orders.",
      });
    }

    // Calculate advance & remaining amounts
    const advanceAmount =
      paymentMethod === "ADVANCE" ? Math.round(totalAmount * 0.3) : 0;
    const remainingAmount =
      paymentMethod === "ADVANCE" ? totalAmount - advanceAmount : totalAmount;

    // Auto payment status
    const paymentStatus =
      paymentMethod === "ADVANCE" ? "Partial" : "Pending";

    const trackingId = await generateTrackingId();

    const order = await Order.create({
      trackingId,
      customer,
      items,
      totalAmount,
      advanceAmount,
      remainingAmount,
      paymentMethod,
      paymentScreenshotUrl: paymentScreenshotUrl || null,
      paymentStatus,
      deliveryDate,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// ── GET /api/orders ──────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// ── GET /api/orders/:trackingId ──────────────────────────────────────────────
router.get("/:trackingId", async (req, res) => {
  try {
    const order = await Order.findOne({ trackingId: req.params.trackingId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }
    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;