import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: String,
    customer: Object,
    products: Array,
    addons: Array,
    total: Number,
    discount: Number,
    coupon: String,
    freePRBox: Boolean,

    paymentMode: String,
    paymentStatus: String,
    razorpayPayment: Object,

    shiprocketOrder: Object,
    shipmentId: String,
    awb: String,
    courier: String,
    shipmentStatus: String,

    invoicePath: String
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);