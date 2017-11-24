var express = require("express");
var app = express();

app.use('/chat?',express.static(__dirname + "/public"));

app.listen(4000, function() {
    console.log("success connect to port 4000");
});