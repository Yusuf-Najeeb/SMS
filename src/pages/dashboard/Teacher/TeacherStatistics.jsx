import { useEffect, useState } from 'react'

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
import { getStudentsUnderGuardian } from '../../../store/apps/guardian/asyncthunk'
import { fetchTeacherSubjects } from '../../../store/apps/staff/asyncthunk'



const TeacherStatistics = ({user}) => {

    const [numberOfSubjects, setSubjects] = useState(0)


    useEffect(()=>{
        if(user){
            fetchTeacherSubjects(user?.email).then((res)=>{
                if(res?.data.success){
                    setSubjects(res?.data.data)
                }
            })
        }
      },[user])

  return (
    <Card >
      <CardHeader
        title='Statistics'
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}

        // action={
        //   <Typography variant='body2' sx={{ color: 'text.disabled' }}>
        //     Updated 1 minute ago
        //   </Typography>
        // }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(7)} !important`, pb: theme => `${theme.spacing(7.5)} !important` }}
      >
        <Grid container spacing={6}>
          {/* {renderStats()} */}


    <Grid item xs={6} md={3}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' color={'error'} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={'fa6-solid:people-line'} fontSize='1.5rem' />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>{numberOfSubjects?.length || 0}</Typography>
          <Typography variant='body2'>{'Subjects'}</Typography>
        </Box>
      </Box>
    </Grid>

       

        </Grid>
      </CardContent>
    </Card>
  )
}

export default TeacherStatistics
