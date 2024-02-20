// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiStep from '@mui/material/Step'
import InputAdornment from '@mui/material/InputAdornment'

import { ButtonStyled } from '../../../@core/components/mui/button/ButtonStyledComponent'


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports

import StepperCustomDot from '../../forms/form-wizard/StepperCustomDot'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import { CustomInput } from '../Guardian/AddGuardian'

// ** Hook Import
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import {  Dialog, DialogContent } from '@mui/material'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// React Hook Form Schema
import { personalInfoSchema , workInfoSchema, nextOfKinSchema, medicalSchema} from 'src/@core/Formschema'


// ** Custom Components Imports

import FormController from '../component/FormController'
import SubmitSpinnerMessage from '../component/SubmitSpinnerMessage'

// React Hook Form Utilities
import { defaultNextOfKinValues, defaultPersonalValues, defaultWorkInfoValues, defaultMedicalValues } from '../../../@core/FormSchema/formDefaultvalues'



// Others
import { notifyWarn } from '../../../@core/components/toasts/notifyWarn'
import { formatDateToYYYMMDDD, formatFirstLetter } from '../../../@core/utils/format'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'

import { uploadImage } from '../../../store/apps/upload'

import { steps } from '../../../@core/FormSchema/utils'



import { createStaff } from '../../../store/apps/staff/asyncthunk'
import { handleInputImageChange } from '../../../@core/utils/uploadImage'


const CustomCloseButton = styled(IconButton)(({ theme }) => ({
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

const Step = styled(MuiStep)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  '&:first-of-type': {
    paddingLeft: 0
  },
  '&:last-of-type': {
    paddingRight: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed + svg': {
    color: theme.palette.primary.main
  },
  [theme.breakpoints.down('md')]: {
    padding: 0,
    ':not(:last-of-type)': {
      marginBottom: theme.spacing(6)
    }
  }
}))

const AddStaff = ({open, closeModal, refetchStaffs}) => {


  // ** States
  const [activeStep, setActiveStep] = useState(0)
  const [openDepartmentsModal, setOpenDepartmentsModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [imageLinkPayload, setImageLinkPayload] = useState('')
  const [refetch, setFetch] = useState(false)
  const [staffRole, setStaffRole] = useState('')




  const [state, setState] = useState({
    password: '',
    showPassword: false,
  })

  // ** Hooks & Var
  const { settings } = useSettings()
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const { direction } = settings

   // ** Form Hooks

   const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors , isValid: personalValuesValid},
    getValues: getPersonalValues
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalInfoSchema)
  })

