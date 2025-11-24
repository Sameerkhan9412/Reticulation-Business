import nodemailer from "nodemailer";

/**
 * Send invoice email with PDF buffer
 * @param {string} to - Receiver email
 * @param {Buffer} pdfBuffer - PDF content as buffer
 * @param {object} order - Order details (for subject & body)
 */
export async function sendInvoiceMail(to, pdfBuffer, order) {
  try {
    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: process.env.MAIL_PORT || 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // ⚠️ Gmail App Password required
      },
    });

    // ✅ Email options
    const mailOptions = {
      from: `"Reticulation Business" <${process.env.MAIL_USER}>`,
      to,
      subject: `Invoice for Order #${order.orderId}`,
      text: `Hello ${order.shipping.fullName},

Thank you for your payment. Please find attached the invoice for your order.

Order ID: ${order.orderId}
Payment ID: ${order.paymentId}
Amount Paid: ₹${order.totalAmount}

Regards,
Reticulation Business Pvt. Ltd.
      `,
      attachments: [
        {
          filename: `invoice-${order.orderId}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // ✅ Send email
    const info = await transporter.sendMail(mailOptions);

    console.log(`📧 Invoice sent to ${to} | Message ID: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    return false;
  }
}
