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
    title: 'Social Links',
    subtitle: 'Add Social Links'
  }
]

const StepperAlternativeLabel = () => {
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
  const handlePasswordChange = prop => event => {
    setState({ ...state, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setState({ ...state, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 })
  }

  // Handle Language
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextField
                select
                fullWidth
                label='Parent'
                SelectProps={{
                  value: country,
                  onChange: e => setCountry(e.target.value)
                }}
              >
                <MenuItem value='Female'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextField
                select
                fullWidth
                label='Class'
                SelectProps={{
                  value: country,
                  onChange: e => setCountry(e.target.value)
                }}
              >
                <MenuItem value='Year 1'>Year 1</MenuItem>
                <MenuItem value='Year 2'>Year 2</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextField fullWidth label='Phone Number' value={username} placeholder='Enter phone Number' />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomTextField fullWidth label='Email' value={username} placeholder='Enter Phone Number' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='First name' value={username} placeholder='Enter First Name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth type='name' label='Last Name' value={email} placeholder='Enter Last Name' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Middle Name'
                value={state.password}
                id='stepper-alternative-account-password'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Date of birth'
                type='date'
                placeholder=' Select Date of birth'
                id='stepper-alternative-account-password-2'
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Age' value={username} placeholder='Enter Age' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Gender'>
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Religion'>
                <MenuItem value='Christainity'>Christainity</MenuItem>
                <MenuItem value='lslam'>Islam</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Nationality'>
                <MenuItem value='Christainity'>Christainity</MenuItem>
                <MenuItem value='lslam'>Islam</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='State of Orgin'>
                <MenuItem value='Imo '>Imo</MenuItem>
                <MenuItem value='Lagos'>Lagos</MenuItem>
                <MenuItem value='Abuja'>Abuja</MenuItem>
                <MenuItem value='Kaduna'>Kaduna</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Local government area'>
                <MenuItem value='Owerri-west'>Owerri</MenuItem>
                <MenuItem value='north-central'>North-central</MenuItem>
              </CustomTextField>
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Registration-number' placeholder='01034567' required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                value={lastName}
                label='School Admission Number'
                placeholder='01034567'
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField select fullWidth label='Class Last Session' placeholder='None'>
                <MenuItem value='2021'>2021</MenuItem>
                <MenuItem value='2022'>2022</MenuItem>
                <MenuItem value='2023'>2023</MenuItem>
                <MenuItem value='2024'>2024</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                select
                fullWidth
                label='Current Class'
                placeholder='PG'
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
                select
                fullWidth
                label='Year of Admission'
                placeholder='2021/2022'
                id='stepper-alternative-select-multiple-language'
              >
                <MenuItem value='2021'>2021</MenuItem>
                <MenuItem value='2022'>2022</MenuItem>
                <MenuItem value='2023'>2023</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='Arm Admitted into' placeholder='Enter Arm Admitted into' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField fullWidth label='House Admitted into' placeholder='Enter House Admitted into' required />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                select
                fullWidth
                label='Student Category'
                placeholder='Day student'
                id='stepper-alternative-select-multiple-language'
                required
              >
                <MenuItem value='Day student'>Day student</MenuItem>
                <MenuItem value='bordering'>bordering</MenuItem>
              </CustomTextField>
            </Grid>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Twitter'
                value={twitter}
                onChange={e => setTwitter(e.target.value)}
                placeholder='https://twitter.com/carterLeonard'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Facebook'
                value={facebook}
                onChange={e => setFacebook(e.target.value)}
                placeholder='https://facebook.com/carterLeonard'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Google+'
                value={google}
                onChange={e => setGoogle(e.target.value)}
                placeholder='https://plus.google.com/carterLeonard'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='LinkedIn'
                value={linkedIn}
                onChange={e => setLinkedIn(e.target.value)}
                placeholder='https://linkedin.com/carterLeonard'
              />
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

export default StepperAlternativeLabel
