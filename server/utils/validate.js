import validator from 'validator'

export const validateSignUP = (req)=>{

    const {name , email , password} = req.body;
    if(!email || !name || !password) 
        throw new Error("Please enter all the field...");

    if(!validator.isEmail(email)) throw new Error("Please enter correct Email");
    if(!validator.isStrongPassword(password)) throw new Error("Weak Password.Password must be strong enough.");

 }