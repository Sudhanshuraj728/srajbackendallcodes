import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    username: {
        type: String,
        required: true ,
        unique: true,
        lowercase:true,
        trim:true,
        index:true
        // index:true means ki is field pe index bna do taaki search fast ho jaye jha jha search krna padega vha vha index true krn denge
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname:{
        type: String,
        required: true,
        trim:true,  
        index:true
    },
    avatar:{
        type: String, //cloudinary ka url hoga
        required:true,
    },
    coverImage:{
        type: String, //cloudinary ka url hoga
    },
    watchHistory:{
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    password:{
        type: String,
        required: true,
    },
    refreshToken:{
        type: String,
    },
}, 
{
    timestamps: true
}
)

// is fn me hm password ko hash kr rhe hain save hone se pehle matlab jab bhi user create hoga ya update hoga to ye fn chalega aur password ko hash (encrypt) krke save karega database me
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password, 10);
        next();
    } else {
        return next();
    }
    // yha pe check kr rha h if condn ki password modify hua h ya nhi agr hua h to hi hash krke save krna h warna nhi krna h aur ye 10 salt rounds hote h jisse password hash hota h matlab jyada secure hota h agr password me kuch change nhi hua to next() krke aage badh jaoye next middleware pe phuch jayega if condn isliye use kiya kyuki maanlo user apna email update kr rha h to password ko firse hash krne ki jarurat nhi h 
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
    // ye fn compare krta h jo password user ne login krte waqt dala h aur jo password database me stored h usko compare krke true ya false return krta h
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
    // ye fn access token generate krta h jwt.sign se jisme user ka kuch data payload me jata h aur secret key se sign hota h aur expiry time set hota h
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {  
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,  
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
    // ye fn refresh token generate krta h jwt.sign se jisme sirf user ka id payload me jata h aur secret key se sign hota h aur expiry time set hota h
}   



export const User = mongoose.model("User", userSchema);
// User model ban gaya ab isko use krke user create kr skte h database me 
// mongoose userschema use krke User model banaya hai aur usko export kiya hai taaki kahi aur use kr ske aur database ka kaam jo hoga vo users hoga 
// Mongoose ko bol rahe ho:
// “Is schema ke basis par ek model class bana do jiska naam User ho”
// "User" model se MongoDB me users collection ban jaata hai

// pre hook ek middleware function hai jo kisi specific event se pehle execute hota hai.
// iske andar hum arroe fn nhi likhte kyuki arrow fn ko this ka context nhi milta isliye normal fn aur us fn ko perform hone me time lgta hai asynchronous operation hota hai isliye async use krte hain