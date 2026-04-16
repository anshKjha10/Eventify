const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
    },

    category: {
        type: String,
        required: true,
        enum: ['Music', 'Sports', 'Tech', 'Art', 'Food', 'Education', 'Health', 'Other']
    },

    image: {
        type: String,
        
    },

    date: {
        type: Date,
        required: true
    },

    location: {
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        address: {
            type: String,
        }
    },

    price: {
        type: Number,
        default: 0
    },

    maxSeats: {
        type: Number,
        required: true
    },

    availableSeats: {
        type: Number,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const event = mongoose.model('Event', eventSchema);
module.exports = event;