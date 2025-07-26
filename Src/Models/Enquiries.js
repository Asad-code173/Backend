import mongoose, { Schema } from "mongoose";
const EnquiresSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,

        },
        contactNumber: {
            type: String,
            required: true,

        },
        message: {
            type: String,
            required: true,
        },
        messageType: {
            type: String,
            required: true,
            enum: ["enquiry", "complaint"],
            default: "enquiry"
        },

        status: {
            type: String,
            required: true,
            enum: ['Pending', 'In Progress', 'Solved']
        },
    },
    {
        timestamps: true,
    }
);
export const Enquiries = mongoose.model("Enquiries", EnquiresSchema)

