// ** React Imports
import { Ref, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import IconButton from '@mui/material/IconButton'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const SubmitDialog = ({ open, handleClose, handleSubmit }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='sm'
      scroll='body'
      onClose={handleClose}
      onBackdropClick={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={handleClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon icon='material-symbols:drive-file-move' fontSize='4.25rem' color='#1be35b' />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant='h3' sx={{ mb: 3 }}>
                Are You Sure You want to Submit?
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>you won't be able to revert this !</Typography>
            </Box>
            <Grid container spacing={6}></Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' sx={{ mr: 1, backgroundColor: 'success.main' }} onClick={handleSubmit}>
          Yes, submit
        </Button>
        <Button variant='tonal' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SubmitDialog
