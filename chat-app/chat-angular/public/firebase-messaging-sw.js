importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyCrKohsg5JvT4jQtF7rovKFaedf-ewfVd4",
    authDomain: "chat-app-wbd3.firebaseapp.com",
    databaseURL: "https://chat-app-wbd3.firebaseio.com",
    projectId: "chat-app-wbd3",
    storageBucket: "",
    messagingSenderId: "452250212374"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
  });