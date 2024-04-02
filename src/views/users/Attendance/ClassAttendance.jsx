import React, { useEffect, useState, Fragment } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomChip from 'src/@core/components/mui/chip'


// ** Third Party Imports
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import {  formatDateToYYYMMDDD, formatFirstLetter, } from '../../../@core/utils/format'
import { Button, Card, CardContent, CardHeader, Grid, MenuItem, Tooltip } from '@mui/material'
import { useStaff } from '../../../hooks/useStaff'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { useSubjects } from '../../../hooks/useSubjects'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { useStudentsScores } from '../../../hooks/useStudentsScores'
import PageHeader from '../component/PageHeader'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import MarkAttendance, { CustomInput } from './MarkAttendance'
import { fetchClassAttendance } from '../../../store/apps/attendance/asyncthunk'
import { useAttendance } from '../../../hooks/useAttendance'

const defaultValues = {
    date: '',
  }

  const schema = yup.object().shape({
    date: yup.string().required('Date is required'),
  })

const ClassAttendanceTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const [StaffData] = useStaff()
  const [SubjectsList] = useSubjects()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [StudentData] = useStudent()
  const [StudentsScoresData] = useStudentsScores()
  const [ClassAttendanceData, loading] = useAttendance()


  // States

  const [openAttendanceModal, setAttendanceModal] = useState(false)
  const [classId, setClassId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [date, setDate] = useState('')


  const handleChangeClass = e => {
    Number(setClassId(e.target.value))
  }

  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }


const displayAttendance = async (data)=>{
    const date = formatDateToYYYMMDDD(data.date)

    dispatch(fetchClassAttendance({ classId, sessionId, date}))
}

const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(schema) })
  

  const toggleMarkAttendanceDrawer = () => setAttendanceModal(!openAttendanceModal)

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    dispatch(fetchClasses({page: 1, limit: 300, key: ''}))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))

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
                {/* <MenuItem value=''>{ staffId ? `All Staff` : `Select Staff`}</MenuItem> */}
                {ClassesList?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item?.name} ${item.type}` }
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
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item?.name} ${item.term}` }
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
                  }}
                  placeholderText='MM/YYYY'
                  customInput={
                    <CustomInput
                      value={value}
                      onChange={onChange}
                      autoComplete='off'
                      label='Date'
                      error={Boolean(errors.date)}
                      {...(errors.date && { helperText: errors.date.message })}
                    />
                  }
                />
              )}
            />
              </Grid>
             

            <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' disabled={ isSubmitting || !classId || !sessionId} sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
          Display Attendance
        </Button>
            </Grid>
          </Grid>
            </form>
        </CardContent>
      </Card> 

      <PageHeader action={'Take Attendance'} icon={'mdi:timetable'} toggle={toggleMarkAttendanceDrawer}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                S/N
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                STUDENT 
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                CHECK IN TIME
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                STATUS
              </TableCell> 
              <TableCell align='left' sx={{ minWidth: 200 }}>
                REASON FOR ABSENCE
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
                {ClassAttendanceData?.map((item, i) => {

                    const Student = StudentData?.result?.find((student)=> student.id == item.studentId)

                  return (
                    <TableRow hover role='checkbox' key={item?.id}>
                      <TableCell align='left'>{i + 1}</TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>{`${Student.firstName} ${Student.lastName}`}</TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>{item.checkInTime?.slice(0, 5)}</TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>
                      {item.attendanceStatus ? (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Present'}
                                color='success'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            ) : (
                              <CustomChip
                                rounded
                                skin='light'
                                size='small'
                                label={'Absent'}
                                color='error'
                                sx={{ textTransform: 'capitalize' }}
                              />
                            )}

                        
                        </TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>{`${item?.reasonForAbsence ? item?.reasonForAbsence :  '--'}` }</TableCell>

                      
                    </TableRow>
                  )
                })}

                {ClassAttendanceData?.length === 0 && (
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

      {/* <TablePagination
        page={page}
        component='div'
        count={Paging?.totalItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}

      {/* 

       */}

      {openAttendanceModal && (
        <MarkAttendance
          open={openAttendanceModal}
          closeModal={toggleMarkAttendanceDrawer}
        />
      )}

    </div>
  )
}

export default ClassAttendanceTable


