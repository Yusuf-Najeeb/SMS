import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const NoData = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ mb: 6, color: 'text.secondary' }}>Oops! 😖 No Available Data.</Typography>
      </Box>
    </Box>
  )
}

export default NoData
