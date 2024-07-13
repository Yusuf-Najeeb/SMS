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
import { notifyWarn } from '../../../@core/components/toasts/notifyWarn'
import { uploadImage } from '../../../store/apps/upload'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'

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

const UploadTimetable = ({ open, toggle, selectedClass }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  const className = `${selectedClass.name}${selectedClass.type}`

//   const [className, setClassName] = useState('')

  console.log(selectedClass, 'selected class')
  console.log(className, 'class name')




 const handleInputImageChange = async (e) => {
    const fileInput = e.target

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]

      const fileSize = file.size / 1024 / 1024 // in MB

      if (fileSize > 5) {
        notifyWarn('FILE ERROR', 'file size cannot exceed 5Mb')

        return
      }

      if (file.type.startsWith('image/')) {
        const fileUrl = URL.createObjectURL(file)

        const formData = new FormData();
        formData.append("picture", file);
        formData.append("className", className);


        uploadImage(formData).then((res)=>{
          if (res) {
            setPreviewUrl(fileUrl)
            setSelectedImage(file)
            notifySuccess("Upload successful")
            setTimeout(()=>{toggle()}, 1000)
            
          } 
        }).catch((error)=>{
            notifyError(error?.response?.data?.message || "Unable to upload image")
        })
      } else {
        notifyWarn('FILE ERROR', 'Selected file is not an image.')
        setPreviewUrl(null)
      }
    } else {
      notifyWarn('FILE ERROR', 'No file selected.')
      setSelectedImage(null)
      setPreviewUrl(null)
    }
  }


  return (

    <Fragment> 
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'

      //   TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 550 } }}
    >
      <DialogContent
        sx={{
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={toggle}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>

        <Box sx={{ mb: 6, ml: 6, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              
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
                      onChange={e => handleInputImageChange(e)}
                      id='account-settings-upload-image'
                    />

                    <Icon icon='tabler:upload' fontSize='1.45rem' />
                  </ButtonStyled>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    Upload Timetable Image
                  </Typography>
                </Box>

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
                  alt='timetable'
                /> }
              </Box>

            </Box>


      </DialogContent>
    </Dialog>
    </Fragment>
  )
}

export default UploadTimetable
