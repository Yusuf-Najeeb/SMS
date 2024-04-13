import React, { useEffect, useState, Fragment } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import IconButton from '@mui/material/IconButton'

import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { formatDateToYYYMMDDD } from '../../../@core/utils/format'
import { Button, Card, CardContent, CardHeader, Grid, MenuItem, Tooltip } from '@mui/material'
import { useStaff } from '../../../hooks/useStaff'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { fetchClasses, fetchStudentsInClass } from '../../../store/apps/classes/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { CustomInput } from './EditAttendance'
import { saveStudentAttendance } from '../../../store/apps/attendance/asyncthunk'

const defaultValues = {
  date: ''
}

const schema = yup.object().shape({
  date: yup.string().required('Date is required')
})

const ClassAttendance = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const [StaffData] = useStaff()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()


  // States

  const [openAttendanceModal, setAttendanceModal] = useState(false)
  const [classId, setClassId] = useState('')
  const [staffId, setStaffId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [date, setDate] = useState('')
  const [classInView, setClassInView] = useState('')
  const [loading, setLoading ] = useState(false)

  const [selectedDate, setSelectedDate] = useState('')

  const [attendanceStatusForAll, setAttendanceStatusForAll] = useState(false)

  const [studentsInClass, setStudentsInClass] = useState([])
  const [attendanceData, setAttendanceData] = useState([])

  const handleAttendanceStatusChangeForAll = e => {
    setAttendanceStatusForAll(!attendanceStatusForAll)

    const updatedAttendance = attendanceData.map(attendance => {
      return { ...attendance, attendanceStatus: e.target.checked }
    })
    setAttendanceData(updatedAttendance)
  }

  // Function to handle checkbox toggle
  const handleCheckboxChange = (isChecked, studentId) => {
    const updatedAttendance = attendanceData.map(attendance => {
      if (attendance.studentId === studentId) {
        return { ...attendance, attendanceStatus: isChecked }
      }

      return attendance
    })
    setAttendanceData(updatedAttendance)
  }

  // Function to handle time input change
  const handleTimeInputChange = (e, studentId) => {
    const updatedAttendance = attendanceData.map(attendance => {
      if (attendance.studentId === studentId) {
        return { ...attendance, checkInTime: e.target.value }
      }

      return attendance
    })
    setAttendanceData(updatedAttendance)
  }

  // Function to handle reason input change
  const handleReasonInputChange = (e, studentId) => {
    const updatedAttendance = attendanceData.map(attendance => {
      if (attendance.studentId === studentId) {
        return { ...attendance, reasonForAbsence: e.target.value }
      }

      return attendance
    })
    setAttendanceData(updatedAttendance)
  }

  const handleChangeClass = e => {
    Number(setClassId(e.target.value))
  }

  const handleChangeStaff = e => {
    Number(setStaffId(e.target.value))
  }

  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }

  const displayAttendance = async data => {
    setLoading(true)
    const date = formatDateToYYYMMDDD(data.date)
    setDate(date)

    fetchStudentsInClass(classId).then(res => {
      if (res?.data?.success) {
        const classRoom = ClassesList.find(classR => classR.id == classId)
        const cl = `${classRoom.name} ${classRoom.type}`
        setClassInView(cl)
        setLoading(false)
        setStudentsInClass(res?.data?.data)
      } else {
        setClassInView('')
        setLoading(false)
      }
    })
  }

  const saveAttendance = () => {
    const payload = {
      attendance: attendanceData
    }

    saveStudentAttendance(payload)
  }


  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(schema) })

  const toggleMarkAttendanceDrawer = () => setAttendanceModal(!openAttendanceModal)

  useEffect(() => {
    if (studentsInClass.length > 0) {
      // Fill the attendanceData array with objects containing classId, sessionId, date, and studentId
      const filledArray = studentsInClass.map(student => ({
        classId,
        sessionId,
        date,
        staffId,
        checkInTime: '',
        reasonForAbsence: '',
        attendanceStatus: false,
        studentId: student.id 
      }))
      setAttendanceData(filledArray)
    }
  }, [studentsInClass, classId, sessionId, date, staffId])

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))
    dispatch(fetchSession({ page: 1, limit: 300 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Card>
        <CardHeader title='Filter' />
        <CardContent>
          <form onSubmit={handleSubmit(displayAttendance)}>
            <Grid container spacing={12}>
              <Grid item xs={12} sm={3}>
                <CustomTextField
                  select
                  fullWidth
                  label='Class*'
                  SelectProps={{ value: classId, onChange: e => handleChangeClass(e) }}
                >
                  {ClassesList?.map(item => (
                    <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                      {`${item?.name} ${item.type}`}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <CustomTextField
                  select
                  fullWidth
                  label='Session*'
                  SelectProps={{ value: sessionId, onChange: e => handleChangeSession(e) }}
                >
                  {/* <MenuItem value=''>{ staffId ? `All Staff` : `Select Staff`}</MenuItem> */}
                  {SessionData?.map(item => (
                    <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                      {`${item?.name} ${item.term}`}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <CustomTextField
                  select
                  fullWidth
                  label='Class Teacher*'
                  SelectProps={{ value: staffId, onChange: e => handleChangeStaff(e) }}
                >
                  {/* <MenuItem value=''>{ staffId ? `All Staff` : `Select Staff`}</MenuItem> */}
                  {StaffData?.result?.map(item => (
                    <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                      {`${item?.firstName} ${item.lastName}`}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Controller
                  name='date'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      showYearDropdown
                      showMonthDropdown
                      popperPlacement='bottom-end'
                      maxDate={new Date()}
                      onChange={e => {
                        onChange(e)
                        setSelectedDate(e)
                      }}
                      placeholderText='MM/YYYY'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          autoComplete='off'
                          label='Date*'
                          error={Boolean(errors.date)}
                          {...(errors.date && { helperText: errors.date.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={isSubmitting || !classId || !sessionId || !staffId || selectedDate.length < 1}
                  sx={{ '& svg': { mr: 2 }, backgroundColor: 'info.main' }}
                >
                  <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
                  Display Attendance
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Fragment>
        <TableContainer component={Paper} sx={{ maxHeight: 840, mt: 15 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 80 }}>
                  S/N
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 200 }}>
                  ATTENDANCE STATUS
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 150 }}>
                  CHECK IN TIME
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 270 }}>
                  REASON FOR ABSENCE
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 200 }}>
                  STUDENT NAME
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 100 }}>
                  CLASS
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  DATE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow className='text-center'>
                  <TableCell colSpan={6}>
                    <CustomSpinner />
                  </TableCell>
                </TableRow>
              ) : (
                <Fragment>
                  {studentsInClass?.map((student, i) => {
                    //   const Student = StudentData?.result?.find(student => student.id == item.studentId)

                    return (
                      <TableRow hover role='checkbox' key={student?.id}>
                        <TableCell align='left'>{i + 1}</TableCell>
                        <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                          <label for={`attendanceStatus-${student?.id}`}>
                            {attendanceData.find(attendance => attendance.studentId === student.id)?.attendanceStatus
                              ? 'Present'
                              : 'Absent'}
                          </label>
                          <input
                            name={`attendanceStatus-${student?.id}`}
                            type='checkbox'
                            checked={
                              attendanceData.find(attendance => attendance.studentId === student.id)
                                ?.attendanceStatus || false
                            }
                            onChange={e => handleCheckboxChange(e.target.checked, student.id)}
                          />
                        </TableCell>

                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                          <input
                            name={`time-${student?.id}`}
                            type='time'
                            value={
                              attendanceData.find(attendance => attendance.studentId === student.id)?.checkInTime || ''
                            }
                            onChange={e => handleTimeInputChange(e, student.id)}
                          />
                        </TableCell>

                        <TableCell align='center'>
                          <input
                            name={`reasonForAbsence-${student?.id}`}
                            style={{ minWidth: '270px' }}
                            type='text'
                            disabled={
                              attendanceData.find(attendance => attendance.studentId === student.id)?.attendanceStatus
                            }
                            value={
                              attendanceData.find(attendance => attendance.studentId === student.id)
                                ?.reasonForAbsence || ''
                            }
                            onChange={e => handleReasonInputChange(e, student.id)}
                          />
                        </TableCell>

                        <TableCell align='center'>{`${student?.firstName} ${student?.lastName}`}</TableCell>

                        <TableCell>{classInView}</TableCell>

                        <TableCell>{date}</TableCell>
                      </TableRow>
                    )
                  })}

                  {studentsInClass?.length === 0 && (
                    <tr className='text-center'>
                      <td colSpan={6}>
                        <NoData />
                      </td>
                    </tr>
                  )}
                </Fragment>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {studentsInClass?.length > 0 && (
          <Card>
            <CardContent>
              <Grid container spacing={12}>
                <Grid item xs={12} sm={6}>
                  <label for={`attendanceStatus-ForAll`}>
                    {!attendanceStatusForAll ? 'Mark All Present' : 'Mark All Absent'}
                  </label>
                  <input
                    name={`attendanceStatus-ForAll`}
                    type='checkbox'
                    checked={attendanceStatusForAll}
                    onChange={e => handleAttendanceStatusChangeForAll(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type='button'
                    onClick={saveAttendance}
                    variant='contained'
                    disabled={!classId}
                    sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.main' }}
                  >
                    <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
                    Save Attendance
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Fragment>

    </div>
  )
}

export default ClassAttendance
