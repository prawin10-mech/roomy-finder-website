import { Container, Grid, Paper } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const NewAboutus = () => {
  const [openPrivacy, setopenPrivacy] = useState(false)
  const [openTC, setopenTC] = useState(false)
  const [openFAQ, setopenFAQ] = useState(false)
  const [openContactUs, setopenContactUs] = useState(false)

  const handleopen = (data)=>{
    if(data==="Privacy Policy"){
      setopenPrivacy(!openPrivacy)
      setopenTC(false)
      setopenFAQ(false)
      setopenContactUs(false)
    }
    if(data==="Terms and conditions"){
      setopenPrivacy(false)
      setopenTC(!openTC)
      setopenFAQ(false)
      setopenContactUs(false)
    }
    if(data==="FAQ"){
      setopenPrivacy(false)
      setopenTC(false)
      setopenFAQ(!openFAQ)
      setopenContactUs(false)
    }
    if(data==="Contact us"){
      setopenPrivacy(false)
      setopenTC(false)
      setopenFAQ(false)
      setopenContactUs(!openContactUs)
    }
  }
  return (
    <>
      <Container >

        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "row",}}>
          <Grid item xs={12} sm={6} md={4} spacing={2} sx={{
            display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", p: "5px", m: "10px",
          }}>
            <Paper elevation={16} sx={{
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", width: "70%", height: "50px", p: "5px", m: "10px",
            }} onClick={()=>{handleopen("Privacy Policy")}}>
              Privacy Policy
            </Paper>
            <Paper elevation={16} sx={{
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", width: "70%", height: "50px", p: "5px", m: "10px",
            }} onClick={()=>{handleopen("Terms and conditions")}}>
              Terms and conditions
            </Paper>
            <Paper elevation={16} sx={{
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", width: "70%", height: "50px", p: "5px", m: "10px",
            }} onClick={()=>{handleopen("FAQ")}}>
              FAQ
            </Paper>
            <Paper elevation={16} sx={{
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center", width: "70%", height: "50px", p: "5px", m: "10px",
            }} onClick={()=>{handleopen("Contact us")}}>
              Contact us
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            {
              openPrivacy && (
                <>
                  "hello "
                </>
              )
            }
            {
              openTC && (
                <>
                  "openTC "
                </>
              )
            }
            {
              openFAQ && (
                <>
                  "openFAQ "
                </>
              )
            }
            {
              openContactUs && (
                <>
                  "openContactUs "
                </>
              )
            }

          </Grid>
        </Grid>
      </Container>
    </>
  )
}



export default NewAboutus