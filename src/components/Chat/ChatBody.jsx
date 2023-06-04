import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  InputBase,
  Dialog,
  IconButton,
  Tooltip,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachmentIcon from "@mui/icons-material/Attachment";
import axios from "axios";
import { onMessageListener } from "../../firebase/index";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatBody = ({ user, messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [messageReceived, setMessageReceived] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAttachmentType, setSelectedAttachmentType] = useState("");
  const [expandedMessages, setExpandedMessages] = useState([]);

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
      const newMessageSended = await onMessageListener();
      setMessageReceived(newMessageSended.data.payload);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
        {
          recieverFcmToken: user.other.fcmToken,
          recieverId: user.otherId,
          type: "text",
          body: newMessage,
        },
        { headers: { Authorization: token } }
      );
      setNewMessage("");

      const { data: updatedMessages } = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${user.otherId}`,
        { headers: { Authorization: token } }
      );
      setChatMessages(updatedMessages);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessageInputHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages`,
        { messageIds: [id] },
        { headers: { Authorization: token } }
      );

      console.log(data);
      // if (data) {
      //   const { data: updatedMessages } = await axios.get(
      //     `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${user.otherId}`,
      //     { headers: { Authorization: token } }
      //   );
      //   setChatMessages(updatedMessages);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setChatMessages(messages);
    scrollToBottom();
    getConversations();
  }, [messages, messageReceived]);

  // Component styles
  const styles = {
    container: {
      paddingBottom: "64px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#075e54",
      padding: "8px 16px",
      color: "#fff",
    },
    chatContainer: {
      height: "calc(100vh - 264px)",
      overflowY: "auto",
      padding: "16px",
    },
    messageContainer: {
      color: "#000",
      padding: "8px",
      borderRadius: "8px",
      marginBottom: "8px",
      alignSelf: "flex-start",
      maxWidth: "40%",
    },
    messageBody: {
      variant: "body1",
    },
    image: {
      maxWidth: "100%",
      cursor: "pointer",
    },
    selectedImage: {
      maxWidth: "100%",
      height: "auto",
    },
    inputContainer: {
      p: "4px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      zIndex: 1,
    },
    iconButton: {
      p: "10px",
    },
    input: {
      ml: 1,
      borderRadius: "20px",
      backgroundColor: "#fff",
      padding: "8px",
      flex: 1,
      marginRight: "8px",
    },
    sendButton: {
      p: "10px",
      color: "#075e54",
    },
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box>
          <Typography variant="body1" fontWeight={700}>
            {user?.other?.firstName} {user?.other?.lastName}
          </Typography>
        </Box>
        <Typography variant="body2">{user?.other?.type}</Typography>
      </Box>
      <Box sx={styles.chatContainer} ref={chatContainerRef}>
        {chatMessages
          .slice(0)
          .reverse()
          .map((message) => {
            const isCurrentUser = message?.senderId === user?.otherId;
            return (
              <Grid
                key={message.id}
                sx={{
                  ...styles.messageContainer,
                  backgroundColor: isCurrentUser ? "purple" : "blue",
                  marginLeft: isCurrentUser ? 0 : "auto",
                  marginRight: isCurrentUser ? "auto" : 0,
                }}
              >
                {message.body !== "Sent a image" &&
                  message.body !== "Sent a video" &&
                  message.body !== "Sent a file" && (
                    <Grid container justifyContent="space-between">
                      <Typography variant={styles.messageBody} color="white">
                        {message.body}
                      </Typography>
                      <Box
                        onClick={() => {
                          const isExpanded = expandedMessages.includes(
                            message.id
                          );
                          if (isExpanded) {
                            setExpandedMessages(
                              expandedMessages.filter((id) => id !== message.id)
                            );
                          } else {
                            setExpandedMessages([
                              ...expandedMessages,
                              message.id,
                            ]);
                          }
                        }}
                      >
                        {expandedMessages.includes(message.id) ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </Box>
                    </Grid>
                  )}
                {expandedMessages.includes(message.id) && (
                  <Box>
                    <IconButton
                      onClick={() => {
                        // Handle reply option
                      }}
                    >
                      <Tooltip title="Reply">
                        <ReplyIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDelete(message.id);
                      }}
                    >
                      <Tooltip title="Delete">
                        <DeleteIcon />
                      </Tooltip>
                    </IconButton>
                  </Box>
                )}
                {message.body === "Sent a image" && (
                  <Box>
                    <img
                      src={message.fileUri}
                      alt="Sent id"
                      style={styles.image}
                      onClick={() => setSelectedImage(message.fileUri)}
                    />
                  </Box>
                )}
                {message.body === "Sent a video" && (
                  <img
                    src={message.fileUri}
                    alt="Sent id"
                    style={styles.image}
                  />
                )}
                {message.body === "Sent a file" && (
                  <img
                    src={message.fileUri}
                    alt="Sent id"
                    style={styles.image}
                  />
                )}
              </Grid>
            );
          })}
        {selectedImage && (
          <Dialog
            onClose={() => setSelectedImage(null)}
            open={Boolean(selectedImage)}
          >
            <img
              src={selectedImage}
              alt="Selected"
              style={styles.selectedImage}
            />
          </Dialog>
        )}
      </Box>
      <Paper component="form" sx={styles.inputContainer}>
        <InputBase
          sx={styles.input}
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
          onClick={() => setOpenDialog(true)}
        >
          <input hidden accept="image/*" type="file" />
          <AttachmentIcon />
        </IconButton>
        <IconButton
          color="primary"
          sx={styles.sendButton}
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
