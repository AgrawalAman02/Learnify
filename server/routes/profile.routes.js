import express from 'express';
import { getProfile } from '../controllers/profile.controller.js';
import userAuth from '../middlewares/userAuth.js';
const router = express.Router();

router.get("/getProfile", userAuth,getProfile);

export default router;