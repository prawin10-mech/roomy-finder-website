import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

const BlockUser = () => {
  return (
    <>
      <Container>
        <Grid container>
          <Grid item sx={{display:"flex",flexDirection:"column", justifyContent:"center",ml:{md:"25%"}}}>
          <Box sx={{my:{md:4}}}>

            Your Account is Blocked Please Contact us With Our Support Team
          </Box>
            <Paper>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <EmailIcon sx={{ mx: 2 }} />
                <Typography variant="h6">Support@roomyfinder.com</Typography>
                <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJqSwFHBbjKJvJXslnhdwMkshTnsxvFDJmGmxXBtqTsMBsfVJdjBBvvdbxNWxdHJcJLLNmg">
                  <ForwardToInboxIcon sx={{ mx: 2 }} />
                </a>
              </Box>
            </Paper>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlockUser;
