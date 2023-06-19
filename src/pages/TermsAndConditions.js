import React, { useState } from 'react'
import file1 from "../assets/Agreements/t&c_roomy_finder.pdf"
import { Box, Paper, Typography } from '@mui/material';
// import file1 from "../../assets/Agreements/privacy_policy_roomy_findner.pdf"

const TermsAndConditions = () => {
  const [showPDF, setShowPDF] = useState(false);

  const handlePageClick = () => {
    setShowPDF(!showPDF);
  };

  return (
    <Box>

      <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>

      <Typography variant='h5'>Terms & Conditions</Typography>
      <Paper sx={{m:2}}>

      <button onClick={handlePageClick}>{showPDF !== true ? "Show PDF" :"Hide PDF"}</button>
      </Paper>
      </Box>
      {showPDF &&  <Box style={{ width: '100%', height: '600px' }}>
      <iframe
        src={file1}
        title="PDF Viewer"
        style={{ width: '100%', height: '100%' }}
      ></iframe>
    </Box>}
    </Box>
  );
}

export default TermsAndConditions