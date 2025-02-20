import express from "express";
import instance from "../utils/razorpay.js";
import { Course } from "../models/course.js";
import { Payment } from "../models/payment.js";
import { validateWebhookSignature } from "../utils/validateWebhookSignature.js";
import { Lecture } from "../models/lecture.js";

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req?.body;
    if (!courseId) throw new Error("CourseId is not available..");
    const loggedInUser = req?.user;
    const userId = loggedInUser?._id;
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Course is not available...");
    const price = course?.price;
    const options = {
      amount: price * 100,
      currency: "INR",
      receipt: `${courseId}_${Date.now()}`,
      notes: {
        courseId,
        userId,
      },
    };

    const order = await instance.orders.create(options);
    if (!order) throw new Error("Order hadn't been created!");

    const { amount, id, notes, receipt, status } = order;
    // save the order in the database
    const payment = new Payment({
      amount: amount / 100,
      courseId: notes?.courseId,
      userId: notes?.userId,
      receipt,
      status,
      orderId: id,
    });
    const savedPayment = await payment.save();
    // return back my response to the frontend
    res.json({
      success: true,
      message: "Order Created Succcessfully",
      ...savedPayment.toJSON(),
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    console.log("1. Starting payment verification...");
    const webhookSignature = req.headers["x-razorpay-signature"];
    console.log("2. Webhook Signature:", webhookSignature);

    const rawBody = req.body.toString();
    console.log("3. Raw Body:", rawBody);

    const isWebhookValid = validateWebhookSignature(
      rawBody,
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    
    console.log("4. Is Webhook Valid:", isWebhookValid);
    if(!isWebhookValid) {
      console.log("5. Invalid webhook signature");
      return res.status(400).json({
        message : "Webhook signature is invalid",
      });
    }
    
    let paymentDetails;
    try {
      const parsedBody = JSON.parse(rawBody);
      console.log("6. Parsed Body:", parsedBody);
      paymentDetails = parsedBody.payload.payment.entity;
      console.log("7. Payment Details:", paymentDetails);
    } catch (parseError) {
      console.error("Parse Error:", parseError);
      return res.status(400).json({
        message: "Failed to parse webhook payload"
      });
    }

    try {
      console.log("8. Looking up payment with orderId:", paymentDetails.order_id);
      const payment = await Payment.findOne({orderId: paymentDetails.order_id});
      console.log("9. Payment found:", payment);

      if (!payment) {
        throw new Error(`Payment not found for orderId: ${paymentDetails.order_id}`);
      }

      payment.status = paymentDetails.status;
      const updatedPayment = await payment.save();
      console.log("10. Payment updated:", updatedPayment);

      const course = await Course.findById(payment.courseId).populate({
        path: "lectures",
        select: "isPreviewFree"
      });
      console.log("11. Course found:", course?._id);

      if (!course) {
        throw new Error(`Course not found for ID: ${payment.courseId}`);
      }

      const previewStatus = paymentDetails.status === "captured";
      console.log("12. Setting preview status to:", previewStatus);

      const updateResult = await Lecture.updateMany(
        { _id: { $in: course.lectures.map(lecture => lecture._id) } },
        { $set: { isPreviewFree: previewStatus } }
      );
      console.log("13. Lectures updated:", updateResult);

      return res.status(200).json({
        success: true,
        message: "Payment verified and updated successfully"
      });
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return res.status(500).json({
        message: dbError.message
      });
    }

  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({
      message: error.message
    });
  }
};