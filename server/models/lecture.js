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
    default : "https://kconcrete.com/wp-content/uploads/2017/08/product-video-placeholder.jpg",
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