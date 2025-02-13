import { Course } from "../models/course.js";
import { Lecture } from "../models/lecture.js";

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
    const { videoUrl, publicId } = videoInfo;

    if(!lectureTitle || !isPreviewFree || !videoInfo || !videoUrl || !publicId) throw new Error("All field are mandatory...")
    const lecture = Lecture.findByIdAndUpdate(lectureId,{
      lectureTitle,
      videoUrl,
      publicId,
      isPreviewFree,
    });

    return res.status(200).json({
      status : true,
      message : "Lecture Updated successfully",
      data : lecture,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "ERROR : " + error.message,
    });
  }
};
