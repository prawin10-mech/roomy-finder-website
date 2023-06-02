import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "../firebase/index";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  const notify = () => {
    console.log("Notification received");
    toast(<ToastDisplay />);
  };

  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  const setupNotificationListener = () => {
    onMessageListener()
      .then((payload) => {
        console.log("Notification received");
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        });
      })
      .catch((err) => console.log("Failed: ", err));
  };

  useEffect(() => {
    setupNotificationListener();
  }, []);

  return <Toaster position="top-right" />;
};

export default Notification;
