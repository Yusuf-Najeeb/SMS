// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from 'src/hooks'
import { CircularProgress, MenuItem } from '@mui/material'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { useStaff } from '../../../hooks/useStaff'
import { useSession } from '../../../hooks/useSession'
import { useCurrentSession } from '../../../hooks/useCurrentSession'
import { fetchCurrentSession } from '../../../store/apps/currentSession/asyncthunk'
import { createTimetablePeriod } from '../../../store/apps/timetable/asyncthunk'
import { useSubjects } from '../../../hooks/useSubjects'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  day: yup
    .string()
    .min(3, obj => showErrors('day', obj.value.length, obj.min))
    .required(),
  start: yup.string().required('Start Time is required'),
  end: yup.string().required('End Time is required'),
  staffId: yup.string().required('Staff is required'),
  subjectId: yup.string().required('Subject is required'),

//   sessionId: yup.string().required('Session is required')
})

const defaultValues = {
  day: '',
  start: '',
  end: '',
  staffId: '',
  subjectId: ''

//   sessionId: ''
}

const AddPeriod = ({ open, toggle, classRoom }) => {
  const dispatch = useAppDispatch()
  const [StaffData] = useStaff()
  const [SessionData] = useSession()
  const [CurrentSessionData] = useCurrentSession()
  const [SubjectsList] = useSubjects()

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    toggle()
    reset()
  }

  const onSubmit = async data => {
    const payload = {
      day: data.day,
      classId: classRoom.id,
      staffId: Number(data.staffId),
      subjectId: Number(data.subjectId),
      sessionId: CurrentSessionData ?  CurrentSessionData.id : '',
      start: data.start,
      end: data.end
    }

    

    createTimetablePeriod(payload).then((response)=>{
        if (response?.data.success){
          handleClose()
        }
    })

  }

 

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))
    dispatch(fetchCurrentSession())
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    
    // dispatch(fetchSession({page: 1, limit: 300}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'> Add Period</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='day'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                select
                value={value}
                sx={{ mb: 4 }}
                label='Day'
                required
                onChange={onChange}
                placeholder='Monday'
                error={Boolean(errors.day)}
                {...(errors.day && { helperText: errors.day.message })}
              >
                <MenuItem value=''>Select Day</MenuItem>
                <MenuItem value='Monday'>Monday</MenuItem>
                <MenuItem value='Tuesday'>Tuesday</MenuItem>
                <MenuItem value='Wednesday'>Wednesday</MenuItem>
                <MenuItem value='Thursday'>Thursday</MenuItem>
                <MenuItem value='Friday'>Friday</MenuItem>
              </CustomTextField>
            )}
          />

          <Controller
            name='start'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='time'
                value={value}
                sx={{ mb: 4 }}
                label='Start Time'
                required
                onChange={onChange}
                placeholder='10:30'
                error={Boolean(errors.start)}
                {...(errors.start && { helperText: errors.start.message })}
              />
            )}
          />

        <Controller
            name='end'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                type='time'
                value={value}
                sx={{ mb: 4 }}
                label='End Time'
                required
                onChange={onChange}
                placeholder='11:10'
                error={Boolean(errors.end)}
                {...(errors.end && { helperText: errors.end.message })}
              />
            )}
          />

<Controller
              name='staffId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Teacher'
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  error={Boolean(errors.staffId)}
                  {...(errors.staffId && { helperText: errors.staffId.message })}
                >
                  <MenuItem value=''>Select Teacher</MenuItem>
                  {StaffData?.result?.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.id}>
                        {`${item.firstName} ${item?.lastName}`}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              )}
            />

<Controller
              name='subjectId'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Subject'
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  error={Boolean(errors.subjectId)}
                  {...(errors.subjectId && { helperText: errors.subjectId.message })}
                >
                  <MenuItem value=''>Select Subject</MenuItem>
                  {SubjectsList?.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.id} sx={{textTransform: 'uppercase'}} >
                        {`${item.name} `}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              )}
            />



          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AddPeriod
