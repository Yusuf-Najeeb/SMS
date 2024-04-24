// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomTextField from 'src/@core/components/mui/text-field'
import { Button, CircularProgress, Grid, MenuItem, Popover } from '@mui/material'

// Custom Hooks
import { useAppDispatch } from '../../../hooks'

// Third Party/Schema Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { useSubjects } from '../../../hooks/useSubjects'
import { useSession } from '../../../hooks/useSession'
import { useClasses } from '../../../hooks/useClassess'

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

const defaultValues = {
  classId: '', 
  sessionId: '',
  subjectName: ''
}

const schema = yup.object().shape({
    classId: yup.string().required('Class is required'),
    sessionId: yup.string().required('Session is required'),
    subjectName: yup.string().required('Subject is required'),
  })

const DownloadScoresheetDialog = ({ open, anchorEl, handleClose }) => {
  const dispatch = useAppDispatch()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [SubjectsList] = useSubjects()


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

  const downloadTemplate = async (values) => {

    const classId = Number(values.classId)
    const sessionId = Number(values.sessionId)

    try {
      const { data } = await axios.get(`/gradebook/toexcel/${classId}/${sessionId}/${values.subjectName}`)

      if (data?.success) {
       const downloadLink = `${backendURL?.replace('api', '')}${data?.data?.slice(7)}`
       window.location.href = downloadLink
        notifySuccess('Download Successful')
        closeDialog()
      }
    } catch (error) {
     
        notifyError(error?.response?.data?.message || "Download failed")
      
    }
  }

  useEffect(() => {
    dispatch(fetchClasses({page: 1, limit: 300, key: ''}))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Popover
      id='download-popover'
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
    >
      <form onSubmit={handleSubmit(downloadTemplate)}>
        <Grid container spacing={5} sx={{ p: '2rem', width: '310px' }}>
          

          <Grid item xs={12} sm={12}>
            <Controller
              name='classId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  required
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
              name='subjectName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  required
                  value={value}
                  label='Subject'
                  onChange={onChange}
                  error={Boolean(errors.subjectName)}
                  aria-describedby='stepper-linear-account-subjectName'
                  {...(errors.subjectName && { helperText: errors.subjectName.message })}
                >
                  <MenuItem value=''>Select Subject</MenuItem>
                  {SubjectsList?.map(item => (
                  <MenuItem key={item?.id} value={item?.name} sx={{textTransform: 'uppercase'}}>
                    {`${item?.name}` }
                  </MenuItem>
                ))}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name='sessionId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  required
                  value={value}
                  label='Session'
                  onChange={onChange}
                  error={Boolean(errors.sessionId)}
                  aria-describedby='stepper-linear-account-sessionId'
                  {...(errors.sessionId && { helperText: errors.sessionId.message })}
                >
                  <MenuItem value=''>Select Session</MenuItem>
                  {SessionData?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item.name} ${item.term} term`}
                  </MenuItem>
                ))}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='tonal' onClick={closeDialog} startIcon={<Icon icon='mdi:arrow-left-bold' />}>
              Close
            </Button>
            <Button type='submit' variant='contained' color='success'>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ mx: 2 }} />}
              Download
            </Button>
          </Grid>
        </Grid>
      </form>
    </Popover>
  )
}

export default DownloadScoresheetDialog
