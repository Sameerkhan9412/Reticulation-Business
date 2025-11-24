const express = require("express");
const { generateInvoice } = require("../utils/invoice");
const path = require("path");

const router = express.Router();

router.post("/create-invoice", async (req, res) => {
  try {
    const order = req.body; // frontend se pura data aayega
    const filePath = path.join(__dirname, `../invoices/invoice-${order.orderId}.pdf`);

    await generateInvoice(order, filePath);

    res.json({
      success: true,
      message: "Invoice generated",
      file: `/invoices/invoice-${order.orderId}.pdf`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
