import { User } from "../models/user.js";

export const getProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) throw new Error("User is not logged in...");

    const user = await User.findById(loggedInUser._id).select("-password");
    res.send(user);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
};