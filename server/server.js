require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/database");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["PUT", "GET", "DELETE", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

connectDb()
    .then(()=>{
        console.log("DB Connection Established Successfully...");
        app.listen(PORT, ()=>{
            console.log("Server is successfully listening on port");
        });
    })
    .catch((err)=>{
        console.error("Connection Failure"+ err.message);
    });
