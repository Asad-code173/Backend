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
            unique: true
        },
        phone: {
            type: String,
            required: true,

        },
        Message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'In Progress', 'Completed']
        },
    },
    {
        timestamps: true,
    }
);
export const Enquiries = mongoose.model("Enquiries", EnquiresSchema)

