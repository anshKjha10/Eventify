const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
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

    orgName: {
        type: String,
        required: true,
        trim: true
    },

    website: {
        type: String,
        trim: true,
        default: ''
    },

    gstNumber: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },

    role: {
        type: String,
        default: 'admin'
    },

    avatar: {
        type: String,
        default: ''
    }

}, { timestamps: true });

const Organizer = mongoose.model('Organizer', organizerSchema);
module.exports = Organizer;
