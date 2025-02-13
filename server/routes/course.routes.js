import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { createCourse, getAllCourse, getCourseDetails, publishCourse, updateCourse } from '../controllers/course.controller.js';
import upload from '../utils/multer.js';
import { createLecture, editLecture, getLecture, getLectureById, removeLecture } from '../controllers/lecture.controller.js';
const router = express.Router();

router.post("/",userAuth,createCourse);
router.get("/getCourse",userAuth, getAllCourse);
router.put("/updateCourse/:courseId",userAuth,upload.single("updatedThumbnail"),updateCourse)
router.get("/getCourse/:courseId",userAuth,getCourseDetails);
router.put("/publishCourse/:courseId", userAuth, publishCourse);

// routes for lecture 
router.post("/:courseId/createLecture",userAuth,createLecture);
router.get("/:courseId/getLecture",userAuth,getLecture );
router.post("/:courseId/lecture/:lectureId",userAuth,editLecture);
router.delete("/:courseId/lecture/:lectureId",userAuth,removeLecture );
router.get("/:courseId/getLecture/:lectureId",userAuth,getLectureById );

export default router;
