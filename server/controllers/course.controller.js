import { Course } from "../models/course.js";
import { Lecture } from "../models/lecture.js";
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
    const course = await Course.create({
      courseTitle,
      category,
      price,
      creator: req?.user?.id || req?.user?._id,
    });

    res.status(200).json({
      success: true,
      message: "New course has been added successfully!...",
      id : course?._id.toJSON(),
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
    const {page =1 , limit =8} = req.query;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 8;
    const skip = (pageNum-1) * limitNum;
    const courses =await Course.find({isPublished : true})
      .populate({path : "creator", select : "name photoUrl"})
      .sort({ price: 1 } || {enrolledStudents : -1})
      .skip(skip)
      .limit(limitNum);
    
    if(!courses || courses.length == 0 ) return res.status(404).json({
      success : false,
      message : "No Course found",
    });
    
    const total = await Course.countDocuments({isPublished: true});
    
    return res.status(200).json({
      success : true,
      message : "Course Fetched Successfully...",
      courses,
      pagination : {
        total,
        page : pageNum,
        limit : limitNum,
        pages : Math.ceil(total/limit),
      }
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
    const {query="", categories ="", sortByPrice="", difficultyLevel="",page=1, limit=5} = req.query;

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
      sortOptions.price = 1;
    }else if(sortByPrice === "high"){
      sortOptions.price = -1;
    }

     // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const courses = await Course.find(searchCriteria)
    .populate({path: "creator", select: "name photoUrl"})
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum)
    .collation({ locale: 'en', numericOrdering: true });

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

export const getCourseStats = async (req, res) => {
  try {
    const user = req?.user;
    if (!user || user.role !== "Instructor")
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });

    const courses = await Course.find({
      isPublished: true,
      creator: user._id,
    }).select("price createdAt courseTitle enrolledStudents");

    if (!courses || courses.length == 0)
      return res.status(404).json({
        success: false,
        message: "No course is published",
      });

    const courseIds = courses.map((course) => course._id);
    const payments = await Payment.find({
      courseId: { $in: courseIds },
      status: "captured",
    }).select("courseId amount createdAt ");

    const publishedCourse = courses.length;

    let totalRevenue = 0;
    payments.forEach((payment) => {
      totalRevenue += parseFloat(payment.amount) || 0;
    });
    
    const courseSold = new Set();
    payments.forEach((payment) => {
      courseSold.add(payment.courseId);
    });

    const totalCourseSold = courseSold.size;

    let uniqueStudents = new Set();
    courses.forEach((course) => {
      course.enrolledStudents?.forEach((studentId) => {
        uniqueStudents.add(studentId.toString());
      });
    });

    const salesPerCourse = {};
    payments.forEach(payment => {
      const courseId = payment.courseId.toString();
      if (!salesPerCourse[courseId]) {
        salesPerCourse[courseId] = 0;
      }
      salesPerCourse[courseId]++;
    });


    const totalPayments = payments.length;

    return res.status(200).json({
      success : true,
      message : "Stats fetched successfully...",
      stats :{
        publishedCourse,
        totalCourseSold,
        uniqueStudents:uniqueStudents.size,
        totalEnrollments : totalPayments,
        totalRevenue,
      },
      courseStats: courses.map(course => ({
        id: course._id,
        title: course.courseTitle,
        price: course.price,
        enrolledCount: course.enrolledStudents?.length || 0,
        salesCount: salesPerCourse[course._id.toString()] || 0
      }))
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "ERROR: " + (error.message || "Something went wrong"),
    });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const { query = "" } = req.query;
    
    // Return early if query is too short
    if (query.length < 2) {
      return res.status(200).json({ 
        success: true,
        suggestions: [] 
      });
    }
    
    // Find matching course titles
    // This query is optimized for suggestion performance
    const courseTitles = await Course.find(
      { 
        courseTitle: { $regex: query, $options: "i" },
        isPublished: true 
      },
      { courseTitle: 1, _id: 0 } // Only fetch the title field for efficiency
    )
    .sort({ enrolledStudents: -1 }) // Prioritize popular courses
    .limit(10)
    .lean(); // Faster than full document instances
    
    // Also search by category for broader suggestions
    const categoryMatches = await Course.find(
      {
        category: { $regex: query, $options: "i" },
        isPublished: true
      },
      { courseTitle: 1, _id: 0 }
    )
    .sort({ enrolledStudents: -1 })
    .limit(5)
    .lean();
    
    // Combine and deduplicate suggestions
    const allTitles = [...courseTitles, ...categoryMatches].map(c => c.courseTitle);
    const uniqueSuggestions = [...new Set(allTitles)].slice(0, 5);
    
    res.status(200).json({
      success: true,
      suggestions: uniqueSuggestions
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching suggestions: " + error.message
    });
  }
};

export const removeCourse = async (req,res)=>{
  try {
    const { courseId } = req.params;
    const user = req.user;
    const course = await Course.findById(courseId);
    if(!course) return res.status(404).json({
      success : false,
      message : "No such course found",
    });

    if(!user  ) return res.status(401).json({
      success : false,
      message : "Please sign in first",
    });

    if(user.role !=='Instructor' || course.creator.toString() !== user._id.toString()) 
    return res.status(403).json({
      success : false,
      message :  'you are not authorised to delete this course',
    });
    
    await User.updateMany(
      {_id : {$in : course.enrolledStudents}},
      { $pull : {enrolledAt : courseId}}
    );

    await Lecture.deleteMany(
      {_id : {$in : course.lectures}}
    );

    if (course.thumbnail) {
      const publicId = course.thumbnail.split("/").pop().split(".")[0];
      await deleteMediaFromCloud(publicId);
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success : true,
      message : "Course Deleted Successfully..."
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting course: " + error.message
    });
  }
}