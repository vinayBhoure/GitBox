const passport = require("passport");
require("dotenv").config();
const GitHubStrategy = require("passport-github2").Strategy;
const userSchema = require("../models/userSchema ");

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
      callbackURL: "api/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await userSchema.findOne({ username: profile.username });
      // signup
      if (!user) {
        const newUser = new User({
          name: profile.displayName,
          username: profile.username,
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos[0].value,
          likedProfiles: [],
          likedBy: [],
        });
        await newUser.save();
        done(null, newUser);
      } else {
        // login
        done(null, user); // {error, payload}
      }
    }
  )
);
