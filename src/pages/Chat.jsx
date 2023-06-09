import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Avatar,
  Container,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import ChatBody from "../components/Chat/ChatBody";
import { onMessageListener } from "../firebase/index";
import TopBackground from "../components/postPropertyComponents/TopBackground";
import BottomBackground from "../components/postPropertyComponents/BottomBackground";
import { Send, Attachment } from "@mui/icons-material";


const Chat = () => {
  const [handleSearch, setHandleSearch] = useState("");
  const [messageReceived, setMessageReceived] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const token = localStorage.getItem("token");

  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const getConversations = async () => {
    try {
      const { data } = await axios.get(
        "https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/conversations",
        { headers: { Authorization: token } }
      );
      data.sort((a, b) => {
        const createdAtA = new Date(a.lastMessage.createdAt);
        const createdAtB = new Date(b.lastMessage.createdAt);

        return createdAtB - createdAtA;
      });
      setConversations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getConversationMessages = async (conversation) => {
    try {
      setIsLoadingMessages(true);
      const { data } = await axios.get(
        `https://roomy-finder-evennode.ap-1.evennode.com/api/v1/messages/?otherId=${conversation.otherId}`,
        { headers: { Authorization: token } }
      );
      setMessages(data);
      setUser(conversation);
      setUserId(user.id);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    const fetchNewMessage = async () => {
      const newMessage = await onMessageListener();
      console.log(newMessage);
      setMessageReceived(newMessage);
    };

    if (messageReceived) {
      fetchNewMessage();
    }
  }, [messageReceived, conversationId]);

  useEffect(() => {
    if (conversationId) {
      getConversationMessages(conversationId);
    }
  }, [conversationId]);

  const sendMessage = async (newMessage) => {
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
      getConversations();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TopBackground />
      <Container
        xs={12}
        sm={12}
        sx={{
          backgroundColor: "#F3F3FD",
          height: "calc(100% - 200px)",
        }}
      >
        <Typography variant="h4" sx={{  mx: 2, pt: 1, fontWeight: 600 }}>
          Chat
        </Typography>
        <Grid container xs={12} sx={{ display: "flex", flexDirection: "row" }}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              pr: 1,
            }}
          >
            <Box
              sx={{
                my: 1,
                width: "90%",
              }}
            >
            <Paper sx={{ml:2}}>

              <TextField
                fullWidth
                sx={{backgroundColor:"#F3F3FD"}}
                id="input-with-icon-textfield"
                label="Search"
                name="handleSearch"
                value={handleSearch}
                variant="outlined"
              />
            </Paper>
              {conversations.map((conversation) => {
                const createdAt = new Date(conversation?.lastMessage.createdAt);
                const month = createdAt.toLocaleString("en-US", {
                  month: "short",
                });
                const isSelected =
                  conversation.otherId === selectedConversationId;
                const date = createdAt.getDate();
                return (
                  <Grid
                    container
                    sx={{
                      bgcolor: "#fff",
                      my: 1,
                      mr:2,
                      ml: isSelected ? 0 : 2,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      width: isSelected ? "110%" : {xs:"95%",sm:"95%",md:"96%"},
                      // color: isSelected ? "red" : "inherit",
                      // margin: "auto",
                    }}
                    onClick={() => {
                      setSelectedConversationId(conversation.otherId);
                      setConversationId(conversation);
                    }}
                    key={conversation.id}
                  >
                    <Grid
                      container
                      justifyContent="space-between"
                      // alignItems="center"
                      sx={{
                        padding: 1,
                        my: 1,
                      }}
                    >
                      <Grid sx={{ display: "flex" }}>
                        <Avatar>
                          {conversation?.other?.profilePicture ? (
                            <img
                              src={conversation?.other?.profilePicture}
                              alt="profile"
                            />
                          ) : (
                            `${conversation.other.firstName.charAt(
                              0
                            )}${conversation.other.lastName.charAt(0)}`
                          )}
                        </Avatar>
                        <Grid item sx={{ ml: { xs: "10px", md: 2 } }}>
                          <Typography sx={{ fontWeight: 600 }}>
                            {conversation?.other?.firstName}{" "}
                            {conversation?.other?.lastName}
                          </Typography>
                          <Typography>
                            {conversation?.lastMessage?.body}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item sx={{ ml: { xs: "3px", md: 2 } }}>
                        <Typography
                          sx={{ color: "slateGrey" }}
                        >{`${date} ${month}`}</Typography>
                        {/* <Typography sx={{ color: "red" }}>0</Typography> */}
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              height: "100%",
              pl: 1,
            }}
          >
            {!user && (
              <Grid
                sx={{ height: "75vh", bgcolor: "#F3F3FD", padding: "20px", my: 1 }}
              >
                <Grid container justifyContent="space-between">
                  <Typography sx={{ fontWeight: 600 }}>Roomy FINDER</Typography>
                  <Typography sx={{ fontWeight: 600 }}>Admin</Typography>
                </Grid>
                <hr />
                <Grid
                  padding="10px"
                  height="100%"
                  container
                  direction="column"
                  justifyContent="space-between"
                >
                  <Grid sx={{ mt: 3 }}>
                    <Grid container sx={{ my: 1 }}>
                      <Avatar />
                      <Typography
                        sx={{
                          ml:1,
                          mr: 1,
                          bgcolor: "#E8E8E8",
                          borderRadius: "15px",
                          width: "300px",
                        }}
                      ></Typography>
                    </Grid>
                    <Grid container justifyContent="flex-end" sx={{ my: 1 }}>
                      <Typography
                        sx={{
                          mr:1,
                          ml: 1,
                          float: "right",
                          bgcolor: "purple",
                          borderRadius: "15px",
                          width: "300px",
                        }}
                      >
                        .
                      </Typography>
                      <Avatar />
                    </Grid>

                    <Grid container sx={{ my: 1 }}>
                      <Avatar />
                      <Typography
                        sx={{
                          ml:1,
                          mr: 1,
                          bgcolor: "#E8E8E8",
                          borderRadius: "15px",
                          width: "300px",
                        }}
                      ></Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center">
                    <Grid sx={{ width: "85%",}}>
                      <TextField fullWidth disabled />
                    </Grid>
                    <Typography sx={{ color: "slateGrey",mx:"7px"  }}>
                      <Attachment />
                    </Typography>
                    <Avatar sx={{ bgcolor: "purple" }}>
                      <Send />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {isLoadingMessages && <CircularProgress />}
            {!isLoadingMessages && user && (
              <ChatBody
                user={user}
                messages={messages}
                messageSended={sendMessage}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <BottomBackground />
    </>
  );
};

export default Chat;
