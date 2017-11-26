const express = require('express');
const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    }
})

const contact = module.exports = mongoose.model('chat', chatSchema);