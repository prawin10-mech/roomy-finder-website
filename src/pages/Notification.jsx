import { Alert } from '@mui/material';
import React from 'react'
import firebase, { messaging, onMessageListener } from "../firebase/index";

const Notification = () => {
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({ title: "", body: "" });

    onMessageListener()
      .then((payload) => {
        console.log(payload, "payload");
        setShow(true);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
        alert(payload.notification.title)
        // <Alert severity="success" color="info">
        //   Title:payload.notification.title
        // </Alert>;
      })
      .catch((err) => console.log("failed: ", err));

  return (
    <div>Notification</div>
  )
}

export default Notification