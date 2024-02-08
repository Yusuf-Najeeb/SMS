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

import { Alert, CircularProgress, MenuItem } from '@mui/material'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createExpenditureSchema } from 'src/@core/Formschema'

import FormController from '../component/FormController'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import SearchStaff from '../component/SearchStaff'
import SearchParent from '../component/SearchParent'
import SearchStudent from '../component/SearchStudent'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { useExpenditureCategory } from '../../../hooks/useExpenditureCategory'
import { fetchExpenditureCategory } from '../../../store/apps/expenditureCategory/asyncthunk'
import {  updateExpenditure } from '../../../store/apps/expenditure/asyncthunk'

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

const defaultValues = {
  title: '',
  amount: Number(''),
  amountPaid: Number(''),
  categoryId: '',
  income: false,
  expenditureOwner: ''
}

const EditExpenditure = ({ open, closeModal, fetchData, selectedExpenditure }) => {
  const [refetch, setFetch] = useState(false)
  const [expenditureSource, setExpenditureSource] = useState()
  const [openGuardianModal, setGuardianModal] = useState(false)
  const [openStaffModal, setStaffModal] = useState(false)
  const [openStudentModal, setStudentModal] = useState(false)
  const [guardianItemsArray, setGuardianItemsArray] = useState([])
  const [StudentsItemsArray, setStudentsItemsArray] = useState([])
  const [staffItemsArray, setStaffItemsArray] = useState([])
  const [guardianId, setGuardianId] = useState()
  const [studentId, setStudentId] = useState()
  const [staffId, setStaffId] = useState()
  const [payError, setPayError] = useState()

  // ** Hooks
  const dispatch = useDispatch()
  const [ExpenditureCategoryData] = useExpenditureCategory()

  const validatePayment = amountPaid => {
    if (amountPaid > Number(getValues('amount'))) {
      setPayError('Amount Paid cannot be greater then Amount')

      return
    }

    setPayError('')
  }

  const toggleGuardianModal = () => {
    closeModal()
    setGuardianModal(!openGuardianModal)
  }

  const toggleStaffModal = () => {
    closeModal()
    setStaffModal(!openStaffModal)
  }

  const toggleStudentModal = () => {
    closeModal()
    setStudentModal(!openStudentModal)
  }

  const clearStaffArray = () => {
    setStaffItemsArray([])
  }

  const clearGuardianArray = () => {
    setGuardianItemsArray([])
  }

  const clearStudentArray = () => {
    setStudentsItemsArray([])
  }

  useEffect(() => {
    if (guardianItemsArray.length) {
      const id = guardianItemsArray[0].id
      setGuardianId(id)
      setStudentId(null)
      setStaffId(null)
    }
  }, [guardianItemsArray])

  useEffect(() => {
    if (StudentsItemsArray.length) {
      const id = StudentsItemsArray[0].id
      setStudentId(id)
      setStaffId(null)
      setGuardianId(null)
    }
  }, [StudentsItemsArray])

  useEffect(() => {
    if (staffItemsArray.length) {
      const id = staffItemsArray[0].id
      setStaffId(id)
      setStudentId(null)
      setGuardianId(null)
    }
  }, [staffItemsArray])

  useEffect(() => {
    dispatch(fetchExpenditureCategory({ page: 1, limit: 300 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch])

  useEffect(()=>{
    if(selectedExpenditure){

        setValue('title', selectedExpenditure.title)
        Number(setValue('categoryId', selectedExpenditure.categoryId))
        Number(setValue('amount', selectedExpenditure.amount))
        Number(setValue('amountPaid', selectedExpenditure.amountPaid))

    }

     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedExpenditure])

  const {
    control,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(createExpenditureSchema) })

  const onSubmit = async data => {
    const { categoryId, expenditureOwner, ...restData } = data

    const parsedCategoryId = Number(categoryId)

    let payload = {
      categoryId: parsedCategoryId,

      ...restData
    }

    // Add userId to payload if it has a value
    if (guardianId) {
      payload = { ...payload, userId: guardianId }
    }

    // Add userId to payload if it has a value
    if (studentId) {
      payload = { ...payload, userId: studentId }
    }

    // Add staffId to payload if it has a value
    if (staffId) {
      payload = { ...payload, staffId }
    }

    updateExpenditure(payload, selectedExpenditure.id).then(res => {
      if (res.data.success) {
        notifySuccess('Expenditure Updated')
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
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '95%', maxWidth: 800 } }}
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
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        label='Title'
                        required
                        placeholder='Enter Expenditure title'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.title)}
                        {...(errors.title && { helperText: errors.title.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='categoryId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Expenditure Category'
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-categoryId'
                        error={Boolean(errors.categoryId)}
                        aria-describedby='stepper-linear-personal-categoryId-helper'
                        {...(errors.categoryId && { helperText: errors.categoryId.message })}
                      >
                        <MenuItem value=''>Select Category</MenuItem>
                        {ExpenditureCategoryData?.map(category => (
                          <MenuItem key={category?.id} value={category?.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormController
                    name='amount'
                    control={control}
                    required={true}
                    requireBoolean={true}
                    label='Amount'
                    error={errors['amount']}
                    errorMessage={errors?.amount?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>

                  <Controller
                    name='amountPaid'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        required
                        value={value}
                        label='Amount Paid'
                        onChange={(e)=>  {onChange(e) 
                        parseInt(validatePayment(e.target.value))
                        }
                        }
                        error={Boolean(errors.amountPaid)}
                        aria-describedby={`stepper-linear-amountPaid`}
                        {...(errors.amountPaid && { helperText: errors.amountPaid.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='expenditureOwner'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Expenditure Source'
                        onChange={e => {
                          onChange(e)
                          setExpenditureSource(e.target.value)
                        }}
                        id='stepper-linear-personal-expenditureOwner'
                        error={Boolean(errors.expenditureOwner)}
                        aria-describedby='stepper-linear-personal-expenditureOwner-helper'
                        {...(errors.expenditureOwner && { helperText: errors.expenditureOwner.message })}
                      >
                        <MenuItem value='staff'>Staff</MenuItem>
                        <MenuItem value='guardian'> Guardian</MenuItem>
                        <MenuItem value='student'> Student</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>


                <Grid item sx={{ mt: 2 }} sm={12}>
                  {payError && (
                    <div>
                      <Alert severity='error'>
                        <div className='alert-body'>{payError}</div>
                      </Alert>
                    </div>
                  )}
                </Grid>
              </Grid>


            </DialogContent>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: '10px' }}>
              {expenditureSource == 'staff' ? (
                <Button type='button' variant='outlined' onClick={toggleStaffModal}>
                  Select Staff
                </Button>
              ) : expenditureSource == 'guardian' ? (
                <Button type='button' variant='outlined' onClick={toggleGuardianModal}>
                  Select Guardian
                </Button>
              ) : expenditureSource == 'student' ? (
                <Button type='button' variant='outlined' onClick={toggleStudentModal}>
                  Select Student
                </Button>
              ) : null}

              <Button
                type='submit'
                variant='contained'
                disabled={isSubmitting || staffId === undefined || guardianId === undefined || studentId === undefined}
              >
                {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Update'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      <SearchParent
        itemsArray={guardianItemsArray}
        setItemsArray={setGuardianItemsArray}
        openModal={openGuardianModal}
        closeModal={toggleGuardianModal}
        clearStaffArray={clearStaffArray}
        clearStudentArray={clearStudentArray}
      />
      <SearchStudent
        itemsArray={StudentsItemsArray}
        setItemsArray={setStudentsItemsArray}
        openModal={openStudentModal}
        closeModal={toggleStudentModal}
        clearParentArray={clearGuardianArray}
        clearStaffArray={clearStaffArray}
      />
      <SearchStaff
        itemsArray={staffItemsArray}
        setItemsArray={setStaffItemsArray}
        openModal={openStaffModal}
        closeModal={toggleStaffModal}
        clearStudentArray={clearStudentArray}
        clearGuardianArray={clearGuardianArray}
      />
    </Fragment>
  )
}

export default EditExpenditure