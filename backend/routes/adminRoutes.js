import express from "express";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";
import Lead from "../models/Lead.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.json({
      success: true,
      token
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid email or password"
  });
});

router.get("/stats", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const leads = await Lead.find().sort({ createdAt: -1 });

    const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const paidOrders = orders.filter((order) => order.paymentStatus === "PAID");
    const codOrders = orders.filter((order) => order.paymentMode === "COD");
    const shippedOrders = orders.filter((order) => order.awb);

    res.json({
      success: true,
      totalSales,
      totalOrders: orders.length,
      paidOrders: paidOrders.length,
      codOrders: codOrders.length,
      shippedOrders: shippedOrders.length,
      totalLeads: leads.length,
      orders,
      leads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin stats failed",
      error: error.message
    });
  }
});

router.patch("/orders/:id/status", async (req, res) => {
  try {
    const { shipmentStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { shipmentStatus },
      { new: true }
    );

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Status update failed",
      error: error.message
    });
  }
});

router.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order delete failed",
      error: error.message
    });
  }
});

router.delete("/leads/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Lead deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lead delete failed",
      error: error.message
    });
  }
});

export default router;