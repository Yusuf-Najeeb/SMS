import React, { Fragment, useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import CircularProgress from '@mui/material/CircularProgress'

import IconButton from '@mui/material/IconButton'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Alert, InputAdornment } from '@mui/material'
import { formatCurrency } from 'src/@core/utils/format'
import { processIncome } from '../../../store/apps/income/asyncthunk'



const defaultValues = {
  amountPaid: Number(''),
  description: '',
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const PayIncomeBalance = ({ open, income, togglePayModal, fetchData }) => {
  const [payerror, setPayError] = useState('')

  const [owingAmount, setOwingAmount] = useState(0)

  const paySchema = yup.object().shape({
    amountPaid: yup.number().typeError('Amount received must be a number'),
    description: yup.string().required('Payment Description is required'),
  })

  const {
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(paySchema)
  })


  const validatePayment = (amount) => {
    
      if (amount > (income.amount - income.amountPaid)) {
        setPayError('Amount too high')

        return
      }

      setPayError('')
  }

  useEffect(() => {
    if (income) {
      const owedAmount = Math.abs(income.amountPaid - income.amount)

      setOwingAmount(owedAmount)
    }

     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income])

  const submitPayForm = async (data) => {
    const payload = {id: income.id, ...data}

    processIncome(payload).then((res)=>{
        if(res.data.success){
            reset()
            fetchData()
            togglePayModal()
        }
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 500, sm: 500 } } }}
    >
      <Header>
        <Typography variant='h5'> Income Payment</Typography>
        <IconButton
          size='small'
          onClick={togglePayModal}
          sx={{
            // p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>

      <Box sx={{ p: theme => theme.spacing(0, 1, 1) }}></Box>

        <Fragment>
          {income !== null && income !== undefined ? (
            <Fragment>
              <Box sx={{ px: 6 }}>

                <Grid sx={{ mt: 3 }}>
                  {payerror && (
                    <div>
                      <Alert severity='error'>
                        <div className='alert-body'>Amount too high.</div>
                      </Alert>
                    </div>
                  )}
                </Grid>
              </Box>

              <Box sx={{ p: 6 }}>
                <form onSubmit={handleSubmit(submitPayForm)}>
                  <Grid item xs={12} sm={12} sx={{ mb: 3 }}>
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
                          validatePayment(parseInt(e.target.value))

                        //   setValue('amountPaid', parseInt(e.target.value))
                        }}
                        error={Boolean(errors.amountPaid)}
                        aria-describedby={`stepper-linear-amountPaid`}
                        {...(errors.amountPaid && { helperText: errors.amountPaid.message })}
                      />
                    )}
                  />
                  </Grid>
                 
                  <Grid item xs={12} sm={12} sx={{ mb: 4 }}>
                    <Controller
                      name='description'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label='Description'
                          onChange={onChange}
                          placeholder='Payment description'
                      
                          error={Boolean(errors.description)}
                          {...(errors.description && { helperText: errors.description.message })}
                        />
                      )}
                    />
                  </Grid>

                  {/* <Divider /> */}

                  <Box sx={{ my: 5 }}>
                    <Stack>
                      <CalcWrapper>
                        <Typography sx={{ color: 'text.secondary' }}>Total:</Typography>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {formatCurrency(income.amount, true)}
                        </Typography>
                      </CalcWrapper>
                      <CalcWrapper>
                        <Typography sx={{ color: 'text.secondary' }}>Paid:</Typography>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                          {formatCurrency(income.amountPaid, true)}
                        </Typography>
                      </CalcWrapper>

                      <CalcWrapper>
                        <Typography sx={{ color: 'text.secondary' }}>Amount Owed:</Typography>
                        <Typography sx={{ fontWeight: 500, color: 'red' }}>
                          {formatCurrency(Math.abs(owingAmount), true)}
                        </Typography>
                      </CalcWrapper>
                    </Stack>
                  </Box>

                  <Grid item xs={12}>
                    <Button type='submit' variant='outlined' disabled={isSubmitting || !!payerror}>
                      <Stack spacing={2} direction='row'>
                        {isSubmitting ? (
                          <CircularProgress size={20} color='secondary' sx={{ mr: 2 }} />
                        ) : (
                          <Icon icon='bx:dollar-circle' />
                        )}

                        <Typography>Pay</Typography>
                      </Stack>
                    </Button>
                  </Grid>
                </form>
              </Box>
            </Fragment>
          ) : (
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Alert severity='error'>Income does not exist. Please check the list of Income: </Alert>
              </Grid>
            </Grid>
          )}
        </Fragment>
   
    </Drawer>
  )
}

export default PayIncomeBalance
