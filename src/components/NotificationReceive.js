const sendNotification = async (title, body, fcmToken, link, imageUrl) => {
  console.log("hello");

  const getNotification = async () => {
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
            image: imageUrl,
          },
          data: {
            link,
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
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  };

  getNotification();
};

export default sendNotification;
