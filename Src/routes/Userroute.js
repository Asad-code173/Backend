import { Router } from "express";
import {
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser
} from '../Controllers/UserController.js'
import { authMiddleware ,isAdmin} from "../Middlewares/Authmiddleware.js";

const router = Router();
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(authMiddleware, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

// admin
router.route("/admin/dashboard").post(authMiddleware ,isAdmin,loginUser)



export default router

