import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../Models/User.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {

    // console.log("verifyJWT middleware reached"); // Add this line

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log(req.cookies);
        
        // console.log("verifying token middleware ",token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("Decoded token is ", decodedToken);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        // console.log("User is", user);

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
    


})

export const isAdmin = asyncHandler(async(req, _,next)=>{
    try {
        const user = req.user;
        // console.log("User object is ",user);
        if (user.role !== "admin") {
            throw new ApiError(403, "User is not an admin");
        }
        else{
            next();
        }
    } catch (error) {
        throw new ApiError(403, error?.message || "Forbidden:Not an admin");
        
        
    }
})
