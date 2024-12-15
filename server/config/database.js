const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async()=>{
    await mongoose.connect(MONGO_URI);
}

module.exports = connectDb;
