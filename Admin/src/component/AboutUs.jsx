import { Button, TextField } from '@mui/material'
import React from 'react'

const AboutUs = () => {
  return (
    <>
     <h3> Category </h3>
          <TextField variant='outlined' label='Category' name={'categoryName'} multiline size='small' />
          <Button variant='contained'
            sx={{ backgroundColor: '#c26afc', color: 'whitesmoke', marginLeft: '5px' }}
            onClick={() => addCategory()}
          >
            Add
          </Button>
    </>
  )
}

export default AboutUs