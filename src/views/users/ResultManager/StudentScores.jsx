import React, { useEffect, useState } from 'react'

import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import { useAppDispatch } from '../../../hooks'
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
import EnterStudentScore from './EnterScore'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import CustomScoreSheetTable from '../component/CustomScoreSheetTable'
import { extractScoresData } from '../../../@core/utils/extractScoreData'
import DismissibleAlert from '../component/DismissibleAlert'

const StudentsScoreTable = () => {
  // Hooks
  const dispatch = useAppDispatch()
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
  const [StudentsScores, setStudentsScores] = useState([]) 
  const [noResult, setNoResult] = useState(false)



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
  // if(StudentsScores.length > 0){
  //   setStudentsScores([])
  // }
  const res = await  dispatch(fetchStudentScores({subjectId, classId, staffId, sessionId}))
    if(res.payload.data.data.length > 0){
      // const res =  extractScoresData(StudentsScoresData)
      
      // setStudentsScores([...res])
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
  

  const toggleScoreDrawer = () => setScoreModal(!openScoreModal)

  useEffect(()=>{
    if(StudentsScoresData?.length > 0){

     const res =  extractScoresData(StudentsScoresData)

     setStudentsScores([...res])
    }
    else {
      setStudentsScores([])
    }
  },[StudentsScoresData])


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


      <CustomScoreSheetTable StudentData={StudentData} SubjectsList={SubjectsList} ClassesList={ClassesList} tableData={StudentsScores}/>


      </Box>)

}
   {noResult && <DismissibleAlert AlertMessage={'No Records Found'}/>}



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


