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
import { useLocation } from "react-router-dom";
import { onMessageListener } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/index";
import { PhotoCamera, Delete } from "@mui/icons-material";
import ModelForChat from "./ModelForChat";


const NewChatBody = () => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [newMessagedata, setNewMessagedata] = useState("");
  const [newMessageurl, setNewMessageurl] = useState("");
  const [imageUrls, setimageUrls] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);

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
    const updatedMessages = await axios.get(
      `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${data12.client.id}`,
      { headers: { Authorization: token } }
    );
    console.log(updatedMessages.data, "updatedMessages the updatedMessages");
    setChatMessages(updatedMessages.data);
  };

  useEffect(() => {
    getAllmessage();
    // setChatMessages(messages);
    scrollToBottom();

    getConversations();
  }, []);

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log("payload", payload);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const sendMessage = async () => {
    try {
      let type = "text"
      let body = newMessage
      if(imageUrls>0){
        console.log("6789");
        type = "file"
        body= newMessageurl
      }
      const { data } = await axios.post(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/send",
        {
          recieverFcmToken: data12.client.fcmToken,
          recieverId: data12.client.id,
          type: (newMessageurl ==="" ? "text" : "file"),
          body : (newMessageurl ==="" ? newMessage : newMessageurl),
        },
        { headers: { Authorization: token } }
      );
      //   console.log(data,"here test")
      //   setChatMessages([...chatMessages,data.body]);
      setNewMessage("");
      //   user && messageSended();

      // After sending the message, retrieve the updated conversation messages
      const { data: updatedMessages } = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${data12.client.id}`,
        { headers: { Authorization: token } }
      );
      //   console.log(data,"sending the message");
      //   console.log(updatedMessages,"updatedMessages the message");
      setChatMessages(updatedMessages);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessageInputHandler = (e) => {
    setNewMessage(e.target.value);
    setNewMessagedata(e.target.value)
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    // setNewMessage(files)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              console.log("tttttoooo");
              // setNewMessage(url);
              setNewMessageurl(url)
              setimageUrls([...imageUrls,url])
              // dispatch(PropertyActions.images(url));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("uploadError", err);
        });
    }
  };

  const handleDeleteImage = (index) => {
    setimageUrls(imageUrls.filter((val,id)=>{ return  id!==index}))
    // dispatch(PropertyActions.deleteImage(index));
  
  };

  
  console.log("gsdf",imageUrls);
  const imageUrlsData = imageUrls.map((imageUrl, index) => (

    <Grid item key={index} >
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl}
          alt={` ${index + 1}`}
          style={{ maxWidth: 150, maxHeight: 100 }}
        />
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => handleDeleteImage(index)}
        >
          <Delete />
        </IconButton>
      </div>
    </Grid>
  ));


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
            {`${data12?.client?.firstName} ${data12?.client?.lastName}`}
            {/* {user?.other?.firstName} {user?.other?.lastName}  */}
          </Typography>
        </Box>
        {/* <Typography variant="body2">{user?.other?.type}</Typography> */}
        <Typography variant="body2">{data12?.client?.type}</Typography>
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 264px)",
          overflowY: "auto",
          padding: "16px",
        }}
        ref={chatContainerRef}
      >
        {chatMessages &&
          chatMessages
            .slice(0)
            .reverse()
            .map((message) => {
              const isCurrentUser = message?.senderId === data12.client.id;
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
                <Box>
                  <Typography variant="body1">{message.body}</Typography>
                  <ModelForChat />

                </Box>
                </Grid>
              );
            })}
      </Box>

      <Grid container direction="row" justify="center" sx={{width:"100%"}}>
          {imageUrls.length > 0 && (
            imageUrlsData
          ) }
        </Grid>

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
          onChange={handleImageChange}
        >
          <input 
          hidden accept="image/*,video/*"
          type="file"
          multiple
           />
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
