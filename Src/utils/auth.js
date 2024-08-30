import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from "../Models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";

// generating tokens
const generateAccessandRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        // console.log("Access token is ",accessToken);
        
        const refreshToken = user.generateRefreshToken();
        // console.log("Refresh token is ",refreshToken)
        

        // adding refresh token into database means user
        user.refreshToken = refreshToken;
        // save user into database
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }

    } catch (error) {
        console.log("token generation error", error);

        throw new ApiError(500, "some thing went wrong");

    }
}


// register user

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
    console.log(username)

    if (!username || !email || !password) {
        throw new ApiError(400, "This field is  Required");
    }

    // if user already exsist
    const exsisteduser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (exsisteduser) {
        throw new ApiError(409, "This email and username already exsist")
    }
    // create new user 

    const newuser = await User.create({
        username: username.toLowerCase(),
        email,
        password
    })
    const createduser = await User.findById(newuser._id).select(
        "-password -refreshToken"
    );
    if (!createduser) {
        throw new ApiError(500, "something went wrong while registeration")
    }
    return res
        .status(201)
        .json(new ApiResponse(200, createduser, "User Registered Successfully"));
});


// login user

const loginUser = asyncHandler(async (req, res) =>{
   

    const {email, username, password} = req.body
    if (!(username || email)) {
        throw new ApiError(400, "username or email is required")
        
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await  generateAccessandRefreshTokens(user._id)
  

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})




// logoutuser

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user_id, {
        $unset: {
            refreshToken: 1,
        }
    });
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User Logout Successfully"))



})

const getAdminDashboard = asyncHandler(async (req,res)=>{
   res.send("protected route");
})

// refreshing access token

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    // console.log("Incoming refresh token is ",incomingRefreshToken);
    

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        // console.log("Decoded token is ",decodedToken);
        
        const user = await User.findById(decodedToken?._id)
        // console.log("User is ",user);
        
     
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessandRefreshTokens(user._id)
        // console.log("Access token is ",accessToken);
        // console.log("Refresh token is ",refreshToken);
        
        
        

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})


export {
    registerUser,
    loginUser,
    logoutUser,
    getAdminDashboard,
    refreshAccessToken
}