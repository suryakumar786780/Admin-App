import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import CrudModal from '../components/crudmodal';
import TitleComp from '../components/title';
import UserDetailsCard from '../components/userdetailscard';
import { deleteUserData, getUserData } from '../service/action';

const Userlist = () => {

  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const role = localStorage.getItem('role')
  const [userData, setUserData] = useState([]);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const history = useHistory();
  const token = localStorage.getItem('token')

  const editFunc = (e) => {
    history.push(`/edituser/${e}`);
  }

  const modalResult = (res) => {
    if (res) {
      (async () => {
        const result = await dispatch(deleteUserData(token, deleteId))
        if (result.message === 'deleted successfully') {
          setIsUserDeleted(true)
        }
      })()
    }
    setCheck(false);
  }

  const deleteFunc = (e) => {
    setIsUserDeleted(false)
    setDeleteId(e);
    setCheck(true);
  }

  useEffect(() => {
    (async () => {
      const data = await dispatch(getUserData(token));
      setUserData(data);
    })()
  }, [isUserDeleted])

  return (
    <>
      <Box sx={{ backgroundColor: '#f7b1a7', width: '100%', minHeight: '100vh' }} >
        <TitleComp title={"User List"} pos={"text-center"} />
        <Box className=' mx-5 mb-3 w-100 mx-auto'>
          <Box sx={{ top: '64px', zIndex: 1, backgroundColor: "#f7b1a7", padding: '1rem' }} className='m-2 text-decoration-none position-sticky'>
            {role === 'admin' ? <Link to="/adduser"><Button variant="contained" color='success'>+ Add User</Button></Link> : ""}
          </Box>
          <Box className='container'>
            {
              userData.length > 0 ? <Box className="row" >{
                userData.map((e) => {
                  return <Box className="col-xl-3 col-md-6 col-sm-12" key={e.id}>
                    <UserDetailsCard id={e.id} imgsrc={e.profile_picture} imgalt={e.name} imgheight={"200"} cardtitle={e.name} cardcontent={e.job} editbtn={role === 'admin' ? true : false} editFunc={() => editFunc(e.id)} deleteFunc={() => deleteFunc(e.id)} />
                  </Box>

                })}
              </Box> : <Box className='fs-3 fw-bold text-center'> Data Not Found!</Box>
            }
          </Box>
        </Box>
        {check && <CrudModal title={'Are you sure want to Delete Data ?'} returnResult={modalResult} />}
      </Box>
    </>
  )
}

export default Userlist