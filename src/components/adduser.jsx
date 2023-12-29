import React, { useEffect, useState } from 'react';

import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { addEditUserData, getUserData } from '../service/action';
import CrudModal from './crudmodal';
import TitleComp from './title';

const validationSchema = yup.object({
    name: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Name is Required'),
    profile_picture: yup.string()
        .min(6, 'Too Short!')
        .required('Profile Image URL is Required'),
    job: yup
        .string('Enter your Job')
        .min(3, "Enter your Job")
        .required('Job is required'),
    gender: yup.string().required('Gender is Required')

});

const AddUser = () => {
    const useP = useParams();
    const history = useHistory();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);

    const [result, setResult] = useState(false);

    const modalResult = (res) => {
        if (res) {
            formik.resetForm({
                values: {
                    name: '',
                    profile_picture: '',
                    job: '',
                    gender: '',
                }
            });
            setCheck(false)
            setResult(false)
        } else {
            setCheck(false);
            history.push('/userlist')
        }

    }

    const formik = useFormik({
        initialValues: {
            name: '',
            profile_picture: '',
            job: '',
            gender: '',

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            (async () => {
                if (values.profile_img) {
                    let crtURL = false;
                    try {
                        crtURL = new URL(values.profile_img);
                    }
                    catch (e) {
                        crtURL = "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";
                        values.profile_img = crtURL
                    }
                }
                const token = localStorage.getItem('token')
                const data = await dispatch(addEditUserData(token, values, useP.id ? useP.id : 0, useP.id ? "PUT" : "POST"));
                if (data.status === 200) {
                    setResult(true)
                    setTimeout(() => {
                        if(useP.id){
                            setCheck(false);
                            history.push('/userlist')

                        } else check ? setCheck(false) : setCheck(true);
                    }, 700);
                }
            })()
        },
    });

    useEffect(() => {
        if (useP.id) {
            (async () => {
                const token = localStorage.getItem('token')
                const data = await dispatch(getUserData(token, 0));
                const pos = data.findIndex((u) => {
                    return u.id === +useP.id
                })
                const url = data[pos];
                if (!url) {
                    history.push("/dashboard");
                    return <></>
                } else {
                    const editData = data[pos];
                    formik.resetForm({
                        values: {
                            name: editData.name,
                            profile_picture: editData.profile_picture,
                            job: editData.job,
                            gender: editData.gender,
                        }
                    });
                }

            })()
        }
    }, [])

    return (
        <div>
            <TitleComp title={`${useP.id ? "Edit" : "Add"} User Details`} pos={"text-center"} />
            <div className='d-flex justify-content-center min-vh-90 mx-md-5 mx-sm-3 border border-2 mb-3'>
                <Box sx={{ padding: { md: '5rem', sm: "3rem", xs: '1rem' }, width: { xl: "50%", lg: '50%', md: '70%', sm: '80%', xs: "95%" } }}>
                    <form onSubmit={formik.handleSubmit} className='text-center'>
                        <TextField
                            sx={{ width: { xs: "100%" }, marginBottom: "1rem", }}
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            InputProps={{
                                style: {
                                    borderRadius: "30px",
                                }
                            }}
                        />
                        <TextField
                            sx={{ width: { xs: "100%" }, marginBottom: "1rem" }}
                            id="profile_picture"
                            name="profile_picture"
                            label="Profile Image"
                            value={formik.values.profile_picture}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.profile_picture && Boolean(formik.errors.profile_picture)}
                            helperText={formik.touched.profile_picture && formik.errors.profile_picture}
                            InputProps={{
                                style: {
                                    borderRadius: "30px",
                                }
                            }}
                        />
                        <TextField
                            sx={{ width: { xs: "100%" }, marginBottom: "1rem" }}
                            id="job"
                            name="job"
                            label="Job"
                            value={formik.values.job}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.job && Boolean(formik.errors.job)}
                            helperText={formik.touched.job && formik.errors.job}
                            InputProps={{
                                style: {
                                    borderRadius: "30px",
                                }
                            }}
                        />
                        <RadioGroup className="radio"
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                            sx={{ bgcolor: 'white', marginLeft: 1, width: { xl: "75%", xs: "100%" } }}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                        <Box className='d-flex' style={{ fontSize: "13px", marginLeft: "14px", color: '#D32F2F' }}>{formik.touched.gender && formik.errors.gender}</Box>

                        <Button
                            style={{
                                backgroundColor: "rgb(31, 182, 157)",
                            }}
                            sx={{
                                width: { xs: "100%" }, padding: "12px 20px", fontWeight: "bold", borderRadius: "30px",
                                marginBottom: "1rem", marginTop: 1
                            }}
                            disabled={!formik.isValid}
                            variant="contained" fullWidth type="submit"
                        >
                            SUBMIT
                        </Button>
                        {check && <CrudModal title={`${useP.id ? "Are you sure want to Edit Data ?" : "Are you want to Add more Data ?"}`} returnResult={modalResult} />}

                        <Box sx={{ width: { xs: "100%" } }} className='fw-bold text-success mt-2 text-center'>{result ? `User ${useP.id ? "Edited" : "Added"} Successfully` : ""}</Box>
                    </form>
                </Box>
            </div>
        </div>
    )
}

export default AddUser