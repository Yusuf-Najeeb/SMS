import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const SearchSpinner = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <CircularProgress size={20} sx={{ mb: 4 }} />
        <Typography variant='body2' sx={{ textAlign: 'center' }}>
          Fetching data...
        </Typography>
      </Box>
    </Box>
  )
}

export default SearchSpinner
