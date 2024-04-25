import React, { useEffect, useState, useRef } from 'react'

import generatePDF from 'react-to-pdf';

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
import EnterStudentScore from './EnterScore'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import { useStudentReportCard } from '../../../hooks/useStudentReportCard'
import { useStudentSubjectPosition } from '../../../hooks/useStudentsSubjectPosition'
import { useTheme } from '@mui/material/styles'
import { useCurrentSession } from '../../../hooks/useCurrentSession'
import { fetchCurrentSession } from '../../../store/apps/currentSession/asyncthunk'
import SchoolDetails from './SchoolDetails'
import StudentReportCardDetails from './StudentReportCardDetails'
import CustomResultTable from '../component/CustomResultTable'
import DismissibleAlert from '../component/DismissibleAlert'
import CustomAffectiveTraitsTable from '../component/CustomAffectiveTraitsTable'
import CustomPsychomotorSkillsTable from '../component/CustomPsychomotorSkillsTable'
import { fetchPsychomotorSkillsForStudents } from '../../../store/apps/psychomotorSkills/asyncthunk'
import { fetchAffectiveTraitsForStudents } from '../../../store/apps/affectiveTraits/asyncthunk'
import { fetchGradeParameters } from '../../../store/apps/gradingParameters/asyncthunk'
import CustomReportCardSummary from '../component/CustomReportSummary'
import CustomGradingSystem from '../component/CustomGradingSystem'

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

  // Ref
  const targetRef = useRef();
  
  // States

  const [openScoreModal, setScoreModal] = useState(false)
  const [classId, setClassId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [studentId, setStudentId] = useState('')
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [activeStudent, setActiveStudent] = useState({})
  const [classRoom, setClassroom] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [classStudents, setClassStudents] = useState([])
  const [PsychomotorSkills, setStudentSkills] = useState({})
  const [AffectiveTraits, setAffectiveTraits] = useState({})
  const [noResult, setNoResult] = useState(false)
  const [GradingParametersList, setGradingParametersList] = useState([])
  const [nextAcadmeicSession, setNextAcademicSession] = useState({})
  const [showDownloadBtn, setShowDownloadBtn] = useState(false)

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

  const handleChangeStudent = e => {
    Number(setStudentId(e.target.value))
  }

  const toggleScoreDrawer = () => setScoreModal(!openScoreModal)

  const fetchSkills = async ()=>{
    const res = await  dispatch(fetchPsychomotorSkillsForStudents({ studentId, classId, sessionId }))

      if(res?.payload?.data?.data){
        setStudentSkills({...res.payload.data.data})
      }
        else {
          setStudentSkills({})
        }
  }

  const fetchTraits = async ()=>{
    const res = await  dispatch(fetchAffectiveTraitsForStudents({ studentId, classId, sessionId }))

      if(res?.payload?.data?.data){
        setAffectiveTraits({...res.payload.data.data})
      }
        else {
          setAffectiveTraits({})

        }
  }

  const displayReportCard = async () => {
    await fetchSkills()
    await fetchTraits()
    const res = await dispatch(fetchStudentReportCard({ classId, studentId, sessionId }))

    if (Object.keys(res?.payload?.data?.data?.subject).length > 0) {

      fetchGradeParameters({ page: 1, limit: 10 , classCategoryId: classRoom?.categoryId}).then((res)=> {
        if(res?.data?.success){
          setGradingParametersList([...res?.data.data])
        } else {
          setGradingParametersList([])
        }
      }).catch(()=>{
        setGradingParametersList([])
      })

      setShowDownloadBtn(true)
      const nextTerm = SessionData?.find((session)=>session?.id == (CurrentSessionData?.id + 1) )
      setNextAcademicSession(nextTerm)
      dispatch(fetchStudentSubjectPosition({ classId, sessionId }))
      setShowResult(true)
      setNoResult(false)
      const selectedStudent = StudentData?.result.find(student => student.id == studentId)

      setActiveStudent({ ...selectedStudent })
    } else {
      setShowDownloadBtn(false)
      setNextAcademicSession({})
      setShowResult(false)
      setNoResult(true)
      setActiveStudent({})
    }
  }

  

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
                label='Student*'
                SelectProps={{ value: studentId, onChange: e => handleChangeStudent(e) }}
              >
                <MenuItem>{classStudents.length > 0 ? 'Select Student' : 'No student registered'}</MenuItem>
                {classStudents.map(item => (
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
                    {`${item.name} ${item.term} term`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                onClick={displayReportCard}
                variant='contained'
                disabled={!studentId || !classId || !sessionId}
                sx={{ '& svg': { mr: 2 }, backgroundColor: 'info.main' }}
              >
                <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
                Display Student Report Card
              </Button>
            </Grid>

            {showDownloadBtn && 
            <Grid item xs={12} sm={6}>
              <Button
                onClick={() => generatePDF(targetRef, {filename: `${activeStudent?.firstName}-${activeStudent?.lastName}-report-card.pdf`})}
                variant='contained'
                disabled={!studentId || !classId || !sessionId}
                sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.main' }}
              >
                <Icon fontSize='1.125rem' icon='octicon:download-16' />
                Download Report Card
              </Button>
            </Grid> }

          </Grid>
        </CardContent>
      </Card>

      {!loading && showResult && (
        <Box ref={targetRef}
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
                nextAcadmeicSession={nextAcadmeicSession}
                activeStudent={activeStudent}
                profilePictureUrl={profilePictureUrl}
                classRoom={classRoom}
                CurrentSessionData={CurrentSessionData}
              />
            </CardContent>
          )}

          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <Box sx={{width: '80%'}}>
          <CustomResultTable
            tableData={StudentReportCard}
            positionArray={StudentSubjectPosition}
            studentId={studentId}
          />
        </Box>

        <Box sx={{width: '18.8%', display: 'flex', flexDirection: 'column'}}>

          <CustomAffectiveTraitsTable traits={AffectiveTraits} />
          <CustomPsychomotorSkillsTable skills={PsychomotorSkills} />
        </Box>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '80%'}}>
      <Box sx={{width: '52%'}}>
        <CustomReportCardSummary  reportCardData={StudentReportCard} numberOfSubjects={StudentReportCard?.length} />
      </Box>
      <Box sx={{width: '47%'}}> 
      <CustomGradingSystem ClassGradingParameters={GradingParametersList} />
      </Box>
      </Box>
        </Box>
      )}

      {noResult && <DismissibleAlert AlertMessage={'No Records Found'} />}

      {openScoreModal && <EnterStudentScore open={openScoreModal} closeModal={toggleScoreDrawer} />}
    </div>
  )
}

export default StudentsReportCardTable
