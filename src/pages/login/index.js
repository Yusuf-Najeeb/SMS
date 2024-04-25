

// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import SubmitSpinnerMessage from '../../views/users/component/SubmitSpinnerMessage'

// import {handleStaffLogin} from 'src/app/action'


// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,

  // maxHeight: 680,

  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '20px',

  // marginTop: theme.spacing(12),
  // marginBottom: theme.spacing(12),
  // [theme.breakpoints.down(1540)]: {
  //   maxHeight: 550
  // },
  // [theme.breakpoints.down('lg')]: {
  //   maxHeight: 500
  // }
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

  // color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  userId: yup.string().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'SuperAdmin@123',
  userId: 'super.admin@email.com'
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const router = useRouter()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {

   auth.staffLogin(data)

  
  //  handleStaffLogin(data).then((data)=>{
  //   if(data.success){
  //     const returnUrl = router.query.returnUrl
  //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/dashboard'
  //     router.replace(redirectURL)
  //   }
  //  })

  }
  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            width: '60%',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          {/* <LoginIllustration alt='login-illustration' src={`/images/pages/${imageSource}-${theme.palette.mode}.png`} /> */}

          <LoginIllustration alt='login-illustration' src={`/images/students.jpg`} />
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
          <Box sx={{ width: '100%', maxWidth: 400 }}>
          
            <Box component={'div'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src='/images/logo.webp' style={{objectPosition: 'center', objectFit: 'cover'}} width={'80px'} height={'80px'} alt='' />
            </Box>
            <Box sx={{ my: 6 }}>
              <Typography variant='h4' sx={{ mb: 1.5, position: 'relative' }}>
                {`Welcome to ${themeConfig.templateName}!`}
                <span><IconButton
                sx={{
                  bottom: 0 ,
                  color: 'grey.100',
                  position: 'absolute'
                }}
              >
                <Icon icon='tdesign:wave-left' fontSize={23} />
              </IconButton></span>
              </Typography>
             
              
              <Typography sx={{ color: 'text.secondary' }}>
                Please sign-in to your account to access your portal
              </Typography>
            </Box>
            {/* <Alert icon={false} sx={{ py: 3, mb: 6, ...bgColors.primaryLight, '& .MuiAlert-message': { p: 0 } }}>
              <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
                Admin: <strong>admin@vuexy.com</strong> / Pass: <strong>admin</strong>
              </Typography>
              <Typography variant='body2' sx={{ color: 'primary.main' }}>
                Client: <strong>client@vuexy.com</strong> / Pass: <strong>client</strong>
              </Typography>
            </Alert> */}
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} >

        

              <Box sx={{ mb: 4 }}>
                <Controller
                  name='userId'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label='Email or User ID'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder='user@school.com'
                      error={Boolean(errors.userId)}
                      {...(errors.userId && { helperText: errors.userId.message })}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
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
              </Box>
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label='Remember Me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <Typography component={LinkStyled} sx={{color: 'text.secondary'}} href='/reset-password'>
                  Reset Password
                </Typography>
              </Box>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4, backgroundColor: 'success.main' }} disabled={isSubmitting}>
                {isSubmitting ? <SubmitSpinnerMessage message={'Logging In'} /> : 'Login'}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ mr: 2 }}>Not a Staff?</Typography>
                <Typography href='/userlogin' sx={{color: 'success.light'}} component={LinkStyled}>
                  Login as Student/Guardian
                </Typography>
              </Box>
              
              
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
