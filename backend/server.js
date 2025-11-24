// ✅ server.js - Reticulation Backend (FINAL UPDATED)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Razorpay from "razorpay";
import crypto from "crypto";
import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import axios from "axios";

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 5000;

// ==================== MIDDLEWARES ====================
app.use(bodyParser.json());
console.log("frontend url",process.env.FRONTEND_URL)
app.use(cors({
  // origin: process.env.FRONTEND_URL || "https://reticulationbusiness.com",
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// ==================== DATABASE ====================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'customer',
      reset_token TEXT,
      reset_token_expires TIMESTAMP,
      createdAt TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id SERIAL PRIMARY KEY,
      businessName TEXT,
      contactPerson TEXT,
      email TEXT,
      mobile TEXT,
      categories TEXT,
      address TEXT,
      gst TEXT,
      logo TEXT,
      amount NUMERIC,
      paymentId TEXT,
      orderId TEXT,
      registeredAt TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS jobseekers (
      id SERIAL PRIMARY KEY,
      fullName TEXT,
      email TEXT,
      mobile TEXT,
      gender TEXT,
      dob TEXT,
      resume TEXT,
      amount NUMERIC,
      paymentId TEXT,
      orderId TEXT,
      registeredAt TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      userName TEXT,
      email TEXT,
      address TEXT,
      items JSONB,
      subtotal NUMERIC,
      shippingCharge NUMERIC,
      totalAmount NUMERIC,
      paymentId TEXT,
      orderId TEXT,
      createdAt TIMESTAMP DEFAULT NOW()
    )
  `);

  console.log("✅ PostgreSQL tables initialized");
}
initDB().catch(err => console.error("❌ DB init error:", err));

// ==================== MAILER ====================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// ==================== RAZORPAY ====================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==================== UTILS ====================
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "7d" }
  );
}

// ==================== UTILS ====================
async function generateSwipeInvoice(order) {
  try {
    const data = {
      document_type: "invoice",
      document_date: new Date().toLocaleDateString("en-GB"),
      due_date: new Date().toLocaleDateString("en-GB"),
      party: {
        id: order.shipping.email,
        type: "customer",
        name: order.shipping.fullName,
        email: order.shipping.email,
        phone: order.shipping.mobile, // ✅ Added mobile number
        address: order.shipping.address || "N/A",
      },
      items: order.items.map(item => ({
        id: item.id || item.name.replace(/\s/g, "_"),
        name: item.name,
        quantity: item.quantity || 1,
        unit_price: item.price,
        tax_rate: item.tax || 0,
        price_with_tax: item.price * 1.18,
        net_amount: item.price,
        total_amount: (item.price * (item.quantity || 1)) * 1.18,
        item_type: "Product",
      })),
      total_amount: order.totalAmount,
      notes: {
        mobile: order.shipping.mobile, // ✅ Optional extra field
      },
    };

    const response = await axios.post(
      "https://app.getswipe.in/api/partner/v2/doc",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.SWIPE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.error("❌ Swipe invoice error:", err.response?.data || err.message);
    throw new Error("Invoice generation failed");
  }
}


// ==================== PAYMENT & INVOICE ====================

// Create Razorpay Order
app.post("/payment/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount required" });

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    res.json({ ...order, totalAmount: amount });
  } catch (err) {
    console.error("❌ Create order error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Verify Payment & Generate Invoice
app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userData } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign)
      return res.status(400).json({ success: false, message: "Invalid signature" });

    let orderId;

    // ✅ SUPPLIER REGISTRATION
    if (userData.type === "supplier") {
      const result = await pool.query(
        `INSERT INTO suppliers (businessName, contactPerson, email, mobile, categories, address, gst, logo, amount, paymentId, orderId)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
        [
          userData.businessName,
          userData.contactPerson,
          userData.email,
          userData.mobile,
          userData.categories,
          userData.address,
          userData.gst,
          userData.logo || null,
          userData.amount,
          razorpay_payment_id,
          razorpay_order_id
        ]
      );
      orderId = result.rows[0].id;

  // ✅ Add this block — auto create user for login
  const defaultPassword = await bcrypt.hash(userData.mobile || "123456", 10);
  await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (email) DO NOTHING`,
    [userData.contactPerson, userData.email, defaultPassword, "supplier"]
  );
    }

    // ✅ JOBSEEKER REGISTRATION
    else if (userData.type === "jobseeker") {
      const result = await pool.query(
        `INSERT INTO jobseekers (fullName,email,mobile,gender,dob,resume,amount,paymentId,orderId)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
        [
          userData.fullName,
          userData.email,
          userData.mobile,
          userData.gender,
          userData.dob,
          userData.resume,
          userData.amount,
          razorpay_payment_id,
          razorpay_order_id
        ]
      );
      orderId = result.rows[0].id;

      // ✅ Add this block too
  const defaultPassword = await bcrypt.hash(userData.mobile || "123456", 10);
  await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (email) DO NOTHING`,
    [userData.fullName, userData.email, defaultPassword, "jobseeker"]
  );
    }

     // ✅ CUSTOMER CHECKOUT
    if (userData.type === "customer") {
      const result = await pool.query(
        `INSERT INTO orders (userName,email,mobile,address,items,subtotal,shippingCharge,totalAmount,paymentId,orderId)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
        [
          userData.fullName,
          userData.email,
          userData.mobile, // ✅ Save mobile in DB
          userData.address,
          JSON.stringify(userData.items),
          userData.subtotal,
          userData.shippingCharge || 0,
          userData.totalAmount,
          razorpay_payment_id,
          razorpay_order_id,
        ]
      );
      orderId = result.rows[0].id;
    }

     // Generate Swipe invoice
    const order = {
      orderId,
      paymentId: razorpay_payment_id,
      shipping: {
        fullName: userData.fullName,
        email: userData.email,
        mobile: userData.mobile, // ✅ Include mobile for invoice
        address: userData.address || "N/A",
      },
      items: userData.items || [
        {
          name: "Product Purchase",
          quantity: 1,
          price: userData.totalAmount,
        },
      ],
      totalAmount: userData.totalAmount,
    };

    const invoice = await generateSwipeInvoice(order);

// Send invoice email
    await transporter.sendMail({
      from: `"Reticulation Business" <${process.env.MAIL_USER}>`,
      to: order.shipping.email,
      subject: "Your Payment Invoice",
      html: `<p>Dear ${order.shipping.fullName},</p>
             <p>Thank you for your payment. Your invoice is generated successfully.</p>
             <p><strong>Mobile:</strong> ${order.shipping.mobile}</p>
             <p><strong>Invoice No:</strong> ${invoice.serial_number}</p>
             <p><a href="https://app.getswipe.in/api/partner/v2/doc/${invoice.hash_id}/pdf" target="_blank">Download PDF</a></p>`
    });

    res.json({ success: true, message: "Payment verified & invoice generated", invoice });
  } catch (err) {
    console.error("❌ Verify payment error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== HEALTH CHECK ====================
app.get("/", (req, res) => {
  res.send("🚀 Reticulation Backend running — PostgreSQL + Razorpay + Invoices working for all payments!");
});

// ==================== START SERVER ====================
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
