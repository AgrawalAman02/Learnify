import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { createCourse, getAllCourse } from '../controllers/course.controller.js';
const router = express.Router();

router.post("/",userAuth,createCourse);
router.get("/getCourse",userAuth, getAllCourse);

export default router;
