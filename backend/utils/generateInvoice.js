import PDFDocument from "pdfkit";
import getStream from "get-stream";

/**
 * Generate invoice as PDF buffer
 * @param {object} order - Order details
 * @returns {Promise<Buffer>} - PDF buffer
 */
export async function generateInvoice(order) {
  const doc = new PDFDocument({ margin: 50 });

  // ✅ Pipe document to a PassThrough stream
  const stream = doc.pipe(new (import("stream").PassThrough)());

  // 🧾 Header
  doc.fontSize(20).text("Invoice", { align: "center" });
  doc.moveDown();

  // 🧑 Customer Details
  doc.fontSize(12).text(`Invoice ID: ${order.orderId}`);
  doc.text(`Payment ID: ${order.paymentId}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  doc.text(`Billed To:`);
  doc.text(`${order.shipping.fullName}`);
  doc.text(`${order.shipping.address}`);
  if (order.shipping.city || order.shipping.state || order.shipping.zip) {
    doc.text(
      `${order.shipping.city}, ${order.shipping.state} - ${order.shipping.zip}`
    );
  }
  doc.text(`Email: ${order.shipping.email}`);
  doc.moveDown();

  // 📦 Items Table
  doc.fontSize(14).text("Items:", { underline: true });
  doc.moveDown(0.5);

  order.items.forEach((item, index) => {
    doc
      .fontSize(12)
      .text(`${index + 1}. ${item.name} (x${item.quantity}) - ₹${item.price}`);
  });
  doc.moveDown();

  // 💰 Totals
  doc.text(`Subtotal: ₹${order.subtotal}`);
  doc.text(`Shipping: ₹${order.shippingCharge}`);
  doc.text(`Total Amount: ₹${order.totalAmount}`, { bold: true });
  doc.moveDown();

  // ✅ Footer
  doc.fontSize(10).text("Thank you for your payment!", { align: "center" });

  // End PDF
  doc.end();

  // ✅ Return buffer
  return await getStream.buffer(stream);
}
