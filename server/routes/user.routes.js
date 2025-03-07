import express from 'express';
import { forgotPassword, login, logout, resetPassword, signUp } from '../controllers/user.controller.js';
import userAuth from '../middlewares/userAuth.js';
import { passwordResetLimiter } from '../utils/passwordResetLimiter.js';
const router = express.Router();

router.route("/register",).post(signUp);
router.route("/login").post(login);
router.post("/logout",userAuth,logout);
router.post("/forgotPassword",passwordResetLimiter ,forgotPassword);
router.patch("/resetPassword/:token",resetPassword);

export default router;