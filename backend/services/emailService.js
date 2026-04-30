import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export async function sendInvoiceEmail(order, invoicePath) {
  if (!order.customer.email) return;

  await transporter.sendMail({
    from: `"LUNÉVA" <${process.env.MAIL_USER}>`,
    to: order.customer.email,
    cc: process.env.ADMIN_EMAIL,
    subject: `Your LUNÉVA Order Invoice - ${order.orderId}`,
    html: `
      <div style="font-family:Arial;background:#fff7ed;padding:24px;color:#3a2418">
        <h2>Thank you for your LUNÉVA order ✨</h2>
        <p>Hi ${order.customer.name},</p>
        <p>Your order has been received successfully.</p>
        <p><b>Order ID:</b> ${order.orderId}</p>
        <p><b>Total:</b> ₹${order.total}</p>
        <p><b>Payment:</b> ${order.paymentStatus}</p>
        ${order.awb
        ? `<p><b>Tracking ID:</b> ${order.awb}</p>`
        : `<p>Your shipping details will be updated shortly.</p>`
      }
        ${order.freePRBox ? `<p>🎁 You unlocked the Signature Premium PR Box.</p>` : ""}
        <p>Love,<br/>Team LUNÉVA</p>
      </div>
    `,
    attachments: [
      {
        filename: `LUNEVA-Invoice-${order.orderId}.pdf`,
        path: invoicePath
      }
    ]
  });
}

export async function sendLeadEmail(lead) {
  if (!lead.email) return;

  await transporter.sendMail({
    from: `"LUNÉVA" <${process.env.MAIL_USER}>`,
    to: lead.email,
    subject: "Your LUNÉVA ₹200 OFF Code ✨",
    html: `
      <div style="font-family:Arial;background:#fff7ed;padding:24px;color:#3a2418">
        <h2>Your Glow Offer is Ready ✨</h2>
        <p>Hi ${lead.name || "there"},</p>
        <p>Use your launch coupon:</p>
        <h1 style="background:#3a2418;color:#ffe5bd;padding:14px;border-radius:12px;text-align:center">
          ${lead.coupon || "LUNEVA200"}
        </h1>
        <p>Recommended kit: <b>Glow Boost Ritual ₹1,999</b></p>
      </div>
    `
  });
}