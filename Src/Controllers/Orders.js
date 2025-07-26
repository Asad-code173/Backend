import mongoose,{Schema} from "mongoose"

const orderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
                required:true
            },
            quantiy:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    


    
},{
    timestamps:true
})
export const Order = mongoose.model("Order",orderSchema)