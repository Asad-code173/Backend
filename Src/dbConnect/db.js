// const mongoose = require("mongoose");
import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
const DbConnect = async ()=>{
    try {
        // console.log("the env variables are: " , process.env.MONGODB_URL)
        // console.log("the env variables are: " , DB_NAME)
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        console.log("database is connected")
    } catch (error) {
        console.log("db error: " , error);
    }
}
export default DbConnect;