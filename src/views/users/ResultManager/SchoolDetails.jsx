import { Box, Stack, Typography } from '@mui/material'

import themeConfig from 'src/configs/themeConfig'

const SchoolDetails = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <Box sx={{width: '20%'}}>
    <img src='/images/logo.webp' height={120} width={120} alt='logo' style={{objectFit: 'cover', objectPosition: 'center'}} />
  </Box>
  <Stack spacing={2} sx={{width: 'fit-content', textAlign: 'right'}}>
  <Typography sx={{  fontWeight: 700, color: '#666', fontSize: '1.3rem', textTransform: 'uppercase' }}> {themeConfig.templateName}</Typography> 
  <Typography sx={{  fontWeight: 700, color: '#666', textTransform: 'uppercase' }}> {themeConfig.organizationAddress}</Typography> 
  <Typography sx={{  fontWeight: 700, color: '#666', }}> {`Website:  ${themeConfig.organizationWebsite} | Email: ${themeConfig.organizationEmail}`}</Typography> 
  <Typography sx={{  fontWeight: 700, color: '#666', }}> {`Phone:  ${themeConfig.organizationPhone}`}</Typography> 
  </Stack>
</Box>
  )
}

export default SchoolDetails