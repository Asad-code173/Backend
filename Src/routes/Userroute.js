import { Router } from "express";
import {
    getAdminDashboard,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
   
} from '../Controllers/UserController.js'
import { verifyJWT,isAdmin} from "../Middlewares/Authmiddleware.js";

const router = Router();
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

// admin
router.route("/admin/dashboard").get(verifyJWT,isAdmin,getAdminDashboard)



export default router

