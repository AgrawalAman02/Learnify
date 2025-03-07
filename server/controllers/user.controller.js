import { User } from "../models/user.js";
import { sendMail } from "../utils/email.js";
import { validateSignUP } from "../utils/validate.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from 'crypto'

export const signUp = async (req, res) => {
  try {
    validateSignUP(req);

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Generate JWT token and set cookie after signup
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    });


    return res.status(200).send(savedUser);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Please enter all the field...");
    if (!validator.isEmail(email)) throw new Error("Email Id is not valid ");

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid Credentials");
    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) throw new Error("Invalid Credentials");

    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.send(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ERROR : ${error.message} ` || "Error while login",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      // Important: Match the same sameSite and secure settings from login
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ERROR : Failed to logout...`,
    });
  }
};

export const forgotPassword = async (req,res)=>{
  try {
    const{ email} = req.body;
    const user = await User.findOne({
      email
    });
    if(!user) return res.status(404).json({
      success : false ,
      message : "User don't exist...",
    });
  
    const resetToken = user.createResetPasswordToken();
  
    await user.save();
  
    const resetLink = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetToken}`
    const message =`Sir/Madam,\n    We have received your pasword reset request. Please use the below link to reset the password.\n\n ${resetLink}\n
    This reset password link will be valid only for 10 minutes.`;
  
    try {
      await sendMail({
        email,
        subject : "Password change request",
        message,
      });

      return res.status(200).json({
        success : true,
        message  : "Passsword reset link has been successfully sent to the user", 
      })
    } catch (error) {
      user.passwordResetToken = undefined,
      user.passwordResetTokenExpires = undefined,

      await user.save();

      return res.status(500).json({
        message : error.message + " Please try again"
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
}

export const resetPassword = async (req,res)=>{
  try {
    const token = crypto.createHash('sha256').update(req.params.token).digest("hex");
    const user = await User.findOne({passwordResetToken : token, passwordResetTokenExpires :{$gt : Date.now()}});
  
    if(!user) return res.status(400).json({
      success : false,
      message : "Can't verify your Password. May the link expires Please try again...",
    });
  
    const {password , confirmPassword } = req.body;
    if(password !== confirmPassword) return res.status(400).json({
      success : false ,
      message : "Password not matched...",
    });
  
    user.password = await bcrypt.hash(password,10);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
  
    user.passwordChangedAt = Date.now();
    
    const savedUser = await user.save();

    // Generate JWT token and set cookie after signup
    const loginToken = await savedUser.getJWT();
    res.cookie("token", loginToken, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    });

  
    return res.status(200).json({
      savedUser,
      success : true,
      message : "Password Changed Successfully",
      // token
    });   
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
}