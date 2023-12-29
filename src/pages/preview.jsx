import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import TitleComp from '../components/title';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../service/action';

const Preview = () => {
    const useP = useParams();
    const history = useHistory();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [preview, setPreview] = useState();
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token')
            const data = await dispatch(getUserData(token, 0));
            const pos = data.length > 0 && data.findIndex((u) => {
                return u.id === +useP.id
            })
            const url = data[pos];
            if (!url) {
                history.push("/dashboard");
                return <></>
            } else {
                setPreview(data[pos]);
            }
        })()
    }, [])

    return (
        <>
            <TitleComp title={"User Details"} pos={"text-center"} />
            <div className='min-vh-90 mx-auto mb-3 w-75 mx-auto border border-2 p-md-5 p-3'>
                <div className='d-flex justify-content-between m-2'>
                    <Link to="/userlist"><Button variant="contained" color='info'>Back</Button></Link>
                </div>
                {preview && <div className="preview d-lg-flex justify-content-around ">
                    <div className="pre-content p-md-5 p-sm-3 border border-2 ms-lg-5 h-auto w-sm-auto">
                        <h3 className='text-break'>{preview.name}</h3>
                        <p>ID: {preview.id}</p>
                        <p className='text-break'>{preview.job}</p>
                        <p className='text-break'>{preview.name} is a {preview.job}</p>
                    </div>
                    <div className="previewImg">
                        <img src={preview.profile_picture} alt={preview.name} />
                    </div>
                </div>}

            </div>
        </>
    )
}

export default Preview