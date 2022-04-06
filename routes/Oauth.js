const router = require('express').Router();
const User = require('../models/User');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const isAuthenticated = require('./isAuthenticated');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/users/google-login",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToke, email, cb) {
    User.findOrCreate(
      { googleId: email.id, 
        name: email.displayName, 
        email: email.emails[0].value 
      }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get('/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google-login', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    const token = jwt.sign({_id: req.user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});


router.get("/protected", isAuthenticated, (req, res)=>{
  res.send("working")
});

module.exports = router;