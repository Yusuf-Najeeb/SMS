import { forwardRef, useEffect, useState } from 'react'

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

import { CircularProgress, MenuItem } from '@mui/material'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { editActorSchema } from 'src/@core/Formschema'

import { formatDateToYYYMMDDD } from '../../../@core/utils/format'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import axios from 'axios'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'

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

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const EditGuardian = ({ open, closeModal, refetchData, endpointUrl, selectedActor }) => {

  const defaultValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    title: '',
    status: '',
    phone: '',
    dateOfBirth: '',
    residentialAddress: '',
    branch: ''
  }

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(editActorSchema) })

  const onSubmit = async values => {
    const { dateOfBirth, ...restOfData } = values
    const formattedDate = formatDateToYYYMMDDD(dateOfBirth)

    const payload = { dateOfBirth: formattedDate, ...restOfData }


    try {
      const response = await axios.post(endpointUrl, payload)


      if (response.data.success) {
        notifySuccess("Success!")
        reset()
        closeModal()
        refetchData()
      }

    } catch (error) {
      notifyError('Something Went Wrong, Try again')
    }

  }

  useEffect(() => {
    setValue('firstName', selectedActor.firstName)
    setValue('lastName', selectedActor.lastName)
    setValue('middleName', selectedActor.middleName)
    setValue('email', selectedActor.email)
    setValue('title', selectedActor.title)
    setValue('status', selectedActor.status)
    setValue('phone', selectedActor.phone)
    setValue('dateOfBirth', selectedActor.dateOfBirth)
    setValue('residentialAddress', selectedActor.residentialAddress)
    setValue('branch', selectedActor.branch)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                      {...(errors.firstName && { helperText: 'First name is required ' })}
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
                      {...(errors.lastName && { helperText: 'Last name is required ' })}
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
                      placeholder='Enter Middle Name'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.middleName)}
                      {...(errors.middleName && { helperText: 'Middle name is required ' })}
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
                      {...(errors.email && { helperText: 'Email  is required ' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={6}>
                <Controller
                  name='status'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Marital Status'
                      onChange={onChange}
                      id='stepper-linear-status'
                      error={Boolean(errors.status)}
                      aria-describedby='stepper-linear-status-helper'
                      {...(errors.status && { helperText: 'Status is required' })}
                    >
                      <MenuItem value='Single'>Single</MenuItem>
                      <MenuItem value='Married'>Married</MenuItem>
                      <MenuItem value='Divorced'>Divorced</MenuItem>
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

              {/* <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='identificationNumber'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Identification Number'
                      placeholder='Enter Identification Number'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.identificationNumber)}
                      {...(errors.identificationNumber && { helperText: 'Identification number is required ' })}
                    />
                  )}
                />
              </Grid> */}

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
                      placeholderText='2024-05-08'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='Date of Birth'
                          error={Boolean(errors.dateOfBirth)}
                          {...(errors.dateOfBirth && { helperText: 'Date of Birth is required' })}
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
                      {...(errors.residentialAddress && { helperText: ' Residential Address is required ' })}
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
                      {...(errors.branch && { helperText: ' branch is required ' })}
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

export default EditGuardian
