import React, { useEffect, useState, Fragment, useRef } from 'react'

import generatePDF from 'react-to-pdf';

import Icon from 'src/@core/components/icon'


import { useAppDispatch } from '../../../hooks'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, MenuItem, Typography } from '@mui/material'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { fetchStudentTranscript } from '../../../store/apps/reportCard/asyncthunk'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import { useTheme } from '@mui/material/styles'
import { fetchCurrentSession } from '../../../store/apps/currentSession/asyncthunk'

import { useTranscript } from '../../../hooks/useTranscript'
import { extractTranscriptData } from '../../../@core/utils/extractTranscriptData'
import SchoolDetails from '../ResultManager/SchoolDetails'
import StudentTranscriptDetails from './TranscriptDetails'
import CustomTable from '../component/CustomTable'
import DismissibleAlert from '../component/DismissibleAlert'
import GetUserData from '../../../@core/utils/getUserData'

const userData = GetUserData()

const StudentsTranscript = () => {
  // Hooks
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [StudentData] = useStudent()
  const [StudentTranscript, loading] = useTranscript()

   // Ref
   const targetRef = useRef();

  // States

  const [studentId, setStudentId] = useState('')
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [activeStudent, setActiveStudent] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [TranscriptData, setTranscriptData] = useState([])
  const [noResult, setNoResult] = useState(false)
  const [showDownloadBtn, setShowDownloadBtn] = useState(false)


  useEffect(() => {
    setStudentId(userData?.id)
  }, [])

  const displayTranscript = async () => {
    const res = await dispatch(fetchStudentTranscript({ studentId }))

    if (Object.keys(res?.payload?.data?.data).length > 0) {
      setShowResult(true)
      setNoResult(false)
      setShowDownloadBtn(true)
      const result = extractTranscriptData(res?.payload?.data?.data)
      setTranscriptData([...result])
    } else {
      setShowDownloadBtn(false)
      setNoResult(true)
      setShowResult(false)
    }
  }

  useEffect(() => {
    if (activeStudent) {
      setProfilePictureUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL.replace('api', '')}/${activeStudent?.profilePicture}`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStudent])

  useEffect(() => {
    let isMounted = true

    if (studentId && StudentData?.result.length > 0) {
      const selectedStudent = StudentData?.result.find(student => student.id == studentId)

      if (isMounted) {
        setActiveStudent({ ...selectedStudent })
      }
    }
  }, [studentId, StudentData])

  useEffect(() => {
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))
    dispatch(fetchCurrentSession())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      <Card>
        <CardHeader title='Transcript' />
        <CardContent>
          <Grid container spacing={12}>
           

            <Grid item xs={12} sm={3}>
              <Button onClick={displayTranscript} variant='contained' disabled={!studentId} sx={{ '& svg': { mr: 2 }, backgroundColor: 'info.main' }}>
                <Icon fontSize='1.125rem' icon='tabler:keyboard-show' />
                Display Transcript
              </Button>
            </Grid>

            {showDownloadBtn && <Grid item xs={12} sm={6}>
              <Button
                onClick={() => generatePDF(targetRef, {filename: `${activeStudent?.firstName}-${activeStudent?.lastName}-transcript.pdf`})}
                variant='contained'
                disabled={!studentId}
                sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.main' }}
              >
                <Icon fontSize='1.125rem' icon='octicon:download-16' />
                Download Transcript
              </Button>
            </Grid> }

          </Grid>
        </CardContent>
      </Card>

      

      {!loading && showResult && (
        <Box ref={targetRef} sx={{ pt: 5, pb: 10, paddingLeft: 3, paddingRight: 3, mt: 10, backgroundColor: '#eee' }}>
          {!loading &&
            showResult &&
            TranscriptData.map((sessionData, index) => (
              <Box
                key={index}
                className='resultBg'
                sx={{ pt: 5, pb: 10, paddingLeft: 3, paddingRight: 3, mt: 10, backgroundColor: '#fff' }}
              >
                <Box className='bgOverlay'></Box>

                <SchoolDetails />

                <Box
                  sx={{
                    color: '#fff',
                    backgroundColor: '#333333',
                    height: '50px',
                    width: '100%',
                    mt: 10,
                    mb: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      fontStyle: 'italic',
                      textAlign: 'center',
                      color: '#fff',
                      textTransform: 'uppercase'
                    }}
                  >
                    Student&nbsp;&nbsp;Transcript
                  </Typography>
                </Box>

                <StudentTranscriptDetails
                  activeStudent={activeStudent}
                  profilePictureUrl={profilePictureUrl}
                  classRoom={sessionData.class}
                  SessionData={sessionData}
                />

                {/* <Divider sx={{mt: 20, mb: 20, color: '#333'}}>Academic Records</Divider> */}

                <Box sx={{ mt: 15, mb: 15, position: 'relative' }}>
                  <Box sx={{ height: '1px', backgroundColor: '#3333334d', width: '100%' }}> </Box>
                  <Box
                    className='linePosition'
                    sx={{
                      backgroundColor: '#fff',
                      color: '#333',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      pl: 2,
                      pr: 2
                    }}
                  >
                    Academic &nbsp;&nbsp; Records
                  </Box>
                </Box>

                <CustomTable tableData={sessionData.subjects} sessionData={sessionData} />
              </Box>
            ))}
        </Box>
      )}

      {noResult && <DismissibleAlert AlertMessage={'No Records Found'} />}
    </Fragment>
  )
}

export default StudentsTranscript
