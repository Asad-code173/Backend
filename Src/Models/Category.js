import mongoose,{Schema} from "mongoose"
const CategorySchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        slug:{
            type:String,
            lowercase:true
        }
    },
    {
        timestamps:true,
        
    }
)

export const Category = mongoose.model("Category",CategorySchema)