//   const {
//     reset: medicalReset,
//     control: medicalControl,
//     handleSubmit: handleMedicalSubmit,
//     formState: { errors: medicalErrors , isValid: medicalValuesValid},
//     getValues: getMedicalValues
//   } = useForm({
//     defaultValues: defaultMedicalValues,
//     resolver: yupResolver(medicalSchema)
//   })


  const {
    reset: workInfoReset,
    control: workInfoControl,
    handleSubmit: handleWorkInfoSubmit,
    formState: { errors: workInfoErrors , isValid: workValuesValid},
    getValues: getWorkInfoValues
  } = useForm({
    defaultValues: defaultWorkInfoValues,
    resolver: yupResolver(workInfoSchema)
  })

  const {
    reset: nextofKinReset,
    control: nextOfKinControl,
    handleSubmit: handleNextOfKinSubmit,
    formState: { errors: nextOfKinErrors, isSubmitting},
    getValues: getNextOfKinValues
  } = useForm({
    defaultValues: defaultNextOfKinValues,
    resolver: yupResolver(nextOfKinSchema)
  })

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
        case 1:
          // Check for errors in the second step (Work Info)
          if (workValuesValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
          break;
        default:
          console.log('eeeee')
          break;
      }
    } 

    const handleReset = () => {
        setPreviewUrl(null)
        setActiveStep(0)
        setStaffRole('')
        nextofKinReset({ nameOfRefereeOne: '', addressOfRefereeOne: '', phoneOfRefereeOne: '', phoneOfRefereeTwo: '', nextOfKinName: '', nextOfKinAddress: '',
         emergencyPhone: '', nameOfRefereeTwo: '', addressOfRefereeTwo: '', emailOfRefereeOne: '', emailOfRefereeTwo: '', relationship: ''  })
        workInfoReset({ qualification: '', department_section: '', previousWorkExperience: '', institutionAttended: '',  specialization: '', accountNumber: '', 
        basicSalary: '' , mealAllowance: '', transportAllowance: '', domesticAllowance: '', furnitureAllowance: '', SalaryArrears: '',rentAllowance: '',
          bankName: '', branch: '', role: '', staffDescription: ''})
        personalReset({  email: '', firstName: '', lastName: '', middleName: '', title: '', phone: '', dateOfBirth: '',
        password: '', residentialAddress: '', maritalStatus: '', gender: '', city: '', state: '', lga: '', religion: '',  })

        // medicalReset({  drugAllergies: '', foodAllergies: '', genotype: '', bloodGroup: '', previousSurgery: '', healthStatus: '' })
      }
    
    
      const onSubmitAllInfo = async () => {
    
        // Retrieve form values
        const employmentInfoValues = getWorkInfoValues();
        const personalInfoValues = getPersonalValues();
        const nextOfKinInformation = getNextOfKinValues();

        const {dateOfBirth, ...restData} = personalInfoValues
        const formattedDate = formatDateToYYYMMDDD(dateOfBirth)
        const personalInformation = {dateOfBirth: formattedDate, profilePicture: imageLinkPayload, ...restData}

        const {role, basicSalary, rentAllowance, furnitureAllowance, transportAllowance,mealAllowance, domesticAllowance, SalaryArrears, dateOfEmployment, ...restOfData} = employmentInfoValues
        const formattedDateOfEmployment = formatDateToYYYMMDDD(dateOfEmployment)

        const formattedBasicSalary = Number(basicSalary)
        const formattedRentAllowance = Number(rentAllowance)
        const formattedFurnitureAllowance = Number(furnitureAllowance)
        const formattedTransportAllowance = Number(transportAllowance)
        const formattedMealAllowance = Number(mealAllowance)
        const formattedDomesticAllowance = Number(domesticAllowance)
        const formattedSalaryArrears = Number(SalaryArrears)

        const employmentInformation = {
            basicSalary: formattedBasicSalary, rentAllowance: formattedRentAllowance,
            furnitureAllowance: formattedFurnitureAllowance, transportAllowance: formattedTransportAllowance,
            mealAllowance: formattedMealAllowance, domesticAllowance: formattedDomesticAllowance,
            SalaryArrears: formattedSalaryArrears, dateOfEmployment: formattedDateOfEmployment,
            ...restOfData}
    
        const payload = {personalInformation, 
          employmentInformation, 
          nextOfKinInformation, 
          
        }

        createStaff(staffRole, payload).then((res)=> {
            if(res.data.success){
                notifySuccess('Added Staff')
                handleReset()
                setActiveStep(0)
                closeModal()
                refetchStaffs()
            }
        })
      } 

  // Handle Password
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }


  const updateFetch = () => setFetch(!refetch)

  const toggleDepartmentsModal = ()=> {
    setOpenDepartmentsModal(!openDepartmentsModal)
  }



  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ mb: 6, display: 'flex', flexDirection: 'row', gap: '2rem' }}
        >
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
                  onChange={(e)=> handleInputImageChange(e, setPreviewUrl, setSelectedImage, setImageLinkPayload)}
                  id='account-settings-upload-image'
                />

                <Icon icon='tabler:upload' fontSize='1.45rem' />
              </ButtonStyled>
              <Typography variant='body2' sx={{ mt: 2 }}>
                Upload Staff Image
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
           {selectedImage && <img src={`${previewUrl}`} width={120} height={100} style={{objectFit: 'cover', objectPosition: 'center'}} alt='staff image' /> }
          </Box>
        </Grid>
        
          <form key={0} onSubmit={handlePersonalSubmit(handleForward)} >
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='firstName' control={personalControl} requireBoolean={true} required={true} label="First Name" error={personalErrors['firstName']} errorMessage={personalErrors.firstName?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='lastName' control={personalControl} requireBoolean={true} required={true} label="Last Name" error={personalErrors['lastName']} errorMessage={personalErrors.lastName?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='middleName' control={personalControl} requireBoolean={true}  label="Middle Name" error={personalErrors['middleName']} errorMessage={personalErrors?.middleName?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='email' control={personalControl} requireBoolean={true} required={true} label="Email" error={personalErrors['email']} errorMessage={personalErrors?.email?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='phone' control={personalControl} requireBoolean={true} required={true} label="Phone" error={personalErrors['phone']} errorMessage={personalErrors.phone?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='password'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Password'
                      required
                      onChange={onChange}
                      id='stepper-linear-account-password'
                      error={Boolean(personalErrors.password)}
                      type={state.showPassword ? 'text' : 'password'}
                      {...(personalErrors.password && { helperText: personalErrors.password.message })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <Icon fontSize='1.25rem' icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4} >
              <Controller
                  name='dateOfBirth'
                  control={personalControl}
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
                          error={Boolean(personalErrors.dateOfBirth)}
                          {...(personalErrors.dateOfBirth && { helperText: personalErrors.dateOfBirth.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='residentialAddress' control={personalControl} requireBoolean={true} label="Residential Address" error={personalErrors['residentialAddress']} errorMessage={personalErrors.address?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='gender'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Gender'
                      required
                      onChange={onChange}
                      id='stepper-linear-personal-gender'
                      error={Boolean(personalErrors.gender)}
                      aria-describedby='stepper-linear-personal-gender-helper'
                      {...(personalErrors.gender && { helperText: personalErrors.gender.message })}
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='maritalStatus'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Marital Status'
                      onChange={onChange}
                      id='stepper-linear-personal-maritalStatus'
                      error={Boolean(personalErrors.maritalStatus)}
                      aria-describedby='stepper-linear-personal-maritalStatus-helper'
                      {...(personalErrors.maritalStatus && { helperText: personalErrors.maritalStatus.message })}
                    >
                      <MenuItem value='Single'>Single</MenuItem>
                      <MenuItem value='Married'>Married</MenuItem>
                      <MenuItem value='Others'>Others</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='title'
                  control={personalControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Title'
                      required
                      onChange={onChange}
                      id='stepper-linear-personal-title'
                      error={Boolean(personalErrors.title)}
                      aria-describedby='stepper-linear-personal-title-helper'
                      {...(personalErrors.title && { helperText: personalErrors.title.message })}
                    >
                      <MenuItem value='Mr'>Mr</MenuItem>
                      <MenuItem value='Mrs'>Mrs</MenuItem>
                      <MenuItem value='Miss'>Miss</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

               <Grid item xs={12} sm={4}>
              <FormController name='city' control={personalControl} requireBoolean={true} label="Current City of Residence" error={personalErrors['city']} errorMessage={personalErrors.city?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='state' control={personalControl} requireBoolean={true} label="State of Origin" error={personalErrors['state']} errorMessage={personalErrors.state?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='lga' control={personalControl} requireBoolean={true} required={true} label="Local Government of Origin" error={personalErrors['lga']} errorMessage={personalErrors.lga?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='religion' control={personalControl} requireBoolean={true} label="Religion" error={personalErrors['religion']} errorMessage={personalErrors.religion?.message} />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <FormController name='staffDescription' control={personalControl} required={true} requireBoolean={false} label="Staff Role Description" error={personalErrors['staffDescription']} errorMessage={personalErrors.staffDescription?.message} />
              </Grid> */}

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='tonal' color='secondary' onClick={handleBack}>
                  Back
                </Button>


                <Button type='submit' variant='contained'   >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
          </Box>
        )
        
      case 1:
        return (

          <form key={1} onSubmit={handleWorkInfoSubmit(handleForward)} >

          {/* <form key={1} > */}
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name='role'
                  control={workInfoControl}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      required
                      value={value}
                      label='Role'
                      onChange={(e) => {
                        onChange(e) 
                        setStaffRole(e.target.value)
                      }
                    }
                      id='stepper-linear-personal-role'
                      error={Boolean(workInfoErrors.role)}
                      aria-describedby='stepper-linear-personal-role-helper'
                      {...(workInfoErrors.role && { helperText: workInfoErrors.role.message })}
                    >
                      <MenuItem value='super-admin'>Super Admin</MenuItem>
                      <MenuItem value='admin'> Admin</MenuItem>
                      <MenuItem value='teacher'> Teacher</MenuItem>
                      <MenuItem value='librarian'>Librarian</MenuItem>
                      <MenuItem value='accountant'>Accountant</MenuItem>
                      <MenuItem value='house-master'>House Master</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='staffDescription' control={workInfoControl} required={true} requireBoolean={false} label="Staff Role Description" error={workInfoErrors['staffDescription']} errorMessage={workInfoErrors.staffDescription?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='qualification' control={workInfoControl} requireBoolean={true} required={true} label="Academic Qualification" error={workInfoErrors['qualification']} errorMessage={workInfoErrors.qualification?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='institutionAttended' control={workInfoControl} requireBoolean={true} label="Tertiary Institution Attended" error={workInfoErrors['institutionAttended']} errorMessage={workInfoErrors.institutionAttended?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='department_section' control={workInfoControl} requireBoolean={true} label="Department" error={workInfoErrors['department_section']} errorMessage={workInfoErrors.department_section?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='specialization' control={workInfoControl} requireBoolean={false} label="Specialization" error={workInfoErrors['specialization']} errorMessage={workInfoErrors.specialization?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='previousWorkExperience' control={workInfoControl} requireBoolean={true} label="Previous Work Experience" error={workInfoErrors['previousWorkExperience']} errorMessage={workInfoErrors.previousWorkExperience?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='basicSalary' control={workInfoControl} requireBoolean={true} label="Basic Salary" error={workInfoErrors['basicSalary']} errorMessage={workInfoErrors.basicSalary?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='mealAllowance' control={workInfoControl} requireBoolean={true} label="Meal Allowance" error={workInfoErrors['mealAllowance']} errorMessage={workInfoErrors.mealAllowance?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='transportAllowance' control={workInfoControl} requireBoolean={true} label="Transport Allowance" error={workInfoErrors['transportAllowance']} errorMessage={workInfoErrors?.transportAllowance?.message} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormController name='domesticAllowance' control={workInfoControl} requireBoolean={true} label="Domestic Allowance" error={workInfoErrors['domesticAllowance']} errorMessage={workInfoErrors?.domesticAllowance?.message} />
            </Grid>

            <Grid item xs={12} sm={4}>
                <FormController name='furnitureAllowance' control={workInfoControl} requireBoolean={true} label="Furniture Allowance" error={workInfoErrors['furnitureAllowance']} errorMessage={workInfoErrors?.furnitureAllowance?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='SalaryArrears' control={workInfoControl} requireBoolean={true} label="Salary Arrears" error={workInfoErrors['SalaryArrears']} errorMessage={workInfoErrors?.SalaryArrears?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='rentAllowance' control={workInfoControl} requireBoolean={true} label="Rent Allowance" error={workInfoErrors['rentAllowance']} errorMessage={workInfoErrors?.rentAllowance?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='accountNumber' control={workInfoControl} requireBoolean={true} required={true} label="Account Number" error={workInfoErrors['accountNumber']} errorMessage={workInfoErrors?.accountNumber?.message} />
              </Grid>

              <Grid item xs={12} sm={4} >
              <Controller
                  name='dateOfEmployment'
                  control={workInfoControl}
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
                          error={Boolean(workInfoErrors.dateOfEmployment)}
                          {...(workInfoErrors.dateOfEmployment && { helperText: workInfoErrors.dateOfEmployment.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
              <FormController name='bankName' control={workInfoControl} requireBoolean={true} label="Bank Name" error={workInfoErrors['bankName']} errorMessage={workInfoErrors?.bankName?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='branch' control={workInfoControl} requireBoolean={true} label="School Branch" error={workInfoErrors['branch']} errorMessage={workInfoErrors?.branch?.message} />
              </Grid>



              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                
                <Button variant='tonal' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained' >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        )

        // case 2:
        // return (
        //   <form key={2} onSubmit={handleMedicalSubmit(handleForward)}>
        //     <Grid container spacing={5}>
        //       <Grid item xs={12}>
        //         <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
        //           {steps[2].title}
        //         </Typography>
        //         <Typography variant='caption' component='p'>
        //           {steps[2].subtitle}
        //         </Typography>
        //       </Grid>
        //       <Grid item xs={12} sm={4}>
        //         <FormController name='drugAllergies' control={medicalControl} requireBoolean={true} label="Drug Allergies" error={medicalErrors['drugAllergies']} errorMessage={medicalErrors?.drugAllergies?.message} />
        //       </Grid>
        //       <Grid item xs={12} sm={4}>
        //         <FormController name='foodAllergies' control={medicalControl} requireBoolean={true} label="Food Allergies" error={medicalErrors['foodAllergies']} errorMessage={medicalErrors?.foodAllergies?.message} />
        //       </Grid>
        //       <Grid item xs={12} sm={4}>
        //       <FormController name='genotype' control={medicalControl} required={true} requireBoolean={true} label="Genotype" error={medicalErrors['genotype']} errorMessage={medicalErrors?.genotype?.message} />
        //       </Grid>
              
        //       <Grid item xs={12} sm={4}>
        //          <FormController name='bloodGroup' control={medicalControl} required={true} requireBoolean={true} label="Blood Group" error={medicalErrors['bloodGroup']} errorMessage={medicalErrors?.bloodGroup?.message} />
        //       </Grid>

        //       <Grid item xs={12} sm={4}>
        //         <FormController name='previousSurgery' control={medicalControl} requireBoolean={true} label="Previous Surgery" error={medicalErrors['previousSurgery']} errorMessage={medicalErrors?.previousSurgery?.message} />

        //       </Grid>

        //       <Grid item xs={12} sm={4}>
        //         <FormController name='healthStatus' control={medicalControl} required={true} requireBoolean={true} label="Health Status" error={medicalErrors['healthStatus']} errorMessage={medicalErrors?.healthStatus?.message} />
        //       </Grid>

        //       <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        //         <Button variant='tonal' color='secondary' onClick={handleBack}>
        //           Back
        //         </Button>
        //         <Button type='submit' variant='contained' >
        //           Next
        //         </Button>
        //       </Grid>
        //     </Grid>
        //   </form>
        // )
      case 2:
        return (
          <form key={2} onSubmit={handleNextOfKinSubmit(onSubmitAllInfo)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[2].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[2].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
              <FormController name='nextOfKinName' control={nextOfKinControl} requireBoolean={true} required={true} label="Next Of Kin's Name" error={nextOfKinErrors['nextOfKinName']} errorMessage={nextOfKinErrors?.nextOfKinName?.message} />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                 <FormController name='nextOfKinAddress' control={nextOfKinControl} requireBoolean={true} label="Next Of Kin's Address" error={nextOfKinErrors['nextOfKinAddress']} errorMessage={nextOfKinErrors?.nextOfKinAddress?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='relationship'  control={nextOfKinControl} requireBoolean={true} label="Relationship" error={nextOfKinErrors['relationship']} errorMessage={nextOfKinErrors?.relationship?.message} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormController name='emergencyPhone' required={true} control={nextOfKinControl} requireBoolean={true} label="Emergency Phone Number" error={nextOfKinErrors['emergencyPhone']} errorMessage={nextOfKinErrors?.emergencyPhone?.message} />
              </Grid>

           
              <Grid item xs={12} sm={4}>
                <FormController name='nameOfRefereeOne' control={nextOfKinControl}  requireBoolean={true} label="Name of Referee One" error={nextOfKinErrors['nameOfRefereeOne']} errorMessage={nextOfKinErrors?.nameOfRefereeOne?.message} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController name='addressOfRefereeOne' control={nextOfKinControl} requireBoolean={true} label="Address of Referee One" error={nextOfKinErrors['addressOfRefereeOne']} errorMessage={nextOfKinErrors?.addressOfRefereeOne?.message} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController name='emailOfRefereeOne' control={nextOfKinControl} requireBoolean={true} label="Email of Referee One" error={nextOfKinErrors['emailOfRefereeOne']} errorMessage={nextOfKinErrors?.emailOfRefereeOne?.message} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController name='phoneOfRefereeOne' control={nextOfKinControl} requireBoolean={true} label="Phone Number of Referee One" error={nextOfKinErrors['phoneOfRefereeOne']} errorMessage={nextOfKinErrors?.phoneOfRefereeOne?.message} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController name='nameOfRefereeTwo' control={nextOfKinControl}  requireBoolean={true} label="Name of Referee Two" error={nextOfKinErrors['nameOfRefereeTwo']} errorMessage={nextOfKinErrors?.nameOfRefereeTwo?.message} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController name='addressOfRefereeTwo' control={nextOfKinControl}  requireBoolean={true} label="Address of Referee Two" error={nextOfKinErrors['addressOfRefereeTwo']} errorMessage={nextOfKinErrors?.addressOfRefereeTwo?.message} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController name='emailOfRefereeTwo' control={nextOfKinControl} requireBoolean={true} label="Email of Referee Two" error={nextOfKinErrors['emailOfRefereeTwo']} errorMessage={nextOfKinErrors?.emailOfRefereeTwo?.message} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormController name='phoneOfRefereeTwo' control={nextOfKinControl} requireBoolean={true} label="Phone of Referee Two" error={nextOfKinErrors['phoneOfRefereeTwo']} errorMessage={nextOfKinErrors?.phoneOfRefereeTwo?.message} />
              </Grid>



              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='tonal' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button type='submit' variant='contained' disabled={isSubmitting}>
                {isSubmitting ? <SubmitSpinnerMessage message={'Submitting'} /> : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
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
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar
              const labelProps = {}
              if (index === activeStep) {
                labelProps.error = false
                if (
                  (personalErrors.email ||

                    // personalErrors.middleName ||
                    personalErrors.lastName ||
                    personalErrors.firstName ||
                    personalErrors.title ||
                    personalErrors.phone ||
                    personalErrors.dateOfBirth ||

                    // personalErrors.residentialAddress ||
                    personalErrors.maritalStatus ||
                    personalErrors.gender ||

                    // personalErrors.city ||
                    // personalErrors.state ||
                    personalErrors.lga ||

                    // personalErrors.religion ||
                    personalErrors.password  &&
                  activeStep === 0 )
                ) {
                  labelProps.error = true
                } else if (
                  (workInfoErrors.qualification ||
                    workInfoErrors.staffDescription ||
                    
                    // workInfoErrors.institutionAttended ||
                    // workInfoErrors.department_section ||
                    // workInfoErrors.specialization ||
                    // workInfoErrors.previousWorkExperience ||
                    workInfoErrors.mealAllowance ||
                    workInfoErrors.transportAllowance ||
                    workInfoErrors.domesticAllowance ||
                    workInfoErrors.furnitureAllowance ||
                    workInfoErrors.SalaryArrears ||
                    workInfoErrors.rentAllowance ||
                    workInfoErrors.accountNumber || 
                    workInfoErrors.dateOfEmployment || 
                    workInfoErrors.role || 
                    
                    // workInfoErrors.bankName || 
                    // workInfoErrors.branch || 
                    // workInfoErrors.others || 
                    workInfoErrors.basicSalary &&
                  activeStep === 1 )
                ) {
                  labelProps.error = true
                }  else if (
                    (

                        // nextOfKinErrors.nameOfReferee || 
                        // nextOfKinErrors.addressOfReferee || 
                        // nextOfKinErrors.nextOfKinAddress || 
                        nextOfKinErrors.emergencyPhone || 
                        nextOfKinErrors.nextOfKinName) &&
                    activeStep === 2
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

    </Fragment>
  )
}

export default AddStaff
