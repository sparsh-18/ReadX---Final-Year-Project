const express = require('express');
app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require("passport");
const cookiesession = require('cookie-session');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/User');



// -----------------------------configs------------------------------------------------

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// conneting to database
mongoose.connect(process.env.DB, {useNewUrlParser: true}, () =>
 {
     console.log('connected to db');
 });

app.use( // Initializing session
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    })
);

// Initializing passport js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    // console.log(user);
    done(null, user._id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        done(err, user._id);
    })
});
// --------------------------------------------------------------------------------------





// Using OAuth for Google Auth
const Oauth = require('./routes/Oauth');
app.use('/api/users', Oauth);

// using auth register login
const auth = require('./routes/auth');
app.use('/api/users', auth);



app.get("/", (req,res) => {
    console.log(req.user, req.session);
    res.send("success");
})

app.listen(3000, ()=> {
    console.log('server started');
})