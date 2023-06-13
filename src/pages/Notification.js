import { Avatar, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const notificationStyle = {
  container: {
    backgroundColor: "#F0ECF6",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "25px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  body: {
    marginBottom: "8px",
  },
  time: {
    color: "#888888",
    marginBottom: "16px",
  },
  deleteButton: {
    display: "flex",
    backgroundColor: "#ff0000",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#cc0000",
    },
  },
  hr: {
    height: "1px",
    backgroundColor: "#888888",
    border: "none",
    margin: "10px 0",
  },
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  
  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
      );
      sessionStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
        );
        setNotifications(updatedNotifications);
      };
      
      const notificationData = notifications?.map((notification) => {
        const time = new Date(notification.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        console.log("notification on page",notification);

    return (
      <Grid key={notification.id} sx={notificationStyle.container}>
        <Grid container justifyContent={"space-between"}>
          <Typography sx={notificationStyle.title}>
            {notification.title}
          </Typography>
          <Typography sx={notificationStyle.time}>{time}</Typography>
        </Grid>
        <hr style={notificationStyle.hr} />
        <Typography sx={notificationStyle.body}>{notification.body}</Typography>
        <hr style={notificationStyle.hr} />
        <Grid
          container
          justifyContent={"flex-end"}
          onClick={() => deleteNotification(notification.id)}
        >
          <Avatar sx={notificationStyle.deleteButton}>
            <DeleteIcon />
          </Avatar>
        </Grid>
      </Grid>
    );
  });

  useEffect(() => {
    const storedNotifications = JSON.parse(
      sessionStorage.getItem("notifications")
    );
    if (storedNotifications) {
      setNotifications(storedNotifications?.reverse() || []);
    }
  }, []);

  return (
    <Grid
      container
      justifyContent={"center"}
      sx={{ width: "100%", margin: "auto" }}
    >
      <Grid item xs={12} sm={10} md={8} sx={{}}>
        {notificationData}
      </Grid>
    </Grid>
  );
};

export default Notification;
