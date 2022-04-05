const express = require('express');
app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require("passport");
const cookiesession = require('cookie-session');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(
    cookiesession({
        name: "session",
        keys: ["lama"],
        maxAge: 24*60*100
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    done(null, user);
});

const Oauth = require('./routes/Oauth');



app.use('/api/users', Oauth);


app.get("/", (req,res) => {
    res.send("failed login");
})

app.listen(3000, ()=> {
    console.log('server started');
})