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
import { calculateAge } from '../../../@core/utils/calculateAge'

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

const GuardianCard = ({ Guardian }) => {
  // ** States
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [initials, setInitials] = useState('')


  useEffect(() => {
    if (Guardian) {
      setInitials(`${Guardian.firstName} ${Guardian.lastName}`)
    }
  }, [Guardian])

  useEffect(() => {

    if(Guardian){
        setProfilePictureUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL.replace('api','')}/${Guardian?.profilePicture}`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Guardian])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Fragment>
          <CardContent sx={{ pb: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Box sx={{ pt: 1.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {Guardian?.profilePicture  ? 
                 <CustomAvatar
                 src={profilePictureUrl}
                 variant='rounded'
                 alt={`${formatFirstLetter(Guardian?.firstname)} ${formatFirstLetter(Guardian?.lastname)}`}
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
                {formatFirstLetter(Guardian?.firstName) || '--'}
              </Typography> */}
              
              <CustomChip
                rounded
                skin='light'
                size='small'

                // label={Guardian?.role?.name}
                label={'Guardian'}
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
                    {formatDateToReadableFormat(Guardian?.dateOfBirth) || 'No available date'}
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
                value={`${formatFirstLetter(Guardian?.firstName)} ${formatFirstLetter(Guardian?.lastName)}` || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='fluent-mdl2:date-time-2' cardTitle='Date of Birth' value={formatDateToReadableFormat(Guardian?.dateOfBirth) || '--'} />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='ion:image-sharp' cardTitle='Age' value={calculateAge(Guardian?.dateOfBirth) || '--'} />
              </Grid>

               <Grid item xs={6}>
              <StaffDetailCard iconName='fontisto:email' cardTitle='Email' value={Guardian?.email || '--'} />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='bi:phone' cardTitle='Phone Number' value={Guardian?.phone || '--'} />
              </Grid>
              
              <Grid item xs={6}>
              <StaffDetailCard iconName='icons8:gender' cardTitle='Gender' value={Guardian?.gender || '--'} />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='fa-solid:pray' cardTitle='Religion' value={Guardian?.religion || '--'} />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='material-symbols:background-replace' cardTitle='Tribe' value={Guardian?.ethnicity || '--'} />
              </Grid>


              <Grid item xs={12}>
              <StaffDetailCard
                iconName='tabler:user-pin'
                cardTitle='Address'
                value={Guardian?.residentialAddress || '--'}
              />
              </Grid>
              </Grid>
            </Box>
          </CardContent>

          {/* <Divider */}

          <CardContent sx={{ pb: 4 }}>
            {Guardian?.students?.length > 0 ? (
              Guardian.students.map((item, i) => {

                let position;
                switch (i) {
                  case 0:
                    position = '1st';
                    break;
                  case 1:
                    position = '2nd';
                    break;
                  case 2:
                    position = '3rd';
                    break;
                  default:
                    position = `${i + 1}th`;
                }

                return (
                  <Box key={i} sx={{pt: 8}}>
                    <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                      {position} Child Information
                    </Typography>
                    <Box sx={{ pt: 4 }}>
                      <Grid container spacing={5} >
                        <Grid item xs={6}>
                          <StaffDetailCard
                            iconName='solar:user-broken'
                            cardTitle='Name'
                            value={`${formatFirstLetter(item?.firstName)} ${formatFirstLetter(item?.lastName)}` || '--'}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <StaffDetailCard iconName='icons8:gender' cardTitle='Gender' value={item?.gender || '--'} />
                        </Grid>

                        <Grid item xs={6}>
                          <StaffDetailCard iconName='bi:phone' cardTitle='Phone Number' value={item?.phone || '--'} />
                        </Grid>

                        <Grid item xs={6}>
                          <StaffDetailCard iconName='fontisto:email' cardTitle='Email' value={item?.email || '--'} />
                        </Grid>

                        <Grid item xs={12}>
                          <StaffDetailCard
                            iconName='tabler:user-pin'
                            cardTitle='Address'
                            value={item?.residentialAddress || '--'}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )
              })
            ) : (
              <Typography variant='body2' sx={{ color: 'black', textTransform: 'capitalize' }}>
                No Child Available
              </Typography>
            )}
          </CardContent>
          
        </Fragment>
      </Grid>
    </Grid>
  )
}

export default GuardianCard
