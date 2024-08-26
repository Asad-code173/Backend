import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username:{
            type :String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            // agar kise bhee field ko apnay searchable banana hy to uska index true karlo
            index:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"Password is Required"]
        },
        refreshToken:{
            type:String,
        },
        role:{
            type:Number,
            default:0,
        }

    },
    {

      timestamps:true,
   }
);

// password encryption

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})
// password comparing

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

// generateAcess token 

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
          {
              _id:this._id,
              email:this.email,
              username:this.username,
              
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
              expiresIn:process.env.ACCESS_TOKEN_EXPIRY
          }
      )
  }

// generateRefreshtoken
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);
// this user can contact to our database directly