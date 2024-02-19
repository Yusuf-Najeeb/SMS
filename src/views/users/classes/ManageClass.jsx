// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch, useAppSelector } from 'src/hooks'
import { notifyError } from 'src/@core/components/toasts/notifyError'
import { notifySuccess } from 'src/@core/components/toasts/notifySuccess'
import axios from 'axios'
import { CircularProgress, Dialog, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material'
import {  fetchPaymentMethods } from 'src/store/apps/settings/asyncthunk'
import { CustomCloseButton } from '../Guardian/AddGuardian'
import { useStaff } from '../../../hooks/useStaff'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { createClass, fetchClasses } from '../../../store/apps/classes/asyncthunk'



const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  type: yup.string().required(),
  name: yup
    .string()
    .min(3, obj => showErrors('name', obj.value.length, obj.min))
    .required(),
  capacity: yup.string().required('Capacity is required'),
  category_name: yup.string().required('Category is required'),
  staffId: yup.string().required('Class Teacher is required'),
})

const defaultValues = {
  name: '',
  type: '',
  capacity: '',
  category_name: '',
  staffId: ''
}

const ManageClass = ({ open, toggle, classToEdit = null }) => {
  const dispatch = useAppDispatch()

  const [StaffData] = useStaff()

  useEffect(() => {
    dispatch(fetchStaffs({page: 1, limit: 500, key: ''}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    toggle()
    reset()
  }

  const onSubmit = async (data) => {

      const payload = {
        name: data.name,
        type: data.type,
        capacity: Number(data.capacity),
        category_name: data.category_name,
        staffId: Number(data.staffId)
      }

      createClass(payload).then((res)=>{
          if (res.data.success){
            toggle()
            handleClose()
            reset()
            dispatch(fetchClasses({page: 1, limit: 10, key: ''}))
          }
      })

  }

  const onUpdate = async (data) => {
    try {
      const payload = {
        name: data.name,
        type: data.type,
        capacity: Number(data.capacity),
        category_name: data.category_name,
        staffId: Number(data.staffId)
      }

      const response = await axios.patch(`settings/payment-mode/${classToEdit?.id}`, payload)

      if (response.data.success){

        console.log(payload)
        notifySuccess('Class updated')
        handleClose()
        dispatch(fetchPaymentMethods({ page: 1, limit: 10 }))
      }

    } catch (error) {
      notifyError('cannot submit customer form')
    }
  }

  useEffect(() => {
    if (classToEdit !== null) {
      setValue('name', classToEdit.name)
      setValue('type', classToEdit.type)
      setValue('capacity', classToEdit.capacity)
      setValue('category_name', classToEdit.category_name)
      setValue('staffId', classToEdit.staffId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog
    fullWidth
    open={open}
    maxWidth='md'
    scroll='body'

    //   TransitionComponent={Transition}
    sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 700 } }}
  >
      <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5'>{classToEdit ? 'Edit Class' : 'Create Class'}</Typography>
        </DialogTitle>


    <DialogContent
      sx={{
        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
      }}
    >
      <CustomCloseButton onClick={toggle}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>

      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(classToEdit ? onUpdate : onSubmit)}>
        <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={4}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                required
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Name'
                onChange={onChange}
                placeholder='JSS 1'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='type'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Class Type'
                value={value}
                sx={{ mb: 4 }}
                placeholder='A'
                onChange={onChange}
                error={Boolean(errors.type)}
                {...(errors.type && { helperText: errors.type.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='capacity'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Capacity'
                value={value}
                sx={{ mb: 4 }}
                placeholder='25'
                onChange={onChange}
                error={Boolean(errors.capacity)}
                {...(errors.capacity && { helperText: errors.capacity.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>    
          <Controller
            name='category_name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Category'
                value={value}
                sx={{ mb: 4 }}
                placeholder='Junior Secondary'
                onChange={onChange}
                error={Boolean(errors.category_name)}
                {...(errors.category_name && { helperText: errors.category_name.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={4} md={6}>
                <Controller
                  name='staffId'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      value={value}
                      required
                      label='Class Teacher'
                      onChange={onChange}
                      id='stepper-linear-personal-staffId'
                      error={Boolean(errors.staffId)}
                      aria-describedby='stepper-linear-personal-staffId-helper'
                      {...(errors.staffId && { helperText: errors.staffId.message })}
                    >
                        <MenuItem value=''>Select Class Teacher</MenuItem>
                        {StaffData?.result?.map((item)=> {
                            return (
                                <MenuItem key={item.id} value={item.id} sx={{textTransform: 'uppercase'}}>{`${item.firstName} ${item.lastName}`}</MenuItem>
                            )
                        })}
                      
                    </CustomTextField>
                  )}
                />
              </Grid>



          </Grid>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {classToEdit ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
      </DialogContent>

    </Dialog>
  )
}

export default ManageClass
