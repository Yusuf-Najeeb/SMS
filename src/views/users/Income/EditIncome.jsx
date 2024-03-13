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
import { updateIncomeSchema } from 'src/@core/Formschema'

import { updateIncome } from '../../../store/apps/income/asyncthunk'
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
  amount: Number(''),
}

const EditIncome = ({ open, closeModal, fetchData, selectedIncome }) => {
  const [staffItemsArray, setStaffItemsArray] = useState([])
  const [guardianId, setGuardianId] = useState()
  const [studentId, setStudentId] = useState()
  const [staffId, setStaffId] = useState()
  const [payError, setPayError] = useState()

  console.log(selectedIncome, 'selected income')

  // ** Hooks
  const dispatch = useDispatch()


  useEffect(() => {
    if (selectedIncome) {

      Number(setValue('amount', selectedIncome.amount))

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIncome])

  const {
    control,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(updateIncomeSchema) })
  

  const onSubmitt = async (data) => {


    updateIncome(data, selectedIncome.id).then(res => {
      if (res?.data.success) {
        notifySuccess('Income Updated')
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
        //eslint_disable-next-line
        //   TransitionComponent={Transition}
        //   sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 450 } }}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '95%', maxWidth: 450 } }}
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

          <form onSubmit={handleSubmit(onSubmitt)}>
            
              <Grid container spacing={6}>
               

                <Grid item xs={12} sm={12}>
                  <FormController
                    name='amount'
                    control={control}
                    required={true}
                    requireBoolean={true}
                    label='Amount'

                    // error={errors['amount']}
                    error={Boolean(errors.amount)}
                    errorMessage={errors?.amount?.message}
                  />
                </Grid>

              </Grid>
            

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: '20px' }}>

              <Button
                // onClick={fetchData}
                type='submit'
                variant='contained'
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Update'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

    </Fragment>
  )
}

export default EditIncome
