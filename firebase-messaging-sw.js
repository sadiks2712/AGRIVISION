importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
 apiKey: "AIzaSyDWKlPjG36LZLgEFlFNu1IekD8w7YUV2xw",
  authDomain: "smart-farmer-app-9ec35.firebaseapp.com",
  projectId: "smart-farmer-app-9ec35",
  messagingSenderId: "949307444606",
  appId: "1:949307444606:web:68d935b2829c0fee4ff72f",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body
    }
  );
});
