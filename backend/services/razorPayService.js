import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";
import crypto from "crypto";

console.log("Razorpay key loaded:", process.env.RAZORPAY_KEY_ID);

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function createRazorpayOrder(amount) {
  return await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: `LUNEVA-${Date.now()}`
  });
}

export function verifyRazorpayPayment(payment) {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(payment.razorpay_order_id + "|" + payment.razorpay_payment_id)
    .digest("hex");

  return generatedSignature === payment.razorpay_signature;
}