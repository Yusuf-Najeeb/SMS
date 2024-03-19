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

import TablePagination from '@mui/material/TablePagination'

import { useAppDispatch } from '../../../hooks'
import { usePayslip } from '../../../hooks/usePayslip'
import { Box, Button, Card, CardContent, CardHeader, Grid, MenuItem, Tooltip, Typography } from '@mui/material'
import { useStaff } from '../../../hooks/useStaff'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { useSubjects } from '../../../hooks/useSubjects'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { fetchStudentScores } from '../../../store/apps/reportCard/asyncthunk'
import { useStudentsScores } from '../../../hooks/useStudentsScores'
import PageHeader from '../component/PageHeader'
import EnterStudentScore from './EnterScore'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'

const StudentsScoreTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const [PayslipData] = usePayslip()
  const [StaffData] = useStaff()
  const [SubjectsList] = useSubjects()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [StudentData] = useStudent()
  const [StudentsScoresData, loading] = useStudentsScores()

  // States

  const [openScoreModal, setScoreModal] = useState(false)
  const [staffId, setStaffId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [classId, setClassId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [showScores, setShowScores] = useState(false)
  const [Subject, setSelectedSubject] = useState({})
  const [classRoom, setClassroom] = useState({})


  const handleChangeStaff = e => {
    Number(setStaffId(e.target.value))
  }

  const handleChangeSubject = e => {
    Number(setSubjectId(e.target.value))
  }

  const handleChangeClass = e => {
    Number(setClassId(e.target.value))
  }

  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }


const displayScores = async ()=>{
  const res = await  dispatch(fetchStudentScores({subjectId, classId, staffId, sessionId}))
    if(res.payload.data.success){
        setShowScores(true)
      }
}
  

  const toggleScoreDrawer = () => setScoreModal(!openScoreModal)

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    dispatch(fetchClasses({page: 1, limit: 300, key: ''}))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let isMounted = true

    if (subjectId && SubjectsList?.length > 0) {
      const selectedSubject = SubjectsList?.find(subject => subject.id == subjectId)

      if (isMounted) {
        setSelectedSubject({ ...selectedSubject })
      }
    }

  }, [subjectId, SubjectsList])

  useEffect(() => {
    let isMounted = true

    if (classId && ClassesList?.length > 0) {
      const selectedClass = ClassesList?.find(classroom => classroom.id == classId)

      if (isMounted) {
        setClassroom({ ...selectedClass })
      }
    }

  }, [classId, ClassesList])




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
                label='Subject*'

                SelectProps={{ value: subjectId, onChange: e => handleChangeSubject(e) }}
              >
                {/* <MenuItem value=''>{ staffId ? `All Staff` : `Select Staff`}</MenuItem> */}
                {SubjectsList?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item?.name}` }
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomTextField
                select
                fullWidth
                label='Teacher*'

                SelectProps={{ value: staffId, onChange: e => handleChangeStaff(e) }}
              >
                {/* <MenuItem value=''>{ staffId ? `All Staff` : `Select Staff`}</MenuItem> */}
                {StaffData?.result?.map(staff => (
                  <MenuItem key={staff?.id} value={staff?.id} sx={{textTransform: 'uppercase'}}>
                    {`${staff?.firstName} ${staff?.lastName}` }
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
                    {`${item.name} ${item.term} term`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={3}>
            <Button onClick={displayScores} variant='contained' disabled={!staffId || !subjectId || !classId || !sessionId} sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
          Display Scores
        </Button>
            </Grid>

            <Grid item xs={12} sm={3}>
            <Button onClick={toggleScoreDrawer} variant='contained'  sx={{ '& svg': { mr: 2 }, backgroundColor: 'green' }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Input Student Score
        </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card> 

      {/* <PageHeader action={'Input Student Score'} toggle={toggleScoreDrawer}
      /> */}

{(!loading && showScores )  &&
        <Box className='resultBg' sx={{pt: 5, pb: 10, paddingLeft: 3, paddingRight: 3, mt: 10, backgroundColor: "#fff"}}>
        <Box className="bgOverlay"></Box>

        <Box sx={{color: '#fff', backgroundColor: "transparent", height: '70px', width: '100%', mt: 3, mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <Typography sx={{fontSize: '1.4rem', fontWeight: 600, fontStyle: 'italic', color: "#333", textAlign: 'center', textTransform: 'uppercase'}}>
             {`Termly Score Sheet For ${classRoom?.name} ${classRoom?.type} Students in ${Subject?.name}`}
             </Typography> 
           </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 840, mt: 15 }}>
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
                CLASS
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 100 }}>
                SUBJECT
              </TableCell> 
              <TableCell align='left' sx={{ minWidth: 100 }}>
                ASSESSMENT TYPE
              </TableCell> 
              <TableCell align='left' sx={{ minWidth: 100 }}>
                SCORE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <Fragment>
                {StudentsScoresData?.map((item, i) => {

                    const Student = StudentData?.result?.find((student)=> student.id == item.studentId)
                    const StudentClass = ClassesList?.find((classRoom)=> classRoom.id == item.classId)
                    const Subject = SubjectsList?.find((subject)=> subject.id == item.subjectId)

                  return (
                    <TableRow hover role='checkbox' key={item?.id}>
                      <TableCell align='left'>{i + 1}</TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>{`${Student.firstName} ${Student.lastName}`}</TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>{`${StudentClass.name} ${StudentClass.type}`}</TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>{`${Subject.name}`}</TableCell>
                      <TableCell align='left' sx={{textTransform: 'uppercase'}}>{`${item?.category?.name}`}</TableCell>

                      <TableCell align='left'>{ Number(item?.score) || '--'}</TableCell>
                    </TableRow>
                  )
                })}

              </Fragment>
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
}


      {/* 

       */}

      {openScoreModal && (
        <EnterStudentScore
          open={openScoreModal}
          closeModal={toggleScoreDrawer}
        />
      )}

    </div>
  )
}

export default StudentsScoreTable


