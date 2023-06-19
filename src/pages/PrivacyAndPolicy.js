import React, { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
// import PDFViewer from '../components/pdf/PDFViewerPP';
import file1 from "../assets/Agreements/privacy_policy_roomy_findner.pdf"

const PrivacyAndPolicy = () => {
  const [showPDF, setShowPDF] = useState(false);

  const handlePageClick = () => {
    setShowPDF(!showPDF);
  };

  return (
    <Box>

      <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>

      <Typography variant='h5'>Tearms and Conditions</Typography>
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
};

export default  PrivacyAndPolicy