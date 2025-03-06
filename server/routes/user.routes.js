import express from 'express';
import { forgotPassword, login, logout, resetPassword, signUp } from '../controllers/user.controller.js';
import userAuth from '../middlewares/userAuth.js';
const router = express.Router();

router.route("/register",).post(signUp);
router.route("/login").post(login);
router.post("/logout",userAuth,logout);
router.post("/forgotPassword",forgotPassword);
router.patch("/resetPassword/:token",resetPassword);

export default router;