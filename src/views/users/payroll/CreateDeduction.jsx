import { Button, CircularProgress, Dialog, DialogActions, DialogContent, Grid, MenuItem } from '@mui/material'
import React, { Fragment , useState, useEffect} from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import * as yup from 'yup'
import CustomTextField from 'src/@core/components/mui/text-field'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useAppDispatch  } from '../../../hooks'
import { formatDateToYYYYMM, formatFirstLetter } from '../../../@core/utils/format'

import Icon from 'src/@core/components/icon'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { useStaff } from '../../../hooks/useStaff'
import { CustomInput } from '../Guardian/AddGuardian'
import { createDeduction } from '../../../store/apps/deductions/asyncthunk'

 const deductionsSchema = yup.object().shape({
  amount: yup.number().required('Deduction Amount is required'),
  staffId: yup.number().required('Staff is required'),
  period: yup.string().required('Period is required'),
  note: yup.string().required('Deduction reason is required'),
})

const defaultValues = {
  amount: Number(''),
  staffId: Number(''),
  period: '',
  note: ''
}

const CreateDeduction = ({ openDialog, closeDialog, refetchDeduction }) => {

    const dispatch = useAppDispatch()
    const [StaffsData] = useStaff()

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(deductionsSchema)
  })

  

  const addDeduction = async values => {
    

    const {period, ...restOfData} = values

    const formattedPeriod = formatDateToYYYYMM(period)

    const payload = {period: formattedPeriod, ...restOfData}

    createDeduction(payload).then((res)=>{
      if(res?.data?.success){
        reset()
        refetchDeduction()
        closeDialog()
      }

    })

  }

  return (
    <Fragment> 
    <Dialog open={openDialog} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 580 } }}>
      <form onSubmit={handleSubmit(addDeduction)}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <Grid container spacing={3}>

          {/* <Grid item xs={12} sm={10}>
                <Controller
                  name='categoryId'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Deduction Category'
                      onChange={onChange}
                      error={Boolean(errors.categoryId)}
                      aria-describedby='stepper-linear-account-categoryId'
                      {...(errors.categoryId && { helperText: 'This field is required' })}
                    >
                      <MenuItem value=''>Select Category</MenuItem>
                      { deductioncategoryData?.map((category) => (
                        <MenuItem key={category?.id} value={category?.id}>
                          {formatFirstLetter(category?.name)}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid> */}


                <Grid item xs={12} sm={6}>
            <Controller
              name='period'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  selected={value}
                  dateFormat='MMM y'
                  popperPlacement='bottom-end'
                  showMonthYearPicker
                  minDate={new Date()}
                  onChange={e => {
                    onChange(e)
                  }}
                  placeholderText='MM/YYYY'
                  customInput={
                    <CustomInput
                      value={value}
                      onChange={onChange}
                      autoComplete='off'
                      label='Date'
                      error={Boolean(errors?.period)}
                      {...(errors?.period && { helperText: errors?.period.message })}
                    />
                  }
                />
              )}
            />
               </Grid>

               

              <Grid item xs={12} sm={6} >
              <Controller
            name='amount'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Amount'
                onChange={onChange}
                placeholder='#200'
                error={Boolean(errors.amount)}
                {...(errors.amount && { helperText: errors.amount.message })}
              />
            )}
          />
                </Grid>

                <Grid item xs={12} sm={12}>
                <Controller
                  name='staffId'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      label='Staff'
                      onChange={onChange}
                      error={Boolean(errors?.staffId)}
                      aria-describedby='stepper-linear-account-staffId'
                      {...(errors?.staffId && { helperText: errors?.staffId.message })}
                    >
                      <MenuItem value=''>Select Staff</MenuItem>
                      { StaffsData?.result?.map((staff) => (
                        <MenuItem key={staff?.id} value={staff?.id}>
                          {` ${formatFirstLetter(staff?.firstName)} ${formatFirstLetter(staff?.lastName)} `}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} >
              <Controller
            name='note'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                multiline
                rows={2}
                value={value}
                sx={{ mb: 4 }}
                label='Reason'
                onChange={onChange}
                placeholder='Lateness to P.T.A'
                error={Boolean(errors.note)}
                {...(errors.note && { helperText: errors.note.message })}
              />
            )}
          />
          </Grid>

          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button type='submit' variant='contained' sx={{ mr: 2 }}>
            {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Submit'}
          </Button>
          <Button type='button' variant='tonal' color='secondary' onClick={closeDialog}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>

  
    </Fragment>
  )
}

export default CreateDeduction
