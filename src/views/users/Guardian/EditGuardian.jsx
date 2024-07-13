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
import Typography from '@mui/material/Typography'

import { Alert, CircularProgress, MenuItem } from '@mui/material'
import { ButtonStyled } from '../../../@core/components/mui/button/ButtonStyledComponent'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateGuardianSchema } from 'src/@core/Formschema'

import { formatDateToYYYMMDDD } from '../../../@core/utils/format'
import { updateGuardian } from '../../../store/apps/guardian/asyncthunk'
import SearchStudent from './SearchStudent'
import { handleInputImageChange } from '../../../@core/utils/uploadImage'

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

const EditGuardian = ({ open, closeModal, fetchData, selectedGuardian }) => {

  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(`${backendURL?.replace('api', '')}/${selectedGuardian?.profilePicture}`)
  const [imageLinkPayload, setImageLinkPayload] = useState(null)
  const [itemsArray, setItemsArray] = useState([])
  const [openParentModal, setParentModal] = useState(false)


  const toggleParentModal = ()=> {
    closeModal()
    setParentModal(!openParentModal)
  }

  const defaultValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    
    // maritalStatus: '',
    phone: '',
    dateOfBirth: '',
    residentialAddress: '',
    gender: '',
    religion: '',
    ethnicity: '',
    relationship: ''
  }

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(updateGuardianSchema) })

  useEffect(()=>{
    if(selectedGuardian){
     selectedGuardian.firstName !== null ? setValue('firstName', selectedGuardian.firstName) : setValue('firstName', '')
     selectedGuardian.lastName !== null ? setValue('lastName', selectedGuardian.lastName) : setValue('lastName', '')
     selectedGuardian.middleName !== null ? setValue('middleName', selectedGuardian.middleName) : setValue('middleName', '')
     selectedGuardian.email !== null ? setValue('email', selectedGuardian.email) : setValue('email', '')
     selectedGuardian.phone !== null ? setValue('phone', selectedGuardian.phone) : setValue('phone', '')
     selectedGuardian.residentialAddress !== null ? setValue('residentialAddress', selectedGuardian.residentialAddress) : setValue('residentialAddress', '')
     selectedGuardian.gender !== null ? setValue('gender', selectedGuardian.gender) : setValue('gender', '')
     selectedGuardian.religion !== null ? setValue('religion', selectedGuardian.religion) : setValue('religion', '')
     selectedGuardian.ethnicity !== null ? setValue('ethnicity', selectedGuardian.ethnicity) : setValue('ethnicity', '')
     selectedGuardian.relationship !== null ? setValue('relationship', selectedGuardian.relationship) : setValue('relationship', '')

     selectedGuardian.dateOfBirth !== null ? setValue('dateOfBirth', new Date(selectedGuardian.dateOfBirth)) : setValue('dateOfBirth', '')
     
    }

    // eslint-disable-next-line 
  },[selectedGuardian])

   // Watch all input fields and track changes
   const watchedFields = watch()

  const onSubmit = async values => {
    // Monitor changed input fields so that only changed fields are submitted
    const changedFields = Object.entries(values).reduce((acc, [key, value]) => {
        if (value !== selectedGuardian[key]) {
          acc[key] = value
        }
  
        return acc
      }, {})
  
      
      const { dateOfBirth, ...restOfData } = changedFields
  
      const formattedDOB = (dateOfBirth !== '') ? formatDateToYYYMMDDD(dateOfBirth) : ''

 
  
      const payload = { 
        ...(imageLinkPayload ? { profilePicture: imageLinkPayload } : {}),
        ...(changedFields.hasOwnProperty('firstName') && { firstName: changedFields.firstName }),
      ...(changedFields.hasOwnProperty('lastName') && { lastName: changedFields.lastName }),
      ...(changedFields.hasOwnProperty('middleName') && { middleName: changedFields.middleName }),
      ...(changedFields.hasOwnProperty('email') && { email: changedFields.email }),
      ...(changedFields.hasOwnProperty('phone') && { phone: changedFields.phone }),
      ...(changedFields.hasOwnProperty('religion') && { religion: changedFields.religion }),
      ...(changedFields.hasOwnProperty('ethnicity') && { ethnicity: changedFields.ethnicity }),
      ...(changedFields.hasOwnProperty('dateOfBirth') && { dateOfBirth: formattedDOB }),
      ...(changedFields.hasOwnProperty('gender') && { gender: changedFields.gender }),
      ...(changedFields.hasOwnProperty('residentialAddress') && { residentialAddress: changedFields.residentialAddress }),
      ...(changedFields.hasOwnProperty('relationship') && { relationship: changedFields.relationship }),
         }


    updateGuardian(payload, selectedGuardian.email).then((response)=> {
            if (response?.data.success) {
                reset()
                closeModal()
                fetchData()
                setPreviewUrl('')
                setItemsArray([])
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

        <Grid item xs={12} sm={6} sx={{ mb: 6, ml: 6, display: 'flex', flexDirection: 'row', gap: '2rem' }}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    border: '3px dotted black',
                    borderRadius: 3,
                    p: 3,
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    <input
                      hidden
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={e => handleInputImageChange(e, setPreviewUrl, setSelectedImage, setImageLinkPayload)}
                      id='account-settings-upload-image'
                    />

                    <Icon icon='tabler:upload' fontSize='1.45rem' />
                  </ButtonStyled>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    Upload Student Image
                  </Typography>
                </Box>
              </Grid>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  alignItems: 'center',
                  alignSelf: 'center'
                }}
              >
                {previewUrl.includes('uploads') || previewUrl.includes('blob') &&
                <img
                  src={`${previewUrl}`}
                  width={120}
                  height={100}
                  
                  style={{ objectFit: 'cover', objectPosition: 'center', outline: 'none', borderColor: 'none' }}
                  alt=''
                />
              } 
              </Box>
            </Grid>

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
                      required
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

              {/* <Grid item xs={12} sm={6}>
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
              </Grid> */}

              {/* <Grid item xs={12} sm={6}>
                <Controller
                  name='maritalStatus'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Marital Status'
                      onChange={onChange}
                      id='stepper-linear-maritalStatus'
                      error={Boolean(errors.maritalStatus)}
                      aria-describedby='stepper-linear-maritalStatus-helper'
                      {...(errors.maritalStatus && { helperText: errors.maritalStatus.message})}
                    >
                      <MenuItem value='Single'>Single</MenuItem>
                      <MenuItem value='Married'>Married</MenuItem>
                      <MenuItem value='Divorced'>Divorced</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid> */}

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
                          {...(errors.dateOfBirth && { helperText: 'Date of Birth is required' })}
                        />
                      }
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
                      {...(errors.religion && { helperText: errors.religion.message})}
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

              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='relationship'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Relationship'
                      placeholder='Mother'
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.relationship)}
                      {...(errors.relationship && { helperText: errors.relationship.message })}
                    />
                  )}
                />
              </Grid>

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

            {itemsArray?.length > 0 && 
            <Grid item sx={{mt: 5}} xs={12} sm={12} md={12}>
              <Typography variant='h5'>Selected Students </Typography>
          <Alert severity='success'>  
          {itemsArray?.map((student, index) => (
                            <Fragment key={student.id}>
                              {index > 0 && ', '}
                              <span>{`${index + 1}. ${student?.firstName} ${student?.lastName}`}</span>
                            </Fragment>
                          ))}
           </Alert>
          </Grid>
          }
          </DialogContent>

         

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
          
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Update Guardian'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
    <SearchStudent itemsArray={itemsArray} setItemsArray={setItemsArray} openModal={openParentModal} closeModal={toggleParentModal} />
    </Fragment>
  )
}

export default EditGuardian
