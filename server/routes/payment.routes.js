import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/createOrder", userAuth,createOrder);
router.post("/webhook", verifyPayment);

export default router;