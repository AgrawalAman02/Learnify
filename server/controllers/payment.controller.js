import express from "express";
import instance from "../utils/razorpay.js";
import { Course } from "../models/course.js";
import { Payment } from "../models/payment.js";

export const createOrder = async (req, res) => {
  try {

    const {courseId} = req?.body;
    if(!courseId) throw new Error("CourseId is not available..");
    const loggedInUser = req?.user;
    const userId = loggedInUser?._id;
    const course = await Course.findById(courseId);
    if(!course) throw new Error("Course is not available...");
    const price = course?.price;
    const options = {
      amount: price*100, 
      currency: "INR",
      receipt: `${courseId}_${Date.now()}`,
      notes: {
        courseId ,
        userId,
      }
    };
    
    const order = await instance.orders.create(options);
    if(!order) throw new Error("Order hadn't been created!");
    
    const {amount, id, notes, receipt,status} = order;
    // save the order in the database 
    const payment = new Payment({
      amount: amount/100,
      courseId : notes?.courseId,
      userId : notes?.userId,
      receipt,
      status,
      orderId : id,
    });
    const savedPayment = await payment.save();
    // return back my response to the frontend
    res.json({ 
      success : true,
      message : "Order Created Succcessfully",
      ...savedPayment.toJSON(),
      key_id: process.env.RAZORPAY_KEY_ID,
     });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
}
