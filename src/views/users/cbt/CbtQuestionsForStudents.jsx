import { useState, useEffect, Fragment } from 'react'

import { Button, Card, CardContent, CardHeader, Grid, MenuItem,  } from '@mui/material'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'


import { useSession } from '../../../hooks/useSession'
import { useSubjects } from '../../../hooks/useSubjects'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { fetchStaffByType, fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { deleteQuestion, fetchCBTQuestions } from '../../../store/apps/cbt/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import GetUserData from '../../../@core/utils/getUserData'
import StudentQuestions from './StudentQuestions'
import StudentsQuestionPreview from './StudentsQuestionPreview'

const userData = GetUserData()


const CBTQuestionsForStudents = () => {
     // Hooks
  const dispatch = useAppDispatch()
  const StaffData = useAppSelector(store => store.staff.StaffDataByType)
  const [SubjectsList] = useSubjects()
  const [SessionData] = useSession()
  const [CategoriesData] = useCategories()

  //   States
  const [showQuestionsPreview, setShowQuestionsPreview] = useState(false)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(300)
  const [staffId, setStaffId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [questions, setQuestions] = useState([])
  const [questionToDelete, setQuestionToDelete] = useState(null)
  const [subjectName, setSubjectName] = useState('')
  const [assessmentCategory, setAssessmentCategory] = useState('')
  const [startCbt, setStartCbt] = useState(false)



  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeCategory = e => {
    Number(setCategoryId(e.target.value))
  }

  const handleChangeStaff = e => {
    Number(setStaffId(e.target.value))
  }

  const handleChangeSubject = e => {
    Number(setSubjectId(e.target.value))
  }


  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }


  const fetchQuestions = async ()=>{
    const res = await  dispatch(fetchCBTQuestions({ page: page + 1, limit, staffId, classId: userData?.classId, subjectId, categoryId, sessionId }))

    setShowQuestionsPreview(true)
    const subject = SubjectsList?.find((sub)=> sub.id == subjectId)
    const assessment = CategoriesData?.find((cat)=> cat.id == categoryId )
    setSubjectName(subject.name)
    setAssessmentCategory(assessment.name)

      if(res?.payload?.data.data.length > 0){
        
        setQuestions([...res?.payload?.data.data])
        
      }
        else {
          setQuestions([])

        //   setShowQuestionsPreview(false)
        }
  }

  useEffect(() => {
    dispatch(fetchStaffByType({ page: 1, limit: 300, key: '', type: 'teacher' }))
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
                label='Assessment Category*'

                SelectProps={{ value: categoryId, onChange: e => handleChangeCategory(e) }}
              >
                {/* <MenuItem value=''>{ staffId ? `All Staff` : `Select Staff`}</MenuItem> */}
                {CategoriesData?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item.name}`}
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

          

            <Grid item xs={12} sm={6} md={3} sx={{mt: 5}}>
            <Button onClick={fetchQuestions} variant='contained'  sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.light' }}>
          <Icon fontSize='1.125rem' icon='ic:baseline-cloud-download' />
          Fetch Questions
        </Button>
            </Grid>

         
          </Grid>
        </CardContent>
      </Card> 

      <Fragment>
    {startCbt && <StudentQuestions  Questions={questions} setStartCbt={setStartCbt}/> }


    {showQuestionsPreview && <StudentsQuestionPreview  setShowQuestionsPreview={setShowQuestionsPreview} subjectName={subjectName} assessmentCategory={assessmentCategory} Questions={questions} setStartCbt={setStartCbt}/> }
    </Fragment>

    </div>
  )
}

export default CBTQuestionsForStudents