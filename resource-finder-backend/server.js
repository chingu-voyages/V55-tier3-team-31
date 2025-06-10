import express from "express";
import mongoose from "mongoose";
import session from "express-session";

import passport from "passport";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const corsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173', 
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  };

import "./auth/passport.js";

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
app.use(userRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Mongo DB Connected")
}).catch((e) => console.log("Error", e))

app.get("/", (req, res) => {
    res.send("Welcome to Resource Finder")
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})


