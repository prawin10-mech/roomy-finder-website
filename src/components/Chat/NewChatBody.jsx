import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Button,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { onMessageListener } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/index";
import { PhotoCamera, Delete } from "@mui/icons-material";
import ModelForChat from "./ModelForChat";
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const NewChatBody = () => {
  const [opengallery, setopengallery] = useState(false);
  const [newModele, setnewModele] = useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [newMessagedata, setNewMessagedata] = useState("");
  const [newMessageurl, setNewMessageurl] = useState("");
  const [imageUrls, setimageUrls] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const [variabletype, setvariabletype] = useState("text");
  const [newMessageValue, setNewMessageValue] = useState("");
  const [newFileName, setnewFileName] = useState("");
  const [newFileSize, setnewFileSize] = useState("");
  const [notTextFile, setnotTextFile] = useState("");
  const location = useLocation();
  const data12 = location.state;
  console.log("data990", data12);

  const token = localStorage.getItem("token");

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  console.log("chatMessages", chatMessages);

  const getConversations = async () => {
    try {
      const { data } = await axios.get(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/conversations",
        { headers: { Authorization: token } }
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllmessage = async () => {
    if (data12.type === "roommate") {
      const updatedMessages = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${data12.property.poster.id}`,
        { headers: { Authorization: token } }
      )
      console.log(updatedMessages.data, "updatedMessages the updatedMessages")
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
      getAllmessage();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // getAllmessage();
    // setChatMessages(messages);
    scrollToBottom();

    getConversations();
  }, [newMessageValue, newModele]);

  console.log("opengallery", opengallery);

  const sendMessage = async () => {
    console.log("ghlam")
    try {
      if (data12.type === "roommate") {

        if (variabletype === "text") {

          const { data } = await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.poster.fcmToken,
              recieverId: data12.property.poster.id,
              type: variabletype,
              body: newMessageValue,
            },
            { headers: { Authorization: token } }
          );
        }

        if (variabletype !== "text") {

          const { data } = await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.poster.fcmToken,
              recieverId: data12.property.poster.id,
              type: variabletype,
              body: newMessageValue,
              fileName: newFileName,
              fileSize: newFileSize,
            },
            { headers: { Authorization: token } }
          );
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
        if (variabletype === "text") {
          const { data } = await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.client.fcmToken,
              recieverId: data12.property.client.id,
              type: variabletype,
              body: newMessageValue,
            },
            { headers: { Authorization: token } }
          );
        }

        if (variabletype !== "text") {
          const { data } = await axios.post(
            "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
            {
              recieverFcmToken: data12.property.client.fcmToken,
              recieverId: data12.property.client.id,
              type: variabletype,
              body: newMessageValue,
              fileName: newFileName,
              fileSize: newFileSize,
            },
            { headers: { Authorization: token } }
          );
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

  const sendMessageInputHandler = (e) => {
    setvariabletype("text")
    setNewMessageValue(e.target.value)

  };



  const handleDeleteImage = (index) => {
    setNewMessageValue("")
    // setimageUrls(newMessageValue.filter((val, id) => { return id !== index }))
  };

  const handleKeyDown = (e) => {
    console.log("gh")
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleImage = async (e) => {
    setvariabletype("image")
    const files = e.target.files;
    const file = files[0];
    setnewFileName(file.name)
    setnewFileSize(file.size)
    setnotTextFile(e.target.files);
    // console.log(file.name,"file");
    // console.log(file.size,"file");

    // try {
    //   const storageRef = ref(storage, `images/${file.name}`);
    //   const uploadTask = uploadBytesResumable(storageRef, file);

    //   uploadTask.then(() => {
    //     getDownloadURL(storageRef)
    //       .then((url) => {
    //         console.log("Upload complete");
    //         setNewMessageValue(url);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }).catch((err) => {
    //     console.log("Upload error", err);
    //   });
    // } catch (error) {
    //   console.log("Error occurred", error);
    // }
  };

  const handleVideo = async (e) => {
    setvariabletype("video")
    const files = e.target.files;
    const file = files[0];
    setnotTextFile(file)
    setnewFileName(file.name)
    setnewFileSize(file.size)


    try {
      const storageRef = ref(storage, `videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            console.log("Upload complete");
            setNewMessageValue(url);
          })
          .catch((err) => {
            console.log(err);
          });
      }).catch((err) => {
        console.log("Upload error", err);
      });
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  const handleFile = async (e) => {
    setvariabletype("file")
    const files = e.target.files;
    const file = files[0];
    setnotTextFile(file)
    setnewFileName(file.name)
    setnewFileSize(file.size)


    try {
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            console.log("Upload complete");
            setNewMessageValue(url);
          })
          .catch((err) => {
            console.log(err);
          });
      }).catch((err) => {
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
            {data12.type === "roommate" ? (`${data12?.property.poster?.firstName} ${data12?.property.poster?.lastName}`)
              : (`${data12?.property?.client?.firstName} ${data12?.property.client?.lastName}`)}

          </Typography>
        </Box>
        <Typography variant="body2">{data12.type === "roommate" ?
          data12?.property?.poster?.type : data12.property?.client?.type}</Typography>
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 264px)",
          overflowY: "auto",
          padding: "16px",
        }}
        onClick={handleModelColse}
        ref={chatContainerRef}
      >
        {chatMessages &&
          chatMessages
            .slice(0)
            .reverse()
            .map((message) => {
              const isCurrentUser = data12.type === "roommate" ? (message?.senderId === data12?.property?.poster?.id)
                : (message?.senderId === data12?.property?.client?.id)
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
                    width: 'fit-content',
                    position: "relative",
                    display: "flex",
                    flexDirection: "row"
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
          sx={{
            ml: 1,
            borderRadius: "20px",
            backgroundColor: "#fff",
            padding: "8px",
            flex: 1,
            marginRight: "8px",
          }}
          placeholder="Type a message"
          value={variabletype === "text" ? newMessageValue : ""}
          inputProps={{ "aria-label": "" }}
          onChange={sendMessageInputHandler}
          onKeyDown={handleKeyDown}
        />


        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={() => setopengallery(!opengallery)}
        >
          {/* <input
            hidden accept="image/*,video/*"
            type="file"
            multiple
          /> */}
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

export default NewChatBody;
