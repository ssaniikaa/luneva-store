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

// SAFE DB CONNECTION (won't crash server)
connectDB().catch(err => {
  console.error("MongoDB Error:", err.message);
});

app.use(cors({
  origin: ["https://luneva.co.in"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LUNÉVA backend running");
});

app.use("/api/leads", leadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tracking", trackingRoutes);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});