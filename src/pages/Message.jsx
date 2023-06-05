import React, { useEffect, useState } from "react";
import Notification from "../components/Notifictions";

const Message = () => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(!render);
  });
  return <Notification />;
};

export default Message;
