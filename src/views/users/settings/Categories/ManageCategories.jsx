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
import { useAppDispatch } from 'src/hooks'
import { CircularProgress } from '@mui/material'
import { createCategory, fetchCategories, updateCategory } from '../../../../store/apps/categories/asyncthunk'



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
    .required()
})

const defaultValues = {
  name: '',
  type: ''
}

const ManageCategories = ({ open, toggle, categoryToEdit = null }) => {
  const dispatch = useAppDispatch()

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
        type: data.type
      }

      createCategory(payload).then((response)=>{
          if (response.data.success){
            handleClose()
            dispatch(fetchCategories({ page: 1, limit: 10, type: '' }))
          }
      })

  }

  const onUpdate = async (data) => {
    
      const payload = {
        name: data.name,
        type: data.type
      }


      updateCategory(categoryToEdit?.id, payload).then((response)=>{
        if (response.data.success){
            handleClose()
            dispatch(fetchCategories({ page: 1, limit: 10, type: '' }))
          }
      })

     


  }

  useEffect(() => {
    if (categoryToEdit !== null) {
      setValue('name', categoryToEdit.name)
      setValue('type', categoryToEdit.type)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{categoryToEdit ? 'Edit Category' : 'Create Category'}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
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
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(categoryToEdit ? onUpdate : onSubmit)}>

        <Controller
            name='type'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                required
                fullWidth
                label='Category Type'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.type)}
                {...(errors.type && { helperText: errors.type.message })}
              />
                
            )}
          />

          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Category Name'
                required
                onChange={onChange}
                placeholder='Category Name'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {categoryToEdit ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default ManageCategories
