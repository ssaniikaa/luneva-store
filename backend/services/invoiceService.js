import PDFDocument from "pdfkit";
import fs from "fs";

export function createInvoice(order) {
  const invoicePath = `./invoice-${order.orderId}.pdf`;
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(invoicePath));

  doc.fontSize(26).text("LUNÉVA", { align: "center" });
  doc.fontSize(12).text("Radiance Rituals", { align: "center" });
  doc.moveDown();

  doc.fontSize(18).text("Order Invoice");
  doc.moveDown();

  doc.fontSize(11).text(`Order ID: ${order.orderId}`);
  doc.text(`Customer: ${order.customer.name}`);
  doc.text(`Phone: ${order.customer.phone}`);
  doc.text(`Email: ${order.customer.email || "N/A"}`);
  doc.text(
    `Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`
  );

  doc.moveDown();
  doc.fontSize(15).text("Products");

  order.products.forEach((item) => {
    doc.fontSize(11).text(`${item.name} - ₹${item.price}`);
  });

  if (order.addons?.length) {
    doc.moveDown();
    doc.fontSize(15).text("Add-ons");

    order.addons.forEach((item) => {
      doc.fontSize(11).text(`${item.name} - ₹${item.price}`);
    });
  }

  doc.moveDown();

  if (order.discount) {
    doc.text(`Discount: -₹${order.discount}`);
  }

  doc.text(`Total: ₹${order.total}`);
  doc.text(`Payment Mode: ${order.paymentMode}`);
  doc.text(`Payment Status: ${order.paymentStatus}`);

  if (order.awb) {
    doc.text(`Tracking ID: ${order.awb}`);
  }

  if (order.freePRBox) {
    doc.moveDown();
    doc.text("Free Gift: Signature Premium PR Box");
  }

  doc.moveDown();
  doc.fontSize(10).text("Thank you for choosing LUNÉVA.");

  doc.end();

  return invoicePath;
}