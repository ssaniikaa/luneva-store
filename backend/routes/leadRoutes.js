import express from "express";
import Lead from "../models/Lead.js";
import { sendLeadEmail } from "../services/emailService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      coupon: req.body.coupon || "LUNEVA200"
    });

    await sendLeadEmail(lead);

    res.json({
      success: true,
      lead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lead save failed",
      error: error.message
    });
  }
});

export default router;