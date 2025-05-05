import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGION,
    credentials:true,
    methods:['GET','POST','DELETE','PATCH','PUT']
}))
app.use(express.json({limit:"1mb"}));
app.use(express.urlencoded({extended:true, limit:"1mb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from './Src/routes/Userroute.js'
import categoryRouter from './Src/routes/Categoryroute.js'
import productRouter from './Src/routes/Productroute.js'

app.use("/api/v1/users",userRouter);
app.use("/api/v1/categories",categoryRouter)
app.use("/api/v1/products",productRouter)

// http://localhost:8000/api/v1/users/register


export {app}