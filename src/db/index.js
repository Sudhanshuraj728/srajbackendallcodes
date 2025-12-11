import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(
            `${process.env.MONGODBM_URI}/${DB_NAME}`)
            console.log(`\n MongoDB connected !! DB Host : ${connectioninstance.connection.host}`);
            // connectioninstance ek object hota hai, string nahi.
            // Isliye console.log("DB Host :", connectioninstance) ka output host ki jagah pura object dump karega.
    } catch (error){
        console.error("Error while connecting to mongoDB", error);
        process.exit(1); // Exit process with failure
    }

}
export default connectDB;
// same code with promises
// const connectDB = () => {
//     mongoose.connect(`${process.env.MONGODBM_URI}/${DB_NAME}`)
//         .then((connectioninstance) => {
//             console.log("MongoDB connected !!");
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//             process.exit(1);
//         });
// };

// exit 1 means failure ab uske niche ka code nhi chalega try block me error aane pe

// import mongoose from "mongoose";
// — Yahan mongoose library import ho rahi hai. Mongoose Node.js ka MongoDB ODM (Object Data Modeling) tool hai — woh MongoDB se connect karne, schemas/models banane, aur DB operations ko easy bana deta hai.

// import { DB_NAME } from "./constants";
// — Yeh line ./constants file se ek named export DB_NAME le rahi hai. DB_NAME string hogi (jaise "myappdb"), jo connect karte waqt database ka naam specify karegi.

// const connectDB = async () => {
// — Ek async arrow function define kiya gaya hai jiska naam connectDB hai. async isliye taaki andar await use kar sake — matlab asynchronous call (DB connect) ko synchronous style mein likh sakte hain.

// try {
// — try block start — isme wo code rakhenge jo error throw kar sakta hai (jaise DB connection fail). Agar error aaye to catch handle karega.

// const connectioninstance = await mongoose.connect(
// — mongoose.connect(...) ko call karke MongoDB se connection request bheji ja rahi hai. await ka matlab: yeh line tab tak aage nahi badhegi jab tak connection establish nahi ho jaata (ya error nahi aata).
// — connectioninstance mein jo value ayegi woh Mongoose ka connection object ya promise result hota hai — isme connection details, model methods etc. hoti hain.

// `${process.env.MONGODBM_URI}/${DB_NAME}`)


// — Yeh template literal hai jo connection string banata hai.

// process.env.MONGODBM_URI environment variable se MongoDB server URI liya ja raha hai (jaise mongodb://localhost:27017 ya atlas ka URI).

// / ke baad ${DB_NAME} jod ke final URI banta hai (example: mongodb://localhost:27017/myappdb).
// — Note: ensure MONGODBM_URI sahi set ho .env ya hosting environment mein.

// console.log(\n MongoDB connected !! DB Host : ${connectioninstance});
// — Agar connection successful hua, to console pe message print karega. Yahan ek cheez note karni hai: connectioninstance ek object hota hai — directly print karne pe aapko object ka representation milega (not just host). Agar aap sirf host/URI chahte ho to connectioninstance.connection.host ya connectioninstance.host (depending on Mongoose version) use karna better hai.
// — \n new line dalne ke liye hai.

// } catch (error){
// — Agar mongoose.connect ya try block mein koi bhi error aaye, control yahan aayega aur error variable mein woh exception milega.

// console.error("Error while connecting to mongoDB", error);
// — Error ko console pe print karta hai — useful for debugging. console.error red colored output deta hai in many terminals.

// process.exit(1); // Exit process with failure
// — Agar DB connect fail hua to process ko exit kar diya jaa raha hai with exit code 1 (non-zero means failure). Yeh typically server ko crash kar deta hai so that supervisor (pm2/systemd/Heroku) dobara restart kar sake.
// — Note: production mein aap graceful shutdown ya retry logic bhi rakh sakte ho — straight process.exit(1) se immediate exit hota hai.

// } (end of function)
// — Function close ho gaya. Is code mein connectDB ko export/ call karna zaroori hai kahin aur se use karne ke liye (e.g., await connectDB() in your server start script).