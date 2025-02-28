import mongoose from "mongoose";
import validator from "validator";


const lectureSchema = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required : [true, "Please enter the title of the lecture"],
    index : true,
  },
  videoUrl :{
    type : String,
    default : "https://res.cloudinary.com/dj5dijps9/video/upload/v1740769070/qxg360yknrpmzf4astvq.mp4",
    validate(value){
      if(!validator.isURL(value)) throw new Error("Invalid Url");
    }
  },
  publicId : String,
  isPreviewFree : Boolean,

},
{
  timestamps : true,
});

export const Lecture  = mongoose.model("Lecture", lectureSchema);