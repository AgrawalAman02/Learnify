import express from "express";
import instance from "../utils/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    var options = {
      amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      receipt: "order_rcptid_11",
      notes: {
        firstName: "value3",
        lastName: "value2",
      }
    };
    
    const order = await instance.orders.create(options, function(err, order) {
      console.log(order);
    });


    // save the order in the database 

    // return back my response to the frontend
    res.json({ order });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
}