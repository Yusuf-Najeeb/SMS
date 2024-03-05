// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

import { CircularProgress } from '@mui/material'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { requirePeriod } from 'src/@core/Formschema'
import { generatePayslip, sendPayslip } from '../../../store/apps/payslip/asyncthunk'
import { formatDateToYYYYMM } from '../../../@core/utils/format'
import { CustomInput } from '../Guardian/AddGuardian'

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
  period: ''
}

const SendPayslip = ({ open, closeModal, refetchPayslip }) => {
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(requirePeriod) })

  const onSubmit = async data => {
    const formattedPeriod = formatDateToYYYYMM(data.period)

    const res = sendPayslip({ period: formattedPeriod }).then(() => {
      reset()
      closeModal()
      refetchPayslip()
    })
  }

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth='md'
      scroll='body'
      
      //   TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 450 } }}
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
              <Grid item xs={12} sm={12}>
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
                      maxDate={new Date()}
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
                          error={Boolean(errors.period)}
                          {...(errors.period && { helperText: errors.period.message })}
                        />
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='submit' variant='contained'>
              {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Send'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SendPayslip
