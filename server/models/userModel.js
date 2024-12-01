import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","instructor"],
        default:"student"
    },
    enrolledCourses:[
        {   
            // yaha par hum Course model ke courses ka id rakhege 
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course' // courses model me se courses ka id rakhege
        }
    ],
    photoUrl:{
        type:String,
        default:""
    }
},{timestamps:true}); // timeStamps add krdiye hai, is se time related fields add hojayege schema me like created at, updated at

export const User = mongoose.model("User",userSchema);

