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
import { CircularProgress, Dialog, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material'
import { CustomCloseButton } from '../Guardian/AddGuardian'
import { useStaff } from '../../../hooks/useStaff'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { createClass, fetchClasses, updateClass } from '../../../store/apps/classes/asyncthunk'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'



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
  type: yup.string().required('Class Type is required'),
  className: yup
    .string()
    .min(3, obj => showErrors('className', obj.value.length, obj.min))
    .required(),
  categoryId: yup.string().required('Class Category is required'),
  capacity: yup.string().required('Capacity is required'),
  staffId: yup.string().required('Class Teacher is required'),
})

const defaultValues = {
  className: '',
  type: '',
  capacity: '',
  staffId: '',
  categoryId: ''
}

const ManageClass = ({ open, toggle, classToEdit = null }) => {
  const dispatch = useAppDispatch()

  const [StaffData] = useStaff()
  const [CategoriesData] = useCategories()


  useEffect(() => {
    dispatch(fetchStaffs({page: 1, limit: 500, key: 'teacher'}))
    dispatch(fetchCategories({ page: 1, limit: 30, type: 'class' }))

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
        name: data.className,
        type: data.type,
        capacity: Number(data.capacity),
        categoryId: Number(data.categoryId),
        staffId: Number(data.staffId)
      }


      createClass(payload).then((res)=>{
          if (res?.data.success){
            toggle()
            handleClose()
            reset()
            dispatch(fetchClasses({page: 1, limit: 10, key: ''}))
          }
      })

  }

  const onUpdate = async (data) => {
   
      const payload = {
        name: data.className,
        type: data.type,
        capacity: Number(data.capacity),
        categoryId: Number(data.categoryId),
        staffId: Number(data.staffId)
      }

      updateClass(classToEdit?.id, payload).then((res)=>{
          if (res?.data.success){
            toggle()
            handleClose()
            reset()
            dispatch(fetchClasses({page: 1, limit: 10, key: ''}))
          }
      })


    
  }

  useEffect(() => {
    if (classToEdit !== null) {
      setValue('className', classToEdit.name)
      setValue('type', classToEdit.type)
      Number(setValue('categoryId', classToEdit.categoryId))
      setValue('capacity', classToEdit.capacity)
      setValue('staffId', classToEdit.staffId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classToEdit])

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
            name='className'
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
                placeholder='JSS1'
                error={Boolean(errors.className)}
                {...(errors.className && { helperText: errors.className.message })}
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
                placeholder='Purple'
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
            name='categoryId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                select
                label='Class Category'
                value={value}
                sx={{ mb: 4 }}
                placeholder='Secondary'
                onChange={onChange}
                error={Boolean(errors.categoryId)}
                {...(errors.categoryId && { helperText: errors.categoryId.message })}
              >
                {CategoriesData?.map((category)=>{ 
                   return  (
                <MenuItem key={category.id} value={category.id} sx={{textTransform: 'uppercase'}}>{category.name}</MenuItem>
                )})}

                </CustomTextField>
               
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

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
            <Button type='submit' variant='contained' >
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
