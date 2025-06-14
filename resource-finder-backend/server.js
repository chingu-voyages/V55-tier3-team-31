import express from "express";
import mongoose from "mongoose";
import session from "express-session";

import passport from "passport";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import resourceRoutes from "./routes/resource.js";

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
app.use(cors(corsOptions));
app.use(express.json());

const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1)
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false,
    sameSite:'lax'
  }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
app.use(userRoutes);
app.use(resourceRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Mongo DB Connected")
}).catch((e) => console.log("Error", e))

app.get("/", (req, res) => {
    res.send("Welcome to Resource Finder")
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})


