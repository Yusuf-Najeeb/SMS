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
import Avatar from '@mui/material/Avatar'
import InputAdornment from '@mui/material/InputAdornment'

import { Card, CardContent, CircularProgress, Divider, MenuItem, Step, StepLabel, Stepper, Typography } from '@mui/material'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import StepperWrapper from 'src/@core/styles/mui/stepper'
import StepperCustomDot from '../../forms/form-wizard/StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createStudentSchema, guardianInfoSchema } from 'src/@core/Formschema'

// ** Hook Import
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

import { formatDateToYYYMMDDD } from '../../../@core/utils/format'
import { createStudent } from '../../../store/apps/Student/asyncthunk'
import SearchParent from './SearchParent'
import { ButtonStyled } from '../../../@core/components/mui/button/ButtonStyledComponent'
import { handleInputImageChange } from '../../../@core/utils/uploadImage'
import { studentSteps } from '../../../@core/FormSchema/utils'
import FormController from '../component/FormController'
import SelectedGuardianTable from './SelectedGuardianTable'
import { useClasses } from '../../../hooks/useClassess'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { useAppDispatch } from '../../../hooks'

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

const AddStudent = ({ open, closeModal, refetchData }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [itemsArray, setItemsArray] = useState([])
  const [openParentModal, setParentModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(``)
  const [imageLinkPayload, setImageLinkPayload] = useState('')
  const [guardianArray, setGuardianArray] = useState([])
  const [selectedGuardianId, setSelectedGuardianId] = useState(0)

  const toggleParentModal = ()=> {
    closeModal()
    setParentModal(!openParentModal)
  }

  const defaultValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    residentialAddress: '',
    gender: '',
    religion: '',
    ethnicity: '',
    currentClassId: ''
  }

  const defaultGuardianInfoValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    residentialAddress: ''
  }

  // ** Hooks & Var
  const dispatch = useAppDispatch()
  const { settings } = useSettings()
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const { direction } = settings
  const [ClassesList] = useClasses()

  useEffect(() => {
    dispatch(fetchClasses({page: 1, limit: 300, key: ''}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    control,
    setValue,
    reset: personalInfoReset,
    handleSubmit: handlePersonalSubmit,
    getValues: getPersonalInfoValues,
    formState: { errors, isSubmitting, isValid: personalValuesValid }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(createStudentSchema) })

  const {
    reset: guardianInfoReset,
    control: guardianInfoControl,
    handleSubmit: handleGuardianInfoSubmit,
    formState: { errors: guardianInfoErrors , isValid: guardianValuesValid},
    getValues: getGuardianInfoValues
  } = useForm({
    defaultValues: defaultGuardianInfoValues,
    resolver: yupResolver(guardianInfoSchema)
  })

  const handleAddGuardian = () => {
    
    const email = getGuardianInfoValues('email');
    const firstName = getGuardianInfoValues('firstName');
    const lastName = getGuardianInfoValues('lastName');
    const gender = getGuardianInfoValues('gender');
    const phone = getGuardianInfoValues('phone');
    const residentialAddress = getGuardianInfoValues('residentialAddress');

    if ( email && firstName && lastName && gender && phone && residentialAddress) {

      const id = setSelectedGuardianId((prevId) => prevId + 1)

      const newItem = {
        id,
        email,
        firstName,
        lastName,
        gender,
        phone,
        residentialAddress
      };

      setGuardianArray((prevItems) => [...prevItems, newItem]);
      
    } else {
      
    }
  };

     // Handle Stepper
     const handleBack = () => {
      if(activeStep !== 0){
        setActiveStep(prevActiveStep => prevActiveStep - 1)
      }
  
      return null
    }
  
    const handleForward =  () => {
        switch (activeStep) {
          case 0:
            // Check for errors in the first step (Personal Info)
            if (personalValuesValid) {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
            break;
          default:
            console.log('eeeee')
            break;
        }
      } 

      const handleReset = ()=> {
        setActiveStep(0)
        personalInfoReset()
        guardianInfoReset()
      }

  const onSubmit = async values => {

    // Retrieve form values
    const personalInfoValues = getPersonalInfoValues();

    const { dateOfBirth, currentClassId,  ...restOfData } = personalInfoValues
    const formattedDate = formatDateToYYYMMDDD(dateOfBirth)

    const parentIds = itemsArray.map(item => item.id);


    const personalInformation = { dateOfBirth: formattedDate, profilePicture: imageLinkPayload, currentClassId: Number(currentClassId),  ...restOfData, parentIds }

    const guardianData = guardianArray.length ?  guardianArray.map((item)=> {
      const {id, ...restOfData} = item

      return restOfData;
    }) : []
    
    const payload = {personalInformation, guardianData: guardianData}
    

    console.log(payload, 'payload')

         createStudent(payload).then((response)=> {
            if (response.data.success) {
                personalInfoReset()
                closeModal()
                refetchData()
              }
         })

  }

  const getStepContent = step => {
    switch (step) {
      case 0:

  return (

      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
         <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {studentSteps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {studentSteps[0].subtitle}
                </Typography>
              </Grid>
    

        <Grid item xs={12} sm={6} sx={{ mb: 6, ml: 6, mt: 6, display: 'flex', flexDirection: 'row', gap: '2rem' }}>
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
                {selectedImage &&
                <img
                  src={`${previewUrl}`}
                  width={120}
                  height={100}
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  alt='student image'
                /> }
              </Box>
            </Grid>

        <form onSubmit={handlePersonalSubmit(handleForward)}>
         
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
                      placeholder='Enter First Name'
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
              <Grid item xs={12} sm={12} md={4}>
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
              <Grid item xs={12} sm={12} md={4}>
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
              <Grid item xs={12} sm={4}>
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
                      onChange={onChange}
                      id='auth-login-v2-password'
                      placeholder='Enter Password'
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

              <Grid item xs={12} sm={4}>
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


              <Grid item xs={12} sm={12} md={4}>
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

              <Grid item xs={12} sm={12} md={4}>
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

              <Grid item xs={12} sm={4}>
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

              <Grid item xs={12} sm={12} md={4}>
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

              <Grid item xs={12} sm={12} md={4}>
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

              <Grid item xs={12} sm={4} md={4}>
                <Controller
                  name='currentClassId'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Class'
                      onChange={onChange}
                      id='stepper-linear-personal-currentClassId'
                      error={Boolean(errors.currentClassId)}
                      aria-describedby='stepper-linear-personal-currentClassId-helper'
                      {...(errors.currentClassId && { helperText: errors.currentClassId.message })}
                    >
                        <MenuItem value=''>Select Class</MenuItem>
                        {ClassesList?.map((item)=> {
                            return (
                                <MenuItem key={item.id} value={item.id} sx={{textTransform: 'uppercase'}}>{`${item.name.toUpperCase()}`}</MenuItem>
                            )
                        })}
                      
                    </CustomTextField>
                  )}
                />
              </Grid>
              
            </Grid>


          {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>

          <Button type='button' variant='outlined' onClick={toggleParentModal}>
              Select Guardian
            </Button>
            <Button type='submit' variant='contained' disabled={isSubmitting || itemsArray.length == 0}>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Add Student'}
            </Button>
          </Box> */}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: '30px' }}>
                <Button variant='tonal' color='secondary' onClick={handleBack}>
                  Back
                </Button>

                <Button type='button' variant='outlined' onClick={toggleParentModal}>
              Select Guardian
            </Button>


                <Button type='submit' variant='contained'   >
                  Next
                </Button>
              </Grid>
        </form>
      
    {/* <SearchParent itemsArray={itemsArray} setItemsArray={setItemsArray} openModal={openParentModal} closeModal={toggleParentModal} /> */}
    </Box>
  )

  case 1:
        return (

          <form key={1} onSubmit={handleGuardianInfoSubmit(onSubmit)} >
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {studentSteps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {studentSteps[1].subtitle}
                </Typography>
              </Grid>


              <Grid item xs={12} sm={4}>
                <FormController name='firstName' control={guardianInfoControl} requireBoolean={false} label="Guardian's First Name" error={guardianInfoErrors['firstName']} errorMessage={guardianInfoErrors.firstName?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='lastName' control={guardianInfoControl} requireBoolean={true} label="Guardian's Last Name" error={guardianInfoErrors['lastName']} errorMessage={guardianInfoErrors.lastName?.message} />
              </Grid>

              

              <Grid item xs={12} sm={4}>
              <FormController name='phone' control={guardianInfoControl} requireBoolean={true} label="Guardian's Phone Number" error={guardianInfoErrors['phone']} errorMessage={guardianInfoErrors.phone?.message} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name='email'
                  control={guardianInfoControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label="Guardian's Email"
                      placeholder='guardian@email.com'
                      value={value}
                      onChange={onChange}
                      error={Boolean(guardianInfoErrors.email)}
                      {...(guardianInfoErrors.email && { helperText: guardianInfoErrors.email.message})}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='gender'
                  control={guardianInfoControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label="Guardian's Gender"
                      onChange={onChange}
                      id='stepper-linear-personal-gender'
                      error={Boolean(guardianInfoErrors.gender)}
                      aria-describedby='stepper-linear-personal-gender-helper'
                      {...(guardianInfoErrors.gender && { helperText: guardianInfoErrors.gender.message })}
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={5}>
                <Controller
                  name='residentialAddress'
                  control={guardianInfoControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      rows={2}
                      multiline
                      label="Guardian's Residential Address"
                      placeholder='24, sch ave, Lagos'
                      value={value}
                      onChange={onChange}
                      error={Boolean(guardianInfoErrors.residentialAddress)}
                      {...(guardianInfoErrors.residentialAddress && { helperText: guardianInfoErrors.residentialAddress.message})}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={2} sx={{mt: 4}}>
                <IconButton size='large' sx={{ justifySelf: 'flex-end', fontSize: '50px' }} onClick={handleAddGuardian}>
                  <Icon icon='basil:add-outline'  />
                </IconButton>
              </Grid>

              <SelectedGuardianTable tableData={guardianArray} updateTable={setGuardianArray} />


              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                
                <Button variant='tonal' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained' >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        )
    }
  }

  const renderContent = () => {
    if (activeStep === studentSteps.length) {
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
      return getStepContent(activeStep)
    }
  }

  return (
    <Fragment>
    <Dialog
    fullWidth
    open={open}
    maxWidth='md'
    scroll='body'
    onClose={closeModal}

    sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '95%', maxWidth: 990 } }}
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
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper
            activeStep={activeStep}
            connector={
              !smallScreen ? <Icon icon={direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'} /> : null
            }
          >
            {studentSteps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar
              const labelProps = {}
              if (index === activeStep) {
                labelProps.error = false
                if (
                  (
                    errors.lastName ||
                    errors.firstName ||
                    errors.dateOfBirth ||

                    errors.gender 
                     &&
                  activeStep === 0 )
                ) {
                  labelProps.error = true
                } 
                else {
                  labelProps.error = false
                }
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                    <div className='step-label'>
                      <RenderAvatar
                        variant='rounded'
                        {...(activeStep >= index && { skin: 'light' })}
                        {...(activeStep === index && { skin: 'filled' })}
                        {...(activeStep >= index && { color: 'primary' })}
                        sx={{
                          ...(activeStep === index && { boxShadow: theme => theme.shadows[3] }),
                          ...(activeStep > index && { color: theme => hexToRGBA(theme.palette.primary.main, 0.4) })
                        }}
                      >
                        <Icon icon={step.icon} />
                      </RenderAvatar>
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
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <CardContent>{renderContent()}</CardContent>
    </Card>
    </DialogContent>
    </Dialog>

    <SearchParent itemsArray={itemsArray} setItemsArray={setItemsArray} openModal={openParentModal} closeModal={toggleParentModal} />

    </Fragment>
  )


}

export default AddStudent
