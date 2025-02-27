import mongoose, { mongo } from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
    lectureId : {
        type : String,
        required : true,
        index : true,
    },
    isViewed : {
        type : Boolean,
        default : false,
    }
},{
    timestamps : true,
});

const courseProgressSchema = new mongoose.Schema({
    courseId :{
        type : String,
        required : true,
        index : true,
    },
    userId :{
        type : String,
        required : true,
        index : true,
    },
    isCompleted :{
        type : Boolean,
        default : false,
    },
    lectureProgress : [lectureProgressSchema],

}, {
    timestamps : true,
});

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);