import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormHelperText } from '@mui/material';

const RadioButtonComp = ({ name, value, click, isError, inputVal }) => {
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group" className='fw-bold text-dark d-flex'>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name={name}
        value={inputVal ? inputVal : value}
        onChange={click}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>
      {
        isError ? <FormHelperText id="outlined-basic" className='text-danger fw-bold'>Enter Valid Gender</FormHelperText> : ""
      }
    </FormControl>
  )
}

export default RadioButtonComp