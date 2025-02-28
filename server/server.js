import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDb from './config/database.js';
import userRouter from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js";
import cookieParser from 'cookie-parser';
import courseRouter from "./routes/course.routes.js";
import uploadMediaRoute from "./routes/media.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import courseProgressRoute from "./routes/courseProgress.routes.js";
import { verifyPayment } from './controllers/payment.controller.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["PUT", "GET", "DELETE", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// Add webhook route BEFORE express.json middleware
app.post("/api/v1/payment/webhook", 
    express.raw({ type: 'application/json' }), 
    verifyPayment
);

app.use(express.json());
app.use(cookieParser());

// routes 
app.use("/api/v1/user", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/upload", uploadMediaRoute);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/progress",courseProgressRoute);

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