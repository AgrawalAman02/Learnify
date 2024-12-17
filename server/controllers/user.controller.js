import { User } from "../models/user.js";
import { validateSignUP } from "../utils/validate.js";
import bcrypt from "bcryptjs";
import validator from "validator";

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
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
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
      sameSite: "strict",
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
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    }); 
  } catch (error) {
    return res.status(500).json({
        success : false,
        message : `ERROR : Failed to logout...`
    });
  }
};
