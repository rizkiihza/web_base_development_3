const express = require('express');
const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
})

const token = module.exports = mongoose.model('token', tokenSchema);