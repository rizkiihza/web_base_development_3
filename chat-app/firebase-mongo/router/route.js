const express = require('express');
const router = express.Router();
const Token = require('../models/token');
const mongoose = require("mongoose");

router.get('/tokenapp', (req, res, next) => {
    Token.find({},"user_id token", function(err, tokens){
        if(err)
            console.log(err);
        res.json(tokens);
    })
}); 

router.get('/tokenapp/:user_id', (req, res, next) => {
    Token.find({user_id: req.params.user_id},"user_id token", function(err, tokens){
        if(err)
            console.log(err);
        res.json(tokens);
    })
}); 

router.post('/tokenapp', (req, res, next) => {
    Token.remove({user_id: req.body.user_id}, function(){});
    let newToken = new Token({
        user_id: req.body.user_id,
        token: req.body.token,
    });

    newToken.save((err, token) => {
        if (err) {
            res.json({msg: "Failed to add token"});
        } else {
            res.json({msg: "token added successfully"});
        }
    })
});

module.exports = router; 