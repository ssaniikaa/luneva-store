import express from "express";
import Order from "../models/Order.js";
import {
  createRazorpayOrder,
  verifyRazorpayPayment
} from "../services/razorPayService.js";
import {
  createShiprocketOrder,
  assignShiprocketAWB
} from "../services/shiprocketService.js";
import { createInvoice } from "../services/invoiceService.js";
import { sendInvoiceEmail } from "../services/emailService.js";

const router = express.Router();

router.all("/create-razorpay-order", async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        success: true,
        message: "Razorpay endpoint working. Use POST request."
      });
    }

    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount"
      });
    }

    const order = await createRazorpayOrder(amount);
    return res.json(order);
  } catch (error) {
    console.error("RAZORPAY ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Razorpay order failed",
      error: error.message
    });
  }
});

router.post("/place-order", async (req, res) => {
  try {
    const {
      customer,
      products = [],
      addons = [],
      total,
      paymentMode,
      razorpayPayment,
      freePRBox,
      coupon,
      discount
    } = req.body;

    if (!customer?.name || !customer?.phone || !customer?.address || !customer?.pincode) {
      return res.status(400).json({
        success: false,
        message: "Missing customer details"
      });
    }

    if (!products.length && !addons.length) {
      return res.status(400).json({
        success: false,
        message: "No products in order"
      });
    }

    if (paymentMode !== "COD") {
      const verified = verifyRazorpayPayment(razorpayPayment);

      if (!verified) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed"
        });
      }
    }

    const orderId = `LUNEVA-${Date.now()}`;

    let savedOrder = await Order.create({
      orderId,
      customer,
      products,
      addons,
      total,
      paymentMode,
      paymentStatus: paymentMode === "COD" ? "COD_PENDING" : "PAID",
      razorpayPayment: razorpayPayment || {},
      freePRBox,
      coupon,
      discount,
      shipmentStatus: "ORDER_CREATED"
    });

    try {
      const shiprocketOrder = await createShiprocketOrder(savedOrder);

      const shipmentId =
        shiprocketOrder?.shipment_id ||
        shiprocketOrder?.order?.shipment_id ||
        shiprocketOrder?.data?.shipment_id;

      savedOrder.shiprocketOrder = shiprocketOrder;
      savedOrder.shipmentId = shipmentId ? String(shipmentId) : "";

      if (shipmentId) {
        const awbData = await assignShiprocketAWB(shipmentId);

        savedOrder.awb =
          awbData?.response?.data?.awb_code ||
          awbData?.awb_code ||
          awbData?.data?.awb_code ||
          "";

        savedOrder.courier =
          awbData?.response?.data?.courier_name ||
          awbData?.courier_name ||
          awbData?.data?.courier_name ||
          "";

        savedOrder.shipmentStatus = savedOrder.awb
          ? "AWB_ASSIGNED"
          : "SHIPROCKET_ORDER_CREATED";
      }

      await savedOrder.save();
    } catch (shippingError) {
      savedOrder.shipmentStatus = "SHIPROCKET_FAILED";
      savedOrder.shiprocketOrder = {
        error: shippingError.response?.data || shippingError.message
      };

      await savedOrder.save();
    }

    const invoicePath = createInvoice(savedOrder);
    savedOrder.invoicePath = invoicePath;
    await savedOrder.save();

    await sendInvoiceEmail(savedOrder, invoicePath);

    return res.json({
      success: true,
      message: "Order placed successfully",
      orderId: savedOrder.orderId,
      paymentStatus: savedOrder.paymentStatus,
      shipmentStatus: savedOrder.shipmentStatus,
      shipmentId: savedOrder.shipmentId,
      awb: savedOrder.awb,
      courier: savedOrder.courier,
      total: savedOrder.total
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Order failed",
      error: error.response?.data || error.message
    });
  }
});

export default router;git add.
git commit - m "fix razorpay order route"
git push