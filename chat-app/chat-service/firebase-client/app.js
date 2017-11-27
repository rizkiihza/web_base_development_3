var firebase = require("firebase-admin");

var config = {
    apiKey: "<API_KEY>",
    authDomain: "chat-service-24935.firebaseapp.com",
    databaseURL: "https://chat-service-24935.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
  };
  
firebase.initializeApp(config);

const messaging = firebase.messaging();
  

messaging.requestPermission()
.then(function () {
    console.log('Have permission');
    var token = messaging.getToken();
    console.log(token);
    return token;
})
.then(function (token) {
    console.log(token);
})
.catch(function(err) {
    console.log('Error occured.', err);
});

messaging.onMessage(function (payload) {
    console.log('On message', payload);
});