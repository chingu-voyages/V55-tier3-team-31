import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId:String,
    githubId:String,
    name:String,
    interests:[String],
    email:String,
})

const userModel = mongoose.model("User", userSchema);

export default userModel;