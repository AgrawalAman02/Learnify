import { Course } from "../models/course.js";
import { Lecture } from "../models/lecture.js";
import { deleteVideoFromCloud } from "../utils/cloudinary.js";

export const createLecture = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    if (!loggedInUser) throw new Error("Please sign in...");
    if (loggedInUser?.role === "Student")
      throw new Error("Only Instructor have the access");

    const courseId = req.params.courseId;
    if (!courseId) throw new Error("Please select any course first.");

    const { lectureTitle } = req?.body;
    if (!lectureTitle)
      throw new Error(
        "Atleast provide the lecture title to create a lecture..."
      );

    const lecture = new Lecture({
      lectureTitle,
    });

    const savedLecture = await lecture.save();

    const course = await Course.findById(courseId);
    if (!course) throw new Error("There is an issue with the course...");
    course.lectures.push(savedLecture._id);
    await course.save();

    return res.status(201).json({
      status: true,
      message: "Lecture Created Successfully",
      lecture: savedLecture,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};

export const getLecture = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    if (!loggedInUser) throw new Error("Please sign in...");
    if (loggedInUser?.role === "Student")
      throw new Error("Only Instructor have the access");

    const courseId = req.params.courseId;
    if (!courseId) throw new Error("Please select any course first.");

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) throw new Error("Arre bhai aisa koi course nhi hai...");

    return res.status(200).json({
      success: true,
      message: "Lecture Fetched successfully...",
      lectures: course.lectures,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    if (!loggedInUser) throw new Error("Please sign in...");
    if (loggedInUser?.role === "Student")
      throw new Error("Only Instructor have the access");

    const courseId = req.params.courseId,
      lectureId = req.params.lectureId;
    if (!courseId || !lectureId) throw new Error("Something got wrong..");

    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    // const { videoUrl, publicId } = videoInfo;
    const videoUrl = videoInfo?.videoUrl;
    const publicId = videoInfo?.publicId;

    if (!lectureTitle ||  !videoInfo || !videoUrl || !publicId)
      throw new Error("All field are mandatory...");
    const lecture = await Lecture.findByIdAndUpdate(lectureId, {
      lectureTitle,
      videoUrl,
      publicId,
      isPreviewFree,
    });

    return res.status(200).json({
      status: true,
      message: "Lecture Updated successfully",
      data: lecture,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    if (!courseId || !lectureId) throw new Error("something went wrong");

    const course = await Course.findById(courseId);
    if (!course) throw new Error("Course not found");
    const lecture = await Lecture.findByIdAndDelete(lectureId);

    // delete lecture form the cloudinary as well
    if (lecture.publicId) {
      await deleteVideoFromCloud(lecture.publicId);
    }
    // delete the lecture reference from the course as well
    await Course.updateOne(
      { lectures: lectureId }, // find the course that contain that lecture
      { $pull: { lectures: lectureId } } // remove the lecture id from that course
    );

    return res.status(200).json({
      message: "Lecture removed successsfully...",
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};


export const getLectureById = async (req, res)=>{
  try {
    const {lectureId , courseId} = req.params;
    if(!lectureId, !courseId) throw new Error("Issue While Fetching...");
  
    const lecture = await Lecture.findById(lectureId);
    if(!lecture ) throw new Error("Lecture is not present...");
    return res.status(200).json({
      success : true ,
      message : "Data fetched successfully",
      data : lecture,
    })  
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
}