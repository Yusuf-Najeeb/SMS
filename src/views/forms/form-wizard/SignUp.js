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

const Sign = () => {
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

  return (
    <Fragment>
      <Card sx={{ padding: '20px' }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              type='firstName'
              label='First Name'
              value={username}
              placeholder='Enter First Name'
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              type='lastName'
              label='Last Name'
              value={username}
              placeholder='Enter Last Name'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth type='email' label='Email' value={username} placeholder='example.com' required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField select fullWidth label='Title' placeholder='--Select title'>
              <MenuItem value='Mr'>MR</MenuItem>
              <MenuItem value='Miss'>MISS</MenuItem>
              <MenuItem value='MRS'>MRS</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField select fullWidth label='Status' placeholder='--Select Status'>
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Offline'>Offline</MenuItem>
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              type='phoneNumber'
              label='PhoneNumber'
              placeholder='Enter Phone Number'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField fullWidth type='password' label='Password' placeholder='Enter Password' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              type='identificationNumber'
              label='Identification Number'
              placeholder='Enter your Identification Number'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              type='date'
              label='Date of Birth'
              placeholder='Enter your date of birth'
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              type='address'
              label='Enter your Address'
              placeholder='Enter your date of birth'
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField select fullWidth label='Branch' placeholder='--Select title'>
              <MenuItem value='Abuja'>Abuja</MenuItem>
              <MenuItem value='Lagos'>Lagos</MenuItem>
              <MenuItem value='Kano'>Kano</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>
      </Card>
    </Fragment>
  )
}

export default Sign
