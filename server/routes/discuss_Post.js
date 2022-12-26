const router = require('express').Router();
const isAuthenticated = require('./isAuthenticated');
const discussPost = require('../models/DiscussPost');
const mongoose = require('mongoose');


router.get("/all", async (req,res)=>{
    const alldiscussPost = await discussPost.find();
    res.send(alldiscussPost);
});

router.post("/all", async (req,res)=>{
    
    /**
     *  
     *  check already that either the user liked post or not 
     */
     const discussPostByID = await discussPost.find({"likes.uid":{$exists:true, $eq: req.body.uid}});
     if(discussPostByID.length!=0){   // means already liked by this user
        const deleteLike = await discussPost.updateOne({_id:req.body.id},{
            $pull:{
                likes :{
                    uid: req.body.uid,
                }
            }
        });
        console.log("deleted");
     }else{
          /**
         * 
         * like update code 
         */
        const updateLike = await discussPost.updateOne({_id:req.body.id},{
            $push:{
                likes :{
                    uid: req.body.uid,
                }
            }
        });
        console.log("liked");
     }
    /**
     * 
     * fetch how many likes and send it to client side.
     */
    const likesHowmany = await discussPost.findById(req.body.id);
    // console.log("total likes : "+likesHowmany.likes.length);
    const like = likesHowmany.likes.length;
    res.send(""+like);
});

router.get("/:PostID", async (req,res)=>{
    const discussPostByID = await discussPost.findById(req.params.PostID);
    res.send(discussPostByID);
});

router.post("/commented",  async (req,res)=>{
    await discussPost.updateOne({_id:req.body.id},{
        $push:{
            comments :{
                _id: new mongoose.Types.ObjectId().toHexString(),
                user_posted:req.body.user_name,
                body:req.body.comment_body
            }
        }
    })
    res.send("success");
});



module.exports = router;