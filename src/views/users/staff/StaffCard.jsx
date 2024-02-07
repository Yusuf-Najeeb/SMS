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
  staff: 'info',

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

const StaffCard = ({ Staff }) => {
  // ** States
  const [profilePictureUrl, setProfilePictureUrl] = useState()
  const [grossSalary, setGrossSalary] = useState(0)
  const [initials, setInitials] = useState('')

  useEffect(() => {
    if (Staff) {
      const total =
        Number(Staff.basicSalary) +
        Number(Staff.mealAllowance) +
        Number(Staff.furnitureAllowance) +
        Number(Staff.domesticAllowance) +
        Number(Staff.transportAllowance)
      setGrossSalary(total)

      setInitials(`${Staff.firstName} ${Staff.lastName}`)
    }
  }, [Staff])

  useEffect(() => {
    setProfilePictureUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${Staff?.profilePicture}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePictureUrl])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Fragment>
          <CardContent sx={{ pb: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Box sx={{ pt: 1.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {Staff?.profilePicture  ? 
                 <CustomAvatar
                 src={profilePictureUrl}
                 variant='rounded'
                 alt={`${formatFirstLetter(Staff?.firstname)} ${formatFirstLetter(Staff?.lastname)}`}
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
             

              <Typography variant='h5' sx={{ mb: 3 }}>
                {formatFirstLetter(Staff?.firstName) || '--'}
              </Typography>
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={Staff.roles[0]?.roleName}
                color='primary'
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
            <Box sx={{ display: 'flex', position: 'relative' }}>
              <Typography variant='h5' sx={{ mt: -1, mb: -1.2, color: 'primary.main', fontSize: '2rem !important' }}>
                {/* {grossSalary.toLocaleString()} */}
                {formatCurrency(grossSalary, true)}
                <Sub>/ month</Sub>
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
                  <Typography variant='body2'>Date of Employment</Typography>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    {formatDateToReadableFormat(Staff?.dateOfEmployment) || 'No available date'}
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
                value={`${formatFirstLetter(Staff?.firstName)} ${formatFirstLetter(Staff?.lastName)}` || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='fluent-mdl2:date-time-2' cardTitle='Date of Birth' value={formatDateToReadableFormat(Staff?.dateOfBirth) || '--'} />
              </Grid>

               <Grid item xs={6}>
              <StaffDetailCard iconName='fontisto:email' cardTitle='Email' value={Staff?.email || '--'} />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='bi:phone' cardTitle='Phone Number' value={Staff?.phone || '--'} />
              </Grid>
              
              <Grid item xs={6}>
              <StaffDetailCard iconName='icons8:gender' cardTitle='Gender' value={Staff?.gender || '--'} />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard iconName='f7:status' cardTitle='Marital Status' value={Staff?.maritalStatus || '--'} />
              </Grid>

              {/* <StaffDetailCard
                iconName='fluent-emoji-high-contrast:department-store'
                cardTitle='Department'
                value={Staff?.department?.name || '--'}
              /> */}

            <Grid item xs={6}>
               <StaffDetailCard
                iconName='tabler:user-pin'
                cardTitle='City'
                value={Staff?.city || '--'}
              />
              </Grid>

              <Grid item xs={6}>
               <StaffDetailCard
                iconName='tabler:user-pin'
                cardTitle='Local Government'
                value={Staff?.lga || '--'}
              />
              </Grid>

              <Grid item xs={6}>
               <StaffDetailCard
                iconName='tabler:user-pin'
                cardTitle='State'
                value={Staff?.state || '--'}
              />
              </Grid>
              <Grid item xs={6}>
              <StaffDetailCard
                iconName='tabler:user-pin'
                cardTitle='Address'
                value={Staff?.residentialAddress || '--'}
              />
              </Grid>
              </Grid>
            </Box>
          </CardContent>

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Account and Retirement Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              <StaffDetailCard
                iconName='solar:wallet-money-bold'
                cardTitle='Account Number'
                value={Staff?.accountNumber || '--'}
              />
              {/* <StaffDetailCard iconName="solar:wallet-money-bold" cardTitle='RSA Number' value={Staff?.rsaNumber || '--'} />  */}
              {/* <StaffDetailCard iconName="ri:home-office-fill" cardTitle='RSA Company' value={Staff?.rsaCompany || '--'} />  */}
            </Box>
          </CardContent>
        </Fragment>
      </Grid>
    </Grid>
  )
}

export default StaffCard
