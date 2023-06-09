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
  Avatar,
  Button,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachmentIcon from "@mui/icons-material/Attachment";
import axios from "axios";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/index";

import sendNotification from "../NotificationReceive";

import { onMessageListener } from "../../firebase/index";

const ChatBody = ({ user, messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [messageReceived, setMessageReceived] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFileURL, setSelectedFileUrl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAttachmentType, setSelectedAttachmentType] = useState("");
  const [videoUploading, setVideoUploading] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState([]);
  const [isReplied, setIsReplied] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [repliedMessage, setRepliedMessage] = useState("");
  const [type, setType] = useState("text");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [loadData, setloadData] = useState(10);
  const [showLoadMore, setshowLoadMore] = useState(false);

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
      console.log("data rendered");
      console.log(data);
      setChatMessages(data);
      if (data.length > 10) {
        setshowLoadMore(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user.otherId, token]);

  useEffect(() => {
    console.log("last");
    const fetchNewMessage = async () => {
      const newMessage = await onMessageListener();
      console.log("tt", newMessage);
      setMessageReceived(!messageReceived);
    };
    if (messageReceived) {
      fetchNewMessage();
    }
  }, [messageReceived]);

  useEffect(() => {
    setChatMessages(messages);
    console.log("middle");
    if (chatMessages.length > 10) {
      setshowLoadMore(true);
    }
    if (messages.length > 10) {
      setshowLoadMore(true);
    }
  }, [messages]);

  useEffect(() => {
    getMessages();
    console.log("last");
    if (chatMessages.length > 10) {
      setshowLoadMore(true);
    }
  }, [messageReceived]);

  const sendMessage = async () => {
    try {
      if (type === "text") {
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

        sendNotification(
          "Conversation",
          `${newMessage}`,
          user.other.fcmToken,
          `https://roomyfinder.vercel.app/directchat/${user.id}`,
          "null"
        );

        setIsReplied(false);
        setNewMessage("");

        setRepliedMessage("");
        getMessages();
      }
      if (type === "image") {
        console.log(user);
        await axios.post(
          "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
          {
            recieverFcmToken: user.other.fcmToken,
            recieverId: user.otherId,
            type,
            body: "Sent a image",
            fileUri: selectedFileURL,
            fileName: fileName,
            fileSize: fileSize,
          },
          { headers: { Authorization: token } }
        );

        sendNotification(
          "Conversation",
          `${"Sent a image"}`,
          user.other.fcmToken,
          `https://roomyfinder.vercel.app/directchat/${user.id}`,
          "null"
        );

        setSelectedFileUrl("");
        setIsReplied(false);
        setType("text");
        setNewMessage("");
        setRepliedMessage("");
        getMessages();
      }

      if (type === "video") {
        console.log(user);
        await axios.post(
          "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
          {
            recieverFcmToken: user.other.fcmToken,
            recieverId: user.otherId,
            type,
            body: "Sent a video",
            fileUri: selectedFileURL,
            fileName: fileName,
            fileSize: fileSize,
          },
          { headers: { Authorization: token } }
        );

        sendNotification(
          "Conversation",
          `${"Sent a video"}`,
          user.other.fcmToken,
          `https://roomyfinder.vercel.app/directchat/${user.id}`,
          "null"
        );

        setSelectedFileUrl("");
        setIsReplied(false);
        setType("text");
        setNewMessage("");
        setRepliedMessage("");
        getMessages();
      }

      if (type === "file") {
        console.log(user);
        await axios.post(
          "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
          {
            recieverFcmToken: user.other.fcmToken,
            recieverId: user.otherId,
            type,
            body: "Sent a file",
            fileUri: selectedFileURL,
            fileName: fileName,
            fileSize: fileSize,
          },
          { headers: { Authorization: token } }
        );

        sendNotification(
          "Conversation",
          `${"Sent a file"}`,
          user.other.fcmToken,
          `https://roomyfinder.vercel.app/directchat/${user.id}`,
          "null"
        );

        setSelectedFileUrl("");
        setIsReplied(false);
        setType("text");
        setNewMessage("");
        setRepliedMessage("");
        getMessages();
      }
    } catch (err) {
      console.log(err);
      //toast.error("Please send valid file", toastOptions);
    }
  };

  const handleImage = async (e) => {
    setType("image");
    setShowAttachmentMenu(false);
    const files = e.target.files;
    const file = files[0];
    setFileName(file.name);
    setFileSize(file.size);

    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              setSelectedFileUrl(url);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("Upload error", err);
        });
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  const handleVideo = async (e) => {
    setType("video");
    setVideoUploading(true);
    const file = e.target.files[0];

    try {
      const storageRef = ref(storage, `videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              setVideoUploading(false);
              setSelectedFileUrl(url);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("Upload error", err);
          setVideoUploading(false);
        });
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  const handleFile = async (e) => {
    setType("file");
    const file = e.target.files[0];

    try {
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              console.log("Upload complete");
              console.log(url);
              setSelectedFileUrl(url);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("Upload error", err);
        });
    } catch (error) {
      console.log("Error occurred", error);
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
    [token]
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

  // Component styles
  const styles = {
    container: {
      height: "75vh ",
      bgcolor: "",
      position: "relative",
      // paddingBottom: "64px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "8px 16px",
      color: "#fff",
    },
    chatContainer: {
      height: "calc(55vh)",
      overflowY: "auto",
      padding: "16px",
      overflowX: "hidden",
    },
    messageContainer: {
      color: "#000",
      padding: "8px",
      borderRadius: "20px",
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
  const loadmoredata = () => {
    if (chatMessages.length > 10) {
      setloadData(loadData + 10);
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Grid container alignContent="center">
          {/* <Box sx={{ mr: 2 }}>
            <Avatar>{user?.other?.firstName.split("")[0]}</Avatar>
          </Box> */}
          <Box sx={{ height: "100%", direction: "flex", alignItems: "center" }}>
            <Typography variant="body1" fontWeight={700} sx={{ color: "#000" }}>
              {user?.other?.firstName} {user?.other?.lastName}
            </Typography>
            <Typography variant="body1" fontWeight={500} sx={{ color: "#000" }}>
              From: {user?.other?.country}
            </Typography>
          </Box>
        </Grid>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{ color: "slateGrey" }}
        >
          {user?.other?.type}
        </Typography>
      </Box>
      <Box sx={styles.chatContainer} ref={chatContainerRef}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* <Paper elevation={16} sx={{display:"flex",justifyContent:"center",p:2,borderRadius:"20px",width:"150px"}}> */}

          {showLoadMore && (
            <Button
              onClick={loadmoredata}
              sx={{ p: 2, borderRadius: "20px", width: "150px" }}
            >
              Load More
            </Button>
          )}
          {/* </Paper> */}
        </Box>
        {chatMessages
          .slice(0, loadData)
          .reverse()
          .map((message) => {
            const isCurrentUser = message?.senderId === user?.otherId;
            return (
              <Grid container>
                {isCurrentUser && (
                  <Avatar>
                    {user.other.profilePicture ? (
                      <img src={user.other.profilePicture} alt="user profile" />
                    ) : (
                      user?.other?.firstName.charAt(0)
                    )}
                  </Avatar>
                )}
                <Grid
                  key={message.id}
                  sx={{
                    ...styles.messageContainer,
                    backgroundColor: isCurrentUser ? "#fff" : "purple",
                    marginLeft: isCurrentUser ? 0 : "auto",
                    marginRight: isCurrentUser ? "auto" : 0,
                  }}
                >
                  {message.body !== "Sent a image" &&
                    message.body !== "Sent a video" &&
                    message.body !== "Sent a file" && (
                      <Grid container justifyContent="space-between">
                        <Typography
                          variant={styles.messageBody}
                          color={isCurrentUser ? "#000" : "#fff"}
                        >
                          {message.body}
                        </Typography>
                        <Box
                          onClick={() => {
                            const isExpanded = expandedMessages.includes(
                              message.id
                            );
                            if (isExpanded) {
                              setExpandedMessages(
                                expandedMessages.filter(
                                  (id) => id !== message.id
                                )
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

                  {message.body === "Sent a image" && (
                    <Grid>
                      <Box>
                        <img
                          src={message.fileUri}
                          alt="Sent id"
                          style={styles.image}
                          onClick={() => setSelectedImage(message.fileUri)}
                        />
                        <Box
                          onClick={() => {
                            const isExpanded = expandedMessages.includes(
                              message.id
                            );
                            if (isExpanded) {
                              setExpandedMessages(
                                expandedMessages.filter(
                                  (id) => id !== message.id
                                )
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
                      </Box>
                    </Grid>
                  )}
                  {message.body === "Sent a video" && (
                    <Grid>
                      <Box>
                        <video
                          src={message.fileUri}
                          alt="Sent id"
                          //style={styles.video} // Assuming `styles.video` contains the necessary styles for the video element
                          onClick={() => setSelectedImage(message.fileUri)}
                          controls // Add the `controls` attribute to display video controls
                        />
                        <Box
                          onClick={() => {
                            const isExpanded = expandedMessages.includes(
                              message.id
                            );
                            if (isExpanded) {
                              setExpandedMessages(
                                expandedMessages.filter(
                                  (id) => id !== message.id
                                )
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
                      </Box>
                    </Grid>
                  )}

                  {message.body === "Sent a file" && (
                    <Grid>
                      <Box>
                        <a href={message.fileUri} download={message.fileName}>
                          <Typography sx={{ color: "#fff" }}>
                            <InsertDriveFileIcon
                              sx={{
                                marginRight: "0.5em",
                                verticalAlign: "middle",
                              }}
                            />
                            {message.type}
                          </Typography>
                        </a>

                        <Box
                          onClick={() => {
                            const isExpanded = expandedMessages.includes(
                              message.id
                            );
                            if (isExpanded) {
                              setExpandedMessages(
                                expandedMessages.filter(
                                  (id) => id !== message.id
                                )
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
                </Grid>
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
              setSelectedFileUrl("");
            }}
          >
            <CloseIcon />
          </Box>
        </Grid>
      )}

      <Grid sx={{ position: "relative" }}>
        {type === "image" && (
          <Grid
            container
            width={"100%"}
            justifyContent={"space-between"}
            p={"10px"}
            sx={{
              bgcolor: "#d8d8d8",
              borderRadius: "15px",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <img src={selectedFileURL} alt="send file" width="150px" />
            <Box
              onClick={() => {
                setShowAttachmentMenu(false);
                setSelectedFileUrl("");
                setType("text");
              }}
            >
              <CloseIcon />
            </Box>
          </Grid>
        )}
        {type === "video" && (
          <Grid
            container
            width={"100%"}
            justifyContent={"space-between"}
            p={"10px"}
            sx={{
              bgcolor: "#d8d8d8",
              borderRadius: "15px",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            {videoUploading ? (
              <div>Uploading...</div>
            ) : (
              <video src={selectedFileURL} alt="send file" width="150px" />
            )}
            <Box
              onClick={() => {
                setShowAttachmentMenu(false);
                setSelectedFileUrl("");
                setType("text");
              }}
            >
              <CloseIcon />
            </Box>
          </Grid>
        )}

        {type === "file" && (
          <Grid
            container
            width={"100%"}
            justifyContent={"space-between"}
            p={"10px"}
            sx={{
              bgcolor: "#d8d8d8",
              borderRadius: "15px",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <file src={selectedFileURL} alt="send file" width="150px" />
            <Box
              onClick={() => {
                setShowAttachmentMenu(false);
                setSelectedFileUrl("");
                setType("text");
              }}
            >
              <CloseIcon />
            </Box>
          </Grid>
        )}
      </Grid>

      {showAttachmentMenu && (
        <Paper
          // elevation={24}
          sx={{
            // width: { xs: "120px", md: "150px" },
            // height: { xs: "150px", md: "150px" },
            position: "absolute",
            bottom: { xs: "70px", md: "80px" },
            right: 0,

            // "@media (max-width: 325px)": {
            //   // left: "58%",
            //   top: "210%",
            //   // buttom: "-40px",
            //   right: 5,
            //   bottom: 0,
            // },
            // "@media (max-width: 426px) and (min-width: 326px)": {
            //   right: 5,
            //   top: "210%",
            // },
            // "@media (max-width: 769px) and (min-width: 427px)": {
            //   right: 5,
            //   top: "105%",
            // },
            // "@media (max-width: 1025px) and (min-width: 770px)": {
            //   right: 9,
            //   // buttom:-20,
            //   top: "99%",
            // },
            // "@media (max-width: 1445px) and (min-width: 1025px)": {
            //   right: "10%",
            //   // buttom:-20,
            //   top: "99%",
            // },
            // "@media (max-width: 2250px) and (min-width: 1445px)": {
            //   right: 5,
            //   top: "55%",
            // },
            zIndex: 10,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
                ml: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                document.getElementById("image-input").click();
              }}
            >
              <ImageIcon />
              <Typography variant="subtitle2" sx={{ m: 1 }}>
                Image
              </Typography>
              <input
                id="image-input"
                hidden
                accept="image/*"
                type="file"
                onChange={handleImage}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
                ml: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                document.getElementById("video-input").click();
              }}
            >
              <VideoCameraBackIcon />
              <Typography variant="subtitle2" sx={{ m: 1 }}>
                Video
              </Typography>
              <input
                id="video-input"
                hidden
                accept="video/*"
                type="file"
                onChange={handleVideo}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
                // ml: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                document.getElementById("file-input").click();
              }}
            >
              <InsertDriveFileIcon />
              <Typography variant="subtitle2" sx={{ m: 1 }}>
                File
              </Typography>
              <input id="file-input" hidden type="file" onChange={handleFile} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                ml: 2,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowAttachmentMenu(false);
                setSelectedFileUrl("");
              }}
            >
              <CloseIcon />
              <Typography variant="subtitle2" sx={{ m: 1 }}>
                Cancel
              </Typography>
            </Box>
          </Box>
        </Paper>
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
          aria-label="attachment"
          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
        >
          <AttachmentIcon />
        </IconButton>
        <IconButton
          sx={styles.iconButton}
          aria-label="send"
          onClick={sendMessage}
        >
          <SendRoundedIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatBody;
