import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/createOrder", userAuth,createOrder);
// router.post("/webhook", verifyPayment);  // razorpay needs raw data inspite of parsed data done already by express.json middelware
// router.post("/webhook", express.raw({ type: "application/json" }), verifyPayment);
// router.post("/webhook", 
//     express.raw({ type: 'application/json' }), 
//     (req, res, next) => {
//       console.log("Webhook received:", {
//         headers: req.headers,
//         body: req.body
//       });
//       next();
//     },
//     verifyPayment
//   );

export default router;