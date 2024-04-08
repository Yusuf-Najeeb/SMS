import React, { useEffect, useState, Fragment } from 'react'

import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { useAppDispatch } from '../../../hooks'
import { Box, Button, Card, CardContent, CardHeader, Grid, MenuItem, Typography } from '@mui/material'
import { fetchClasses, fetchStudentsInClass } from '../../../store/apps/classes/asyncthunk'
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

import CustomResultTable from '../component/CustomResultTable'
import DismissibleAlert from '../component/DismissibleAlert'

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
  const [classStudents, setClassStudents] = useState([])

  const [noResult, setNoResult] = useState(false)

  const handleChangeClass = e => {
    Number(setClassId(e.target.value))
    fetchStudentsInClass(e.target.value).then(res => {
      if (res.status) {
        setClassStudents(res.data.data)
      }
    })
  }

  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('authUser'))
    setStudentId(user?.id)
  }, [])

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

  // const toggleScoreDrawer = () => setScoreModal(!openScoreModal)

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
                label='Session*'
                SelectProps={{ value: sessionId, onChange: e => handleChangeSession(e) }}
              >
                {/* <MenuItem value=''>{ staffId ? `All Staff` : `Select Staff`}</MenuItem> */}
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
                sx={{ '& svg': { mr: 2 } }}
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
              {/* <SchoolDetails /> */}

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
              {/* <StudentReportCardDetails
                activeStudent={activeStudent}
                profilePictureUrl={profilePictureUrl}
                classRoom={classRoom}
                CurrentSessionData={CurrentSessionData}
              /> */}
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

      {/* {openScoreModal && <EnterStudentScore open={openScoreModal} closeModal={toggleScoreDrawer} />} */}
    </div>
  )
}

export default ReportCardTable
