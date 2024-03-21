// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'
import { Grid } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const DismissibleAlert = ({AlertMessage}) => {

    const [open, setOpen] = useState(true)

  return (
    <Grid container spacing={6} sx={{mt: 20}}>
    <Grid item xs={12} md={12}>
    <Slide in={open} direction='left' {...(open ? { timeout: 500 } : {})}>
          <Alert
          severity='error'
            action={
              <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpen(false)}>
                <Icon icon='tabler:x' />
              </IconButton>
            }
          >
            {AlertMessage}
          </Alert>
        </Slide>
        </Grid>
        </Grid>
  )
}

export default DismissibleAlert