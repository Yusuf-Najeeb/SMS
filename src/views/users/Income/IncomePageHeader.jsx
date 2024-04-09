
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'



const PageHeader = ({  action1, action2, toggle1, toggle2, icon, disabled }) => {

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


      <Button onClick={toggle1} variant='contained' sx={{ '& svg': { mr: 2 } }}>
        <Icon fontSize='1.125rem' icon={icon ? icon : 'tabler:plus'} />
        {action1}
      </Button>
      <Button onClick={toggle2} variant='tonal' sx={{ '& svg': { mr: 2 } }} disabled={disabled} >
        <Icon fontSize='1.125rem' icon={icon ? icon : 'bx:export'} />
        {action2}
      </Button>
    </Box>
  )
}

export default PageHeader
