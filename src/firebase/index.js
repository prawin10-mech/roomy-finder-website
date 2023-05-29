import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDe-b_VnsstZIZlDdMYI_7ZH32Tt95W_Gs",
  authDomain: "chat-app-4cb99.firebaseapp.com",
  projectId: "chat-app-4cb99",
  storageBucket: "chat-app-4cb99.appspot.com",
  messagingSenderId: "546063757071",
  appId: "1:546063757071:web:d92ef71b93d067d601987a",
  measurementId: "G-C54WL2VRHP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

// ==================================================

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export default app;
