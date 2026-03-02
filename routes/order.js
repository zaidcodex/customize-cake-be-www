const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/create", async (req, res) => {
  try {

    const {
      trackingId,
      items,
      totalAmount,
      paymentMethod
    } = req.body;

    const advanceAmount =
      paymentMethod === "ADVANCE"
        ? Math.round(totalAmount * 0.3)
        : 0;

    const remainingAmount =
      paymentMethod === "ADVANCE"
        ? totalAmount - advanceAmount
        : totalAmount;

    const newOrder = await Order.create({
      trackingId,
      items,
      totalAmount,
      advanceAmount,
      remainingAmount,
      paymentMethod,
      paymentStatus:
        paymentMethod === "ADVANCE" ? "Partial" : "Pending"
    });

    res.json({ success: true, order: newOrder });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;