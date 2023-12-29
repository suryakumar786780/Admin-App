import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardMedia } from '@mui/material';

const CardContentComp = ({ imgheight, imgsrc, imgalt, cardtitle, cardcontent }) => {
  return (
    <Card sx={{height:"150", padding:{md:'2rem'} }} className='mb-3 col-xl-2 col-md-3 col-sm-4'>
      <CardContent sx={{ textAlign: "center", display: { lg: "flex" }, justifyContent:'center' }} className='d-card'>
        <CardMedia
          component="img"
          image={imgsrc}
          alt={imgalt}
        />
        <Box sx={{ display:{md:"flex"}, alignItems: "center", justifyContent:"center", margin:"auto", }}>
          <Box>
            <Typography sx={{ fontSize: 24, fontWeight: "bold" }} gutterBottom>
              {cardtitle}
            </Typography>
            <Typography variant="h5" component="div">
              {cardcontent}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardContentComp