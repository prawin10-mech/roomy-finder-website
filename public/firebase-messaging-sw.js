// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDOKDwGmCMFHwYr_Evw0xjsxU6iJVy5R88",
  authDomain: "roomy-finder-website.firebaseapp.com",
  projectId: "roomy-finder-website",
  storageBucket: "roomy-finder-website.appspot.com",
  messagingSenderId: "166008900748",
  appId: "1:166008900748:web:c6a53572ac53a8163a3fa9",
  measurementId: "G-TQ7C6DR224",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
