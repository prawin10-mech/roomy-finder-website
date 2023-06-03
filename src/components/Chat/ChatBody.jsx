import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import axios from "axios";

const ChatBody = ({ user, messages, newMessage }) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState(""); // Define message input state
  const chatContainerRef = useRef(null);

  const token = localStorage.getItem("token");

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const getConversations = async () => {
    try {
      const { data } = await axios.get(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/conversations",
        { headers: { Authorization: token } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setChatMessages(messages);
    scrollToBottom();
    getConversations();
  }, [messages]);

  useEffect(() => {
    if (newMessage) {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    }
  }, [newMessage]);

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
        {
          recieverFcmToken: user.other.fcmToken,
          recieverId: user.otherId,
          type: "text",
          body: messageInput, // Use messageInput state instead of newMessage
        },
        { headers: { Authorization: token } }
      );
      setChatMessages((prevMessages) => [...prevMessages, data]);
      setMessageInput(""); // Clear the message input
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessageInputHandler = (e) => {
    setMessageInput(e.target.value); // Update messageInput state
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box sx={{ paddingBottom: "64px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#075e54",
          padding: "8px 16px",
          color: "#fff",
        }}
      >
        <Box>
          <Typography variant="body1" fontWeight={700}>
            {user?.other?.firstName} {user?.other?.lastName}
          </Typography>
        </Box>
        <Typography variant="body2">{user?.other?.type}</Typography>
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 264px)",
          overflowY: "auto",
          padding: "16px",
        }}
        ref={chatContainerRef}
      >
        {chatMessages
          .slice(0)
          .reverse()
          .map((message) => {
            const isCurrentUser = message?.senderId === user?.otherId;
            return (
              <Grid
                key={message.id}
                sx={{
                  backgroundColor: isCurrentUser ? "purple" : "blue",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  alignSelf: isCurrentUser ? "flex-start" : "flex-end",
                  marginLeft: isCurrentUser ? 0 : "auto",
                  marginRight: isCurrentUser ? "auto" : 0,
                  maxWidth: "40%",
                }}
              >
                <Typography variant="body1">{message.body}</Typography>
              </Grid>
            );
          })}
      </Box>

      <Paper
        component="form"
        sx={{
          p: "4px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          zIndex: 1,
        }}
      >
        <IconButton
          sx={{ p: "10px" }}
          aria-label="menu"
          onClick={() => setOpenEmoji(!openEmoji)}
        >
          <SentimentDissatisfiedIcon />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            borderRadius: "20px",
            backgroundColor: "#fff",
            padding: "8px",
            flex: 1,
            marginRight: "8px",
          }}
          placeholder="Type a message"
          value={newMessage}
          inputProps={{ "aria-label": "" }}
          onChange={sendMessageInputHandler}
          onKeyDown={handleKeyDown}
        />

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <AttachmentIcon />
        </IconButton>
        <IconButton
          color="primary"
          sx={{ p: "10px", color: "#075e54" }}
          aria-label="directions"
          onClick={sendMessage}
        >
          <SendRoundedIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatBody;
