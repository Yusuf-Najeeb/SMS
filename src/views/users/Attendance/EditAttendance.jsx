import { useEffect, useState, Fragment, forwardRef } from 'react'

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

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateAttendanceSchema } from 'src/@core/Formschema'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import FormController from '../component/FormController'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { fetchClasses, fetchStudentsInClass } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { useStaff } from '../../../hooks/useStaff'
import { useSubjects } from '../../../hooks/useSubjects'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { useCategories } from '../../../hooks/useCategories'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import { formatDateToYYYMMDDD } from '../../../@core/utils/format'
import { updateAttendance } from '../../../store/apps/attendance/asyncthunk'

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

const defaultValues = {
  staffId: '',
  studentId: '',
  classId: '',
  sessionId: '',
  date: new Date(),
  checkInTime: '',
  attendanceStatus: '',
  reasonForAbsence: ''
}

const EditAttendance = ({ open, closeModal, selectedRecord, fetchData }) => {
  const [ClassRoomId, setClassRoomId] = useState()
  const [studentsInClass, setStudentsInClass] = useState([])
  const [attendanceState, setAttendanceState] = useState(false)
  const [itemsArray, setItemsArray] = useState('')

  // ** Hooks
  const dispatch = useDispatch()
  const [StaffData] = useStaff()
  const [StudentData] = useStudent()

  // const [CategoriesData] = useCategories()
  // const [SubjectsList] = useSubjects()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()

  const handleChangeClass = e => setClassRoomId(Number(e.target.value))

  const handleAttendanceState = e => {
    if (e.target.value == false) {
      setAttendanceState(true)
    } else {
      setAttendanceState(false)
    }
  }

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'assessment' }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ClassRoomId) {
      fetchStudentsInClass(ClassRoomId).then(res => {
        if (res?.data?.success) {
          setStudentsInClass(res?.data?.data)
        }
      })
    }
  }, [ClassRoomId])

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(updateAttendanceSchema) })

  useEffect(() => {
    if (selectedRecord) {
      selectedRecord.studentId !== null ? setValue('studentId', selectedRecord.studentId) : setValue('studentId', '')
      selectedRecord.staffId !== null ? setValue('staffId', selectedRecord.staffId) : setValue('staffId', '')
      selectedRecord.sessionId !== null ? setValue('sessionId', selectedRecord.sessionId) : setValue('sessionId', '')

      selectedRecord.date !== null ? setValue('date', new Date(selectedRecord.date)) : setValue('date', '')
      selectedRecord.checkInTime !== null
        ? setValue('checkInTime', selectedRecord.checkInTime)
        : setValue('checkInTime', '')
      selectedRecord.attendanceStatus !== null
        ? setValue('attendanceStatus', selectedRecord.attendanceStatus)
        : setValue('attendanceStatus', '')
      selectedRecord.reasonForAbsence !== null
        ? setValue('reasonForAbsence', selectedRecord.reasonForAbsence)
        : setValue('reasonForAbsence', '')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecord])

  // Watch all input fields and track changes
  const watchedFields = watch()

  const onSubmit = async values => {
    // Monitor changed input fields so that only changed fields are submitted
    const changedFields = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== selectedRecord[key]) {
        acc[key] = value
      }

      return acc
    }, {})

    const { date, ...restOfData } = changedFields

    const formattedDate = formatDateToYYYMMDDD(date)

    const payload = {
      ...(changedFields.hasOwnProperty('studentId') && { studentId: changedFields.studentId }),
      ...(changedFields.hasOwnProperty('staffId') && { staffId: changedFields.staffId }),
      ...(changedFields.hasOwnProperty('sessionId') && { sessionId: changedFields.sessionId }),
      ...(changedFields.hasOwnProperty('classId') && { classId: changedFields.classId }),
      ...(changedFields.hasOwnProperty('date') && { date: formattedDate }),
      ...(changedFields.hasOwnProperty('checkInTime') && { checkInTime: changedFields.checkInTime }),
      ...(changedFields.hasOwnProperty('attendanceStatus') && { attendanceStatus: changedFields.attendanceStatus }),
      ...(changedFields.hasOwnProperty('reasonForAbsence') && { reasonForAbsence: changedFields.reasonForAbsence })
    }

    updateAttendance(payload, selectedRecord.id).then(response => {
      if (response?.data?.success) {
        reset()
        closeModal()
        fetchData()
      }
    })
  }

  const handleChange = e => {
    const selectedStudent = StudentData.result.filter(c => c.id === e.target.value)
    if (selectedStudent.length > 0) {
      const { id, firstName, lastName } = selectedStudent?.[0]
      setItemsArray(`${id}. ${firstName} ${lastName}`)
    } else {
      setItemsArray('')
    }
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        open={open}
        maxWidth='md'
        scroll='body'
        //eslint_disable-next-line
        //   TransitionComponent={Transition}
        //   sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 450 } }}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '95%', maxWidth: 680 } }}
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`
              }}
            >
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
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
                        onChange={e => {
                          onChange(e)

                          handleChangeClass(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.classId)}
                        aria-describedby='stepper-linear-personal-classId-helper'
                        {...(errors.classId && { helperText: errors.classId.message })}
                      >
                        <MenuItem value=''>Select Class</MenuItem>
                        {ClassesList?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {`${item.name} ${item.type}`}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='staffId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Class Teacher'
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.staffId)}
                        aria-describedby='stepper-linear-personal-staffId-helper'
                        {...(errors.staffId && { helperText: errors.staffId.message })}
                      >
                        <MenuItem value=''>Select Class Teacher</MenuItem>
                        {StaffData?.result?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {`${item?.firstName} ${item?.lastName}`}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='studentId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Student'
                        onChange={e => {
                          onChange(e)

                          //
                          handleChange(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.studentId)}
                        aria-describedby='stepper-linear-personal-studentId-helper'
                        {...(errors.studentId && { helperText: errors.studentId.message })}
                      >
                        <MenuItem>{studentsInClass.length > 0 ? 'Select Student' : 'No student registered'}</MenuItem>
                        {studentsInClass?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {`${item.firstName} ${item.lastName}`}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.sessionId)}
                        aria-describedby='stepper-linear-personal-sessionId-helper'
                        {...(errors.sessionId && { helperText: errors.sessionId.message })}
                      >
                        <MenuItem value=''>Select Session</MenuItem>
                        {SessionData?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {`${item.name} ${item.term}`}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='date'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        popperPlacement='bottom-end'
                        showYearDropdown
                        showMonthDropdown
                        onChange={e => onChange(e)}
                        placeholderText='2022-05-07'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label='Date'
                            error={Boolean(errors.date)}
                            {...(errors.date && { helperText: errors.date.message })}
                          />
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='checkInTime'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        type='time'
                        value={value}
                        sx={{ mb: 4 }}
                        label='Check In Time'
                        required
                        onChange={onChange}
                        placeholder='10:30'
                        error={Boolean(errors.checkInTime)}
                        {...(errors.checkInTime && { helperText: errors.checkInTime.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='attendanceStatus'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        select
                        value={value}
                        sx={{ mb: 4 }}
                        label='Attendance Status'
                        required
                        onChange={e => {
                          onChange(e)

                          handleAttendanceState(e)
                        }}
                        error={Boolean(errors.attendanceStatus)}
                        {...(errors.attendanceStatus && { helperText: errors.attendanceStatus.message })}
                      >
                        <MenuItem value={true}>Present</MenuItem>
                        <MenuItem value={false}>Absent</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
                {itemsArray && (
                  <Grid item sx={{ mt: 5 }} xs={12} sm={12} md={12}>
                    <Typography variant='h5'>Student Name</Typography>
                    <Alert severity='success'>
                      <Typography>{itemsArray}</Typography>
                    </Alert>
                  </Grid>
                )}

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='reasonForAbsence'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        multiline
                        rows={2}
                        value={value}
                        sx={{ mb: 4 }}
                        label='Reason For Absence'
                        disabled={!attendanceState}
                        onChange={onChange}
                        error={Boolean(errors.reasonForAbsence)}
                        {...(errors.reasonForAbsence && { helperText: errors.reasonForAbsence.message })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <Box sx={{ mt: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button type='submit' variant='contained' disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Update Record'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default EditAttendance
