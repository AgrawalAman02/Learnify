import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
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

    stauts : {
        type : String ,
        enum : ['pending','completed','failed'],
        default : 'pending',
    },
    paymentId :{
        type : String,
        required : true,
    },
},
{
    timestamps : true,
});

export const Transactions = mongoose.model("Transactions", transactionsSchema);