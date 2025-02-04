import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGION,
    credentials:true,
    methods:['GET','POST','DELETE','PATCH','PUT']
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from './Src/routes/Userroute.js'

app.use("/api/v1/users",userRouter);

// http://localhost:8000/api/v1/users/register


export {app}