//Dependencies
const express = require('express');
const app = express();

const admin = require('firebase-admin');
const serviceAccount  = require('./chat-service-24935-firebase-adminsdk-dx7x3-f12d8c6b0d.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-service-24935.firebaseio.com"
});

//Send Messages
var registrationToken = "cbyyqBPF8YA:APA91bHIDCIfBSTrVUl2AxwFdIbvoWClsxIygyBOfNoYqqX78vJHs4YFG2VH4t-x8s0N4TItZsaA3Sjd30Nl822i63ap-qeUBal2D7YwUampM3PIUM11EDrgLsQNuc1OZ8Vbe-yZpD5_";
var payload = {
    data: {
        text: "Testing messages"
    }
};

admin.messaging().sendToDevice(registrationToken, payload)
.then(function (response) {
    console.log("Successfully sent message: ", response);
})
.catch(function (error) {
    console.log("Error sending message: ", error);
});

app.listen(3000, function () {console.log("Listening on port 3000")} );
