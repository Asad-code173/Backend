import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
            
        },
        image:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true

        },
        stock:{
            type:Number,
            required:true,
            default:0,
            min:0
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    },
    {
        timestamps:true
    }

)
export const Produt = mongoose.model("ProductSchema",ProductSchema)