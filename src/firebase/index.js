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
  apiKey: "AIzaSyAObyh2MPBu_Wui39tuQebVwwQEsgH_P-g",
  authDomain: "roomy-finder.firebaseapp.com",
  projectId: "roomy-finder",
  storageBucket: "roomy-finder.appspot.com",
  messagingSenderId: "274087124726",
  appId: "1:274087124726:web:35b36ff1662386b99d96d7",
  measurementId: "G-2DXF87HE7B",
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

        return currentToken;
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
