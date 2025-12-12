import express from express;
import cors from cors;
// (Cross-Origin Resource Sharing) Jab frontend aur backend alag ports/domains par hote hain,browser security reason se request block kar deta hai.
import cookieParser from cookie-parser; 
// cookie-parser ek Express middleware hai jo browser se aane wali cookies ko read/parse kar deta hai.
const app = express();


// use method saare kind ke middleware ko register karne ke liye use hota hai express me
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    // matlab kaunse origins se requests allow karni hain
}));
// CORS middleware ko register kiya gaya hai taaki cross-origin requests allow ho sakein.
app.use(express.json({limit: "10kb"}));
//express.json() Yeh built-in middleware hai jo: request ki body (JSON format) ko parse karke req.body me convert karta hai.
// Yeh batata hai ki request body JSON ki maximum size kitni honi chahiye.Limit = 10 kb Matlab koi user 10 kilobyte se zyada data body me nahi bhej sakta Agar bheja → error milega:

