// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Custom Hooks
import { useAppDispatch } from '../../../hooks'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import { Box, Button, CircularProgress, Grid, MenuItem, Popover, Typography } from '@mui/material'


// Third Party/Schema Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import * as yup from 'yup'

import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifyWarn } from 'src/@core/components/toasts/notifyWarn'
import { useClasses } from '../../../hooks/useClassess'
import { useSubjects } from '../../../hooks/useSubjects'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'

export const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const defaultValues = {
    classId: '', 
    subjectId: '',
    subjectName: ''
  }

  const schema = yup.object().shape({
    classId: yup.string().required('Class is required'),
    subjectId: yup.string().required('Subject is required'),
  })

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const UploadScoreSheetDialog = ({ open, anchorEl, handleClose }) => {
  const dispatch = useAppDispatch()
  const [ClassesList] = useClasses()
  const [SubjectsList] = useSubjects()

  const [selectedFile, setSelectedFile] = useState(null)
  const [fileName, setFileName] = useState(null)

  // ** States

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const closeDialog = () => {
    handleClose()
    reset()
  }

  const handleFileChange = async (e) => {
    const fileInput = e.target

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]
      setFileName(file.name)
      setSelectedFile(file)

      const fileSize = file.size / 1024 / 1024 // in MB

      if (fileSize > 10) {
        notifyWarn('FILE ERROR', 'File size should not exceed 10MB.');
        setSelectedFile(null);
      }

    } else {
      notifyWarn('FILE ERROR', 'No file selected.')
      setSelectedFile(null)
    }
  }



  const handleSubmitFile = async (values)=>{

    const classId = Number(values.classId)
    const subjectId = Number(values.subjectId)

    const formData = new FormData()
    formData.append('file', selectedFile)

      try {
        const response = await axios.post(`/upload/scores?subjectId=${subjectId}&classId=${classId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data;'
          }
        })
  
        if (response) {
          notifySuccess('Score Sheet Upload successful')
          closeDialog()

          // setUploadStatus(!hasUploadedProducts)
        }
      } catch (error) {
        notifyError(error?.response ? error?.response.data.message :'Score Sheet upload failed, try again')
      }

    
  }

  useEffect(() => {
    dispatch(fetchClasses({page: 1, limit: 300, key: ''}))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 

  return (
    <Popover
      id='upload-popover'
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    >
      <form onSubmit={handleSubmit(handleSubmitFile)}>
        <Grid container spacing={5} sx={{ p: '2rem', width: '310px' }}>
        <Grid item xs={12} sm={12}>
            <Controller
              name='classId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  required
                  fullWidth
                  value={value}
                  label='Class'
                  onChange={onChange}
                  error={Boolean(errors.classId)}
                  aria-describedby='stepper-linear-account-classId'
                  {...(errors.classId && { helperText: errors.classId.message })}
                >
                  <MenuItem value=''>Select Class</MenuItem>
                  {ClassesList?.map(classRoom => (
                    <MenuItem key={classRoom?.id} value={classRoom?.id} sx={{textTransform: 'uppercase'}}>
                      {`${classRoom?.name} ${classRoom?.type}`}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name='subjectId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  required
                  fullWidth
                  value={value}
                  label='Subject'
                  onChange={onChange}
                  error={Boolean(errors.subjectId)}
                  aria-describedby='stepper-linear-account-subjectId'
                  {...(errors.subjectId && { helperText: errors.subjectId.message })}
                >
                  <MenuItem value=''>Select Subject</MenuItem>
                  {SubjectsList?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item?.name}` }
                  </MenuItem>
                ))}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid
          item
          xs={12}
          sm={6}
          sx={{ mb: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <Grid item xs={12} sm={12}>
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
              <ButtonStyled component='label' variant='contained' htmlFor='upload-excel-file'>
                <input
                  hidden
                  type='file'
                  accept='.xls, .xlsx'
                  onChange={handleFileChange}
                  id='upload-excel-file'
                />

                <Icon icon='tabler:upload' fontSize='0.85rem' />
              </ButtonStyled>
              <Typography variant='body2' sx={{ mt: 2 }}>
                Upload File
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}
          >
            <Typography variant='body2'>{fileName}</Typography>
          </Box>
          </Grid>

        </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='tonal' onClick={closeDialog} startIcon={<Icon icon='mdi:arrow-left-bold' />}>
              Close
            </Button>
            <Button type='submit' variant='contained' color='success'>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ mx: 2 }} />}
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Popover>
  )
}

export default UploadScoreSheetDialog
