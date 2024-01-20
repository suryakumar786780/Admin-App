import React, { useState } from 'react';

import LoginImg from "../utilities/login.webp";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup } from '@mui/material';

import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import TitleComp from '../components/title';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin, loginUser } from '../service/action';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .min(8, "Enter your email")
        .required('Email is required')
        .matches(/^[a-z0-9]{4,}@g(oogle)?mail\.com$/, "Enter a valid Email ID"),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'One Smallcase, One Uppercase, One Special Character, One Number is Required'),
    role: yup.string().required('Role is Required')

});

const Login = () => {

    const state = useSelector((state) => state);
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
            email: '',
            password: '',
            role: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            (async () => {
                setIsLoading(true)
                const response = await dispatch(loginUser(values))
                if (response.status === 200) {
                    setIsLoading(false);
                    setErr({ err: false, errValue: '' });
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('role', values.role);
                    localStorage.setItem('userDetails', response.data.first_name + response.data.last_name);
                    localStorage.setItem('token', response.data.token)
                    dispatch(isLogin(state.reducer_public.isLogin = true));
                } else {
                    setIsLoading(false);
                    setErr({ err: true, errValue: response.data });
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
                            sx={{ m: 0, width: { lg: "70%", md: "80%", sm: "60%", xs: '90%', }, padding: { md: '3rem' }, boxShadow: 10, display: { md: "flex" }, margin: "auto", backgroundColor: "white" }}
                        >
                            <Box
                                sx={{ width: { xl: "50%" }, display: "flex", justifyContent: "center" }}
                            >
                                <img sx={{ width: { xl: "50%", md: "100px" } }} src={LoginImg} alt='Login' className='img-fluid' />
                            </Box>
                            <Box
                                sx={{ width: { xl: "50%" }, padding: { md: "2rem", xs: "1rem" }, }}
                            >
                                <TitleComp title={"Login"} pos={"text-start fw-bold"} />

                                <Box className="" >
                                    <form onSubmit={formik.handleSubmit}>
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

                                        <RadioGroup className="radio"
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="role"
                                            value={formik.values.role}
                                            onChange={formik.handleChange}
                                            error={formik.touched.role && Boolean(formik.errors.role)}
                                            sx={{ bgcolor: 'white', marginTop: 2, marginLeft: 2, }}
                                        >
                                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                            <FormControlLabel value="user" control={<Radio />} label="User" />
                                        </RadioGroup>
                                        <Box sx={{ fontSize: "13px", marginTop: '0', marginLeft: "14px", color: '#D32F2F' }}>{formik.touched.role && formik.errors.role}</Box>

                                        <Box sx={{ color: '#D32F2F', fontWeight: 'bold', textAlign: 'center', width: { xl: "75%", xs: "100%" } }}>{error.err && error.errValue}</Box>

                                        <Button variant="contained" fullWidth type="submit"
                                            style={{
                                                borderRadius: "30px",
                                                marginBottom: "1rem", background: "rgb(31, 182, 157)"
                                            }}
                                            sx={{ width: { xl: "75%", sm: "100%" }, padding: "12px 20px", fontWeight: "bold", marginTop: "1rem" }}

                                            disabled={!formik.isValid}
                                        >
                                            LOGIN
                                        </Button>
                                    </form>
                                </Box>
                                <Box sx={{ width: { xl: "75%", sm: "100%" } }} className='mt-3 text-center'>Didn't have an account?
                                    <Link to="/">Register</Link>
                                </Box>
                            </Box>
                        </Box>

                    </div>
            }
        </>
    )
}

export default Login