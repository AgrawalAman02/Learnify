import { Course } from "../models/course.js";
import { CourseProgress } from "../models/courseProgress.js";

export const getCourseProgress = async (req, res) => {
  try {
    const courseId = req.params;
    const userId = req.user._id;
    if (!courseId || !userId) throw new Error("user or course not found...");

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");

    const courseDetails = Course.findById(courseId);
    if (!courseDetails) throw new Error("No course exist");

    // If no course progress then return the course details with the empty progress...
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
        message: "Thanks for choosing the course...",
      });
    }

    // Return the user's course progress along with the course details.
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        isCompleted: courseProgress.isCompleted,
      },
      message: "Course Progress Fetched...",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};

export const updateLectureProgress  = async (req, res)=>{
  try {
    const {courseId, lectureId}  = req.params;
    if(!lectureId || !courseId) return res.status(404).json({
      message : "Unable to find either lecture or course",
    });
    const userId = req.user._id;
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });

    // If no course progress then create a new course Progress..
    if (!courseProgress) {
      courseProgress = new CourseProgress({
        courseId,
        userId,
        isCompleted : false,
        lectureProgress : [],
      })
    }

    // now if course already exist then update find the course and update it 
    const lectureIndex = await CourseProgress.lectureProgress.findIndex((lecture)=> lecture.lectureId === lectureId);

    if(lectureIndex != -1) {// means the lecture exist in the array having lectureId
      courseProgress.lectureProgress[lectureIndex].isViewed = true;
    }else{
      // add new lecture to track the progress
      courseProgress.lectureProgress.push({
        lectureId,
        isViewed: true,
      })
    }

    // check for the course completion 
    const viewedLectureLength = courseProgress.lectureProgress.filter((lecture)=> lecture.isViewed).length;
    const course = Course.findById(courseId);
    courseProgress.isCompleted = course.lectures.length===viewedLectureLength;

    return res.status(200).json({
      message : "lecture is updated successfully...",
      success : true,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }

}

export const markAsComplete = async (req,res)=>{
  try {
    const {courseId}  = req.params;
      if(!courseId) return res.status(404).json({
        message : "Unable to find course",
      });
      const userId = req.user._id;
      let courseProgress = await CourseProgress.findOne({
        courseId,
        userId,
      });
  
      if (!courseProgress) {
        return res.status(404).json({
          message : "No progress found",
        });
      }
  
      courseProgress.lectureProgress.map((lecture)=>lecture.isViewed = true);
      courseProgress.isCompleted = true;
  
      await courseProgress.save();
      return res.status(200).json({
        message : "Course is marked completed",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
}

export const markAsIncomplete = async (req,res)=>{
  try {
    const {courseId}  = req.params;
      if(!courseId) return res.status(404).json({
        message : "Unable to find course",
      });
      const userId = req.user._id;
      let courseProgress = await CourseProgress.findOne({
        courseId,
        userId,
      });
  
      if (!courseProgress) {
        return res.status(404).json({
          message : "No progress found",
        });
      }
  
      courseProgress.lectureProgress.map((lecture)=>lecture.isViewed = false);
      courseProgress.isCompleted = false;
  
      await courseProgress.save();
      return res.status(200).json({
        message : "Course is marked incomplete",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
}