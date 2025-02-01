import { Course} from "../models/course.js";

export const createCourse = async (req,res)=>{
    try {
        const {courseTitle , category , price} = req?.body;
        if(!courseTitle || !category || !price) throw new Error("Please provide all the details about the new course...");

        if(req?.user?.role ==="Student") throw new Error("Only Instructor can create course");
        const isPresent =await Course.findOne({
            creator:req?.user?._id,
            courseTitle,
            category,
        });
        if(isPresent) throw new Error("Duplicate Course creation is not allowed...");
        await Course.create({ 
            courseTitle,
            category,
            price,
            creator: req?.user?.id || req?.user?._id,
        });

        res.status(200).json({
            success : true,
            message : "New course has been added successfully!...",
        });
    } catch (error) {
        res.status(400).json({
            success : false,
            message : "ERROR : "+ error.message,
        })
    }
}

export const getAllCourse  = async (req,res)=>{
    try {
        const loggedInUser = req?.user;
        if(!loggedInUser) throw new Error("Please sign in...");
        if(!loggedInUser?.role === "Student") throw new Error("Only Instructor have the access");
        
        const listOfCourses = await Course.find({creator:loggedInUser?._id});
        return res.status(200).json({
            success : true,
            courseList : listOfCourses,
        });
    } catch (error) {
        res.status(400).json({
            success : false,
            message : "ERROR : "+ error.message,
        })
    }
}