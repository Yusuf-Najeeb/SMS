import { Fragment, forwardRef, useEffect, useState } from 'react'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

import { Alert, CircularProgress, MenuItem, Typography } from '@mui/material'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { ButtonStyled } from '../../../@core/components/mui/button/ButtonStyledComponent'
import { handleInputImageChange } from '../../../@core/utils/uploadImage'

export const CustomCloseButton = styled(IconButton)(({ theme }) => ({
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


export const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const UploadTimetable = ({ open, closeModal, refetchData }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(``)

 

  const onSubmit = async values => {
   

  }

  return (

    <Fragment> 
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'

      //   TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 990 } }}
    >
      <DialogContent
        sx={{
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={closeModal}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>

        <Grid item xs={12} sm={6} sx={{ mb: 6, ml: 6, display: 'flex', flexDirection: 'row', gap: '2rem' }}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: '3px dotted black',
                    borderRadius: 3,
                    p: 3,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    <input
                      hidden
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={e => handleInputImageChange(e, setPreviewUrl, setSelectedImage, setImageLinkPayload)}
                      id='account-settings-upload-image'
                    />

                    <Icon icon='tabler:upload' fontSize='1.45rem' />
                  </ButtonStyled>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    Upload Guardian Image
                  </Typography>
                </Box>
              </Grid>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  alignItems: 'center',
                  alignSelf: 'center'
                }}
              >
                {selectedImage &&
                <img
                  src={`${previewUrl}`}
                  width={120}
                  height={100}
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  alt='guardian image'
                /> }
              </Box>
            </Grid>

        {/* <form onSubmit={handleSubmit(onSubmit)}>
         
         

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
         
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Submit Timetable'}
            </Button>
          </Box>
        </form> */}


      </DialogContent>
    </Dialog>
    </Fragment>
  )
}

export default UploadTimetable
