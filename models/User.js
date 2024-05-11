const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    index: String,
    name: String,
    age: String,
    phoneNumber: String,
    role: String,
    isAdmin: { type: Boolean, default: false },
    payment: String,
    attend: String,
    notes: [{
        text: String,
        createdBy: {
            type: String,
            ref: 'User'
        },
        modifiedBy: {
            type: String,
            ref: 'User'
        },
        dateCreated: { type: Date, default: Date.now },
        dateModified: { type: Date, default: Date.now }
    }],
    notes1: [{
        text: String,
        createdBy: {
            type: String,
            ref: 'User'
        },
        modifiedBy: {
            type: String,
            ref: 'User'
        },
        dateCreated: { type: Date, default: Date.now },
        dateModified: { type: Date, default: Date.now }
    }],
    notes2: [{
        text: String,
        createdBy: {
            type: String,
            ref: 'User'
        },
        modifiedBy: {
            type: String,
            ref: 'User'
        },
        dateCreated: { type: Date, default: Date.now },
        dateModified: { type: Date, default: Date.now }
    }],
    createdBy: {
        type: String,
        ref: 'User'
    },
    modifiedBy: {
        type: String,
        ref: 'User'
    },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;