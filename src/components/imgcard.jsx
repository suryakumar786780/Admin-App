import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const CardComp = ({ id, imgsrc, imgalt, imgheight, cardtitle, cardcontent, editbtn, editFunc, deleteFunc }) => {


    let crtURL;
    try {
        crtURL = new URL(imgsrc);
    }
    catch (e) {
        crtURL = "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";
        imgsrc = crtURL
    }


    return (
        <div className='mt-3 fw-bold h-100'>
            <Card>
                <CardActionArea>
                    <Link to={`/userlist/${id}`} className='text-decoration-none text-dark'>
                        <CardMedia
                            component="img"
                            height={imgheight}
                            image={imgsrc}
                            alt={imgalt}
                        />
                        <CardContent className='text-center'>
                            <Typography gutterBottom variant="h5" component="div" className='text-truncate'>
                                {cardtitle}
                            </Typography>
                            <Typography className='fw-bold fs-2 text-truncate' color="text.dark">
                                {cardcontent}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
                {
                    editbtn && (<div className='d-flex justify-content-center mb-3'>
                        <div className='cardButton me-2 px-2 py-1 editBtn' onClick={editFunc}>Edit</div>
                        <div className='cardButton px-2 py-1 deleteBtn' onClick={deleteFunc}>Delete</div>
                    </div>)
                }
            </Card>
        </div>
    )
}

export default CardComp