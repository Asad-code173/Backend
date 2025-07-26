import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
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
import EnquiryRouter from "./Src/routes/Enquiryroute.js"

app.use("/api/v1/users",userRouter);
app.use("/api/v1/categories",categoryRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/enquiries",EnquiryRouter)

// http://localhost:8001/api/v1/users/register


export {app}