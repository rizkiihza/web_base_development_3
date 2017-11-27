const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');
const mongoose = require("mongoose");

router.get('/chatapp', (req, res, next) => {
    Chat.find({},"sender_id receiver_id message time", function(err, chats){
        if(err)
            console.log(err);
        res.json(chats);
    })
}); 

router.get('/chatapp/:sender_id/:receiver_id', (req, res, next) => {
    Chat.find({sender_id: req.params.sender_id, receiver_id: req.params.receiver_id},"sender_id receiver_id message time", function(err, chats){
        if(err)
            console.log(err);
        res.json(chats);
    })
}); 

router.post('/chatapp', (req, res, next) => {
    let newChat = new Chat({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        message: req.body.message,
        time: req.body.time
    });



    newChat.save((err, contact) => {
        if (err) {
            res.json({msg: "Failed to add chat"});
        } else {
            res.json({msg: "Chat added successfully"});
        }
    })
});

module.exports = router; 