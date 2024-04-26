import React, { Fragment, useEffect, useState } from 'react'

import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Paper, Typography } from '@mui/material'
import { useStaff } from '../../../hooks/useStaff'
import { fetchStaffByType, fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { useSubjects } from '../../../hooks/useSubjects'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { fetchStudentScores } from '../../../store/apps/reportCard/asyncthunk'
import { useStudentsScores } from '../../../hooks/useStudentsScores'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import DismissibleAlert from '../component/DismissibleAlert'
import CustomSpinner from '../../../@core/components/custom-spinner'
import { extractAssessmentScoresData } from '../../../@core/utils/extractAssessmentScores'
import UpdateScore from './UpdateStudentScore'
import EnterStudentScore from './EnterScore'
import PageHeader from './AssessmentScorePageHeader'
import DownloadScoresheetDialog from './DownloadScoreSheetDialog'
import UploadScoreSheetDialog from './UploadScoreSheetDialog'
import { truncateText } from '../../../@core/utils/truncateText'

const StudentsAssessmentsScoreTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
  const StaffData = useAppSelector(store => store.staff.StaffDataByType)
  const [SubjectsList] = useSubjects()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [StudentData] = useStudent()
  const [StudentsScoresData, loading] = useStudentsScores()
  

  // States

  const [openScoreModal, setScoreModal] = useState(false)
  const [openScoreUpdateModal, setScoreUpdateModal] = useState(false)
  const [staffId, setStaffId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [classId, setClassId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [showScores, setShowScores] = useState(false)
  const [Subject, setSelectedSubject] = useState({})
  const [classRoom, setClassroom] = useState({})
  const [StudentsScores, setStudentsScores] = useState([]) 
  const [noResult, setNoResult] = useState(false)
  const [scoreToEdit, setScoreToEdit] = useState(null)
  const [scoreId, setScoreId] = useState(null)
  const [assessmentToUpdateName, setAssessmentName] = useState('')
  const [anchorEl, setAnchorEl] = useState([])

  const [refEl, setRefEl] = useState(null)
  const [referenceEl, setReferenceEl] = useState(null)
  const [openDownloadDialog, setOpenDialog] = useState(false)
  const [openUploadDialog, setDialog] = useState(false)


  const handleRowOptionsClick = (event, index) => {
    const newAnchorEl = [...anchorEl]
    newAnchorEl[index] = event.currentTarget
    setAnchorEl(newAnchorEl)
  }

  const handleRowOptionsClose = index => {
    const newAnchorEl = [...anchorEl]
    newAnchorEl[index] = null
    setAnchorEl(newAnchorEl)
  }

  const toggleScoreUpdateModal = ()=> {
    setScoreUpdateModal(!openScoreUpdateModal)
    setAssessmentName('')
    setScoreId(null)
  }



  const updateAssignment1Score = (value)=>{
    handleRowOptionsClose(StudentsScores?.indexOf(value))
    setScoreUpdateModal(true)
    setScoreId(value.Assignment1ScoreId)
    setScoreToEdit(value?.Assignment1Score)
    setAssessmentName('Assignment 1')
    
  }

  const updateAssignment2Score = (value)=>{
    handleRowOptionsClose(StudentsScores?.indexOf(value))
    setScoreUpdateModal(true)
    setScoreId(value.Assignment2ScoreId)
    setScoreToEdit(value?.Assignment2Score)
    setAssessmentName('Assignment 2')
    
  }

  const updateFirstCAScore = (value)=>{
    handleRowOptionsClose(StudentsScores?.indexOf(value))
    setScoreUpdateModal(true)
    setScoreId(value.continuousassessment1ScoreId)
    setScoreToEdit(value?.continuousassessment1Score)
    setAssessmentName('Cont. Assessment 1')
    
  }

  const updateSecondCAScore = (value)=>{
    handleRowOptionsClose(StudentsScores?.indexOf(value))
    setScoreUpdateModal(true)
    setScoreId(value.continuousassessment2ScoreId)
    setScoreToEdit(value?.continuousassessment2Score)
    setAssessmentName('Cont. Assessment 2')
    
  }

  const updateClassAssessmentScore = (value)=>{
    handleRowOptionsClose(StudentsScores?.indexOf(value))
    setScoreUpdateModal(true)
    setScoreId(value.classexerciseScoreId)
    setScoreToEdit(value?.classexerciseScore)
    setAssessmentName('Class Exercise')
    
  }

  const updateProjectScore = (value)=>{
    handleRowOptionsClose(StudentsScores?.indexOf(value))
    setScoreUpdateModal(true)
    setScoreId(value['project/practicalScoreId'])
    setScoreToEdit(value['project/practicalScore'])
    setAssessmentName('Project/Practical')
    
  }

  const updateExamScore = (value)=>{
    handleRowOptionsClose(StudentsScores?.indexOf(value))
    setScoreUpdateModal(true)
    setScoreId(value['FinalexamScoreId'])
    setScoreToEdit(value['FinalexamScore'])
    setAssessmentName('Exam')
    
  }



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
    if(res.payload.data.data.length > 0){
      const selectedClass = ClassesList?.find(classroom => classroom.id == classId)

        setClassroom({ ...selectedClass })
        const selectedSubject = SubjectsList?.find(subject => subject.id == subjectId)

        setSelectedSubject({ ...selectedSubject })

      setNoResult(false)
      setShowScores(true)
    }
      else {
        setNoResult(true)
        setShowScores(false)
        setSelectedSubject({})
        setClassroom({})

        // setStudentsScores([])
      }
}
  

const toggleDownloadDialog = (e) => {
  setRefEl(e.currentTarget)
  setOpenDialog(!openDownloadDialog)
}

const toggleUploadDialog = (e) => {
  setReferenceEl(e.currentTarget)
  setDialog(!openUploadDialog)
}

const closeDownloadDialog = () => setOpenDialog(!openDownloadDialog)
const closeUploadDialog = () => setDialog(!openUploadDialog)

  const toggleScoreDrawer = () => setScoreModal(!openScoreModal)

  useEffect(() => {
    setAnchorEl(new Array(StudentsScores?.length).fill(null))
  }, [StudentsScores])

  useEffect(()=>{
    if(StudentsScoresData?.length > 0){


     const res =  extractAssessmentScoresData(StudentsScoresData)

     setStudentsScores([...res])
    }
    else {
      setStudentsScores([])
    }
  },[StudentsScoresData])


  useEffect(() => {
    dispatch(fetchStaffByType({ page: 1, limit: 300, key: '', type: 'teacher' }))
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

            


          </Grid>

          <Grid container sx={{mt: 10}}>
          <Grid item xs={12} sm={12} sx={{display: 'flex', gap: '20px'}}>
            <Button onClick={displayScores} variant='contained' disabled={!staffId || !subjectId || !classId || !sessionId} sx={{ '& svg': { mr: 2 }, backgroundColor: 'info.light' }}>
          <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
          Display Scores
        </Button>

            {/* </Grid> */}

            {/* <Grid item xs={12} sm={6}> */}

            <Button onClick={toggleScoreDrawer} variant='contained'  sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.light' }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Input Student Score
        </Button>

            </Grid>

            </Grid>
        </CardContent>
      </Card> 

<PageHeader toggle1={toggleDownloadDialog} toggle2={toggleUploadDialog}/>

{(!loading && showScores  && StudentsScores?.length > 0)  &&
      (
        <Box className='resultBg' sx={{pt: 5, pb: 10, paddingLeft: 3, paddingRight: 3, mt: 10, backgroundColor: "#fff"}}>
        <Box className="bgOverlay"></Box>

        <Box sx={{color: '#fff', backgroundColor: "transparent", height: '70px', width: '100%', mt: 3, mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <Typography sx={{fontSize: '1.4rem', fontWeight: 600, fontStyle: 'italic', color: "#333", textAlign: 'center', textTransform: 'uppercase'}}>
             {`Termly Score Sheet For ${classRoom?.name} ${classRoom?.type} Students in ${Subject?.name}`}

           {/* <Typography sx={{textAlign: 'center', color: "#333",}}>2023/2024</Typography> */}
             </Typography> 
           </Box>


           <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='left' sx={{ minWidth: 200 }}>
                  STUDENT
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 180 }}>
                  C.A 1
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 180 }}>
                  C.A 2
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 180 }}>
                  ASSIGNMENT 1
                </TableCell>

                <TableCell align='center' sx={{ minWidth: 180 }}>
                  ASSIGNMENT 2
                </TableCell>

                <TableCell align='center' sx={{ minWidth: 180 }}>
                   CLASS EXERCISE
                </TableCell>

                <TableCell align='center' sx={{ minWidth: 180 }}>
                   PROJECT
                </TableCell>

                <TableCell align='center' sx={{ minWidth: 180 }}>
                    EXAM
                </TableCell>

                <TableCell align='center' sx={{ minWidth: 180 }}>
                    TOTAL
                </TableCell>

                <TableCell align='center' sx={{ minWidth: 140 }}>
                  Actions
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
                  {StudentsScores?.length > 0 &&
                    StudentsScores?.map((item, i) => {
                        const Student = StudentData?.result?.find((student)=> student.id == item.studentId)

                      return (
                        <TableRow hover role='checkbox' key={item.id}>
                          <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                            {`${truncateText(Student?.firstName)} ${truncateText(Student.lastName)}` || '--'}
                          </TableCell>

                          <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.continuousassessment1Score || '--'}
                          </TableCell>
                          <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.continuousassessment2Score || '--'}
                          </TableCell>
                          <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.Assignment1Score || '--'}
                          </TableCell>
                          <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.Assignment2Score || '--'}
                          </TableCell>
                          <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.classexerciseScore || '--'}
                          </TableCell>
                          <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item['project/practicalScore'] || '--'}
                          </TableCell>
                          <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.FinalexamScore || '--'}
                          </TableCell>
                          <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.totalScore || '--'}
                          </TableCell>

                          <TableCell align='left' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <>
                              <IconButton size='small' onClick={event => handleRowOptionsClick(event, i)}>
                                <Icon icon='tabler:dots-vertical' />
                              </IconButton>
                              <Menu
                                keepMounted
                                anchorEl={anchorEl[i]}
                                open={Boolean(anchorEl[i])}
                                onClose={() => handleRowOptionsClose(i)}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right'
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right'
                                }}
                                PaperProps={{ style: { minWidth: '8rem' } }}
                              >
                                {Object.keys(item).includes('continuousassessment1Score') && <MenuItem onClick={() => updateFirstCAScore(item)} sx={{ '& svg': { mr: 2 } }}>
                                  <Icon icon='tabler:edit' fontSize={20} />
                                  Edit C.A 1 Score
                                </MenuItem>}

                                {Object.keys(item).includes('continuousassessment2Score') && <MenuItem onClick={() => updateSecondCAScore(item)} sx={{ '& svg': { mr: 2 } }}>
                                  <Icon icon='tabler:edit' fontSize={20} />
                                  Edit C.A 2 Score
                                </MenuItem>}

                                {Object.keys(item).includes('Assignment1Score') && <MenuItem onClick={() => updateAssignment1Score(item)} sx={{ '& svg': { mr: 2 } }}>
                                  <Icon icon='tabler:edit' fontSize={20} />
                                  Edit Assignment 1 Score
                                </MenuItem>}

                                {Object.keys(item).includes('Assignment2Score') && <MenuItem onClick={() => updateAssignment2Score(item)} sx={{ '& svg': { mr: 2 } }}>
                                  <Icon icon='tabler:edit' fontSize={20} />
                                  Edit Assignment 2 Score
                                </MenuItem>}

                                {Object.keys(item).includes('classexerciseScore') && <MenuItem onClick={() => updateClassAssessmentScore(item)} sx={{ '& svg': { mr: 2 } }}>
                                  <Icon icon='tabler:edit' fontSize={20} />
                                  Edit Class Exercise Score
                                </MenuItem>}

                                {Object.keys(item).includes('project/practicalScore') && <MenuItem onClick={() => updateProjectScore(item)} sx={{ '& svg': { mr: 2 } }}>
                                  <Icon icon='tabler:edit' fontSize={20} />
                                  Edit Project/Practical Score
                                </MenuItem>}

                                {Object.keys(item).includes('FinalexamScore') && <MenuItem onClick={() => updateExamScore(item)} sx={{ '& svg': { mr: 2 } }}>
                                  <Icon icon='tabler:edit' fontSize={20} />
                                  Edit Exam Score
                                </MenuItem>}

                                


                              </Menu>
                            </>
                          </TableCell>

                        </TableRow>
                      )
                    })}

                
                </Fragment>
              )}
            </TableBody>
          </Table>
        </TableContainer>


      </Box>)

}

{noResult && <DismissibleAlert AlertMessage={'No Records Found'}/>}
   
{openScoreUpdateModal && 
<UpdateScore open={openScoreUpdateModal} toggle={toggleScoreUpdateModal} scoreToUpdate={scoreToEdit} scoreId={scoreId}assessmentName={assessmentToUpdateName} updateTableData={displayScores}/>
}

{openScoreModal && (
        <EnterStudentScore
          open={openScoreModal}
          closeModal={toggleScoreDrawer}
        />
      )}

      {
       openDownloadDialog && (
        <DownloadScoresheetDialog 
        open={openDownloadDialog}
        anchorEl={refEl}
        handleClose={closeDownloadDialog}
        />
       ) 
      }

{
       openUploadDialog && (
        <UploadScoreSheetDialog 
        open={openUploadDialog}
        anchorEl={referenceEl}
        handleClose={closeUploadDialog}
        />
       ) 
      }

    </div>
  )
}

export default StudentsAssessmentsScoreTable


