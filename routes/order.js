const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ── Helper: auto-increment trackingId ───────────────────────────────────────
const generateTrackingId = async () => {
  const last = await Order.findOne().sort({ trackingId: -1 }).select("trackingId");
  return last ? last.trackingId + 1 : 1000;
};

// ── POST /api/orders/create ──────────────────────────────────────────────────
router.post("/create", async (req, res) => {
  try {
    const {
      customer,
      items,
      totalAmount,
      advanceAmount,
      remainingAmount,
      paymentMethod,
      paymentScreenshotUrl,
      paymentStatus,
      orderStatus,
      deliveryDate,
    } = req.body;

    // Validate screenshot for ADVANCE orders
    if (paymentMethod === "ADVANCE" && !paymentScreenshotUrl) {
      return res.status(400).json({
        success: false,
        message: "Payment screenshot is required for advance payment orders.",
      });
    }

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
      orderStatus,
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