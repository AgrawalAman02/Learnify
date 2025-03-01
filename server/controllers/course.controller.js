import { Course } from "../models/course.js";
import { Payment } from "../models/payment.js";
import { User } from "../models/user.js";
import { deleteMediaFromCloud, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    if (!loggedInUser) throw new Error("Please sign in...");
    const { courseTitle, category, price } = req?.body;
    if (!courseTitle || !category || !price)
      throw new Error("Please provide all the details about the new course...");

    if (req?.user?.role === "Student")
      throw new Error("Only Instructor can create course");
    const isPresent = await Course.findOne({
      creator: req?.user?._id,
      courseTitle,
      category,
    });
    if (isPresent)
      throw new Error("Duplicate Course creation is not allowed...");
    await Course.create({
      courseTitle,
      category,
      price,
      creator: req?.user?.id || req?.user?._id,
    });

    res.status(200).json({
      success: true,
      message: "New course has been added successfully!...",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    if (!loggedInUser) throw new Error("Please sign in...");
    if (loggedInUser?.role === "Student")
      throw new Error("Only Instructor have the access");

    const listOfCourses = await Course.find({ creator: loggedInUser?._id });
    return res.status(200).json({
      success: true,
      courseList: listOfCourses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    if (!loggedInUser) throw new Error("Please sign in...");
    if (loggedInUser?.role === "Student")
      throw new Error("Only Instructor have the access");

    const courseId = req.params.courseId;
    if (!courseId) throw new Error("Please select any course first.");

    const {
      courseTitle,
      courseSubTitle,
      description,
      category,
      courseLevel,
      price,
    } = req.body;
    const thumbnail = req?.file;

    const course = await Course.findById(courseId);
    if (!course) throw new Error("Course not found");

    let updatedThumbnail;
    if (thumbnail) {
      // delete the existing media from the cloud;
      if (course.thumbnail) {
        const publicId = course.thumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloud(publicId);
      }
      updatedThumbnail = await uploadMedia(thumbnail.path);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        courseTitle,
        courseSubTitle,
        description,
        category,
        courseLevel,
        price,
        thumbnail: updatedThumbnail?.secure_url,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Course Updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    if (!loggedInUser) throw new Error("Please sign in...");
    if (loggedInUser?.role === "Student")
      throw new Error("Only Instructor have the access");

    const courseId = req.params.courseId;
    if (!courseId) throw new Error("Please select any course first.");

    const course =await Course.findById(courseId);
    if (!course) throw new Error("Unknown error!");

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully...",
      course: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};

export const publishCourse = async (req,res)=>{
  try {
    const {courseId} = req.params;
    const {publish} = req.query;
    const course = await Course.findById(courseId);
    if(!course) res.status(404).json({
      success: false,
      message: "Course Not Found",
    });
    course.isPublished  = publish === "true";

    await course.save();
    const statusMsg = course.isPublished ? "Published" : "Not Published";
    return res.status(200).json({
      success : true,
      message : `Course Is ${statusMsg}`,
    })
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    }); 
  }
}

export const getPublishedCourse = async (req, res) =>{
  try {
    const courses =await Course.find({isPublished : true}).populate({path : "creator", select : "name photoUrl"});
    
    if(!courses || courses.length == 0 ) return res.status(404).json({
      success : false,
      message : "No Course found",
    });
    
    return res.status(200).json({
      success : true,
      message : "Course Fetched Successfully...",
      courses
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
}


export const getCoursePurchasedDetails = async (req,res)=>{
  try {
    const { courseId }= req.params;
    const userId = req.user?._id;
  
    const course =await Course.findById(courseId).populate({path:"creator",select : "_id name photoUrl email "}).populate({path : "lectures"});
    if(!course) throw new Error("Cant find course related to your choice...");
    
    const user = await User.findById(userId).select("name email");
    const isPurchased =await Payment.findOne({courseId,userId});
  
    return res.status(200).json({
      success: true,
      course,
      isPurchased : isPurchased ? true: false,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
}

export const searchCourse =async (req,res)=>{
  try {
    const {query="", categories ="", sortByPrice="", difficultyLevel=""} = req.query;

    const searchCriteria = {
      isPublished  : true,
      $or : [
        {courseTitle :  {$regex:query, $options : "i"}  },
        {courseSubTitle :  {$regex:query, $options : "i"}  },
        {category :  {$regex:query, $options : "i"}  },
        {courseLevel :  {$regex:query, $options : "i"}  },
      ],
    }

     // Category filtering
     if(categories && categories.length > 0){
      const categoryArray = Array.isArray(categories) 
        ? categories 
        : categories.split(',').filter(cat => cat.trim());
      
      if(categoryArray.length > 0){
        searchCriteria.category = {$in: categoryArray};
      }
    }


    if(difficultyLevel && difficultyLevel.length > 0){
      // Handle both array and comma-separated string
      const levelArray = Array.isArray(difficultyLevel) 
        ? difficultyLevel 
        : difficultyLevel.split(',').filter(level => level.trim());
      
      if(levelArray.length > 0){
        searchCriteria.courseLevel = {$in: levelArray};
      }
    }

    const sortOptions = {};
    if(sortByPrice === "low"){
      sortOptions.coursePrice = 1;
    }else if(sortByPrice === "high"){
      sortOptions.coursePrice = -1;
    }

     // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const courses = await Course.find(searchCriteria)
    .populate({path: "creator", select: "name photoUrl"})
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum);

    const total = await Course.countDocuments(searchCriteria);

    // Return results
    return res.status(200).json({
      success: true,
      courses: courses || [],
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "ERROR: " + (error.message || "Something went wrong"),
    });
  }
}