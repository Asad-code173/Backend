import { Enquiries } from "../Models/Enquiries.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const insertEnquiry = asyncHandler(async (req, res) => {
    let { name, email, contactNumber, message, messageType } = req.body
    console.log(name, email, contactNumber, message, messageType)
    if (!name || !email || !contactNumber || !message) {
        throw new ApiError(400, "This field is required")
    }
    const createEnquiry = await Enquiries.create({
        name,
        email,
        contactNumber,
        message,
        messageType,
        status: "Pending"
    })
    return res.
        status(200).
        json(new ApiResponse(201, createEnquiry, "Enquiry created successfuly"))


})
const fetchEnquiries = asyncHandler(async (req, res) => {
    const totalEnquiries = await Enquiries.find({})
    if (!totalEnquiries || totalEnquiries.length === 0) {
        throw new ApiError(404, "No Enquireis")
    }
    return res.
        status(200).
        json(new ApiResponse(200, totalEnquiries, "Enquiries fetched successfully"))
})


const fetchEnquirybyId = asyncHandler(async (req, res) => {
    const { id } = req.params
    const enquiry = await Enquiries.findById(id)
    if (!enquiry) {
        throw new ApiError("Enquiry not found")
    }
    return res.
        status(200)
        .json(new ApiResponse(200,enquiry, "Enquiry fetched Successfully"))


})

const patchEnquiryStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const updateEnquiryStatus = await Enquiries.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }

    )
    if (!updateEnquiryStatus) {
        throw new ApiError(404, "Enquiry not found");
    }
    res.status(200).json(new ApiResponse(200, updateEnquiryStatus, "Status updated"))

})

const EqnuiryTrack = asyncHandler(async (req, res) => {
    const totalEnquiry = await Enquiries.countDocuments({ messageType: "complaint" })
    const pendingEnquiry = await Enquiries.countDocuments({ status: "In Progress", messageType: "complaint" })
    const completedenquiry = await Enquiries.countDocuments({ status: "Solved", messageType: "complaint" })
    res.status(200).json(new ApiResponse
        (200, {
            totalEnquiry: totalEnquiry,
            pendingEnquiry: pendingEnquiry,
            completedenquiry: completedenquiry
        }, "Enquiry track"))

})




export {
    insertEnquiry,
    fetchEnquiries,
    fetchEnquirybyId,
    patchEnquiryStatus,
    EqnuiryTrack
}
