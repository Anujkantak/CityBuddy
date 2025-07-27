import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoutes.js"
import postRouter from "./Routes/postRoutes.js"
import reviewRouter from "./Routes/reviewRoutes.js";

const app=express();

dotenv.config({path:"./.env"});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://resilient-creponne-ee09ed.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({extended:true}));


app.use(cookieParser());

app.use("/api/user",userRouter);
app.use("/api/post",postRouter)
app.use("/api/review",reviewRouter)

export default app;
