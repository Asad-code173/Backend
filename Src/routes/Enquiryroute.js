import { Router } from "express";
import {
    insertEnquiry,
    fetchEnquiries,
    patchEnquiryStatus,
    EqnuiryTrack,
    fetchEnquirybyId,
} from "../Controllers/Enquiry.js";
import { isAdmin, verifyJWT } from "../Middlewares/Authmiddleware.js";
const router = Router()
router.route('/create-enquiry').post(insertEnquiry)
router.route('/fetch-enquiries').get(verifyJWT, isAdmin, fetchEnquiries)
router.route("/updateEnquiry-status/:id").patch(verifyJWT, isAdmin, patchEnquiryStatus)
router.route("/track-enquiry").get(verifyJWT, isAdmin, EqnuiryTrack)
router.route("/fetchById/:id").get(verifyJWT, isAdmin, fetchEnquirybyId)

export default router