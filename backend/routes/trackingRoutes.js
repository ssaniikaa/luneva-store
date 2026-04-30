import express from "express";
import { trackByAWB } from "../services/shiprocketService.js";

const router = express.Router();

router.get("/:awb", async (req, res) => {
  try {
    const tracking = await trackByAWB(req.params.awb);

    res.json({
      success: true,
      tracking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Tracking failed",
      error: error.response?.data || error.message
    });
  }
});

export default router;