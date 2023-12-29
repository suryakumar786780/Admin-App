import React from 'react'

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const InputComp = ({ name, type, label, placeHolder, size, isError, click, inputVal }) => {
    return (
        <div className='text-center mb-2'>
            <FormControl>
                <label htmlFor={name} className='mt-3 mb-2 fw-bold'>{label}</label>
                <TextField name={name} id={name} label={placeHolder} variant="outlined" size={size} onChange={click} type={type} value={inputVal} />
                {
                    isError ? <FormHelperText id="outlined-basic" className='text-danger fw-bold'>Enter Valid {label}</FormHelperText> : ""
                }

            </FormControl>
        </div>
    )
}

export default InputComp