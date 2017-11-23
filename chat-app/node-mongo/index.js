var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var route = require('./router/route');
var app = express();

//connecting to database mongodb
mongoose.connect('mongodb://localhost:27017/chatapp');

mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error', (err) => {
    if(err) {
        console.log('Error connecting to mongodb : ' + err); 
    }
});

//declare port
const port = 3000;

//adding middleware
app.use(cors());

//body parser
app.use(bodyparser.json());

//route
app.use("/chat", route);

//testing for localhost:3000/
app.get('/', (req, res) => {
    res.send('hello wbd');
})

//static file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log("server started at port: " + port);
})