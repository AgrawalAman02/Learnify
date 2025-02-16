import express from "express";
import instance from "../utils/razorpay.js";
import { Course } from "../models/course.js";
import { Transactions } from "../models/transactions.js";

export const createOrder = async (req, res) => {
  try {

    const {courseId} = req?.body ;
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
    const transaction = new Transactions({
      amount: amount/100,
      courseId : notes?.courseId,
      userId : notes?.userId,
      receipt,
      status,
      orderId : id,
    });
    const savedTransaction = await transaction.save();
    // return back my response to the frontend
    res.json({ 
      success : true,
      message : "Order Created Succcessfully",
      savedTransaction,
     });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
}
