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
import NoData from '../../../@core/components/emptyData/NoData'
import CustomSpinner from '../../../@core/components/custom-spinner'
import {  formatFirstLetter, } from '../../../@core/utils/format'
import { usePayslip } from '../../../hooks/usePayslip'
import { Button, Card, CardContent, CardHeader, Grid, MenuItem, Tooltip } from '@mui/material'
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


const displayScores = ()=>{
    dispatch(fetchStudentScores({subjectId, classId, staffId, sessionId}))
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
                    {`${item?.name}` }
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
          </Grid>
        </CardContent>
      </Card> 

      <PageHeader action={'Input Student Score'} toggle={toggleScoreDrawer}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 840 }}>
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
            {loading ? (
              <TableRow className='text-center'>
                <TableCell colSpan={6}>
                  <CustomSpinner />
                </TableCell>
              </TableRow>
            ) : (
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

                {StudentsScoresData?.length === 0 && (
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

      {/* <TablePagination
        page={page}
        component='div'
        count={Paging?.totalItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}

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


