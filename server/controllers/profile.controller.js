import { Error } from "mongoose";
import { User } from "../models/user.js";
import { deleteMediaFromCloud, uploadMedia } from "../utils/cloudinary.js";

export const getProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) throw new Error("User is not logged in...");

    const user = await User.findById(loggedInUser._id).populate({
      path : "enrolledAt",
      select : "-password"
    });
    res.send(user);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `ERROR : ${error.message} `,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) throw new Error("User is not logged in...");

    const { name } = req.body;
    const newProfilePhoto = req.file;
    

    if (name) {
      loggedInUser.name = name;
    }

    if (newProfilePhoto) {
      if (loggedInUser.photoUrl) {
        const publicId = loggedInUser.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloud(publicId);
      }
      const cloudResponse = await uploadMedia(newProfilePhoto.path);
      loggedInUser.photoUrl = cloudResponse.secure_url;
    }

    await loggedInUser.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: loggedInUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `ERROR : ${error.message || "Failed to update profile"} `,
    });
  }
};

export const becomeInstructor =async (req, res)=>{
  try {
    const userId = req?.user?._id;
    
    if(!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }
    
    // Find user in DB (refresh from database)
    const user = await User.findById(userId);
    
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    } 

    user.role = "Instructor";
    await user.save();
  
    res.status(200).json({
      success : true,
      message : "Congrats! You are now an instructor",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `ERROR : ${error.message || "Failed to update profile"} `,
    });
  }

}
