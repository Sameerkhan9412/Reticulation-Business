// ========================= AUTH ROUTES =========================

import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { transporter } from "./utils/mail.js";   // ✅ Gmail transporter (App Password वाला)

// 👉 Register User
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check existing
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role",
      [name, email, hashed, role || "customer"]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 👉 Login User
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 👉 Forgot Password (send reset link)
app.post("/auth/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No account with this email" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hr

    await pool.query(
      "UPDATE users SET reset_token=$1, reset_token_expires=$2 WHERE email=$3",
      [token, expires, email]
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: `"Reticulation" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>This link will expire in 1 hour.</p>`,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 👉 Reset Password (verify token + update password)
app.post("/auth/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE reset_token=$1 AND reset_token_expires > NOW()",
      [token]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE users SET password=$1, reset_token=NULL, reset_token_expires=NULL WHERE reset_token=$2",
      [hashed, token]
    );

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("❌ Reset password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
