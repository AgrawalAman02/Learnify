import express from 'express'
import userAuth from '../middlewares/userAuth.js';
import { getCourseProgress, markAsComplete, markAsIncomplete, updateLectureProgress } from '../controllers/courseProgress.js';

const router = express.Router();

router.get("/getCourseProgress/:courseId",userAuth, getCourseProgress);
router.post("/updateLectureProgress/:courseId/lecture/:lectureId",userAuth, updateLectureProgress);
router.post("markAsComplete/:courseId",userAuth,markAsComplete);
router.post("/markAsIncomplete/:courseId",userAuth,markAsIncomplete);

export default router;