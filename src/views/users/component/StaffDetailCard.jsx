// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const StaffDetailCard = ({ iconName, cardTitle, value }) => {
  return (
    <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
      <Icon icon={iconName} fontSize='1.125rem' />
      <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>{cardTitle}:</Typography>
      <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{value}</Typography>
    </Box>
  )
}

export default StaffDetailCard
