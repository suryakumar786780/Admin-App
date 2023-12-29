import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

const JobCardContentComp = ({ cardtitle, cardcontent }) => {
  return (
    <Card sx={{ width: 150, }} className='mb-3'>
      <CardContent className='text-center'>
        <Typography sx={{ fontSize: 14, fontWeight: "bold" }} gutterBottom>
          {cardtitle}
        </Typography>
        <Typography variant="h5" component="div" className='text-break'>
          {cardcontent}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default JobCardContentComp