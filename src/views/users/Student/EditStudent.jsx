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

import { CircularProgress, MenuItem } from '@mui/material'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateStudentSchema } from 'src/@core/Formschema'

import { formatDateToYYYMMDDD } from '../../../@core/utils/format'
import { updateStudent } from '../../../store/apps/Student/asyncthunk'
import SearchParent from './SearchParent'

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

const EditStudent = ({ open, closeModal, fetchData, selectedStudent }) => {
  const [itemsArray, setItemsArray] = useState([])
  const [openParentModal, setParentModal] = useState(false)

  const toggleParentModal = () => {
    closeModal()
    setParentModal(!openParentModal)
  }

  const defaultValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    residentialAddress: '',
    gender: '',
    religion: '',
    ethnicity: ''
  }

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(updateStudentSchema) })

  useEffect(() => {
    if (selectedStudent) {
      selectedStudent.firstName !== null ? setValue('firstName', selectedStudent.firstName) : setValue('firstName', '')
      selectedStudent.lastName !== null ? setValue('lastName', selectedStudent.lastName) : setValue('lastName', '')
      selectedStudent.middleName !== null
        ? setValue('middleName', selectedStudent.middleName)
        : setValue('middleName', '')
      selectedStudent.email !== null ? setValue('email', selectedStudent.email) : setValue('email', '')
      selectedStudent.phone !== null ? setValue('phone', selectedStudent.phone) : setValue('phone', '')
      selectedStudent.residentialAddress !== null
        ? setValue('residentialAddress', selectedStudent.residentialAddress)
        : setValue('residentialAddress', '')
      selectedStudent.gender !== null ? setValue('gender', selectedStudent.gender) : setValue('gender', '')
      selectedStudent.religion !== null ? setValue('religion', selectedStudent.religion) : setValue('religion', '')
      selectedStudent.ethnicity !== null ? setValue('ethnicity', selectedStudent.ethnicity) : setValue('ethnicity', '')

      setValue('dateOfBirth', new Date(selectedStudent.dateOfBirth))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent])

  // Watch all input fields and track changes
  const watchedFields = watch()

  const onSubmit = async values => {
    // Monitor changed input fields so that only changed fields are submitted
    const changedFields = Object.entries(values).reduce((acc, [key, value]) => {
      if (value !== selectedStudent[key]) {
        acc[key] = value
      }

      return acc
    }, {})

    const { dateOfBirth, ...restOfData } = changedFields

    const formattedDate = formatDateToYYYMMDDD(dateOfBirth)

    const parentIds = itemsArray.map(item => item.id)

    const payload = { dateOfBirth: formattedDate, ...restOfData, parentIds }

    updateStudent(payload, selectedStudent.id).then(response => {
      if (response.data.success) {
        reset()
        closeModal()
        fetchData()
      }
    })
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        open={open}
        maxWidth='md'
        scroll='body'
        
        //   TransitionComponent={Transition}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 750 } }}
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
                        required
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
                        required
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
                        {...(errors.email && { helperText: 'Email  is required ' })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                            label='Date of Birth *'
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

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='religion'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        value={value}
                        label='Religion'
                        onChange={onChange}
                        id='stepper-linear-religion'
                        error={Boolean(errors.religion)}
                        aria-describedby='stepper-linear-religion-helper'
                        {...(errors.religion && { helperText: errors.religion.message })}
                      >
                        <MenuItem value='Christianity'>Christianity</MenuItem>
                        <MenuItem value='Islam'>Islam</MenuItem>
                        <MenuItem value='Others'>Others</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name='ethnicity'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        label='Tribe'
                        placeholder='Enter Tribe'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.ethnicity)}
                        {...(errors.ethnicity && { helperText: errors.ethnicity.message })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: '10px' }}>
              <Button type='button' variant='outlined' onClick={toggleParentModal}>
                Select Guardian
              </Button>
              <Button type='submit' variant='contained' disabled={isSubmitting || itemsArray.length == 0}>
                {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Update Student'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      <SearchParent
        itemsArray={itemsArray}
        setItemsArray={setItemsArray}
        openModal={openParentModal}
        closeModal={toggleParentModal}
      />
    </Fragment>
  )
}

export default EditStudent
