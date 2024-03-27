
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'



const PageHeader = ({ toggle, action, icon }) => {

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
        mt: 5

        // justifyContent: 'flex-end',
      }}
    >


      <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
        <Icon fontSize='1.125rem' icon={icon ? icon : 'tabler:plus'} />
        {action}
      </Button>
    </Box>
  )
}

export default PageHeader
