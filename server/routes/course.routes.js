import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { createCourse } from '../controllers/course.controller.js';
const router = express.Router();

router.post("/",userAuth,createCourse);

export default router;
