import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { createCourse, getAllCourse, getCourseDetails, getCoursePurchasedDetails, getPublishedCourse, publishCourse, updateCourse } from '../controllers/course.controller.js';
import upload from '../utils/multer.js';
import { createLecture, editLecture, getLecture, getLectureById, removeLecture } from '../controllers/lecture.controller.js';
const router = express.Router();

// router for course
router.post("/",userAuth,createCourse);
router.get("/getCourse",userAuth, getAllCourse);
router.put("/updateCourse/:courseId",userAuth,upload.single("thumbnail"),updateCourse)
router.get("/getCourse/:courseId",userAuth,getCourseDetails);
router.put("/publishCourse/:courseId", userAuth, publishCourse);
router.get("/getPublishedCourse",  getPublishedCourse);
router.get("/getCourseDetails/:courseId", userAuth, getCoursePurchasedDetails);

// routes for lecture 
router.post("/:courseId/createLecture",userAuth,createLecture);
router.get("/:courseId/getLecture",userAuth,getLecture );
router.post("/:courseId/lecture/:lectureId",userAuth,editLecture);
router.delete("/:courseId/lecture/:lectureId",userAuth,removeLecture );
router.get("/:courseId/getLecture/:lectureId",userAuth,getLectureById );

export default router;
