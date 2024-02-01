import { useEffect, useState } from 'react'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import { CircularProgress, MenuItem } from '@mui/material'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from 'src/@core/Formschema'

import { createStaff, createStaffs } from '../../../store/apps/staff/asyncthunk'
import { useAppDispatch } from '../../../hooks'
import { CustomInput } from '../component/CreateActor'
import { formatDateToYYYMMDDD } from '../../../@core/utils/format'

export const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const CreateStaff = ({ open, closeModal, refetchStaff }) => {
  const [showPassword, setShowPassword] = useState(false)

  const defaultValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    title: '',
    status: '',
    phone: '',
    dateOfBirth: '',
    residentialAddress: '',
    branch: ''
  }
  const dispatch = useAppDispatch()

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(signUpSchema) })

  const onSubmit = async data => {

    // const res = await dispatch(createStaffs(data))
    const { dateOfBirth, ...restOfData } = data
    const formattedDate = formatDateToYYYMMDDD(dateOfBirth)

    const payload = { dateOfBirth: formattedDate, ...restOfData }

    createStaff(payload).then((res)=> {
      if(res.data.success){
        reset()
        closeModal()
        refetchStaff()
      }
    })
   
  }


  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'

      //   TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 650 } }}
    >
      <DialogContent
        sx={{
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={closeModal}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(8)} !important`
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='First Name'
                      placeholder='Enter First Name'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.firstName)}
                      {...(errors.firstName && { helperText: errors.firstName.message})}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Last Name'
                      placeholder='Enter Last Name'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.lastName)}
                      {...(errors.lastName && { helperText: errors.lastName.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='middleName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Middle Name'
                      placeholder='Enter Middle name'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.middleName)}
                      {...(errors.middleName && { helperText: errors.middleName.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Email'
                      placeholder='Enter Email'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
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
                      label='Password'
                      placeholder='Enter Password'
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
              <Grid item xs={12} sm={12} md={6}>
              
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Title'
                      onChange={onChange}
                      id='stepper-linear-title'
                      error={Boolean(errors.title)}
                      aria-describedby='stepper-linear-title-helper'
                      {...(errors.title && { helperText: 'Title is required' })}
                    >
                      <MenuItem value='Mr'>Mr</MenuItem>
                      <MenuItem value='Mrs'>Mrs</MenuItem>
                      <MenuItem value='Miss'>Miss</MenuItem>
                      <MenuItem value='Master'>Master</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
              

              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='status'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Status'
                      onChange={onChange}
                      id='stepper-linear-status'
                      error={Boolean(errors.status)}
                      aria-describedby='stepper-linear-status-helper'
                      {...(errors.status && { helperText: errors.status.message })}
                    >
                      <MenuItem value='Active'>Active</MenuItem>
                      <MenuItem value='Inactive'>Inactive</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Phone Number'
                      placeholder='Enter Phone Number'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.phone)}
                      {...(errors.phone && { helperText: errors.phone.message })}
                    />
                  )}
                />
              </Grid>

             
              <Grid item xs={12} sm={12} md={6}>
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
                          label='Date of Birth'
                          error={Boolean(errors.dateOfBirth)}
                          {...(errors.dateOfBirth && { helperText: errors.dateOfBirth.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='residentialAddress'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Residential Address'
                      placeholder='Enter Address'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.residentialAddress)}
                      {...(errors.residentialAddress && { helperText: errors.dateOfBirth.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='branch'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Branch'
                      placeholder='Enter Branch'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.branch)}
                      {...(errors.branch && { helperText: errors.branch.message })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='submit' variant='contained'>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Create'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateStaff
