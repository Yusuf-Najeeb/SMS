// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PageHeader = ({action1,  action2}) => {
  return (
    <Box
    sx={{
      py: 4,
      px: 6,
      rowGap: 2,
      columnGap: 4,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-end',
      mt: 10,

      // justifyContent: 'flex-end',
    }}
  >
    <Button onClick={action1} variant='outlined' sx={{ '& svg': { mr: 2 }, border: 'secondary.main', color: 'secondary.main' }}>
      <Icon fontSize='1.125rem' icon='streamline:upload-circle' />
      Upload Questions
    </Button>
   

    <Button onClick={action2} variant='contained' sx={{ '& svg': { mr: 2 } }}>
      <Icon fontSize='1.125rem' icon='tabler:plus' />
      Add  Questions
    </Button>
  </Box>
  )
}

export default PageHeader