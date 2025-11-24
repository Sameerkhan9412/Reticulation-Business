import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",   // Gmail का SMTP
  port: process.env.MAIL_PORT || 465,                // Gmail SSL port
  secure: true,                                      // SSL use करो
  auth: {
    user: process.env.MAIL_USER, // तुम्हारा Gmail ID
    pass: process.env.MAIL_PASS, // Gmail App Password (normal password नहीं)
  },
});
