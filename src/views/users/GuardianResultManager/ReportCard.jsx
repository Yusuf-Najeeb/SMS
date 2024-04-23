import React, { useEffect, useState, Fragment } from 'react'

import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { useAppDispatch } from '../../../hooks'
import { Box, Button, Card, CardContent, CardHeader, Grid, MenuItem, Typography } from '@mui/material'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { fetchStudentReportCard, fetchStudentSubjectPosition } from '../../../store/apps/reportCard/asyncthunk'

import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import { useStudentReportCard } from '../../../hooks/useStudentReportCard'
import { useStudentSubjectPosition } from '../../../hooks/useStudentsSubjectPosition'
import { useTheme } from '@mui/material/styles'
import { useCurrentSession } from '../../../hooks/useCurrentSession'
import { fetchCurrentSession } from '../../../store/apps/currentSession/asyncthunk'
import SchoolDetails from '../ResultManager/SchoolDetails'
import CustomResultTable from '../component/CustomResultTable'
import DismissibleAlert from '../component/DismissibleAlert'
import GetUserData from '../../../@core/utils/getUserData'
import { getStudentsUnderGuardian } from '../../../store/apps/guardian/asyncthunk'
import StudentReportCardDetails from '../StudentResultManager/ReportCardDetails'

const userData = GetUserData()

const ReportCardTable = () => {
  // Hooks
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [StudentData] = useStudent()
  const [StudentReportCard, loading] = useStudentReportCard()
  const [StudentSubjectPosition] = useStudentSubjectPosition()
  const [CurrentSessionData] = useCurrentSession()

  // States
  const [classId, setClassId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [studentId, setStudentId] = useState('')
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [activeStudent, setActiveStudent] = useState({})
  const [classRoom, setClassroom] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [noResult, setNoResult] = useState(false)
  const [wardData, setWard] = useState([])


  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }

  const handleChangeStudent = e => {

      Number(setStudentId(e.target.value))
    const student = wardData.find((ward)=> ward?.id == Number(e.target.value))
    const studentClassId = student?.classId
    setClassId(studentClassId)
  }




  const displayReportCard = async () => {
    const res = await dispatch(fetchStudentReportCard({ classId, studentId, sessionId }))

    if (Object.keys(res.payload.data.data.subject).length > 0) {
      dispatch(fetchStudentSubjectPosition({ classId, sessionId }))
      setShowResult(true)
      setNoResult(false)
      const selectedStudent = StudentData?.result.find(student => student.id == studentId)

      setActiveStudent({ ...selectedStudent })
    } else {
      setShowResult(false)
      setNoResult(true)
      setActiveStudent({})
    }
  }

  useEffect(() => {
    if (userData) {
      getStudentsUnderGuardian(userData?.email)
        .then(res => {
          if (res?.data?.success) {
            setWard(res?.data?.data)
          } else {
            setWard([])
          }
        })
        
    }
  }, [])


  useEffect(() => {
    if (activeStudent) {
      setProfilePictureUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL.replace('api', '')}/${activeStudent?.profilePicture}`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStudent])

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
                label='Student*'
                SelectProps={{ value: studentId, onChange: e => handleChangeStudent(e) }}
              >
                {wardData?.length > 0 ?  wardData?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                    {`${item.firstName} ${item.lastName}`}
                  </MenuItem>
                ))
                : 
               
                    <MenuItem value='' sx={{ textTransform: 'uppercase' }}>
                      {`No wards assigned`}
                    </MenuItem>
            }
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Session*'
                SelectProps={{ value: sessionId, onChange: e => handleChangeSession(e) }}
              >
                {SessionData?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                    {`${item.name} ${item.term} term`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                onClick={displayReportCard}
                variant='contained'
                disabled={!studentId || !classId || !sessionId}
                sx={{ '& svg': { mr: 2 }, backgroundColor: 'info.main' }}
              >
                <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
                Display Report Card
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {!loading && showResult && (
        <Box
          className='resultBg'
          sx={{ pt: 5, pb: 10, paddingLeft: 3, paddingRight: 3, mt: 10, backgroundColor: '#fff' }}
        >
          <Box className='bgOverlay'></Box>
          {StudentReportCard.length > 0 && Object.keys(activeStudent).length > 0 && (
            <CardContent>
              <SchoolDetails />

              <Box
                sx={{
                  color: '#fff',
                  backgroundColor: '#333333',
                  height: '50px',
                  width: '100%',
                  mt: 3,
                  mb: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, fontStyle: 'italic', textAlign: 'center' }}>
                  {' '}
                  {`Termly Report For ${activeStudent?.firstName} ${activeStudent?.lastName}`}
                </Typography>
              </Box>
              <StudentReportCardDetails
                activeStudent={activeStudent}
                profilePictureUrl={profilePictureUrl}
                classRoom={classRoom}
                CurrentSessionData={CurrentSessionData}
              />
            </CardContent>
          )}

          <CustomResultTable
            tableData={StudentReportCard}
            positionArray={StudentSubjectPosition}
            studentId={studentId}
          />
        </Box>
      )}

      {noResult && <DismissibleAlert AlertMessage={'No Records Found'} />}

    </div>
  )
}

export default ReportCardTable
