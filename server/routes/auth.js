const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('./isAuthenticated');

router.post('/register', async (req,res)=>{
    
    const exists = await User.findOne({email: req.body.email});
    if(exists) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body.password, salt);
    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        password: hash
    });
    try {
        const savedUser = await user.save();
        const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    } catch(err){
        res.send(400).send(err);
    }
});

router.post('/login', async (req,res)=>{

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exists');
    try{
        const valid = await bcrypt.compare(req.body.password, user.password);

        if(valid) {
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
            return res.header('auth-token', token).send({token:token,name:user.name,id:user._id});
        } else {
            return res.status(400).send('Incorrect Password');
        }

    } catch (err){
        res.status(400).send(err)
    }
});

// new Created
router.get("/:userId/", async (req,res)=>{
    const data =  await User.findById(req.params.userId);
    console.log(data);
    res.send(data);
});


module.exports = router;