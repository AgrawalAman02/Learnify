import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { createOrder } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/createOrder", userAuth,createOrder);

export default router;