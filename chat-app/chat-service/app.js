//Dependencies
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const admin = require('firebase-admin');
const serviceAccount  = require('./chat-service-24935-firebase-adminsdk-dx7x3-f12d8c6b0d.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-service-24935.firebaseio.com"
});

//Routing
app.post('/send', function (req, res) {
    let registrationToken = req.body.firebaseToken;
    let payload = req.body.payload;
    sendMessage(registrationToken, payload);
    console.log(req.body);
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

app.listen(3000, function () {console.log("Listening on port 3000")} );
