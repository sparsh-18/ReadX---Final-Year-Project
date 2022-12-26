const router = require('express').Router();
const isAuthenticated = require('./isAuthenticated');
const Post = require('../models/ExchangePost');
const Comments = require("../models/DiscussPost");
const mongoose = require('mongoose');
const User = require('../models/User');



router.post("/exchangepost", async (req,res)=>{
    console.log(req.body);
    const post = new Post({
        book_name:req.body.book_name,
        author:req.body.author,
        user_posted:req.body.user_posted, 
        post_img:req.body.image_name,
        location: {
            type: "Point",
            coordinates: [Number(req.body.latitude),Number(req.body.longitude)]
        }
    }); 
    try{
        const savedPost = await post.save();
        res.send(post);
    }catch(err){
        res.send("some error");
    }
});

router.post("/discusspost", async (req,res)=>{

    const for_name = await User.findById(req.body.user_posted_comment);
    const root_user = await User.findById(req.body.user_posted);
    // for date time

    var currentdate = new Date(); 
    var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    // 
    const comment = new Comments({
        title: req.body.title,
        body:req.body.body,
        // likes: req.body.likes,
        user_posted:root_user.name,
        createdAt:datetime,
        comments:[{ _id: new mongoose.Types.ObjectId().toHexString(), user_posted: for_name.name, body:req.body.commentBody }]
    }); 
    try{
        const savedComment = await comment.save();
    }catch(err){
        res.send(400).send(err);
    }finally{
        res.send(comment);
    }
});



module.exports = router;