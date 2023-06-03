import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("ff", payload);
      resolve(payload);
    });
  });
};

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BO-3_Aq1CRnqPI0niMrqFo1SPUnl2qX9aUgwo1UWpeqLkZv9KloLGSHL6xxxY3_-qVh1KGusHtrh4Xs_gW2T7tc",
    forceRefresh: true,
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
