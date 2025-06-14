import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GithubStrategy from "passport-github2";

import dotenv from "dotenv";
dotenv.config();
import userModel from "../models/user.js";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id).then(user => done(null, user));
});

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL_PRODUCTION : process.env.BACKEND_URL_LOCAL;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_API_KEY,
    callbackURL: `${BASE_URL}/auth/google/callback`, 
  }, async (accessToken, refreshToken, profile, done) => {
    let user = await userModel.findOne({ googleId: profile.id });
    if (!user) user = await userModel.create({ googleId: profile.id, name: profile.displayName });
    done(null, user);
  }));

  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_AUTH_API_KEY,
    callbackURL: `${BASE_URL}/auth/github/callback`, 
  }, async (accessToken, refreshToken, profile, done) => {
    let user = await userModel.findOne({ githubId: profile.id });
    if (!user) user = await userModel.create({ githubId: profile.id, name: profile.displayName });
    done(null, user);
  }));