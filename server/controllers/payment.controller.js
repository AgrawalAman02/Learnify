import express from "express";
import instance from "../utils/razorpay.js";
import { Course } from "../models/course.js";
import { Payment } from "../models/payment.js";
import { validateWebhookSignature } from "../utils/validateWebhookSignature.js";
import { Lecture } from "../models/lecture.js";
import { User } from "../models/user.js";

export const createOrder = async (req, res) => {
  try {
    console.log('📝 Create Order Request:', { body: req.body });
    
    const { courseId } = req?.body;
    if (!courseId) throw new Error("CourseId is not available..");
    const loggedInUser = req?.user;
    const userId = loggedInUser?._id;

    console.log('👤 User Details:', { userId, email: loggedInUser?.email });

    const course = await Course.findById(courseId);
    if (!course) throw new Error("Course is not available...");
    console.log('📚 Course Found:', { courseId: course._id, price: course.price });

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

    console.log('💳 Creating Razorpay Order:', options);

    const order = await instance.orders.create(options);
    if (!order) throw new Error("Order hadn't been created!");
    console.log('✅ Razorpay Order Created:', order);

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
    console.log('💾 Payment Document Created:', savedPayment);
    
    res.status(200).json({
      success: true,
      message: "Order Created Successfully",
      ...savedPayment.toJSON(),
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('❌ Create Order Error:', error);
    return res.status(400).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    console.log('⭐ Webhook Request Received:', {
      headers: req.headers,
      signature: req.headers["x-razorpay-signature"]
    });

    const webhookSignature = req.headers["x-razorpay-signature"];
    const rawBody = req.body.toString();
    console.log('📦 Raw Body:', rawBody);

    const isWebhookValid = validateWebhookSignature(
      rawBody,
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    console.log('🔐 Webhook Signature Valid:', isWebhookValid);
    
    if(!isWebhookValid) {
      console.error('❌ Invalid Webhook Signature');
      return res.status(400).json({
        message: "Webhook signature is invalid",
      });
    }
    
    let paymentDetails;
    try {
      const parsedBody = JSON.parse(rawBody);
      console.log('📄 Parsed Webhook Body:', parsedBody);
      
      paymentDetails = parsedBody.payload.payment.entity;
      console.log('💰 Payment Details:', paymentDetails);

      const payment = await Payment.findOne({orderId: paymentDetails.order_id});
      console.log('🔍 Found Payment:', payment);

      if (!payment) {
        throw new Error(`Payment not found for orderId: ${paymentDetails.order_id}`);
      }

      payment.status = paymentDetails.status;
      const updatedPayment = await payment.save();
      console.log('✅ Updated Payment Status:', {
        oldStatus: payment.status,
        newStatus: updatedPayment.status
      });

      const course = await Course.findById(payment.courseId).populate({
        path: "lectures",
        select: "isPreviewFree enrolledStudents"
      });
      console.log('📚 Found Course:', {
        courseId: course?._id,
        lecturesCount: course?.lectures?.length
      });

      if (!course) {
        throw new Error(`Course not found`);
      }

      const user = await User.findById(payment.userId).select("enrolledAt");
      console.log('👤 Found User:', {
        userId: user?._id,
        enrolledCoursesCount: user?.enrolledAt?.length
      });

      if(!user) throw new Error("User is not logged in...");

      if (!user.enrolledAt.includes(course._id)) {
        user.enrolledAt.push(course._id);
        console.log('➕ Added course to user enrollments');
      }
      if (!course.enrolledStudents.includes(user._id)) {
        course.enrolledStudents.push(user._id);
        console.log('➕ Added user to course students');
      }

      await user.save();
      await course.save();
      console.log('💾 Saved enrollment updates');

      return res.status(200).json({
        success: true,
        message: "Payment verified and updated successfully"
      });
    } catch (dbError) {
      console.error('❌ Database Error:', dbError);
      return res.status(500).json({
        message: dbError.message
      });
    }
  } catch (error) {
    console.error('❌ Webhook Error:', error);
    return res.status(500).json({
      message: error.message
    });
  }
};

export const getCoursePaymentStatus = async (req,res)=>{
  try {
    console.log('🔍 Getting Course Payment Status:', { body: req.body });
    
    const loggedInUser = req.user;
    if(!loggedInUser) throw new Error("User is not logged in...");
    
    const {courseId} = req.body;
    if(!courseId) return res.status(404).json({ message: "course is not present"});
  
    const payment = await Payment.findOne({courseId, userId: loggedInUser._id});
    console.log('💳 Found Payment:', payment);
    
    if(!payment) return res.status(404).json({message: "No transaction found..."});
  
    const status = payment.status;
    if(!status) throw new Error("Can't get status");
    console.log('📊 Payment Status:', status);
  
    const course = await Course.findById(courseId).populate([{
      path: "lectures",
      select: "isPreviewFree enrolledStudents"
    },{
      path: "creator",
      select: "name email photoUrl"
    }]);
    console.log('📚 Found Course:', {
      courseId: course?._id,
      creatorId: course?.creator?._id
    });
  
    if(!course) return res.status(404).json({message: "Course not found"});
    
    return res.status(200).json({
      success: true,
      status,
      course,
      message: "Course status fetched successfully..."
    });
  } catch (error) {
    console.error('❌ Status Check Error:', error);
    return res.status(500).json({
      message: error.message
    });
  }
}