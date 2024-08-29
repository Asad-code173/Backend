// database say connectivity ke doran problems asakte hain to usko try catch may 
// rap karna better approach hy
// database humesha doosray content me rakha hy to time lagta hy to async await ko use karo


import dotenv from "dotenv"
import DbConnect from './dbConnect/db.js';
import {app} from '../app.js'

dotenv.config({
    path:'./.env'
})


DbConnect()
// Middleware use kartay hain to app.use istamal kartay hain
.then(()=>{
        // error kay liye bhee listen karaien
    // app kay andar listen karengay
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is Running at port ${process.env.PORT}`);

    })
})
.catch((err)=>{
    console.log("MongoDb connection error !!!",err);
})
























/*import express from "express"
const app = express();

(async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("ERROR:",error);
        throw error
       })
       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.port}`);
       })
        
    } catch (error) {
        console.log("ERROR:",error);
        throw error
    }

})()*/