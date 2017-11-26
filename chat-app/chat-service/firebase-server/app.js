//Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const admin = require('firebase-admin');
const serviceAccount  = require('./chat-service-24935-firebase-adminsdk-dx7x3-f12d8c6b0d.json');
const http = require('http');
const request = require('request');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-service-24935.firebaseio.com"
});

//Routing
app.post('/send', function (req, res, next) {
    //API tokenapp digunakan untuk mendapatkan token firebase 
    var url='http://localhost:3030/token/tokenapp/' + req.body.user_id;
    
    //request ke API tokenapp
    request.get(url, (error, response, body) => {
        if (error) {
            res.json({"msg": error});
            console.log(error);
        }

        //parsing hasil dari get request
        let token_object = JSON.parse(body);
        console.log(token_object);

        //proses untuk mengrim pesan
        let registrationToken = token_object[0].token;
        let payload = req.body.payload;
        sendMessage(registrationToken, payload);
    })

    res.json({msg : "success"});
});


//Functions
function sendMessage(registrationToken, payload) {
    admin.messaging().sendToDevice(registrationToken, payload)
        .then(function (response) {
            console.log("Successfully sent message: ", response);
        })
        .catch(function (error) {
            console.log("Error sending message: ", error);
        });
}

app.listen(8080, function () {console.log("Listening on port 8080")} );
