import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "../firebase/index";
import notificationAudio from "../assets/sounds/notification.wav";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isFirstEffectComplete, setIsFirstEffectComplete] = useState(false);

  const notify = () => {
    console.log("notified");

    let receivedNotifications = sessionStorage.getItem("notifications");
    const audio = new Audio(notificationAudio);
    audio.play();

    if (receivedNotifications) {
      receivedNotifications = JSON.parse(receivedNotifications);
      receivedNotifications = [...receivedNotifications, notification];
    } else {
      receivedNotifications = [notification];
    }

    sessionStorage.setItem(
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
    onMessageListener()
      .then((payload) => {
        console.log("notification received");
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
          time: Date.now(),
          id: Math.random() * 120 * Math.random(),
        });
      })
      .catch((err) => console.log("failed: ", err))
      .finally(() => {
        setIsFirstEffectComplete(true);
      });
  }, []);

  useEffect(() => {
    if (isFirstEffectComplete && notification?.title) {
      notify();
    }
  }, [notification, isFirstEffectComplete]);

  return <Toaster position="top-right" />;
};

export default Notification;
