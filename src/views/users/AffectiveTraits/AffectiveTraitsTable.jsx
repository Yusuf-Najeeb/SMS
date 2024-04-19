import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from 'src/hooks'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Button, Card, CardContent, CardHeader, Grid, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import NoData from 'src/@core/components/emptydata/NoData'
import CustomTextField from 'src/@core/components/mui/text-field'

import CustomSpinner from 'src/@core/components/custom-spinner'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { useStaff } from '../../../hooks/useStaff'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { fetchAffectiveTraitsForClass } from '../../../store/apps/affectiveTraits/asyncthunk'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'

const AffectiveTraitsTable = () => {
  const dispatch = useAppDispatch()
  const [StaffData] = useStaff()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [StudentData] = useStudent()


  const [staffId, setStaffId] = useState('')
  const [classId, setClassId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openParameterModal, setOpenParameterModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [classRoomTraits, setClassroomTraits] = useState([])



  const handleChangeStaff = e => {
    Number(setStaffId(e.target.value))
  }

  const handleChangeClass = e => {
    Number(setClassId(e.target.value))
  }

  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }


  const fetchTraits = async ()=>{
    setLoading(true)
    const res = await  dispatch(fetchAffectiveTraitsForClass({ staffId, classId, sessionId }))

      if(res.payload.data.data.length > 0){
        setLoading(false)
        setClassroomTraits([...res.payload.data.data])
      }
        else {
          setLoading(false)
          setClassroomTraits([])

        }
  }

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))
    dispatch(fetchClasses({page: 1, limit: 300, key: ''}))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))

    // eslint-disable-next-line 
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
                <MenuItem value=''>Select Class</MenuItem>
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
                label='Class Teacher*'
                SelectProps={{ value: staffId, onChange: e => handleChangeStaff(e) }}
              >
                <MenuItem value=''>Select Class Teacher</MenuItem>
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
                <MenuItem value=''>Select Session</MenuItem>
                {SessionData?.map(item => (
                  <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}}>
                    {`${item.name} ${item.term} term`}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>


            <Grid item xs={12} sm={6} md={6} sx={{mt: 5}}>
            <Button onClick={fetchTraits} 
              disabled= {  !classId || !sessionId || !staffId}
            variant='contained'  sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.light' }}>
          <Icon fontSize='1.125rem' icon='ic:baseline-cloud-download' />
          Fetch Affective Traits
        </Button>
            </Grid>

         
          </Grid>
        </CardContent>
      </Card> 


      <TableContainer component={Paper} sx={{ maxHeight: 840, mt: 15 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{ minWidth: 80 }}>
                S/N
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 260 }}>
                Student
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Punctuality
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Honesty
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 180 }}>
                Mental Alertness
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Attentiveness
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Respect
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Neatness
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Politeness
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Peer Relation
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 150 }}>
                Teamwork
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 200 }}>
                Attitude to School
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 260 }}>
                Promptness to Sch. Work
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
                {classRoomTraits?.map((item, i) => {

                  const Student = StudentData?.result?.find((student)=> student.id == item.studentId)
                  
                  return (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {`${Student?.firstName} ${Student?.lastName}` || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.punctuality || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.honesty || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.mentalAlertness || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.attentiveness || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.respect || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.neatness || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.politeness || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.relating_with_peers || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.spirit_of_team_work || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.attitude_to_school || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.completes_school_work_promptly || '--'}
                      </TableCell>
                  
                  </TableRow>
                )})}

                {classRoomTraits?.length === 0 && (
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

      
    </Fragment>
  )
}

export default AffectiveTraitsTable
