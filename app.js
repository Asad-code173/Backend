import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { authMiddleware , isAdmin } from './Src/Middlewares/Authmiddleware.js';
import { ApiError } from './Src/utils/ApiError.js';

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGION,
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// app.use(authMiddleware);
// app.use(isAdmin);
// routes import
import userRouter from './Src/routes/Userroute.js'

app.use("/api/v1/users",userRouter);
// app.use((err, req, res, next) => {
//     // Check if the error is an instance of ApiError
//     if (err instanceof ApiError) {
//         return res.status(err.statusCode).json({
//             success: err.success,
//             message: err.message
//         });
//     }

//     // Handle other types of errors
//     return res.status(500).json({
//         success: false,
//         message: "Internal Server Error"
//     });
// });

export {app}