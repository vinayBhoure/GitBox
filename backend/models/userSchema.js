const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    profile_url:{
        type: String,
        required: true,
    },
    avatar_url:{
        type: String,
        
    },
    liked_profile: {
        type: [String],
        default: [],
    },
    liked_by:[
        {
            username: {
                type: String,
                required: true,
            },
            avatar_url: {
                type: String,
              
            },
            liked_date:{
                type: Date,
                default: Date.now,
            },
        },
    ]
  }, {timestamps: true}
);

const User = mongoose.model('User', userSchema);
module.exports = User;