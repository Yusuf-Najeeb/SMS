import React, { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'


export const SummaryStats = (props) => {
  // ** Props
  const { sx, icon, stats, iconSize = 24, avatarSize = 30, title, avatarColor = 'primary' } = props

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: 'text.secondary' }}>{title}</Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h5'>{stats}</Typography>
          </Box>
        </Box>
        <CustomAvatar skin='light' variant='rounded' color={avatarColor} sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} />
        </CustomAvatar>
      </CardContent>
    </Card>
  )
}

const Stats = ({data, statTitle}) => {


  return (
    <Grid item xs={12}>
      <Grid container spacing={6}>
      <Grid item xs={12} md={3} sm={6}>
          <SummaryStats title={`Total ${statTitle}`} stats={data?.totalActive ? data?.totalActive + data?.totalInActive : 0}  icon='pepicons-print:people' />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <SummaryStats title={`Total Active ${statTitle}`} stats={data?.totalActive ? data?.totalActive : 0}  icon='mdi:person-check' />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <SummaryStats title={`Total Inactive ${statTitle}`} stats={data?.totalInActive ? data.totalInActive : 0} icon='material-symbols:person-cancel' />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Stats
