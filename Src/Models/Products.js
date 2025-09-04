import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true

        },
        photo: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        slug:{
            type:String,
            lowercase:true
        },
      
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
            required: true
        },
        variants: [
            {
                size: { type: String, required: true },
                price: { type: Number, required: true },
                stock: { type: Number, required: true, default: 0, min: 0 }
            },
        ]
    },
    {
        timestamps: true
    }

)
export const Products = mongoose.model("Product", ProductSchema)