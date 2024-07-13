import { Box, Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { styled } from '@mui/material/styles'

import Button from '@mui/material/Button'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'

// ** Styled Components
const Illustration = styled('img')(({ theme }) => ({
    zIndex: 2,

    // display: 'block',
    objectFit: 'cover',
    objectPosition: 'center',

    textAlign: 'center',
    height: 160,

    // [theme.breakpoints.down(1540)]: {
    //   maxHeight: 130
    // },
    // [theme.breakpoints.down('lg')]: {
    //   maxHeight: 110
    // }
  }))

  const StyledBox = styled('div')(({ theme }) => ({
    height: '200px',
    width: '200px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: '20px 10px',
    borderRadius: '10px',
    background: '#f5eedd;',
    flexDirection: 'column'
  }))

const ResultNotAvailable = () => {

  return (
     <Fragment>
    {/* <Box  sx={{ mt: 10, p: 5, pb: 15, background: '#f5eedd' , borderRadius: 1}}> */}
    <Box  sx={{ mt: 10, p: 5, pb: 15, background: '#fff' , borderRadius: 1}}>

   
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  margin: '40px auto 25px auto' }}>
            <Icon icon='fluent:tag-error-24-regular' fontSize='4.25rem' color='#d31f21' />
          </Box>
        

        

                <Fragment>
             

                 <Box sx={{ display: 'flex', justifyContent: 'center',  }}>
                 <Typography sx={{color: '#000', fontSize: '20px', fontFamily: 'fantasy'}}> Result not available yet, Please check later. </Typography>

            
                 </Box>

                 </Fragment>

            

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  margin: '40px auto 25px auto' }}>
            
            <Typography sx={{color: '#000', fontSize: '16px',}}>Note: If You've already taken the examination and submitted, your answers will be thoroughly examined by each Subject Teacher before your result will be available. </Typography>
          </Box>

        
        </Box>
        </Fragment>
  )
}

export default ResultNotAvailable