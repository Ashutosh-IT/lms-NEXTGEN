import express from "express";
import dotenv from "dotenv";
dotenv.config({});

import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api/v1/user", userRoute);

app.get("/home",(req,res)=>{
    res.send("Hi");
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})