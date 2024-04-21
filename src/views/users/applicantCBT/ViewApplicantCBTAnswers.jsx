import { useState, useEffect, Fragment } from 'react'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  MenuItem,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import Paper from '@mui/material/Paper'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import CustomSpinner from 'src/@core/components/custom-spinner'
import NoData from '../../../@core/components/emptyData/NoData'
import CustomChip from 'src/@core/components/mui/chip'

import { useSession } from '../../../hooks/useSession'
import { useClasses } from '../../../hooks/useClassess'
import { useSubjects } from '../../../hooks/useSubjects'
import { useStaff } from '../../../hooks/useStaff'
import { useAppDispatch } from '../../../hooks'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { deleteQuestion, fetchApplicantCBTAnswers, fetchCBTAnswers } from '../../../store/apps/cbt/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import DeleteDialog from '../../../@core/components/delete-dialog'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import { fetchApplicants } from '../../../store/apps/applicants/asyncthunk'
import { useApplicants } from '../../../hooks/useApplicants'
import GradeEssayAnswer from '../cbt/GradeEssayAnswer'

const ApplicantCBTAnswers = () => {

  // Hooks
  const dispatch = useAppDispatch()
  const [StaffData] = useStaff()
  const [SubjectsList] = useSubjects()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [CategoriesData] = useCategories()
  const [ApplicantsData] = useApplicants()
  const [StudentData] = useStudent()
  
  //   States
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(300)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [staffId, setStaffId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [applicantId, setApplicantId] = useState('')
  const [classId, setClassId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [answers, setAnswers] = useState([])
  const [showGradeModal, setShowGradeModal] = useState(false)
  const [activeAnswer, setActiveAnswer] = useState(null)
  const [questionToDelete, setQuestionToDelete] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, itemsPerPage: 0, totalPages: 0 })
  

  const toggleGradeModal = () => {
    setShowGradeModal(!showGradeModal)
    setActiveAnswer(null)
  }

  const setAnswerToUpdateScore = value => {
    setShowGradeModal(true)
    setActiveAnswer(value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeStudent = e => {
    Number(setApplicantId(e.target.value))
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

  const handleChangeClass = e => {
    Number(setClassId(e.target.value))
  }

  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }

  const doDelete = value => {
    setDeleteModal(true)
    setQuestionToDelete(value.id)
  }

  const doCancelDelete = () => {
    setDeleteModal(false)
    setQuestionToDelete(null)
  }

  const ondeleteClick = async () => {
    deleteQuestion(questionToDelete).then(res => {
      if (res.data.success) {
        fetchAnswers()
        doCancelDelete()
      }
    })
  }

  const fetchAnswers = async () => {
    setLoading(true)

    const res = await dispatch(
      fetchApplicantCBTAnswers({ page: page + 1, limit, staffId, classId, subjectId, categoryId, sessionId, applicantId })
    )

    if (res.payload.data.data.length > 0) {
      const { currentPage, totalItems, itemsPerPage, totalPages } = res.payload.data.paging

      setAnswers([...res.payload.data.data])
      setPaging({ currentPage, totalItems, itemsPerPage, totalPages })
      setLoading(false)
    } else {
      setLoading(false)
      setAnswers([])
      setPaging({ currentPage: 1, totalItems: 0, itemsPerPage: 0, totalPages: 0 })
    }
  }

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'assessment' }))

    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))
    dispatch(fetchApplicants())


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
                label={'Applicant*'}
                SelectProps={{ value: applicantId, onChange: e => handleChangeStudent(e) }}
              >
                <MenuItem value=''>{ `Select Applicant`}</MenuItem> 
                {ApplicantsData?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                    {`${item?.firstName} ${item.lastName}`}
                  </MenuItem>
                ))
              }
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
                  <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                    {`${item?.name}`}
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

                {StaffData?.result?.map(staff => (
                  <MenuItem key={staff?.id} value={staff?.id} sx={{ textTransform: 'uppercase' }}>
                    {`${staff?.firstName} ${staff?.lastName}`}
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

            <Grid item xs={12} sm={6} md={3}>
              <CustomTextField
                select
                fullWidth
                label='Assessment Category*'
                SelectProps={{ value: categoryId, onChange: e => handleChangeCategory(e) }}
              >
                {/* <MenuItem value=''>{ staffId ? `All Staff` : `Select Staff`}</MenuItem> */}
                {CategoriesData?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                    {`${item.name}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3} sx={{ mt: 5 }}>
              <Button
                onClick={fetchAnswers}
                disabled={!applicantId || !subjectId  || !sessionId || !staffId || !categoryId}
                variant='contained'
                sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.light' }}
              >
                <Icon fontSize='1.125rem' icon='ic:baseline-cloud-download' />
                Fetch Answers
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Fragment>
        <TableContainer component={Paper} sx={{ maxHeight: 840, mt: 15 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ minWidth: 80 }}>
                  S/N
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  Question Type
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 280 }}>
                  Answer
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  Status
                </TableCell>
                <TableCell align='left' sx={{ minWidth: 150 }}>
                  Mark Obtained
                </TableCell>
                <TableCell align='center' sx={{ minWidth: 150 }}>
                  Mark Obtainable
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
                  {answers?.length > 0 &&
                    answers?.map((item, index) => (
                      <TableRow hover role='checkbox' key={item.id}>
                        <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                          {index + 1}
                        </TableCell>
                        <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                          {item?.type || '--'}
                        </TableCell>
                        <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                          {item?.answer || '--'}
                        </TableCell>
                        <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                          {item.correct && item.type == 'objective' ? (
                            <CustomChip
                              rounded
                              skin='light'
                              size='small'
                              label='Correct'
                              color='success'
                              sx={{ textTransform: 'capitalize' }}
                            />
                          ) : !item.correct && item.type == 'objective' ? (
                            <CustomChip
                              rounded
                              skin='light'
                              size='small'
                              label='Wrong'
                              color='error'
                              sx={{ textTransform: 'capitalize' }}
                            />
                          ) : 
                           (item.type == 'essay' && (item.score == item.value)) ? 
                           <CustomChip
                              rounded
                              skin='light'
                              size='small'
                              label='Correct'
                              color='success'
                              sx={{ textTransform: 'capitalize' }}
                            />
                            :
                            (item.type == 'essay' && (item.score > 0 && item.score < item.value)) ? 
                           <CustomChip
                              rounded
                              skin='light'
                              size='small'
                              label='Partially Correct'
                              color='warning'
                              sx={{ textTransform: 'capitalize' }}
                            />
                            :
                          (
                            '--'
                          )}
                        </TableCell>
                        <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                        {item?.score ? item?.score : !item?.score ? '--' : "--"}
                        </TableCell>
                        <TableCell align='center' sx={{ fontSize: '13px' }}>
                          {`${item?.value}` || '--'}
                        </TableCell>
                        <TableCell align='left' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            {item.type == 'essay' && 
                            <Tooltip title='Grade Answer'>
                          <IconButton size='small' onClick={() => setAnswerToUpdateScore(item)}>
                            <Icon icon='tabler:edit' />
                          </IconButton>
                          </Tooltip>
                            }

                        </TableCell>
                      </TableRow>
                    ))}
                  {answers?.length === 0 && (
                    <tr className='text-center'>
                      <td colSpan={6}>
                        <NoData />
                      </td>
                    </tr>
                  )}
                </Fragment>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          component='div'
          count={paging?.totalItems} // Handle when paging is undefined
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Fragment>

      {deleteModal && <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} />}
      {showGradeModal && <GradeEssayAnswer open={showGradeModal} toggle={toggleGradeModal} answerToGrade={activeAnswer} fetchAnswers={fetchAnswers}/> }
    </div>
  )
}

export default ApplicantCBTAnswers
