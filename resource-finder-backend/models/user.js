import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId:String,
    githubId:String,
    name:String,
    interests:[{
        id:String,
        tag:String
    }],
    email:String,
})

const userModel = mongoose.model("User", userSchema);

export default userModel;