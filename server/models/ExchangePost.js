const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');


const exchnage_postSchema = new mongoose.Schema({
    book_name:{
        type: String,
        min: 6,
        max: 255
    },
    author: {
        type: String,
        min: 6,
        max: 255
    },
    user_posted:{
        type: String
    },
    post_img:{
        type: String,
        min: 6,
        max: 255
    },
    location:{
        type: {
            type: String
        },
        coordinates: {
            type: Array
        }
    }
});

exchnage_postSchema.index({location: '2dsphere'});

exchnage_postSchema.plugin(findOrCreate);

module.exports = mongoose.model('exchange_post',exchnage_postSchema);
