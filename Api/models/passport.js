const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      console.log(profile);
      const obj = {
        userName: profile._json.name,
        email: profile._json.email,
        googleId: profile._json.sub,
      };
      callback(null, obj);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const obj = {
        userName: profile.displayName,
        facebookId: profile.id,
      };
      // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
         cb(null, obj);
      // });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const obj = {
        userName: profile._json.name,
        githubId: profile._json.id,
        email:profile._json.email
      };
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      cb(null, obj);
      // });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
