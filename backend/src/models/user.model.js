const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true,
        minLength: 6
    },

    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        default: 'user'
    },

    avatar: {
        type: String,
        default: ''
    }

}, { timestamps: true });

const user = mongoose.model('User', userSchema);
module.exports = user;