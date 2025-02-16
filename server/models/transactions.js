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

    status : {
        type : String ,
        enum : ['pending','completed','created','failed'],
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

export const Transactions = mongoose.model("Transactions", transactionsSchema);