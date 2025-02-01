import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { createCourse, getAllCourse, updateCourse } from '../controllers/course.controller.js';
import upload from '../utils/multer.js';
const router = express.Router();

router.post("/",userAuth,createCourse);
router.get("/getCourse",userAuth, getAllCourse);
router.put("/updateCourse",userAuth,upload.single("updatedThumbnail"),updateCourse)
export default router;
