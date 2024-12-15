import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required: [true, "Please enter your name"],
        index : true,

    },
    email :{
        type: String,
        required :[true, "Please enter your email"],
        unique: true,
        lowercase : true,
        trim : true,
        
    },
    password :{
        type : String,
        required : [true, "Please enter your password"],
    },
    role:{
        type : String,
        enum : ["Instructor", "Student"],
        default: 'Student',
    },
    enrolledAt :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'Course',
        },
    ],
    photoUrl:{
        type : String,
        default : 'https://img.freepik.com/free-psd/3d-rendering-boy-avatar-emoji_23-2150603408.jpg?t=st=1734248876~exp=1734252476~hmac=9af3ef85c9cbeca42226f4d919d6be1ea5bd5397f813674a733049d4cad42e26&w=740'
    }
},{
    timestamps:true,
});

export const User = mongoose.model("User",userSchema);

