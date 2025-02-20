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
    
    try {
      const parsedBody = JSON.parse(rawBody);
      console.log("6. Parsed Body:", parsedBody);
      const paymentDetails = parsedBody.payload.payment.entity;
      console.log("7. Payment Details:", paymentDetails);
    } catch (parseError) {
      console.log("Parse Error:", parseError);
      throw new Error("Failed to parse webhook payload");
    }
    const payment =await Payment.findOne({orderId : paymentDetails.order_id});
    console.log("8. payment : " , payment);
    if (!payment) throw new Error("Payment record not found.");
    payment.status = paymentDetails.status;
    console.log(paymentDetails);
    console.log(paymentDetails.status);
    await payment.save();

    // make the lecture of the course preview free
    const course = await Course.findById(payment.courseId).populate({path : "lectures", select :"isPreviewFree"});
    if (!course) throw new Error("Course not found.");

    const previewStatus = paymentDetails.status === "captured";
    console.log(previewStatus);
    
    await Lecture.updateMany(   // or we can use the normal map or for each method
      { _id: { $in: course.lectures.map((lecture) => lecture._id) } },
      { $set: { isPreviewFree: previewStatus } }
    );

    await course.save();

    // return  the success status
    return res.status(200).json({
      success : true,
      message : "Order verified successfully...",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
