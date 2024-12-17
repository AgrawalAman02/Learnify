import jwt from "jsonwebtoken"
import { User } from "../models/user.js";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


const userAuth = async (req,res,next)=>{
    try {
        const {token}  = req.cookies;
        if(!token) throw new Error("Login First!...");
        const decodedMsg =await jwt.verify(token,JWT_SECRET_KEY);
        if(!decodedMsg) throw new Error("Some unknown issue...");
        const {id} = decodedMsg;

        const user =await User.findById(id);
        if(!user) throw new Error("Please Login again.User not found ");

        req.user  = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : `ERROR : ${error.message} `  || "Error while login"
        });
    }
}

export default userAuth;