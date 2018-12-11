const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: { // We should remove this date in a near future as we are using timestamp here.
        type: Date,
        default: Date.now
    }
}, {
        timestamps: true
    });

module.exports = User = mongoose.model('users', UserSchema);