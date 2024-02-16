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
                label={Staff?.role?.name}
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

              <Grid item xs={6}>
              <StaffDetailCard iconName='ion:image-sharp' cardTitle='Age' value={calculateAge(Staff?.dateOfBirth) || '--'} />
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
              <Grid item xs={12}>
              <StaffDetailCard
                iconName='tabler:user-pin'
                cardTitle='Address'
                value={Staff?.residentialAddress || '--'}
              />
              </Grid>
              </Grid>
            </Box>
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Employment Information
            </Typography>
            <Box sx={{ pt: 4 }}>
            <Grid container spacing={5}>
            <Grid item xs={6}>
              <StaffDetailCard
                iconName='carbon:user-role'
                cardTitle='Staff Description'
                value={Staff?.staffdescription || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='mingcute:department-fill'
                cardTitle='Department'
                value={Staff?.department_section || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='arcticons:oldschool-editor'
                cardTitle='Specialization'
                value={Staff?.specialization || '--'}
              />
              </Grid>

              {/* <Grid item xs={6}>
              <StaffDetailCard
                iconName='material-symbols-light:topic'
                cardTitle='Subjects'
                value={Staff?.qualification || '--'}
              />
              </Grid> */}

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='bxs:school'
                cardTitle='Institution Attended'
                value={Staff?.institutionAttended || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='ic:round-school'
                cardTitle='Qualification'
                value={Staff?.qualification || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='eos-icons:workload'
                cardTitle='Previous Work Experience'
                value={Staff?.previousWorkExperience || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='healthicons:referral-negative'
                cardTitle='Name of 1st Referee'
                value={Staff?.nameOfRefereeOne || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='healthicons:referral-negative'
                cardTitle='Name of 2nd Referee'
                value={Staff?.nameOfRefereeTwo || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='bi:phone'
                cardTitle='Phone No. of 1st Referee'
                value={Staff?.phoneOfRefereeOne || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='bi:phone'
                cardTitle='Phone No. of 2nd Referee'
                value={Staff?.phoneOfRefereeTwo || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='fontisto:email'
                cardTitle='Email of 1st Referee'
                value={Staff?.emailOfRefereeOne || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='fontisto:email'
                cardTitle='Email of 2nd Referee'
                value={Staff?.emailOfRefereeTwo|| '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='tabler:user-pin'
                cardTitle='Address of 1st Referee'
                value={Staff?.addressOfRefereeOne || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='tabler:user-pin'
                cardTitle='Address of 2nd Referee'
                value={Staff?.addressOfRefereeTwo|| '--'}
              />
              </Grid>

            </Grid>
            </Box>
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Account/Payslip Information
            </Typography>
            <Box sx={{ pt: 4 }}>
            <Grid container spacing={5}>
            <Grid item xs={6}>
              <StaffDetailCard
                iconName='healthicons:money-bag'
                cardTitle='Basic Salary'
                value={formatCurrency(Staff.basicSalary, true)}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='emojione-monotone:money-bag'
                cardTitle='Furniture Allowance'
                value={formatCurrency(Staff.furnitureAllowance, true)}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='emojione-monotone:money-bag'
                cardTitle='Rent Allowance'
                value={formatCurrency(Staff.rentAllowance, true)}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='emojione-monotone:money-bag'
                cardTitle='Transport Allowance'
                value={formatCurrency(Staff.transportAllowance, true)}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='emojione-monotone:money-bag'
                cardTitle='Meal Allowance'
                value={formatCurrency(Staff.mealAllowance, true)}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='emojione-monotone:money-bag'
                cardTitle='Salary Arrears'
                value={formatCurrency(Staff.salaryArrears, true)}
              />
              </Grid>

              
            <Grid item xs={6}>
              <StaffDetailCard
                iconName='solar:wallet-money-bold'
                cardTitle='Account Number'
                value={Staff?.accountNumber || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='fluent-emoji-high-contrast:bank'
                cardTitle='Bank Name'
                value={Staff?.bankName || '--'}
              />
              </Grid>
              {/* <StaffDetailCard iconName="solar:wallet-money-bold" cardTitle='RSA Number' value={Staff?.rsaNumber || '--'} />  */}
              {/* <StaffDetailCard iconName="ri:home-office-fill" cardTitle='RSA Company' value={Staff?.rsaCompany || '--'} />  */}
            
            </Grid>
            </Box>
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Medical Information
            </Typography>
            <Box sx={{ pt: 4 }}>
            <Grid container spacing={5}>
            <Grid item xs={6}>
              <StaffDetailCard
                iconName='healthicons:health-outline'
                cardTitle='Genotype'
                value={Staff.genotype || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='material-symbols-light:health-metrics-sharp'
                cardTitle='Blood Group'
                value={Staff.bloodGroup || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='mdi:food-off'
                cardTitle='Food Allergies'
                value={Staff.foodAllergies || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='mdi:drug-off'
                cardTitle='Drug Allergies'
                value={Staff.drugAllergies || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='medical-icon:surgery'
                cardTitle='Previous Surgery'
                value={Staff.previousSurgery || '--'}
              />
              </Grid>

              <Grid item xs={6}>
              <StaffDetailCard
                iconName='streamline:emergency-exit-solid'
                cardTitle='Emergency Phone Number'
                value={Staff.emergencyPhone || '--'}
              />
              </Grid>

              

            </Grid>
            </Box>
          </CardContent>
        </Fragment>
      </Grid>
    </Grid>
  )
}

export default StaffCard
