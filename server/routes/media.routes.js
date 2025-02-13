import express from 'express';
import {uploadMedia } from "../utils/cloudinary.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/upload-media").post(upload.single("file"), async(req,res)=>{
    try {
        const result = await uploadMedia(req.file.path);
        res.status(200).json({
            success : true,
            message : "Video Uploaded Successfully...",
            data : result,
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error Uploading file",
        });
    }
});
export default router