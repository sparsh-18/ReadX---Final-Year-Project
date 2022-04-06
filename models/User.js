const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 255   
    },

    googleId: {
        type: String
    },

    email: {
        type: String,
        min: 6,
        max: 255   
    },

    password: {
        type: String,
        min: 8,
        max: 1024   
    },

    exch_post: {
        type: Array
    },

    discuss_post: {
        type: Array
    }
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);