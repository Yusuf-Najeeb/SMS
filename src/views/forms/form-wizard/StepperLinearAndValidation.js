// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
  {
    title: 'Account Details',
    subtitle: 'Enter your Account Details'
  },
  {
    title: 'Personal Info',
    subtitle: 'Setup Information'
  },

  {
    title: 'Link',
    subtitle: ' Social Links'
  }
]

const StepperLinearAndValidation = () => {
  // ** States
  const [email, setEmail] = useState('')
  const [google, setGoogle] = useState('')
  const [country, setCountry] = useState('')
  const [twitter, setTwitter] = useState('')
  const [username, setUsername] = useState('')
  const [lastName, setLastName] = useState('')
  const [facebook, setFacebook] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [firstName, setFirstName] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [language, setLanguage] = useState([])

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const handleReset = () => {
    setEmail('')
    setGoogle('')
    setCountry('')
    setTwitter('')
    setUsername('')
    setLastName('')
    setFacebook('')
    setLinkedIn('')
    setLanguage([])
    setFirstName('')
    setActiveStep(0)
    setState({ ...state, password: '', password2: '' })
  }

  // Handle Password
  // const handlePasswordChange = prop => event => {
  //   setState({ ...state, [prop]: event.target.value })
  // }

  // const handleClickShowPassword = () => {
  //   setState({ ...state, showPassword: !state.showPassword })
  // }

  // Handle Confirm Password
  // const handleConfirmChange = prop => event => {
  //   setState({ ...state, [prop]: event.target.value })
  // }

  // const handleClickShowConfirmPassword = () => {
  //   setState({ ...state, showPassword2: !state.showPassword2 })
  // }

  // Handle Language
  // const handleSelectChange = event => {
  //   setLanguage(event.target.value)
  // }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Last Name' value={username} placeholder='Enter Last Name' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Middle Name' value={username} placeholder='Enter Middle Name' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='First name' value={username} placeholder='Enter First Name' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth type='date' label='Date of Birth' placeholder='Enter Date of birth' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Marital Status'
                placeholder='Enter Marital Status'
                id='stepper-alternative-account-password'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Gender'>
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Phone Number' placeholder='Enter Phone Number' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='City' placeholder='Enter City' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Address Line' placeholder='Enter Address ' required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField select fullWidth label='State' placeholder='--Select State'>
                <MenuItem value='Lagos'>Lagos</MenuItem>
                <MenuItem value='Abuja'>Abuja</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField select fullWidth label='LGA'>
                <MenuItem value='North central'>North Central</MenuItem>
                <MenuItem value='Kubwe'>Kubwe</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Email Address' placeholder='Enter Email Address ' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Employee Date' placeholder='01/3/23 ' type='date' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Religion'>
                <MenuItem value='African Religion'>African Religion</MenuItem>
                <MenuItem value='islam'>isam</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Name of next of kin' placeholder='Enter name of next of kin ' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Name of next of kin Address'
                placeholder='Enter name of next of kin Address'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Relationship'>
                <MenuItem value='Brother'>Brother</MenuItem>
                <MenuItem value='Sister'>Sister</MenuItem>
                <MenuItem value='Father'>Father</MenuItem>
                <MenuItem value='Mother'>Mother</MenuItem>
              </CustomTextField>
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Staff ID' placeholder='0134569' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Staff Description' placeholder=''>
                <MenuItem value='Accountant'>Accountant</MenuItem>
                <MenuItem value='Chef'>Chef</MenuItem>
                <MenuItem value='Procurement Manager'>Procurement Manager</MenuItem>
                <MenuItem value='Docter'>Docuter</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                select
                fullWidth
                label='Section/Department'
                placeholder='Section/Department'
                id='stepper-alternative-select-multiple-language'
              >
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='French'>French</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                <MenuItem value='Italian'>Italian</MenuItem>
                <MenuItem value='German'>German</MenuItem>
                <MenuItem value='Arabic'>Arabic</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Institution attended '
                placeholder='Enter Institution attended'
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                select
                fullWidth
                label='Qualification'
                placeholder='B.S.d'
                id='stepper-alternative-select-multiple-language'
              >
                <MenuItem value='B.S.C'>B.S.C</MenuItem>
                <MenuItem value='N.C.E'>N.C.E</MenuItem>
                <MenuItem value='HND'>HND</MenuItem>
                <MenuItem value='OND'>OND</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Specialization' placeholder='Enter area of Speacialization' required />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Name of referee' placeholder='Enter of referee' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Phone of referee' placeholder='Enter of referee' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Previous Work experience'
                placeholder='Enter Previous work experience'
                required
              />
            </Grid>
          </Fragment>
        )

      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Genotype' placeholder='AA'>
                <MenuItem value='AA'>AA</MenuItem>
                <MenuItem value='AS'>AS</MenuItem>
                <MenuItem value='SS'>SS</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Blood Group' placeholder='A+'>
                <MenuItem value='A+'>A+</MenuItem>
                <MenuItem value='A-'>A-</MenuItem>
                <MenuItem value='0+'>0+</MenuItem>
                <MenuItem value='0-'>0-</MenuItem>
                <MenuItem value='AB'>AB</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Have you have had any previous Surgery' placeholder=''>
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Enter Emergency' placeholder='Enter Emergency' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Rent Allowance' placeholder='Enter Transport Allowances' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Meal Allowance' placeholder='Enter Meal Allowance' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Domestic Allowance' placeholder='Enter Meal Allowance' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Furniture Allowance' placeholder='0' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Medical Allowance' placeholder='0' required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Salary Arears' placeholder='0' required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Others' placeholder='Others' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                select
                fullWidth
                label='Name of Bank'
                placeholder='--Select Bank(s)'
                id='stepper-alternative-select-multiple-language'
              >
                <MenuItem value='Access Bank'>Access Bank</MenuItem>
                <MenuItem value='Opay'>Opay</MenuItem>
                <MenuItem value='First Bank'>First Bank</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Account Name' placeholder='Account Name' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Account Number' placeholder='Account Number' required />
            </Grid>
          </Fragment>
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='tonal' color='secondary' disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant='contained' onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <Fragment>
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <Card sx={{ mt: 4 }}>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </Fragment>
  )
}

export default StepperLinearAndValidation
