// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Utils Import
import { formatCurrency, formatFirstLetter } from '../../../@core/utils/format'
import { formatDateToReadableFormat } from '../../../@core/utils/format'
import StaffDetailCard from '../component/StaffDetailCard'
import { getInitials } from 'src/@core/utils/get-initials'
import { Stack } from '@mui/material'

const roleColors = {
  superadmin: 'error',
  Student: 'info',

  maintainer: 'success',
  subscriber: 'primary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  alignSelf: 'flex-end',
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize
}))

const StudentCard = ({ Student }) => {
  // ** States
  const [profilePictureUrl, setProfilePictureUrl] = useState()
  const [initials, setInitials] = useState('')

  useEffect(() => {
    if (Student) {
      setInitials(`${Student.firstName} ${Student.lastName}`)
    }
  }, [Student])

  useEffect(() => {
    setProfilePictureUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL.replace('api','')}/${Student?.profilePicture}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePictureUrl])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Fragment>
          <CardContent sx={{ pb: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Box sx={{ pt: 1.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {Student?.profilePicture  ? 
                 <CustomAvatar
                 src={profilePictureUrl}
                 variant='rounded'
                 alt={`${formatFirstLetter(Student?.firstname)} ${formatFirstLetter(Student?.lastname)}`}
                 sx={{ width: 150, height: 150, mb: 4 }}
               /> 
               : 
               <CustomAvatar
               skin='light'
               color='primary'
               sx={{ mr: 2.5, width: 50, height: 50, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
             >
               {getInitials(initials || 'John Doe')}
             </CustomAvatar>
            }
             
{/* 
              <Typography variant='h5' sx={{ mb: 3 }}>
                {formatFirstLetter(Student?.firstName) || '--'}
              </Typography> */}
              
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={Student?.role?.name}
                color='primary'
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
            <Box sx={{ display: 'flex', position: 'relative' }}>
              <Typography variant='h5' sx={{ mt: -1, mb: -1.2, color: 'primary.main', fontSize: '2rem !important' }}>
                {/* {grossSalary.toLocaleString()} */}
                {/* {formatCurrency(grossSalary, true)} */}
                {/* <Sub>/ month</Sub> */}
              </Typography>
            </Box>
          </CardContent>

          <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                  <Icon fontSize='1.75rem' icon='fluent-mdl2:date-time-2' />
                </CustomAvatar>
                <div>
                  <Typography variant='body2'>Date of Birth</Typography>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    {formatDateToReadableFormat(Student?.dateOfBirth) || 'No available date'}
                  </Typography>
                </div>
              </Box>
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:briefcase' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>568</Typography>
                    <Typography variant='body2'>Project Done</Typography>
                  </div>
                </Box> */}
            </Box>
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Personal Information
            </Typography>
            
            <Box sx={{ pt: 4 }}>
            <Grid container spacing={5}>
            <Grid item xs={6}>
              <StaffDetailCard
                iconName='solar:user-broken'
                cardTitle='Name'
                value={`${formatFirstLetter(Student?.firstName)} ${formatFirstLetter(Student?.lastName)}` || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='fluent-mdl2:date-time-2' cardTitle='Date of Birth' value={formatDateToReadableFormat(Student?.dateOfBirth) || '--'} />
              </Grid>

               <Grid item xs={6}>
              <StaffDetailCard iconName='fontisto:email' cardTitle='Email' value={Student?.email || '--'} />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='bi:phone' cardTitle='Phone Number' value={Student?.phone || '--'} />
              </Grid>
              
              <Grid item xs={6}>
              <StaffDetailCard iconName='icons8:gender' cardTitle='Gender' value={Student?.gender || '--'} />
              </Grid>


              <Grid item xs={6}>
              <StaffDetailCard
                iconName='tabler:user-pin'
                cardTitle='Address'
                value={Student?.residentialAddress || '--'}
              />
              </Grid>
              </Grid>
            </Box>
          </CardContent>




          {/* <Divider sx={{ my: '0 !important', mx: 6 }} /> */}

          {/* <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Medical Information
            </Typography>
            <Box sx={{ pt: 4 }}>
            <Grid container spacing={5}>
            <Grid item xs={6}>
              <StaffDetailCard
                iconName='healthicons:health-outline'
                cardTitle='Genotype'
                value={Student.genotype || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StudentDetailCard
                iconName='material-symbols-light:health-metrics-sharp'
                cardTitle='Blood Group'
                value={Student.bloodGroup || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StudentDetailCard
                iconName='mdi:food-off'
                cardTitle='Food Allergies'
                value={Student.foodAllergies || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StudentDetailCard
                iconName='mdi:drug-off'
                cardTitle='Drug Allergies'
                value={Student.drugAllergies || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StudentDetailCard
                iconName='medical-icon:surgery'
                cardTitle='Previous Surgery'
                value={Student.previousSurgery || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StudentDetailCard
                iconName='streamline:emergency-exit-solid'
                cardTitle='Emergency Phone Number'
                value={Student.emergencyPhone || '--'}
              />
              </Grid>

              

            </Grid>
            </Box>
          </CardContent> */}
          
        </Fragment>
      </Grid>
    </Grid>
  )
}

export default StudentCard