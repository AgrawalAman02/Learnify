import express from "express";
import instance from "../utils/razorpay.js";
import { Course } from "../models/course.js";
import { Payment } from "../models/payment.js";
import { validateWebhookSignature } from "../utils/validateWebhookSignature.js";
import { Lecture } from "../models/lecture.js";
import { User } from "../models/user.js";

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
        status: "created"
      },
    };

    const existingOrder =await Payment.findOne({courseId, userId})
    if (existingOrder) {
      // e.g., check age or other signals; if invalid, delete it:
      const orderAge = Date.now() - existingOrder.createdAt.getTime();
      const fifteenMinutes = 15 * 60 * 1000;
      if (orderAge < fifteenMinutes) {
        // Reuse the existing order
        return res.status(200).json({
          success: true,
          message: "Using existing order",
          orderId: existingOrder.orderId,
          amount: existingOrder.amount,
          key_id: process.env.RAZORPAY_KEY_ID,
          // ...
        });
      } else {
        // Delete stale “created” order
        await Payment.deleteOne({ _id: existingOrder._id });
      }
    }
    const order = await instance.orders.create(options);
    if (!order) throw new Error("Order hadn't been created!");

    const { amount, id, notes, receipt, status } = order;
    const payment = new Payment({
      amount: amount / 100,
      courseId: notes?.courseId,
      userId: notes?.userId,
      receipt,
      status,
      orderId: id,
    });
    const savedPayment = await payment.save();
    
    res.status(200).json({
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
    const webhookSignature = req.headers["x-razorpay-signature"];
    const rawBody = req.body.toString();
    const isWebhookValid = validateWebhookSignature(
      rawBody,
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    
    if(!isWebhookValid) {
      return res.status(400).json({
        message : "Webhook signature is invalid",
      });
    }
    
    let paymentDetails;
    try {
      const parsedBody = JSON.parse(rawBody);
      paymentDetails = parsedBody.payload.payment.entity;
    } catch (parseError) {
      return res.status(400).json({
        message: "Failed to parse webhook payload"
      });
    }

    try {
      const payment = await Payment.findOne({orderId: paymentDetails.order_id});
      if (!payment) {
        throw new Error(`Payment not found for orderId: ${paymentDetails.order_id}`);
      }

      payment.status = paymentDetails.status;
      const updatedPayment = await payment.save();

      const course = await Course.findById(payment.courseId).populate({
        path: "lectures",
        select: "isPreviewFree enrolledStudents"
      });

      if (!course) {
        throw new Error(`Course not found`);
      }

      const user = await User.findById(payment.userId).select("enrolledAt");
      if(!user) throw new Error("User is not logged in...");
      if (!user.enrolledAt.includes(course._id)) {
        user.enrolledAt.push(course._id);
      }
      if (!course.enrolledStudents.includes(user._id)) {
        course.enrolledStudents.push(user._id);
      }

      await user.save();
      await course.save();
      
      // const previewStatus = paymentDetails.status === "captured";
      // if(payment.courseId && payment.courseId.lectures.length >0) {
      //   await Lecture.updateMany(
      //     { _id: { $in: course.lectures.map(lecture => lecture._id) } },
      //     { $set: { isPreviewFree: previewStatus } }
      //   );
      // }

      return res.status(200).json({
        success: true,
        message: "Payment verified and updated successfully"
      });
    } catch (dbError) {
      return res.status(500).json({
        message: dbError.message
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export const getCoursePaymentStatus = async (req,res)=>{
  try {
    const loggedInUser  = req.user;
    if(!loggedInUser) throw new Error("User is not logged in...");
    const {courseId} = req.body;
    if(!courseId) return res.status(404).json({ message : "course is not present"});
  
    const payment = await Payment.findOne({courseId, userId : loggedInUser._id});
    if(!payment) return res.status(404).json({message : "No transaction found..."});
  
    const status = payment.status;
    if(!status ) throw new Error("Cant get status");
  
    const course =await Course.findById(courseId).populate([{
      path: "lectures",
      select: "isPreviewFree enrolledStudents"
    },{
      path : "creator",
      select : "name email photoUrl"
    }]);
  
    if(!course ) return res.status(404).json({message : "Course not found"});
    
    return res.status(200).json({
      success : true,
      status,
      course,
      message : "Course status fetched successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}