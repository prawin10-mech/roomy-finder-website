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

  const chatContainerRef = useRef(null);
  const token = localStorage.getItem("token");

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const location = useLocation();
  const data12 = location.state;


  // const getMessages = useCallback(async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${user.otherId}`,
  //       { headers: { Authorization: token } }
  //     );
  //     setChatMessages(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [user.otherId, token]);



  // get all message
  const getAllmessage = async () => {
    if (data12.type === "roommate") {
      const updatedMessages = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${data12.property.poster.id}`,
        { headers: { Authorization: token } }
      );
      console.log(updatedMessages.data, "updatedMessages the updatedMessages");
      setChatMessages(updatedMessages.data);
    } else {
      const updatedMessages = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${data12.property.client.id}`,
        { headers: { Authorization: token } }
      );

      console.log(updatedMessages.data, "updatedMessages the updatedMessages");
      setChatMessages(updatedMessages.data);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("789");
    }, 2000);
    getAllmessage();

    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    getAllmessage();
    // setChatMessages(messages);
    scrollToBottom();

    // getConversations();
  }, []);

  console.log(data12);

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
  
          setSelectedFileUrl("");
          setIsReplied(false);
          setType("text");
          setNewMessage("");
          setRepliedMessage("");
          // getMessages();
        }


        setNewMessageValue("");
        setvariabletype("")
        setnewFileName("")
        setnewFileSize("")
        setnotTextFile("")

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

        setNewMessageValue("");
        setvariabletype("")
        setnewFileName("")
        setnewFileSize("")
        setnotTextFile("")

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
    setnewFileName(file.name)
    setnewFileSize(file.size)
    setnotTextFile(e.target.files);
    // console.log(file.name,"file");
    // console.log(file.size,"file");

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
    setvariabletype("video");
    const files = e.target.files;
    const file = files[0];
    setnotTextFile(file)
    setnewFileName(file.name)
    setnewFileSize(file.size)


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
    setvariabletype("file");
    const files = e.target.files;
    const file = files[0];
    setnotTextFile(file)
    setnewFileName(file.name)
    setnewFileSize(file.size)


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

  const handleModelColse = () => {
    // setnewModele(false)
    setopengallery(false)
  }
  const deleteChat = () => {

  }

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

  // useEffect(() => {
  //   // setChatMessages(messages);
  //   scrollToBottom();
  // }, [messages]);

  // useEffect(() => {
  //   scrollToBottom();
  //   getMessages();
  // }, [getMessages]);

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
        {chatMessages
          .slice(0)
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
                    backgroundColor: isCurrentUser ? "blue" : "purple",
                    color: "#fff",
                    padding: "8px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    alignSelf: isCurrentUser ? "flex-start" : "flex-end",
                    marginLeft: isCurrentUser ? 0 : "auto",
                    marginRight: isCurrentUser ? "auto" : 0,
                    width: "fit-content",
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                    <Box sx={{ width: "80%", display: "flex", flexDirection: "row", pt: "5%", pb: "5%", pl: "10%" }}>

                      {message.type === "text" ? (
                        <Typography variant="body1">{message.body}</Typography>
                      ) : message.type === "image" ? (
                        <img
                          src={message.body}
                          alt={`${message.type}`}
                          style={{ width: 'fit-content', maxWidth: "700px", maxHeight: "400px" }}
                        />
                      ) : message.type === "video" ? (
                        <video
                          src={message.body}
                          controls
                          style={{ width: 'auto', height: 'auto', maxWidth: "700px", maxHeight: "400px" }}
                        />
                      ) : message.type === "file" ? (
                        <a href={message.body} download>
                          Download File
                        </a>
                      ) : null}

                    </Box>
                    <Box sx={{}}>
                      <Button onClick={() => setnewModele(true)}><KeyboardArrowDownIcon /></Button>
                    </Box>



                  </Box>

                </Grid>
              );
            })}
        {
          newModele && (<Paper sx={{ width: "100px", height: "100px", display: "flex", flexDirection: "column", position: "absolute", top: "50%", left: "50%" }}>
            <Button onClick={() => deleteChat()}> Delete</Button>
            <Button> Reply</Button>
            <Button onClick={() => setnewModele(false)}> Cancel</Button>

          </Paper>)
        }
        {(notTextFile.length > 0 && variabletype !== "text") && (
          <Grid container direction="row" justify="center" sx={{ width: "100%" }}>
            <Grid item  >
              <div style={{ position: "relative" }}>
                <img
                  src={notTextFile}
                  alt={` ${variabletype}`}
                  style={{ maxWidth: 150, maxHeight: 100 }}
                />
                <IconButton
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={handleDeleteImage}
                >
                  <Delete />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        )}


        {
          opengallery &&
          <Paper elevation={24} sx={{ width: "170px", height: "150px", position: "absolute", top: "55%", left: "84vw", zIndex: 10 }}>
            {/* <Paper elevation={24} sx={{ display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "end", mr: 3 }}> */}
            <Box sx={{
              bottom: 4, right: 4,
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mr: "40%"
            }}>


              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                  ml: 2,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onClick={() => {
                  document.getElementById('image-input').click();
                }}
              >
                <ImageIcon />
                <Typography variant="subtitle2" sx={{ m: 1 }}>Image</Typography>
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
                  alignItems: "center"
                }}
                onClick={() => {
                  document.getElementById('video-input').click();
                }}
              >
                <VideoCameraBackIcon />
                <Typography variant="subtitle2" sx={{ m: 1 }}>Video</Typography>
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
                  alignItems: "center"
                }}
                onClick={() => {
                  document.getElementById('file-input').click();
                }}
              >
                <InsertDriveFileIcon />
                <Typography variant="subtitle2" sx={{ m: 1 }}>File</Typography>
                <input
                  id="file-input"
                  hidden
                  type="file"
                  onChange={handleFile}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", ml: 2, justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={() => setopengallery(false)}>
                <CloseIcon />
                <Typography variant="subtitle2" sx={{ m: 1 }}>Cancel</Typography>
              </Box>
            </Box>
          </Paper>

        }



        {/*  */}
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
