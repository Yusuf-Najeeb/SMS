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
import CustomAvatar from 'src/@core/components/mui/avatar'

import { useAppDispatch } from '../../../hooks'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { Box, Button, Card, CardContent, CardHeader, Grid, MenuItem, Stack, Tooltip, Typography } from '@mui/material'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { fetchStudentReportCard, fetchStudentSubjectPosition } from '../../../store/apps/reportCard/asyncthunk'
import EnterStudentScore from './EnterScore'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import { useStudentReportCard } from '../../../hooks/useStudentReportCard'
import { useStudentSubjectPosition } from '../../../hooks/useStudentsSubjectPosition'
import { useTheme } from '@mui/material/styles'
import { useCurrentSession } from '../../../hooks/useCurrentSession'
import { fetchCurrentSession } from '../../../store/apps/currentSession/asyncthunk'
import { formatFirstLetter } from '../../../@core/utils/format'
import themeConfig from 'src/configs/themeConfig'
import SchoolDetails from './SchoolDetails'
import StudentReportCardDetails from './StudentReportCardDetails'

const StudentsReportCardTable = () => {
  // Hooks
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [StudentData] = useStudent()
  const [StudentReportCard, loading] = useStudentReportCard()
  const [StudentSubjectPosition] = useStudentSubjectPosition()
  const [CurrentSessionData] = useCurrentSession()

  console.log(StudentSubjectPosition, 'StudentSubjectPosition')
  console.log(StudentReportCard, 'students report card')

  // States

  const [openScoreModal, setScoreModal] = useState(false)
  const [classId, setClassId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [studentId, setStudentId] = useState('')
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [activeStudent, setActiveStudent] = useState({})
  const [classRoom, setClassroom] = useState({})
  const [showResult, setShowResult] = useState(false)


  const handleChangeClass = e => {
    Number(setClassId(e.target.value))
  }

  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }

  const handleChangeStudent = e => {
    Number(setStudentId(e.target.value))
  }

  const displayReportCard = async () => {
    const res = await dispatch(fetchStudentReportCard({ classId, studentId, sessionId }))
    if(res.payload.data.success){
      setShowResult(true)
    }
    dispatch(fetchStudentSubjectPosition({ classId, sessionId }))
  }

  const toggleScoreDrawer = () => setScoreModal(!openScoreModal)

  useEffect(() => {
    if (activeStudent) {
      setProfilePictureUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL.replace('api', '')}/${activeStudent?.profilePicture}`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStudent])

  useEffect(() => {
    let isMounted = true

    if (studentId && StudentData?.result.length > 0) {
      const selectedStudent = StudentData?.result.find(student => student.id == studentId)

      if (isMounted) {
        setActiveStudent({ ...selectedStudent })
      }
    }

    // Cleanup function
    // return () => {
    //   isMounted = false
    //   setActiveStudent({})
    // }
  }, [studentId, StudentData])

  useEffect(() => {
    let isMounted = true

    if (classId && ClassesList?.length > 0) {
      const selectedClass = ClassesList?.find(classroom => classroom.id == classId)

      if (isMounted) {
        setClassroom({ ...selectedClass })
      }
    }

  }, [classId, ClassesList])

  useEffect(() => {
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))
    dispatch(fetchCurrentSession())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Card>
        <CardHeader title='Filter' />
        <CardContent>
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
                label='Student*'
                SelectProps={{ value: studentId, onChange: e => handleChangeStudent(e) }}
              >
                {StudentData?.result?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                    {`${item?.firstName} ${item?.lastName}`}
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
                    {`${item?.name}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                onClick={displayReportCard}
                variant='contained'
                disabled={!studentId || !classId || !sessionId}
                sx={{ '& svg': { mr: 2 } }}
              >
                <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
                Display Student Report Card
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {(!loading && showResult )  &&

      <Box className='resultBg' sx={{pt: 5, pb: 10, paddingLeft: 3, paddingRight: 3, mt: 10, backgroundColor: "#fff"}}>
        <Box className="bgOverlay"></Box>
      {(StudentReportCard.length > 0 && Object.keys(activeStudent).length > 0) && 
      <CardContent >

      <SchoolDetails />

        <Box sx={{color: '#fff', backgroundColor: "#333333", height: '70px', width: '100%', mt: 3, mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <Typography sx={{fontSize: '1.4rem', fontWeight: 600, fontStyle: 'italic', textAlign: 'center'}}> {`Termly Report For ${activeStudent?.firstName} ${activeStudent?.lastName}`}</Typography> 
           </Box>
        <StudentReportCardDetails activeStudent={activeStudent} profilePictureUrl={profilePictureUrl} classRoom={classRoom} CurrentSessionData={CurrentSessionData}/>
      </CardContent>
      }

      
      <TableContainer component={Paper} sx={{ maxHeight: 840, mt: 10, }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead >
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 200 }}>
                SUBJECT
              </TableCell>

              <TableCell align='left' sx={{ minWidth: 100 }}>
                C.A 1
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                C.A 2
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Assignment 1
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Assignment 2
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Class Exercise
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Project
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Exam
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Total (100%)
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                Grade
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 120 }}>
                REMARK
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           
              <Fragment>
                { StudentReportCard?.map((item, i) => {
                  const FirstAssignment = item?.result?.find(res => res.category == 'Assignment 1')
                  const SecondAssignment = item?.result?.find(res => res.category == 'Assignment 2')
                  const FirstCA = item?.result?.find(res => res.category == 'continuous assessment 1')
                  const SecondCA = item?.result?.find(res => res.category == 'continuous assessment 2')
                  const ClassExercise = item?.result?.find(res => res.category == 'class exercise')
                  const Exam = item?.result?.find(res => res.category == 'Final exam')
                  const Project = item?.result?.find(res => res.category == 'project / practical')

                  return (
                    <TableRow hover role='checkbox' key={item?.id}>
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {item?.subject || '--'}
                      </TableCell>
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {FirstCA?.score || `--`}
                      </TableCell>
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {SecondCA?.score || `--`}
                      </TableCell>
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {FirstAssignment?.score || `--`}
                      </TableCell>
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {SecondAssignment?.score || `--`}
                      </TableCell>
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {ClassExercise?.score || `--`}
                      </TableCell>
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {Project?.score || `--`}
                      </TableCell>
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {Exam?.score || `--`}
                      </TableCell>
                      <TableCell align='left' sx={{ textTransform: 'uppercase', color: 'yellowgreen' }}>
                        {item?.total || `--`}
                      </TableCell>

                      <TableCell align='left'>{item?.grade || '--'}</TableCell>
                      <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                        {item?.remark || `--`}
                      </TableCell>
                    </TableRow>
                  )
                })  }

               
              </Fragment>
            
          </TableBody>
        </Table>
      </TableContainer>


      </Box>
              }


      {openScoreModal && <EnterStudentScore open={openScoreModal} closeModal={toggleScoreDrawer} />}
    </div>
  )
}

export default StudentsReportCardTable
