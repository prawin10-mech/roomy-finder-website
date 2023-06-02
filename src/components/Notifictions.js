import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "../firebase/index";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  const notify = () => {
    let receivedNotifications = localStorage.getItem("notifications");

    if (receivedNotifications) {
      receivedNotifications = JSON.parse(receivedNotifications);
      receivedNotifications = [...receivedNotifications, notification];
    } else {
      receivedNotifications = [notification];
    }

    localStorage.setItem(
      "notifications",
      JSON.stringify(receivedNotifications)
    );

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

  useEffect(() => {
    if (notification?.title) {
      notify();
      console.log("notified");
    }
  }, [notification]);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log("notification received");
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
          time: Date.now(),
          id: Math.random() * 120,
        });
      })
      .catch((err) => console.log("failed: ", err));
  }, [notification]);

  return <Toaster position="top-right" />;
};

export default Notification;
