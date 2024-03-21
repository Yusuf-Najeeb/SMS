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

import { useAppDispatch } from '../../../hooks'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, MenuItem, Typography } from '@mui/material'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { fetchStudentTranscript } from '../../../store/apps/reportCard/asyncthunk'
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
import { useTranscript } from '../../../hooks/useTranscript'
import { extractTranscriptData } from '../../../@core/utils/extractTranscriptData'
import StudentTranscriptDetails from './StudentTranscriptDetails'
import CustomTable from '../component/CustomTable'

const StudentsTranscript = () => {
  // Hooks
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [StudentData] = useStudent()
  const [StudentReportCard] = useStudentReportCard()
  const [StudentTranscript, loading] = useTranscript()
  const [StudentSubjectPosition] = useStudentSubjectPosition()
  const [CurrentSessionData] = useCurrentSession()


  // States

  const [openScoreModal, setScoreModal] = useState(false)
  const [classId, setClassId] = useState('')
  const [studentId, setStudentId] = useState('')
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [activeStudent, setActiveStudent] = useState({})
  const [classRoom, setClassroom] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [TranscriptData, setTranscriptData] = useState([])

  console.log(TranscriptData, 'transcript data')

//   const [studentTranscriptDetails, setStudents] 


  const handleChangeClass = e => {
    Number(setClassId(e.target.value))
  }

  const handleChangeStudent = e => {
    Number(setStudentId(e.target.value))
  }

  const displayTranscript = async () => {
    const res = await dispatch(fetchStudentTranscript({ classId, studentId }))
    if(res?.payload?.data?.success){
      setShowResult(true)
     const result = extractTranscriptData(res?.payload?.data?.data)
     setTranscriptData([...result])
    }
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
    <Fragment>
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


            <Grid item xs={12} sm={12}>
              <Button
                onClick={displayTranscript}
                variant='contained'
                disabled={!studentId || !classId}
                sx={{ '& svg': { mr: 2 } }}
              >
                <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
                Display Student Transcript
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {(!loading && showResult )  &&

      <Box  sx={{pt: 5, pb: 10, paddingLeft: 3, paddingRight: 3, mt: 10, backgroundColor: "#eee"}}>



{(!loading && showResult) && TranscriptData.map((sessionData, index) => (
        <Box key={index} className='resultBg' sx={{ pt: 5, pb: 10, paddingLeft: 3, paddingRight: 3, mt: 10, backgroundColor: "#fff" }}>
          <Box className="bgOverlay"></Box>

          <SchoolDetails />

          <Box sx={{color: '#fff', backgroundColor: "#333333", height: '50px', width: '100%', mt: 10, mb: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <Typography sx={{fontSize: '1.4rem', fontWeight: 600, fontStyle: 'italic', textAlign: 'center', color: '#fff', textTransform: 'uppercase'}}> {`Student Transcript`}</Typography> 
           </Box>

           <StudentTranscriptDetails activeStudent={activeStudent} profilePictureUrl={profilePictureUrl} classRoom={classRoom} SessionData={sessionData}/>


          {/* <Divider sx={{mt: 20, mb: 20, color: '#333'}}>Academic Records</Divider> */}

          <Box sx={{mt: 15, mb: 15, position:'relative'}}>
            <Box sx={{ height: '1px', backgroundColor: '#3333334d',  width: '100%', }}>  </Box>
            <Box className="linePosition" sx={{  backgroundColor: '#fff', color: "#333", textTransform: 'uppercase', fontWeight: 700, pl: 2, pr: 2  }}> Academic Records </Box>

          </Box>

          <CustomTable  tableData={sessionData.subjects} sessionData={sessionData}/>


      </Box>
              ))}

     </Box>
      }


   
</Fragment>
  )
}

export default StudentsTranscript
