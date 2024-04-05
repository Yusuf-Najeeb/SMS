import { useState, useEffect, Fragment } from 'react'

import { Button, Card, CardContent, CardHeader, Grid, IconButton, MenuItem, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import CustomSpinner from 'src/@core/components/custom-spinner'
import NoData from '../../../@core/components/emptyData/NoData'


import { useSession } from '../../../hooks/useSession'
import { useClasses } from '../../../hooks/useClassess'
import { useSubjects } from '../../../hooks/useSubjects'
import { useStaff } from '../../../hooks/useStaff'
import { useAppDispatch } from '../../../hooks'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { deleteQuestion, fetchCBTQuestions } from '../../../store/apps/cbt/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCBTQuestions } from '../../../hooks/useCBTQuestions'
import AddQuestion from './AddQuestion'
import PageHeader from '../component/PageHeader'
import EditQuestion from './EditQuestion'
import DeleteDialog from '../../../@core/components/delete-dialog'

const CBTQuestions = () => {
     // Hooks
  const dispatch = useAppDispatch()
  const [StaffData] = useStaff()
  const [SubjectsList] = useSubjects()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [CategoriesData] = useCategories()
  const [QuestionsData, loading,] = useCBTQuestions()

  //   States
  const [openModal, setModal] = useState(false)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [staffId, setStaffId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [classId, setClassId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [questions, setQuestions] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [questionToDelete, setQuestionToDelete] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [paging, setPaging] = useState({ currentPage: 1, totalItems: 0, itemsPerPage: 0, totalPages: 0})

  const toggleEditModal = ()=> {
    setShowEditModal(!showEditModal)
    setActiveQuestion(null)
}

  const setQuestionToUpdate = (value)=> {
    setShowEditModal(true)
    setActiveQuestion(value)
  }

  const toggleAddQuestionsModal = ()=> setModal(!openModal)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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
        fetchQuestions()
        doCancelDelete()
      }
    })
  }

  const fetchQuestions = async ()=>{
    const res = await  dispatch(fetchCBTQuestions({ page: page + 1, limit, staffId, classId, subjectId, categoryId, sessionId }))

      if(res.payload.data.data.length > 0){
        const {currentPage, totalItems, itemsPerPage, totalPages} = res.payload.data.paging
        
        setQuestions([...res.payload.data.data])
        setPaging({currentPage, totalItems, itemsPerPage, totalPages })
        
      }
        else {
          setQuestions([])
          setPaging({ currentPage: 1, totalItems: 0, itemsPerPage: 0, totalPages: 0})
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

            <Grid item xs={12} sm={6} md={3}>
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
        <PageHeader  toggle={toggleAddQuestionsModal}  action={'Add Questions'} />
      <TableContainer component={Paper} sx={{ maxHeight: 840, mt: 5 }}>
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
                Question
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 150 }}>
                Option A
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 150 }}>
                Option B
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 150 }}>
                Option C
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 150 }}>
                Option D
              </TableCell>
              <TableCell align='left' sx={{ minWidth: 150 }}>
                Answer
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Total Mark
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
                {questions?.length > 0 && questions?.map((item, index) => (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {index + 1}
                    </TableCell>
                    <TableCell align='left' sx={{ textTransform: 'uppercase' }}>
                      {item?.type || '--'}
                    </TableCell>
                    <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px'  }}>
                      {/* <Tooltip title={item.question}> */}
                        {item?.question || '--'}
                      {/* </Tooltip> */}
                    </TableCell>
                    <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                      {/* <Tooltip title={item.optionA}> */}
                        {item?.optionA || '--'}
                      {/* </Tooltip> */}
                    </TableCell>
                    <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                      {/* <Tooltip title={item.optionB}> */}
                        {item?.optionB || '--'}
                      {/* </Tooltip> */}
                    </TableCell>
                    <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                      {/* <Tooltip title={item.optionC}> */}
                        {item?.optionC || '--'}
                      {/* </Tooltip> */}
                    </TableCell>
                    <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                      {/* <Tooltip title={item.optionD}> */}
                        {item?.optionD || '--'}
                      {/* </Tooltip> */}
                    </TableCell>
                    <TableCell align='left' sx={{ textTransform: 'uppercase', fontSize: '13px' }}>
                      {item?.answer || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{  fontSize: '13px' }}>
                      {`${item?.value} marks` || '--'}
                    </TableCell>
                    <TableCell align='left' sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <IconButton size='small' onClick={() => setQuestionToUpdate(item)}>
                        <Icon icon='tabler:edit' />
                      </IconButton>

                      <IconButton size='small' onClick={() => doDelete(item)}>
                        <Icon icon='tabler:trash' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {questions?.length === 0 && (
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

    <AddQuestion open={openModal} closeModal={toggleAddQuestionsModal}/>
    {deleteModal && <DeleteDialog open={deleteModal} handleClose={doCancelDelete} handleDelete={ondeleteClick} /> }
    {showEditModal && <EditQuestion open={showEditModal} closeModal={toggleEditModal} questionToEdit={activeQuestion} fetchQuestions={fetchQuestions}/> }
    </div>
  )
}

export default CBTQuestions