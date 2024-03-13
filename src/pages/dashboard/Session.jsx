import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { getCurrentSession } from '../../store/apps/settings/asyncthunk'

import Icon from 'src/@core/components/icon'

const series = [{ data: [32, 52, 72, 94, 116, 94, 72] }]

const CurrentSession = () => {

    const [sessionDetails, setSessionDetails] = useState()

  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '42%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    colors: [
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 1),
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 0.16)
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: -4,
        left: -7,
        right: -5,
        bottom: -12
      }
    },
    xaxis: {
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      axisTicks: { show: false },
      axisBorder: { show: false },
      tickPlacement: 'on',
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize
        }
      }
    },
    yaxis: { show: false }
  }

  useEffect(()=>{
    getCurrentSession().then((res)=>{
        if(res?.data?.success){
            setSessionDetails(res.data.data)
        } else {
            setSessionDetails('')
        }
    })
  },[])

  return (
    <Card sx={{paddingTop: 2, paddingBottom: 1}}>
      <CardContent>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Typography variant='h5' sx={{ mb: 2 }}>
                 Current Academic Session
              </Typography>
              {/* <Typography variant='body2'>Current Session</Typography> */}
            </div>
            <div>
              <Typography variant='h3' sx={{ mb: 2 }}>
               {sessionDetails?.name || "--"}
              </Typography>
              <CustomChip rounded size='small' skin='light' color='success' sx={{textTransform: 'uppercase'}} label={`${sessionDetails?.term} term` || '--'} />
            </div>
          </Box>


            <CustomAvatar skin='light' color={'info'} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={'ph:calendar-fill'} fontSize='1.8rem' />
        </CustomAvatar>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CurrentSession
