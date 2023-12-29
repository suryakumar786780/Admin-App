import React, { useEffect, useState } from 'react';

import TotalUsersImg from "../utilities/users.jpg";
import MenUserImg from "../utilities/men.jpg";
import WomenUserImg from "../utilities/women.jpg";
import CardContent from '../components/card';

import TitleComp from '../components/title';
import { useDispatch } from 'react-redux';
import { getUserData } from '../service/action';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import JobCardContentComp from '../components/jobcardcontents';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function Dashboard() {
    // functionalities

    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);

    let menCount = 0, womenCount = 0;
    userData.length > 0 && userData.forEach((e) => {
        e.gender === "male" ? menCount++ : womenCount++;
    })

    const jobType = userData.length > 0 && userData.reduce((acc, curr) => {
        let job = curr.job.toLowerCase()
        if (acc[job]) {
            acc[job] = ++acc[job]
        }
        else acc[job] = 1;
        return acc;
    }, {})

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token')
            const data = await dispatch(getUserData(token, 0));
            setUserData(data);
        })()
    }, [])



    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                <Box>
                    <Box sx={{ top: { lg: '65px' }, position: { lg: 'sticky' }, marginTop: { lg: '-23px', md: '50px', sm: '50px', xs: '50px' }, zIndex: { lg: 1 }, backgroundColor: '#f7b1a7 !important' }} className='row justify-content-around shadow-lg p-3 mb-5 bg-body rounded'>
                        <CardContent imgsrc={TotalUsersImg} imgalt={"total_users"} imgheight={"100"} cardtitle={"Total"} cardcontent={userData.length} />
                        <CardContent imgsrc={MenUserImg} imgalt={"men_users"} imgheight={"100"} cardtitle={"Men"} cardcontent={menCount} />
                        <CardContent imgsrc={WomenUserImg} imgalt={"women_users"} imgheight={"100"} cardtitle={"Women"} cardcontent={womenCount} />
                    </Box>

                    <Box className="worktype mb-sm-4 shadow-lg p-3 mb-5 bg-body rounded" sx={{ backgroundColor: '#f7b1a7 !important' }}>
                        <TitleComp title={"Job Types"} pos={"text-center"} />
                        <Box className=" row justify-content-center">
                            {
                                userData.length > 0 && Object.keys(jobType).map((e, index) => {
                                    return <div key={index} className=' col-xl-3 col-lg-4 col-md-6 mt-2 job-card'>
                                        <JobCardContentComp cardtitle={e.toUpperCase()} cardcontent={jobType[e]} />
                                    </div>
                                })
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}