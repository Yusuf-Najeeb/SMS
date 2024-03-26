import { Fragment, forwardRef, useEffect, useState } from 'react'

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

import { Alert, CircularProgress, MenuItem, Typography } from '@mui/material'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateApplicantSchema } from 'src/@core/Formschema'

import { formatDateToYYYMMDDD } from '../../../@core/utils/format'
import { updateApplicant } from '../../../store/apps/applicants/asyncthunk'

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

export const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const defaultValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    title: '',
    phone: '',
    dateOfBirth: '',
    identificationNumber: '',
    residentialAddress: '',
    gender: '',

    // branch: '',
    className: '',
  }

const EditApplicant = ({ open, closeModal, refetchData, apllicantToEdit }) => {

  const {
    control,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(updateApplicantSchema) })

  // Watch all input fields and track changes
  const watchedFields = watch()

  const onSubmit = async values => {

    // Monitor changed input fields so that only changed fields are submitted
    const changedFields = Object.entries(values).reduce((acc, [key, value]) => {
        if (value !== apllicantToEdit[key]) {
          acc[key] = value
        }
  
        return acc
      }, {})

    const { dateOfBirth } = changedFields
    const formattedDOB = (dateOfBirth !== '') ? formatDateToYYYMMDDD(dateOfBirth) : ''


    const payload = {
        ...(changedFields.hasOwnProperty('firstName') && { firstName: changedFields.firstName }),
        ...(changedFields.hasOwnProperty('lastName') && { lastName: changedFields.lastName }),
        ...(changedFields.hasOwnProperty('middleName') && { middleName: changedFields.middleName }),
        ...(changedFields.hasOwnProperty('email') && { email: changedFields.email }),
        ...(changedFields.hasOwnProperty('phone') && { phone: changedFields.phone }),

        // ...(changedFields.hasOwnProperty('branch') && { branch: changedFields.branch }),
        ...(changedFields.hasOwnProperty('title') && { title: changedFields.title }),
        ...(changedFields.hasOwnProperty('className') && { className: changedFields.className }),
        ...(changedFields.hasOwnProperty('identificationNumber') && { identificationNumber: changedFields.identificationNumber }),
        ...(changedFields.hasOwnProperty('dateOfBirth') && { dateOfBirth: formattedDOB }),
        ...(changedFields.hasOwnProperty('gender') && { gender: changedFields.gender }),
        ...(changedFields.hasOwnProperty('residentialAddress') && { residentialAddress: changedFields.residentialAddress }),
    }

    

    updateApplicant(payload, apllicantToEdit.email).then((response)=> {
            if (response?.data.success) {
                reset()
                closeModal()
                refetchData()
              }
         })

  }

  useEffect(() => {
    if (apllicantToEdit !== null) {
      setValue('firstName', apllicantToEdit.firstName)
      setValue('lastName', apllicantToEdit.lastName)
      apllicantToEdit.middleName !== null ? setValue('middleName', apllicantToEdit.middleName) : setValue('middleName', '')
      setValue('email', apllicantToEdit.email)
      apllicantToEdit.title !== null ? setValue('title', apllicantToEdit.title) : setValue('title', '')
      setValue('phone', apllicantToEdit.phone)

    //   setValue('branch', apllicantToEdit.branch)
      setValue('identificationNumber', apllicantToEdit.identificationNumber)
      setValue('residentialAddress', apllicantToEdit.residentialAddress)
      setValue('className', apllicantToEdit.className)
      setValue('gender', apllicantToEdit.gender)
      setValue('dateOfBirth', new Date(apllicantToEdit.dateOfBirth))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apllicantToEdit])

  return (

    <Fragment> 
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'

      //   TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 990 } }}
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
              <Grid item xs={12} sm={12} md={4}>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='First Name'
                      required
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.firstName)}
                      {...(errors.firstName && { helperText: 'First name is required ' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Last Name'
                      required
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.lastName)}
                      {...(errors.lastName && { helperText: 'Last name is required ' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Controller
                  name='middleName'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Middle Name'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.middleName)}
                      {...(errors.middleName && { helperText: 'Middle name is required ' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Email'
                      required
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: 'Email  is required ' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Phone Number'
                      value={value}
                      required
                      onChange={onChange}
                      error={Boolean(errors.phone)}
                      {...(errors.phone && { helperText: errors.phone.message })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4}>
                <Controller
                  name='gender'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      required
                      label='Gender'
                      onChange={onChange}
                      id='stepper-linear-personal-gender'
                      error={Boolean(errors.gender)}
                      aria-describedby='stepper-linear-personal-gender-helper'
                      {...(errors.gender && { helperText: errors.gender.message })}
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

             

              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='identificationNumber' 
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Applicant Identification Number'
                      value={value}
                      required
                      onChange={onChange}
                      error={Boolean(errors.identificationNumber)}
                      {...(errors.identificationNumber && { helperText: errors.identificationNumber.message })}
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
                      {...(errors.title && { helperText: errors.title.message})}
                    >
                      <MenuItem value='MR'>Mr</MenuItem>
                      <MenuItem value='Miss'>Miss</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='className'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Class'
                      placeholder='SS 1'
                      value={value}
                      required
                      onChange={onChange}
                      error={Boolean(errors.className)}
                      {...(errors.className && { helperText: errors.className.message })}
                    />
                  )}
                />
              </Grid>

              {/* <Grid item xs={12} sm={12} md={4}>
                <Controller
                  name='branch'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='School Branch'
                      placeholder='Lagos'
                      value={value}
                      required
                      onChange={onChange}
                      error={Boolean(errors.branch)}
                      {...(errors.branch && { helperText: errors.branch.message })}
                    />
                  )}
                />
              </Grid> */}

              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name='residentialAddress'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      rows={2}
                      multiline
                      fullWidth
                      required
                      label='Residential Address'
                      placeholder='Enter Address'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.residentialAddress)}
                      {...(errors.residentialAddress && { helperText: errors.residentialAddress.message })}
                    />
                  )}
                />
              </Grid>
              
            </Grid>


          </DialogContent>


         

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: '10px' }}>
          
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Update'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
    </Fragment>
  )
}

export default EditApplicant
