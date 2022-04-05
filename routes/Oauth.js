const router = require('express').Router();
require('dotenv').config();

const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "442461666891-qjvnuvnftt0r44u4r52jcefoq8er6fid.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/api/users/google-login",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToke, email, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log(email.displayName, email.emails[0].value);
    return done(null, email);
  }
));


router.get('/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google-login', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    
    res.send('success');
});


module.exports = router;