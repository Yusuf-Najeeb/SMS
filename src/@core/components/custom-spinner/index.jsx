import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const CustomSpinner = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>
      </Box>
    </Box>
  )
}

export default CustomSpinner
