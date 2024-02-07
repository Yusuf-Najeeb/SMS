// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { MenuItem, Grid } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { notifyError } from '../../@core/components/toasts/notifyError'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Third Party Imports

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//import signUpSchema from '../../@core/FormSchema/index'
import { signUpSchema } from 'src/@core/FormSchema'
import { useAppDispatch } from '../../hooks'
import { useSettings } from 'src/@core/hooks/useSettings'
import useBgColor from 'src/@core/hooks/useBgColor'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { formatDateToYYYMMDDD } from '../../@core/utils/format'
import { RegisterUser } from '../../store/apps/auth/asyncthunk'
import { CustomInput } from '../../views/users/Guardian/AddGuardian'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const defaultValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    title: '',
    phone: '',
    gender: '',
    dateOfBirth:'',
    dateOfEmployment: '',
    residentialAddress: '',
    branch: ''
  }

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(signUpSchema)
  })

  // ** Hooks
  const dispatch = useAppDispatch()
  const router = useRouter()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  const onSubmit = async data => {
    const { dateOfEmployment, dateOfBirth, ...resData } = data
    const formattedDate = formatDateToYYYMMDDD(dateOfEmployment)
    const formattedDOB = formatDateToYYYMMDDD(dateOfBirth)

    const personalInformation = {...resData, dateOfEmployment: formattedDate, dateOfBirth: formattedDOB}

    const payload = {
      personalInformation
    }

    try {
      const resp = await dispatch(RegisterUser(payload))
      if (resp.payload?.success) {
        router.replace('/apps/staff')
      }
    } catch (error) {
      console.log(error)
      notifyError('A network Error occured, please try again')
    }
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          <RegisterIllustration
            alt='register-illustration'
            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 650 }}>
            <svg width={30} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              />
            </svg>
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                Adventure starts here 🚀
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
            </Box>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='firstName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        autoFocus
                        required
                        label='First Name'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='admin'
                        error={Boolean(errors.firstName)}
                        {...(errors.firstName && { helperText: errors.firstName.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='lastName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        autoFocus
                        required
                        label='Last Name'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='admin'
                        error={Boolean(errors.lastName)}
                        {...(errors.lastName && { helperText: errors.lastName.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='middleName'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        autoFocus
                        label='Middle Name'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='admin'
                        error={Boolean(errors.middleName)}
                        {...(errors.middleName && { helperText: errors.middleName.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='email'
                    type='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        autoFocus
                        required
                        label='Email'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='admin'
                        error={Boolean(errors.email)}
                        {...(errors.email && { helperText: errors.email.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='password'
                    type='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onBlur={onBlur}
                        required
                        label='Password'
                        onChange={onChange}
                        id='auth-login-v2-password'
                        error={Boolean(errors.password)}
                        {...(errors.password && { helperText: errors.password.message })}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='title'
                    type='text'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Title' // Corrected placement of label prop
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='admin'
                        error={Boolean(errors.title)}
                        {...(errors.title && { helperText: errors.title.message })}
                        autoFocus // Corrected placement of autoFocus prop
                      >
                        <MenuItem value='Mr'>Mr</MenuItem>
                        <MenuItem value='Mrs'>Mrs</MenuItem>
                        <MenuItem value='Miss'>Miss</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                  <Controller
                    name='status'
                    type='text'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        autoFocus
                        label='Status'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='admin'
                        error={Boolean(errors.status)}
                        {...(errors.status && { helperText: errors.status.message })}
                      >
                        <MenuItem value='Male'>Mr</MenuItem>
                        <MenuItem value='Female'>Mrs</MenuItem>
                        <MenuItem value='Female'>Miss</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='phone'
                    type='text'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        autoFocus
                        required
                        label='Phone Number'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='123456789'
                        error={Boolean(errors.phone)}
                        {...(errors.phone && { helperText: errors.phone.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} >
              <Controller
                  name='dateOfEmployment'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      popperPlacement='bottom-end'
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      placeholderText='Enter Date of Employment'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='Date of Employment *'
                          error={Boolean(errors.dateOfEmployment)}
                          {...(errors.dateOfEmployment && { helperText: errors.dateOfEmployment.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                  <Controller
                    name='gender'
                    type='text'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        label='Gender' // Corrected placement of label prop
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='admin'
                        error={Boolean(errors.gender)}
                        {...(errors.gender && { helperText: errors.gender.message })}
                      >
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} >
              <Controller
                  name='dateOfBirth'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      popperPlacement='bottom-end'
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      placeholderText='Enter Date of Birth'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='Date of Birth *'
                          error={Boolean(errors.dateOfBirth)}
                          {...(errors.dateOfBirth && { helperText: errors.dateOfBirth.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>


                <Grid item xs={12} sm={6}>
                  <Controller
                    name='residentialAddress'
                    type='text'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        required
                        label='Residential Address'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='24, school street'
                        error={Boolean(errors.residentialAddress)}
                        {...(errors.residentialAddress && { helperText: errors.residentialAddress.message })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='branch'
                    type='text'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        required
                        label='Branch'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='Akwa Ibom'
                        error={Boolean(errors.branch)}
                        {...(errors.branch && { helperText: errors.branch.message })}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4, mt: 6 }}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                <Typography component={LinkStyled} href='/login'>
                  Sign in instead
                </Typography>
              </Box>
              <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`
                }}
              >
                or
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
