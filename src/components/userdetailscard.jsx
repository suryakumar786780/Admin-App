import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import BackgroundImage from "../utilities/backgroundimage.png"
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const UserDetailsCard = ({ id, imgsrc, imgalt, cardtitle, cardcontent, editbtn, editFunc, deleteFunc }) => {

    let crtURL;
    try {
        crtURL = new URL(imgsrc);
    }
    catch (e) {
        crtURL = "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";
        imgsrc = crtURL
    }

    return (
        <Card sx={{ objectFit: "cover", marginBottom: '1rem' }}>

            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    sx={{ height: 100 }}
                    image={BackgroundImage}
                    title="user"
                >
                    {
                        editbtn &&
                        <Box sx={{ width: 'fit-content', float: 'right', margin: '10px 10px 0 0' }} className='cardButton px-3 py-2 deleteBtn fw-bold' onClick={deleteFunc}>X</Box>
                    }
                </CardMedia>
                <Link to={`/userlist/${id}`} className='text-decoration-none text-dark'>
                    <CardMedia
                        sx={{ width: 110, height: 100, borderRadius: '50%', position: 'absolute', top: 35, left: 15 }}
                        image={imgsrc}
                        title={imgalt}
                    />
                </Link>
            </Box>
            <Link to={`/userlist/${id}`} className='text-decoration-none text-dark'>
                <CardContent sx={{ paddingTop: '2.4rem'}}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold", marginBottom: 0 }} className='text-capitalize text-truncate'>
                        {cardtitle}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" className='text-truncate'>
                        {cardcontent}
                    </Typography>
                </CardContent>
            </Link>
            <CardActions sx={{ width: "100%", display: "flex", justifyContent: 'center', }}>
                {
                    editbtn &&
                    <Box className='d-flex justify-content-center mb-3 w-75'>
                        <Box className='cardButton me-2 px-4 py-2 editBtn text-center' onClick={editFunc}>Edit</Box>
                    </Box>
                }
            </CardActions>
        </Card>
    );
}

export default UserDetailsCard