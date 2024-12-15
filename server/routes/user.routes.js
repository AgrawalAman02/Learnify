import express from 'express';
import { login, signUp } from '../controllers/user.controller.js';
const router = express.Router();

router.route("/register",).post(signUp);
router.route("/login").post(login);

export default router;