import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    courseId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course',
        required : true,
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },

    amount :{
        type : Number ,
        required : true,
    },

    status : {
        type : String ,
        enum : ['pending','captured','created','failed'],
        default : 'pending',
    },
    orderId :{
        type : String,
        required : true,
        unique : true,
    },
    receipt : {
        type : String ,
        required : true,
        unique : true,
    }
},
{
    timestamps : true,
});

export const Payment = mongoose.model("Payment", paymentSchema);