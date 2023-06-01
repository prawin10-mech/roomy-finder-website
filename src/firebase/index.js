import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyDe-b_VnsstZIZlDdMYI_7ZH32Tt95W_Gs",
//   authDomain: "chat-app-4cb99.firebaseapp.com",
//   projectId: "chat-app-4cb99",
//   storageBucket: "chat-app-4cb99.appspot.com",
//   messagingSenderId: "546063757071",
//   appId: "1:546063757071:web:d92ef71b93d067d601987a",
//   measurementId: "G-C54WL2VRHP",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDOKDwGmCMFHwYr_Evw0xjsxU6iJVy5R88",
  authDomain: "roomy-finder-website.firebaseapp.com",
  projectId: "roomy-finder-website",
  storageBucket: "roomy-finder-website.appspot.com",
  messagingSenderId: "166008900748",
  appId: "1:166008900748:web:c6a53572ac53a8163a3fa9",
  measurementId: "G-TQ7C6DR224",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(payload);
      resolve(payload);
    });
  });

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BDFMJMNRmeNZgfbB2cjX8d_GVmrroRCSY2F2t5mqoUbH_DOqsDo6WZ2FUE3hCSjBhKxchMso1mOZ-RkJu1pTaHc",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
export default app;
