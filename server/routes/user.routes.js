import express from 'express';
import { login, logout, signUp } from '../controllers/user.controller.js';
import userAuth from '../middlewares/userAuth.js';
const router = express.Router();

router.route("/register",).post(signUp);
router.route("/login").post(login);
router.post("/logout",userAuth,logout);

export default router;