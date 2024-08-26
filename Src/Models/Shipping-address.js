import mongoose, { Schema } from "mongoose";
const ShippingSchema = new Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        address:{
            type:String,
            require:true,
            unique:true,
        },
        state:{
            type:String,
            require:true,
            unique:true,

        },
        city:{
            type:String,
            require:true,
            unique:true,
        },
        zipcode:{
            type:Number,
            require:true,
            unique:true,
        }


    },
    {
        timestamps:true,
    }
);
export const Shipping = mongoose.model("ShippingSchema",Shipping)