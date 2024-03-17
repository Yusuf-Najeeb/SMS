// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'



const PaymentHeader = (props) => {

  // ** Props
  const { OpenPayment } = props


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
        justifyContent: 'space-between'
      }}
    >
      {/* <Button color='secondary' variant='tonal' startIcon={<Icon icon='tabler:filter' />}>
        Filter by
      </Button> */}
      <div></div>
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          onClick={OpenPayment}
          variant='contained'
          sx={{ '& svg': { mr: 0 } }}
          startIcon={<Icon fontSize='1.125rem' icon='tabler:plus' />}
        >
          Add Payment Method
        </Button>
      </Box>
    </Box>
  )
}

export default PaymentHeader
