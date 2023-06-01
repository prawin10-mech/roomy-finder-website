// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAObyh2MPBu_Wui39tuQebVwwQEsgH_P-g",
  authDomain: "roomy-finder.firebaseapp.com",
  projectId: "roomy-finder",
  storageBucket: "roomy-finder.appspot.com",
  messagingSenderId: "274087124726",
  appId: "1:274087124726:web:35b36ff1662386b99d96d7",
  measurementId: "G-2DXF87HE7B",
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
