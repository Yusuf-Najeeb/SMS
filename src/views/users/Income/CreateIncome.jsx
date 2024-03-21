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

import { Alert, CircularProgress, MenuItem, Typography } from '@mui/material'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createIncomeSchema } from 'src/@core/Formschema'

import { createIncome } from '../../../store/apps/income/asyncthunk'
import FormController from '../component/FormController'
import { fetchIncomeCategory } from '../../../store/apps/incomeCategory/asyncthunk'
import { useEffect, useState } from 'react'
import { useIncomeCategory } from '../../../hooks/useIncomeCategory'
import { Fragment } from 'react'
import SearchStaff from '../component/SearchStaff'
import SearchParent from '../component/SearchParent'
import SearchStudent from '../component/SearchStudent'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { usePaymentMethods } from '../../../hooks/usePaymentMethods'
import { fetchPaymentMethods } from '../../../store/apps/settings/asyncthunk'
import { useSession } from '../../../hooks/useSession'
import { fetchSession } from '../../../store/apps/session/asyncthunk'

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
  sessionId: '',
  income: true,
  incomeOwner: '',
  paymentMode: ''
}

const CreateIncome = ({ open, closeModal, fetchData }) => {
  const [refetch, setFetch] = useState(false)
  const [incomeSource, setIncomeSource] = useState()
  const [openGuardianModal, setGuardianModal] = useState(false)
  const [openStaffModal, setStaffModal] = useState(false)
  const [openStudentModal, setStudentModal] = useState(false)

  const [itemsArray, setItemsArray] = useState([])

  const [guardianItemsArray, setGuardianItemsArray] = useState([])
  const [StudentsItemsArray, setStudentsItemsArray] = useState([])
  const [staffItemsArray, setStaffItemsArray] = useState([])
  const [guardianId, setGuardianId] = useState()
  const [studentId, setStudentId] = useState()
  const [staffId, setStaffId] = useState()
  const [payError, setPayError] = useState()

  // ** Hooks
  const dispatch = useDispatch()
  const [IncomeCategoryData] = useIncomeCategory()
  const [PaymentMethodsList] = usePaymentMethods()
  const [SessionData] = useSession()

  const validatePayment = amountReceived => {
    if (amountReceived > Number(getValues('amount'))) {
      setPayError('Amount Received cannot be greater then Amount')

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
      setItemsArray(guardianItemsArray)
      setGuardianId(id)
      setStudentId(null)
      setStaffId(null)
    }
  }, [guardianItemsArray])

  useEffect(() => {
    if (StudentsItemsArray.length) {
      const id = StudentsItemsArray[0].id
      setItemsArray(StudentsItemsArray)
      setStudentId(id)
      setStaffId(null)
      setGuardianId(null)
    }
  }, [StudentsItemsArray])

  useEffect(() => {
    if (staffItemsArray.length) {
      const id = staffItemsArray[0].id
      setItemsArray(staffItemsArray)
      setStaffId(id)
      setStudentId(null)
      setGuardianId(null)
    }
  }, [staffItemsArray])

  useEffect(() => {
    dispatch(fetchPaymentMethods({ page: 1, limit: 300 }))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchIncomeCategory({ page: 1, limit: 300 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    control,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(createIncomeSchema) })

  const onSubmit = async data => {
    const { categoryId, incomeOwner, sessionId, ...restData } = data

    const parsedCategoryId = Number(categoryId)

    let payload = {
      categoryId: parsedCategoryId,
      income: defaultValues.income,
      sessionId: Number(sessionId),

      ...restData
    }

    // Add userId to payload if it has a value
    if (guardianId) {
      payload = { ...payload, parentId: guardianId }
    }

    // Add userId to payload if it has a value
    if (studentId) {
      payload = { ...payload, studentId: studentId }
    }

    // Add staffId to payload if it has a value
    if (staffId) {
      payload = { ...payload, staffId }
    }

    createIncome(payload).then(res => {
      if (res.data.success) {
        notifySuccess('Income Added')
        reset()
        closeModal()
        fetchData()
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
        //eslint_disable-next-line
        //   TransitionComponent={Transition}
        //   sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 450 } }}
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
                <Grid item xs={12} sm={4}>
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
                        label='Income Category'
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-categoryId'
                        error={Boolean(errors.categoryId)}
                        aria-describedby='stepper-linear-personal-categoryId-helper'
                        {...(errors.categoryId && { helperText: errors.categoryId.message })}
                      >
                        <MenuItem value=''>Select Category</MenuItem>
                        {IncomeCategoryData?.map(category => (
                          <MenuItem key={category?.id} value={category?.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='paymentMode'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Payment Method'
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.paymentMode)}
                        aria-describedby='stepper-linear-personal-paymentMode-helper'
                        {...(errors.paymentMode && { helperText: errors.paymentMode.message })}
                      >
                        <MenuItem value=''>Select Payment Method</MenuItem>
                        {PaymentMethodsList?.map(method => (
                          <MenuItem key={method?.id} value={method?.name}>
                            {method.name}
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
                        label='Amount Received'
                        onChange={e => {
                          onChange(e)
                          parseInt(validatePayment(e.target.value))
                        }}
                        error={Boolean(errors.amountPaid)}
                        aria-describedby={`stepper-linear-amountPaid`}
                        {...(errors.amountPaid && { helperText: errors.amountPaid.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='sessionId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Session'
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-sessionId'
                        error={Boolean(errors.sessionId)}
                        aria-describedby='stepper-linear-personal-sessionId-helper'
                        {...(errors.sessionId && { helperText: errors.sessionId.message })}
                      >
                        <MenuItem value=''>Select Session</MenuItem>
                        {SessionData?.map(session => (
                          <MenuItem key={session?.id} value={session?.id}>
                            {`${session.name} ${session.term} term`}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='incomeOwner'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Income Source'
                        onChange={e => {
                          onChange(e)
                          setIncomeSource(e.target.value)
                        }}
                        id='stepper-linear-personal-incomeOwner'
                        error={Boolean(errors.incomeOwner)}
                        aria-describedby='stepper-linear-personal-incomeOwner-helper'
                        {...(errors.incomeOwner && { helperText: errors.incomeOwner.message })}
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

                <Grid item xs={12} sm={12}>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        multiline
                        rows={4}
                        label='Description'
                        required
                        placeholder='Enter Income Description'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.title)}
                        {...(errors.title && { helperText: errors.title.message })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {itemsArray?.length > 0 && (
                <Grid item sx={{ mt: 5 }} xs={12} sm={12} md={12}>
                  <Typography variant='h5'>Income Source</Typography>
                  <Alert severity='success'>
                    {itemsArray?.map((source, index) => (
                      <Fragment key={source.id}>
                        {index > 0 && ', '}
                        <span>{`${index + 1}. ${source?.firstName} ${source?.lastName}`}</span>
                      </Fragment>
                    ))}
                  </Alert>
                </Grid>
              )}
            </DialogContent>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: '10px' }}>
              {incomeSource == 'staff' ? (
                <Button type='button' variant='outlined' onClick={toggleStaffModal}>
                  Select Staff
                </Button>
              ) : incomeSource == 'guardian' ? (
                <Button type='button' variant='outlined' onClick={toggleGuardianModal}>
                  Select Guardian
                </Button>
              ) : incomeSource == 'student' ? (
                <Button type='button' variant='outlined' onClick={toggleStudentModal}>
                  Select Student
                </Button>
              ) : null}

              <Button
                type='submit'
                variant='contained'
                disabled={isSubmitting || staffId === undefined || guardianId === undefined || studentId === undefined}
              >
                {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Create'}
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

export default CreateIncome
