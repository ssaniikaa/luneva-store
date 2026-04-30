import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";
import crypto from "crypto";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Missing Razorpay keys in environment variables");
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function createRazorpayOrder(amount) {
  return await razorpay.orders.create({
    amount: Math.round(Number(amount) * 100),
    currency: "INR",
    receipt: `LUNEVA-${Date.now()}`
  });
}

export function verifyRazorpayPayment(payment) {
  if (!payment?.razorpay_order_id || !payment?.razorpay_payment_id || !payment?.razorpay_signature) {
    return false;
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(payment.razorpay_order_id + "|" + payment.razorpay_payment_id)
    .digest("hex");

  return generatedSignature === payment.razorpay_signature;
}