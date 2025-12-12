// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";
// const app = express();

// // (async () => {})();
// // syntax of async IIFE )(immediately invoked function expression)
// (async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODBM_URI}/${DB_NAME}`);
//         app.on("error",(error) => {
//             console.log("ERR: ",error);
//             throw error;
//         })
//         // ye app.on se hum event listener laga rahe hain ki agar app me koi error aata hai to wo console me print ho jaye phir throw ho jaye aur niche ka code na chale.
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.error("Error while connecting to mongoDB", error);
//     }
// })();


// ab hum import krke bhi kr skte h pura vo code jo db ke andar index.js me hai
// require("dotenv").config({path: "./.env"});
// import connectDB from "./db/index.js";
// connectDB();

// require("dotenv").config({path: "./.env"});
//  Yeh kya karta hai?

// dotenv ek library hai jo .env file ke andar jo environment variables likhe hain
// (jaise: MONGODB_URI=mongodb://localhost:27017)
// unko process.env object me load karti hai.

// {path: "./.env"} ka matlab:

// Default .env file current folder me hoti hai.

// Tumne manually path diya hai:
// "./.env" → current project root me wali .env file load karo.

// ek aur tarika hai import krke krne ka
import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({
    path: "./.env"
});
connectDB();