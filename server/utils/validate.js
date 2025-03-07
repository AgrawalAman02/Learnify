import validator from 'validator'

export const validateSignUP = (req)=>{

    const {name , email , password} = req.body;
    if(!email || !name || !password) 
        throw new Error("Please enter all the field...");

    if(!validator.isEmail(email)) throw new Error("Please enter correct Email");
    if(!validator.isStrongPassword(password)) throw new Error("Weak Password.Password must be strong enough.");

}

export const validateEmail =(email)=>{
    if(!email) 
        throw new Error("Please enter email...");

    if(!validator.isEmail(email)) throw new Error("Please enter correct Email");
}

export const validateNewPassword =(req)=>{
    const {password, cnfPassword} = req.body;
    if(!password || !cnfPassword) throw new Error("Please enter all the field...");
    if(password !== cnfPassword) throw new Error("Passwords don't match");

    if(!validator.isStrongPassword(password)) 
    throw new Error("Password must contain at least 8 characters including uppercase, lowercase, numbers and special characters");
}