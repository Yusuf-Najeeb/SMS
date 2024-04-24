import { Box, Stack, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'


import GetUserData from '../../../@core/utils/getUserData'
import { fetchApplicantCBTResult } from '../../../store/apps/cbt/asyncthunk'
import SchoolDetails from '../ResultManager/SchoolDetails'
import CustomApplicantCBTResultTable from '../component/CustomApplicantCBTResult'
import ResultNotAvailable from './ResultNotAvailable'

const userData = GetUserData()



const CBTResultForApplicant = () => {
    const [numberOfSubject, setNumberOfSubjects] = useState(0)
    const [result, setResult] = useState([])

    useEffect(()=>{
        fetchApplicantCBTResult(userData?.id).then((res)=>{
            if(res?.data?.success) {
                setNumberOfSubjects(res?.data?.data?.length)
                setResult(res?.data?.data)
            } else {
                setNumberOfSubjects(0)
            }
        })
    },[])


  return (

    
     <Box className='applicantResultPageWrapper'>

        {result?.length > 0 ? 
 
 <Box
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
                  mt: 3,
                  mb: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, fontStyle: 'italic', textAlign: 'center' }}>
                  {' '}
                  {`Applicant CBT Result For ${userData?.firstName?.toUpperCase()} ${userData?.lastName?.toUpperCase()}`}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
          <Stack spacing={2} sx={{width: '30%', }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between',  }}>
              <Typography sx={{  fontWeight: 700, color: '#666' }}>Name:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {`${userData?.firstName?.toUpperCase()} ${userData?.lastName?.toUpperCase()}`}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between',  }}>
              <Typography sx={{  fontWeight: 700, color: '#666' }}>Identification Number:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {`${userData?.identificationNumber}`}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between',  }}>
              <Typography sx={{  fontWeight: 700, color: '#666' }}>Class:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {`${userData?.className}`}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#666', fontWeight: 700 }}>Subjects Taken:</Typography>

              <Typography sx={{ color: '#666', textTransform: 'uppercase' }}>
                {numberOfSubject}
              </Typography>
            </Box>
            </Stack>
            </Box>


            <CustomApplicantCBTResultTable tableData={result}/>

        </Box>

        : 

        <ResultNotAvailable />
            }

        </Box>
  )
}

export default CBTResultForApplicant