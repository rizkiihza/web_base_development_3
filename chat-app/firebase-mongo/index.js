var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var route = require('./router/route');

var app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/tokenapp');
mongoose.connection.on('connected', () => {
    console.log('connected to mongodb at port 27017');
})
mongoose.connection.on('error', (err) => {
    if(err)
        console.log('error connecting to mongodb' + err);
})

app.use('/token', route);

app.listen(3030, () =>{
    console.log('this is firebase mongo at port 3030');
});

