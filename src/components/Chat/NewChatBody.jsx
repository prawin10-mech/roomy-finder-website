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
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";
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

import { onMessageListener } from "../../firebase/index";
import sendNotification from "../NotificationReceive";



const NewChatBody = () => {
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
  const [newValueAdd, setnewValueAdd] = useState("");
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [loadData, setloadData] = useState(10);
  const [showLoadMore, setshowLoadMore] = useState(false);

  const chatContainerRef = useRef(null);
  const token = localStorage.getItem("token");

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const location = useLocation();
  const data12 = location.state;

  useEffect(() => {
    console.log("onMessageListener",onMessageListener());
    const fetchNewMessage = async () => {
      const newMessage = await onMessageListener();
      console.log("tt",newMessage);
      setMessageReceived(newMessage);
    };

    if (messageReceived) {
      fetchNewMessage();
    }
  }, [messageReceived]);

  // get all message
  const getAllmessage = async () => {
    if (data12.type === "roommate") {
      const updatedMessages = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${data12.property.poster.id}`,
        { headers: { Authorization: token } }
      );
      if (updatedMessages.data.length > 10) {
        setshowLoadMore(true);
      }
      setChatMessages(updatedMessages.data);
    } else {
      const updatedMessages = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${data12.property.client.id}`,
        { headers: { Authorization: token } }
      );

      if (updatedMessages.data.length > 10) {
        setshowLoadMore(true);
      }
      setChatMessages(updatedMessages.data);
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    // if(chatMessages.length>10){
    //   setshowLoadMore(true)
    // }
  };

  // const MobileOtpSend = async()=>{
  //   const res = await axios.post("http://roomy-finder-evennode.ap-1.evennode.com/api/v1/auth/verify-otp-code",{
  //     "phone" : "+917899876574"
  // })
  // console.log("res",res);
  // }

  useEffect(() => {
   

    const intervalId = setInterval(getAllmessage, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // let test1 = true
    if(messageReceived){

      onMessageListener()
        .then((payload) => {
          // newValueAdd,
          setnewValueAdd(payload.data.payload);
          console.log("message chat received", payload.data.payload);
          setNotification({
            title: payload?.notification?.title,
            body: payload?.notification?.body,
            time: Date.now(),
            id: Math.random() * 120,
          });
        })
        .catch((err) => console.log("failed: ", err));
    }else{

      const intervalId = setInterval(getAllmessage, 2000);

    return () => {
      clearInterval(intervalId);
    };
    }

    scrollToBottom();
    getAllmessage();
    if (chatMessages.length > 10) {
      setshowLoadMore(true);
    }
  }, [notification]);

  // mera------------

  const sendMessage = async () => {
    try {
      if (data12.type === "roommate") {
        if (type === "text") {
          const { data } = await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.poster.fcmToken,
              recieverId: data12.property.poster.id,
              type: "text",
              body: newMessage,
            },
            { headers: { Authorization: token } }
          );

          sendNotification(
            "Conversation",
            `${newMessage}`,
            data12.property.poster.fcmToken,
            `https://roomyfinder.vercel.app/chat`,
            "null"
          );
          setIsReplied(false);
          setNewMessage("");

          setRepliedMessage("");
          // getMessages();
        }

        if (type === "image") {
          await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.poster.fcmToken,
              recieverId: data12.property.poster.id,
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
            `Send a image`,
            data12.property.poster.fcmToken,
            `https://roomyfinder.vercel.app/chat`,
            `${selectedFileURL}`
          );

          setSelectedFileUrl("");
          setIsReplied(false);
          setType("text");
          setNewMessage("");
          setRepliedMessage("");
          // getMessages();
        }

        if (type === "video") {
          await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.poster.fcmToken,
              recieverId: data12.property.poster.id,
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
            `Send a video`,
            data12.property.poster.fcmToken,
            `https://roomyfinder.vercel.app/chat`,
            "null"
          );

          setSelectedFileUrl("");
          setIsReplied(false);
          setType("text");
          setNewMessage("");
          setRepliedMessage("");
          // getMessages();
        }

        if (type === "file") {
          await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.poster.fcmToken,
              recieverId: data12.property.poster.id,
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
            `Sent a file`,
            data12.property.poster.fcmToken,
            `https://roomyfinder.vercel.app/chat`,
            "null"
          );

          setSelectedFileUrl("");
          setIsReplied(false);
          setType("text");
          setNewMessage("");
          setRepliedMessage("");
          // getMessages();
        }

        const { data: updatedMessages } = await axios.get(
          `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${data12.property.poster.id}`,
          { headers: { Authorization: token } }
        );
        setChatMessages(updatedMessages);
      }

      // check landlord
      if (data12.type !== "roommate") {
        // check type is file or text
        if (type === "text") {
          await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.client.fcmToken,
              recieverId: data12.property.client.id,
              type: "text",
              body: newMessage,
            },
            { headers: { Authorization: token } }
          );
          setIsReplied(false);
          setNewMessage("");

          setRepliedMessage("");
          // getMessages();
        }

        if (type === "image") {
          await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.client.fcmToken,
              recieverId: data12.property.client.id,
              type,
              body: "Sent a image",
              fileUri: selectedFileURL,
              fileName: fileName,
              fileSize: fileSize,
            },
            { headers: { Authorization: token } }
          );

          setSelectedFileUrl("");
          setIsReplied(false);
          setType("text");
          setNewMessage("");
          setRepliedMessage("");
          // getMessages();
        }

        if (type === "video") {
          await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.client.fcmToken,
              recieverId: data12.property.client.id,
              type,
              body: "Sent a video",
              fileUri: selectedFileURL,
              fileName: fileName,
              fileSize: fileSize,
            },
            { headers: { Authorization: token } }
          );

          setSelectedFileUrl("");
          setIsReplied(false);
          setType("text");
          setNewMessage("");
          setRepliedMessage("");
          // getMessages();
        }

        if (type === "file") {
          await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.client.fcmToken,
              recieverId: data12.property.client.id,
              type,
              body: "Sent a file",
              fileUri: selectedFileURL,
              fileName: fileName,
              fileSize: fileSize,
            },
            { headers: { Authorization: token } }
          );

          setSelectedFileUrl("");
          setIsReplied(false);
          setType("text");
          setNewMessage("");
          setRepliedMessage("");
          // getMessages();
        }

        const { data: updatedMessages } = await axios.get(
          `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${data12.property.client.id}`,
          { headers: { Authorization: token } }
        );
        setChatMessages(updatedMessages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // uska=============

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

        // getMessages();
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
      height: "100pt ",
      // paddingBottom: "64px",
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
      // height: "calc(100vh )",
      height: "calc(100vh - 200px)",
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
      alignItems: "end",
      backgroundColor: "#f0f0f0",
      zIndex: 1,
      flexShrink: 0,
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
  console.log(showLoadMore);
  console.log(loadData);
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box>
          <Typography variant="body1" fontWeight={700}>
            {data12.type === "roommate"
              ? `${data12?.property.poster?.firstName} ${data12?.property.poster?.lastName}`
              : `${data12?.property?.client?.firstName} ${data12?.property.client?.lastName}`}
          </Typography>
        </Box>
        <Typography variant="body2">
          {data12.type === "roommate"
            ? data12?.property?.poster?.type
            : data12.property?.client?.type}
        </Typography>
      </Box>
      <Box sx={styles.chatContainer} ref={chatContainerRef}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {showLoadMore && (
            <Button
              onClick={loadmoredata}
              sx={{ p: 2, borderRadius: "20px", width: "150px" }}
            >
              Load More
            </Button>
          )}
        </Box>
        {chatMessages
          .slice(0, loadData)
          .reverse()
          .map((message) => {
            const isCurrentUser =
              data12.type === "roommate"
                ? message?.senderId === data12?.property?.poster?.id
                : message?.senderId === data12?.property?.client?.id;
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
          elevation={24}
          sx={{
            width: { xs: "120px", md: "165px" },
            height: { xs: "150px", md: "150px" },
            position: "absolute",
            top: "55%",

            "@media (max-width: 325px)": {
              // left: "58%",
              right: 5,
            },
            "@media (max-width: 426px) and (min-width: 326px)": {
              // left: "60%",
              right: 5,
            },
            "@media (max-width: 769px) and (min-width: 427px)": {
              // left: "84%",
              right: 5,
            },
            "@media (max-width: 1025px) and (min-width: 770px)": {
              // left: "83%",
              right: 5,
            },
            "@media (max-width: 1445px) and (min-width: 1025px)": {
              // left: "87%",
              right: 5,
              top: "59%",
            },
            "@media (max-width: 2250px) and (min-width: 1445px)": {
              // left: "60%",
              right: 5,
              top: "70%",
            },
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

export default NewChatBody;
