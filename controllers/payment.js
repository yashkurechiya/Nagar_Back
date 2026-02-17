import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import { Tax } from "../models/Tax.js";

export const createOrder = async (req, res) => {
  try {
    var { amount } = req.body;
    
    if (!amount || amount <= 0) {
      amount = 1;
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,  
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });

    return res.status(200).json(order);

  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create Razorpay order"
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
       taxId,
       units,
       amount
    } = req.body;

    console.log(razorpay_order_id, razorpay_payment_id,razorpay_signature, taxId , units, amount, razorpay_payment_id);
    

    // 🔐 Auth safety
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    // 🔐 Verify Razorpay signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");
      

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const receiptNumber = `REC-${Date.now()}`;

    const tax = await Tax.create({ taxId, units, amount, paymentId: razorpay_payment_id, receiptNumber});
 
    return res.status(200).json({
      success: true,
      message: "Payment verified & receipt generated",
      data: tax
    });

  } catch (error) {
    console.error("Verify payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed"
    });
  }
};

