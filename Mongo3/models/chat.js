const mongoose = require('mongoose');

// schema
const chat_Schema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxLength: 150
    },
    created_at: {
        type: Date,
        required: true
    }
})

// model
const Chat = mongoose.model("Chat",chat_Schema);

module.exports = Chat;

