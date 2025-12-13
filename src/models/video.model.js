import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
        videoFile:{
            type: String, //cloudinary ka url hoga
            required: true,
        },
        thumbnail:{
            type: String, //cloudinary ka url hoga
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        duration:{
            type: Number, // in seconds
            required: true,
        },
        views:{
            type: Number,
            default: 0,
        },
        isPublished:{
            type: Boolean,
            default: true,
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {    
        timestamps: true
    }
)

export const Video = mongoose.model("Video", videoSchema);
// Video model ban gaya ab isko use krke video create kr skte h database me 
// mongoose videoschema use krke Video model banaya hai aur usko export kiya hai taaki kahi aur use kr ske aur database ka kaam jo hoga vo videos hoga 
// Mongoose ko bol rahe ho:
// “Is schema ke basis par ek model class bana do jiska naam Video ho”
// "Video" model se MongoDB me videos collection ban jaata hai