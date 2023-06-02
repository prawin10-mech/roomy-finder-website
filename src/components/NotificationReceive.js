import notification from "../assets/sounds/notification.wav";

const sendNotification = async (title, body, fcmToken) => {
  console.log("hello");

  // Define the sound file URL
  const soundFileUrl = notification;

  const playNotificationSound = () => {
    const audio = new Audio(soundFileUrl);
    audio.play();
  };

  const getNotification = async () => {
    //const fcmToken = await requestForToken();
    if (fcmToken) {
      fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "bearer AAAAP9DdnvY:APA91bHXKF1b-SoQmOwvU49nZ0lE8wcE6zitWELiu2DHI0mD9726NNVIB_CNPRURAHUIRxa1c4XTyhXxKb6ApciTEgPvxwlbwtXU4IdZ4WEyKiQrKKVR35zBEJdrOMsRmHY2dY6SBr0z",
        },
        body: JSON.stringify({
          to: fcmToken,
          notification: {
            title,
            body,
          },
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send notification");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Notification sent:", data);
          // Play the notification sound
          playNotificationSound();
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  };

  getNotification();
};

export default sendNotification;
