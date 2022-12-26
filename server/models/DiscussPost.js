const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');



const discuss_postSchema = new mongoose.Schema({
    title:{
        type: String,
        min: 6,
        max: 255
    },
    body:{
        type: String,
        min:6,
        max:255
    },
    likes:[
       {
           uid:{
               type:String,
               unique: true
           }
       }
    ],
    user_posted:{
        // user object Id
        type: String
    },
    createdAt:{
        type:String
    },
    comments:[
       {
            _id:{
                type: String
            },
            user_posted:{
                type: String  
            },
            body:{
                type: String
            }
       } 
    ]
});

discuss_postSchema.plugin(findOrCreate);

module.exports = mongoose.model('discuss_post',discuss_postSchema);