const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventModel',
        required: true
    },

    registrationDate: {
        type: Date,
        default: Date.now
    }


}, { timestamps: true });

const registration = mongoose.model('Registration', registrationSchema);
module.exports = registration;