importScripts('/__/firebase/3.9.0/firebase-app.js');
importScripts('/__/firebase/3.9.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

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