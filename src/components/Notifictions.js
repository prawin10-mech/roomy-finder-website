import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "../firebase/index";
import notificationAudio from "../assets/sounds/notification.wav";
import { useDispatch } from "react-redux";
import { UserActions } from "../store/User";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [notificationReceived, setNotificationReceived] = useState(false);
  const dispatch = useDispatch();

  const notify = () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
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
        setNotificationReceived(!notificationReceived);
      })
      .catch((err) => console.log("failed: ", err));
  }, [notification]);

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
    console.log(notification);
    if (notification?.title === "message") {
      dispatch(UserActions.messageReceived);
    }
  }, [notificationReceived]);

  return <Toaster position="top-right" />;
};

export default Notification;
