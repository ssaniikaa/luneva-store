import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    skinConcern: String,
    coupon: String,
    source: String
  },
  { timestamps: true }
);

export default mongoose.model("Lead", LeadSchema);