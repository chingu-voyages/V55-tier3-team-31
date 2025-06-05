import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";;
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    console.log("This is Home");
    res.send("Home")
});

app.listen(process.env.PORT, () => {
    console.log(`App is runnung on PORT ${process.env.PORT}`)
})
