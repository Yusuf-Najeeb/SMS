import { useState, useEffect, Fragment } from 'react'

import { Button, Card, CardContent, CardHeader, Grid, MenuItem,  } from '@mui/material'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'


import { useSession } from '../../../hooks/useSession'
import { useSubjects } from '../../../hooks/useSubjects'
import { useStaff } from '../../../hooks/useStaff'
import { useAppDispatch } from '../../../hooks'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { deleteQuestion, fetchApplicantCBTQuestions, fetchCBTQuestions } from '../../../store/apps/cbt/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCBTQuestions } from '../../../hooks/useCBTQuestions'
import GetUserData from '../../../@core/utils/getUserData'
import StudentQuestions from '../cbt/StudentQuestions'
import StudentsQuestionPreview from '../cbt/StudentsQuestionPreview'
import ApplicantQuestions from './ApplicantQuestions'

const userData = GetUserData()


const CBTQuestionsForApplicants = () => {
     // Hooks
  const dispatch = useAppDispatch()
  const [StaffData] = useStaff()
  const [SubjectsList] = useSubjects()
  const [SessionData] = useSession()
  const [CategoriesData] = useCategories()
  const [QuestionsData, loading,] = useCBTQuestions()

  //   States
  const [showQuestionsPreview, setShowQuestionsPreview] = useState(false)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(300)
  const [subjectId, setSubjectId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [questions, setQuestions] = useState([])
  const [questionToDelete, setQuestionToDelete] = useState(null)
  const [subjectName, setSubjectName] = useState('')
  const [assessmentCategory, setAssessmentCategory] = useState('Entrance Examination')
  const [startCbt, setStartCbt] = useState(false)



  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeSubject = e => {
    Number(setSubjectId(e.target.value))
  }


  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }



  const doCancelDelete = () => {
    setDeleteModal(false)
    setQuestionToDelete(null)
  }


  const fetchQuestions = async ()=>{
    const res = await  dispatch(fetchApplicantCBTQuestions({ page: page + 1, limit, applicantId: userData?.id,  subjectId, sessionId }))

    setShowQuestionsPreview(true)
    const subject = SubjectsList?.find((sub)=> sub.id == subjectId)

    // const assessment = CategoriesData?.find((cat)=> cat.id == categoryId )

    setSubjectName(subject.name)

    // setAssessmentCategory(assessment.name)

      if(res?.payload?.data.data.length > 0){
        
        setQuestions([...res?.payload?.data.data])
        
      }
        else {
          setQuestions([])

        //   setShowQuestionsPreview(false)
        }
  }

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    dispatch(fetchClasses({page: 1, limit: 300, key: ''}))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'assessment' }))

    // eslint-disable-next-line 
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
                label='Subject*'

                SelectProps={{ value: subjectId, onChange: e => handleChangeSubject(e) }}
              >
                <MenuItem value=''>{ `Select Subject`}</MenuItem>
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
                label='Session*'

                SelectProps={{ value: sessionId, onChange: e => handleChangeSession(e) }}
              >
                <MenuItem value=''>{`Select Academic Session`}</MenuItem>
                {SessionData?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item.name} ${item.term} term`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

          

            <Grid item xs={12} sm={9} md={9} sx={{mt: 5}}>
            <Button onClick={fetchQuestions} disabled={!sessionId || !subjectId} variant='contained'  sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.light' }}>
          <Icon fontSize='1.125rem' icon='ic:baseline-cloud-download' />
          Fetch Questions
        </Button>
            </Grid>

         
          </Grid>
        </CardContent>
      </Card> 

      <Fragment>
    {startCbt && <ApplicantQuestions  Questions={questions} setStartCbt={setStartCbt}/> }


    {showQuestionsPreview && <StudentsQuestionPreview  setShowQuestionsPreview={setShowQuestionsPreview} subjectName={subjectName} assessmentCategory={assessmentCategory} Questions={questions} setStartCbt={setStartCbt}/> }
    </Fragment>

    </div>
  )
}

export default CBTQuestionsForApplicants