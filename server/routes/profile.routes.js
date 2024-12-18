import express from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';
import userAuth from '../middlewares/userAuth.js';
import upload from '../utils/multer.js';
const router = express.Router();

router.get("/getProfile", userAuth,getProfile);
router.put("/update", userAuth,upload.single("profilePhoto"),updateProfile);

export default router;