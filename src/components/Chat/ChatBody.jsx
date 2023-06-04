import React, { useState, useEffect, useRef, useCallback } from "react";
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
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const ChatBody = ({ user, messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [messageReceived, setMessageReceived] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAttachmentType, setSelectedAttachmentType] = useState("");
  const [expandedMessages, setExpandedMessages] = useState([]);
  const [isReplied, setIsReplied] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [repliedMessage, setRepliedMessage] = useState("");

  const chatContainerRef = useRef(null);
  const token = localStorage.getItem("token");

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const getMessages = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${user.otherId}`,
        { headers: { Authorization: token } }
      );
      setChatMessages(data);
    } catch (err) {
      console.log(err);
    }
  }, [user.otherId, token]);

  const sendMessage = useCallback(async () => {
    try {
      await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
        {
          recieverFcmToken: user.other.fcmToken,
          recieverId: user.otherId,
          type: "text",
          body: newMessage,
        },
        { headers: { Authorization: token } }
      );

      setIsReplied(false);
      setNewMessage("");
      setRepliedMessage("");

      getMessages();
    } catch (err) {
      console.log(err);
    }
  }, [user.other.fcmToken, user.otherId, newMessage, token, getMessages]);

  const sendMessageInputHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDelete = useCallback(
    async (id) => {
      try {
        await axios.delete(
          `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages`,
          { data: { messageIds: [id] }, headers: { Authorization: token } }
        );

        getMessages();
      } catch (err) {
        console.log(err);
      }
    },
    [token, getMessages]
  );

  const handleMessageReply = useCallback(
    async (id) => {
      setIsReplied(true);

      try {
        const { data } = await axios.get(
          `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/${id}`,
          { headers: { Authorization: token } }
        );

        setRepliedMessage(data.body);
      } catch (err) {
        console.log(err);
      }
    },
    [token]
  );

  useEffect(() => {
    setChatMessages(messages);
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
    getMessages();
  }, [getMessages]);

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
      width: "50px",
      color: "#075e54",
    },
    attachmentMenu: {
      position: "absolute",
      right: 0,
      bottom: "0",
      backgroundColor: "#fff",
      padding: "8px",
      borderRadius: "4px",
      boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
      zIndex: 1,
    },
    attachmentMenuItem: {
      cursor: "pointer",
      marginBottom: "4px",
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
                        handleMessageReply(message.id);
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
      {isReplied && (
        <Grid
          container
          width={"100%"}
          justifyContent={"space-between"}
          p={"10px"}
          sx={{
            bgcolor: "#d8d8d8",
            borderRadius: "15px",
            position: "relative",
            bottom: 0,
            right: 0,
          }}
        >
          <Typography sx={{}}>{repliedMessage}</Typography>
          <Box
            onClick={() => {
              setIsReplied(false);
              setRepliedMessage("");
            }}
          >
            <CloseIcon />
          </Box>
        </Grid>
      )}

      {showAttachmentMenu && (
        <Box sx={styles.attachmentMenu}>
          <Typography
            sx={styles.attachmentMenuItem}
            onClick={() => {
              setShowAttachmentMenu(false);
              // Handle sending picture
            }}
          >
            Send Picture
          </Typography>
          <Typography
            sx={styles.attachmentMenuItem}
            onClick={() => {
              setShowAttachmentMenu(false);
              // Handle sending video
            }}
          >
            Send Video
          </Typography>
          <Typography
            sx={styles.attachmentMenuItem}
            onClick={() => {
              setShowAttachmentMenu(false);
              // Handle sending file
            }}
          >
            Send File
          </Typography>
          <Typography
            sx={styles.attachmentMenuItem}
            onClick={() => setShowAttachmentMenu(false)}
          >
            Cancel
          </Typography>
        </Box>
      )}
      <Paper component="form" sx={styles.inputContainer}>
        <InputBase
          sx={styles.input}
          placeholder="Type a message"
          inputProps={{ "aria-label": "type a message" }}
          value={newMessage}
          onChange={sendMessageInputHandler}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          sx={styles.iconButton}
          aria-label="send"
          onClick={sendMessage}
        >
          <SendRoundedIcon />
        </IconButton>
        <IconButton
          sx={styles.iconButton}
          aria-label="attachment"
          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
        >
          <AttachmentIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatBody;
