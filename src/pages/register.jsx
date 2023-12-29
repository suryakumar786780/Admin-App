import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useFormik } from 'formik';
import * as yup from 'yup';

import TitleComp from '../components/title';
import { Link } from 'react-router-dom';
import { registerUser } from '../service/action';
import LoginImg from "../utilities/login.webp";
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from "react-router-dom";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const validationSchema = yup.object({
    first_name: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First Name is Required!'),
    last_name: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Last Name is Required!'),
    email: yup
        .string('Enter your email')
        .min(8, "Enter your email")
        .required('Email is required!')
        .matches(/^[a-z0-9]{4,}@g(oogle)?mail\.com$/, "Enter a valid Email ID!!"),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'One Smallcase, One Uppercase, One Special Character, One Number is Required!'),

});

const Register = () => {

    const history = useHistory()
    const dispatch = useDispatch();

    const [error, setErr] = useState({
        err: false,
        errValue: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            (async () => {
                setIsLoading(true)
                const response = await dispatch(registerUser(values));
                console.log(response);
                if (response === "Admin created successfully") {
                    setIsLoading(false);
                    setErr({ err: false, errValue: "", })
                    history.push("/login")
                } else {
                    setIsLoading(false)
                    setErr({ err: true, errValue: response })
                }
            })()

        },
    });


    return (
        <>
            {
                isLoading ?
                    <div className='vh-100 text-center d-flex justify-content-center align-items-center'>
                        <CircularProgress />
                    </div>
                    :
                    <div className='d-flex align-item-center min-vh-100' style={{ backgroundColor: "#F28F80" }}>
                        <Box
                            sx={{ m: 0, width: { lg: "70%", md: "80%", sm: "60%", xs:'90%', }, boxShadow: 10, display: { md: "flex" }, margin:'auto', backgroundColor: "white" }}
                        >
                            <Box
                                sx={{ width: { xl: "50%" }, padding: { xl: "3rem", md: "2rem", xs: "1rem" }, marginLeft: { xl: '2rem' } }}
                            >
                                <TitleComp title={"Register"} pos={"text-start fw-bold"} />

                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mx-md-auto" >
                                        <TextField
                                            sx={{ width: { xl: "75%", xs: "100%" }, marginBottom: "1rem" }}
                                            id="first_name"
                                            name="first_name"
                                            label="First Name"
                                            value={formik.values.first_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                            helperText={formik.touched.first_name && formik.errors.first_name}
                                            InputProps={{
                                                style: {
                                                    borderRadius: "30px",
                                                }
                                            }}
                                        />
                                        <TextField
                                            sx={{ width: { xl: "75%", xs: "100%" }, marginBottom: "1rem" }}
                                            id="last_name"
                                            name="last_name"
                                            label="Last Name"
                                            value={formik.values.last_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                            helperText={formik.touched.last_name && formik.errors.last_name}
                                            InputProps={{
                                                style: {
                                                    borderRadius: "30px",
                                                }
                                            }}
                                        />
                                        <TextField
                                            sx={{ width: { xl: "75%", xs: "100%" }, marginBottom: "1rem" }}
                                            id="email"
                                            name="email"
                                            label="Email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                            InputProps={{
                                                style: {
                                                    borderRadius: "30px",

                                                }
                                            }}
                                        />

                                        <FormControl sx={{ width: { xl: "75%", xs: "100%" } }} variant="outlined" className='pw-input'>
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                name='password'
                                                type={showPassword ? 'text' : 'password'}
                                                label="Password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                // helperText={formik.touched.password && formik.errors.password}
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "30px",
                                                    }
                                                }}

                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <FormHelperText id="outlined-weight-helper-text" sx={{ fontSize: "12px", marginLeft: "14px", marginTop: '3', color: '#D32F2F' }}>{formik.touched.password && formik.errors.password}</FormHelperText>

                                        <Box sx={{ color: '#D32F2F', fontWeight: 'bold', textAlign: 'center', marginBottom: 2, marginTop:2, width: { xl: "75%", xs: "100%" }, }}>{error.err && error.errValue}</Box>

                                        <Button variant="contained" fullWidth type="submit"
                                            style={{
                                                borderRadius: "30px",
                                                marginBottom: "1rem", background: "rgb(31, 182, 157)"
                                            }}
                                            sx={{ width: { xl: "75%" }, padding: "12px 20px", fontWeight: "bold" }}

                                            disabled={!formik.isValid}
                                        >
                                            REGISTER
                                        </Button>
                                    </div>
                                    <Box sx={{ width: { xl: "75%", sm: "100%" } }} className='mt-3 text-center'>Didn't have an account? <Link to="/login">Login</Link></Box>
                                </form>
                            </Box>
                            <Box
                                sx={{ width: { xl: "50%" }, display: "flex", justifyContent: "center" }}
                            >
                                <img sx={{ width: { xl: "50%", md: "100px" } }} src={LoginImg} alt='Login' className='img-fluid' />
                            </Box>
                        </Box>
                    </div>
            }
        </>
    )
}

export default Register