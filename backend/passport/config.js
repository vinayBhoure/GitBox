const passport = require("passport");
require("dotenv").config();
const GitHubStrategy = require("passport-github2").Strategy;
const userSchema = require('../models/userSchema');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
     const user = await userSchema.findOne({ username: profile.username });

     if(!user){
      const newUser = new userSchema({
        username: profile.username,
        name: profile.displayName,
        profile_url: profile.profileUrl,
        avatar_url: profile.photos[0].value,
        liked_profile: [],
        liked_by: [],
      });
      
      await newUser.save();
      done(null, newUser);
     }else{
      done(null, user);
     }
    }
  )
);
