import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from 'src/hooks'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Button, Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
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
import { fetchPsychomotorSkillsForClass } from '../../../store/apps/psychomotorSkills/asyncthunk'

const PsychomotorSkillsTable = () => {
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
  const [PsychomotorSkills, setPsychomotorSkills] = useState([])



  const handleChangeStaff = e => {
    Number(setStaffId(e.target.value))
  }

  const handleChangeClass = e => {
    Number(setClassId(e.target.value))
  }

  const handleChangeSession = e => {
    Number(setSessionId(e.target.value))
  }


  const fetchSkills = async ()=>{
    setLoading(true)
    const res = await  dispatch(fetchPsychomotorSkillsForClass({ staffId, classId, sessionId }))

      if(res.payload.data.data.length > 0){
        setLoading(false)
        setPsychomotorSkills([...res.payload.data.data])
      }
        else {
          setLoading(false)
          setPsychomotorSkills([])

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
            <Button onClick={fetchSkills} 
              disabled= {  !classId || !sessionId || !staffId}
            variant='contained'  sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.light' }}>
          <Icon fontSize='1.125rem' icon='ic:baseline-cloud-download' />
          Fetch Psychomotor Skills
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
                Reading
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 180 }}>
                Verbal Fluency
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 180 }}>
                Hand Writing
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 180 }}>
                Musical Skills
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 180 }}>
                Creative Arts
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 200 }}>
                Physical Education
              </TableCell>
              <TableCell align='center' sx={{ minWidth: 200 }}>
                General Reasoning
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
                {PsychomotorSkills?.map((item, i) => {

                  const Student = StudentData?.result?.find((student)=> student.id == item.studentId)
                  
                  return (
                  <TableRow hover role='checkbox' key={item.id}>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                      {`${Student?.firstName} ${Student?.lastName}` || '--'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.reading || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.verbal_fluency_diction || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.handwriting || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.musical_skills || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.creative_arts || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.physical_education || '--'}
                      </TableCell>
                      <TableCell align='center' sx={{ textTransform: 'uppercase' }}>
                            {item?.general_reasoning || '--'}
                      </TableCell>
                  
                  </TableRow>
                )})}

                {PsychomotorSkills?.length === 0 && (
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

export default PsychomotorSkillsTable
