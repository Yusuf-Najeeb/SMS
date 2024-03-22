// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchGuardian } from 'src/store/apps/guardian/asyncthunk'
import { useAppSelector } from 'src/hooks'
import { fetchStaffs } from 'src/store/apps/staff/asyncthunk'
import { useStaff } from 'src/hooks/useStaff'
import { useStudent } from 'src/hooks/useStudent'
import { fetchStudents } from 'src/store/apps/Student/asyncthunk'
import { fetchClasses } from 'src/store/apps/classes/asyncthunk'
import { useClasses } from 'src/hooks/useClassess'



const Statistics = () => {

    const dispatch = useDispatch()
    const GuardianData = useAppSelector(store => store.guardian.GuardianData)
    const [StaffData] = useStaff()
    const [StudentData] = useStudent()
    const [ClassesList, loading, paging] = useClasses()


    useEffect(() => {
        dispatch(fetchGuardian({page: 1, key: ''}))
        dispatch(fetchStaffs({page:1, limit: 10, key: ''}))
        dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))
        dispatch(fetchClasses({page: 1, limit: 10, key: ''}))
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

  return (
    <Card >
      <CardHeader
        title='Academic Details'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant='body2' sx={{ color: 'text.disabled' }}>
            Updated 1 minute ago
          </Typography>
        }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {/* {renderStats()} */}

          <Grid item xs={6} md={3}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={'primary'} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={'pepicons-print:people'} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{StaffData?.totalActive || 0}</Typography>
          <Typography variant='body2'>{'Staff'}</Typography>
        </Box>
      </Box>
    </Grid>

    <Grid item xs={6} md={3}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={'info'} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={'fa6-solid:people-line'} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{StudentData?.totalActive || 0}</Typography>
          <Typography variant='body2'>{'Students'}</Typography>
        </Box>
      </Box>
    </Grid>

          <Grid item xs={6} md={3}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={'error'} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={'raphael:parent'} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{GuardianData?.totalActive || 0}</Typography>
          <Typography variant='body2'>{'Guardian'}</Typography>
        </Box>
      </Box>
    </Grid>

    <Grid item xs={6} md={3}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={'success'} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={'mdi:google-classroom'} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{paging?.totalItems || 0}</Typography>
          <Typography variant='body2'>{'Classes'}</Typography>
        </Box>
      </Box>
    </Grid>

        </Grid>
      </CardContent>
    </Card>
  )
}

export default Statistics
