import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import leadRoutes from "./routes/leadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";

dotenv.config();

const app = express();

// DB
connectDB().catch(err => {
  console.error("MongoDB Error:", err.message);
});

// ✅ SINGLE CORS (correct)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("LUNÉVA backend running");
});

// Routes
app.use("/api/leads", leadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tracking", trackingRoutes);

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});