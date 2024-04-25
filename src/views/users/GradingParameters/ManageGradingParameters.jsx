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
import { CircularProgress, MenuItem } from '@mui/material'
import { createCategory, fetchCategories, updateCategory } from '../../../store/apps/categories/asyncthunk'
import { createGradingParameter, fetchGradingParameters, updateGradingParameter } from '../../../store/apps/gradingParameters/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'




const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  percentage: yup.string().required('Percentage is required'),
  name: yup
    .string()
    .required("Grading Parameter Name is required"),
  classCategoryId: yup.string().required('Class Category is required')
})

const defaultValues = {
  name: '',
  percentage: '',
  classCategoryId: ''
}

const ManageGradingParameters = ({ open, toggle, parameterToEdit = null }) => {
  const dispatch = useAppDispatch()
  const [CategoriesData] = useCategories()

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
        percentage: data.percentage,
        classCategoryId: Number(data?.classCategoryId)
      }


      createGradingParameter(payload).then((response)=>{
          if (response?.data.success){
            handleClose()
          }
      })

  }

  const onUpdate = async (data) => {
    
      const payload = {
        name: data.name,  
        percentage: data.percentage,
        classCategoryId: Number(data?.classCategoryId)
      }


      updateGradingParameter(parameterToEdit?.id, payload).then((response)=>{
        if (response?.data.success){
            handleClose()
          }
      })

     


  }

  useEffect(()=>{
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'class' }))

    // eslint-disable-next-line 
  },[])

  useEffect(() => {
    if (parameterToEdit !== null) {
      setValue('name', parameterToEdit.name)
      setValue('percentage', parameterToEdit.percentage)
      Number(setValue('classCategoryId', parameterToEdit.classCategoryId))
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
        <Typography variant='h5'>{parameterToEdit ? 'Edit Grading Parameter' : 'Create Grading Parameter'}</Typography>
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
        <form onSubmit={handleSubmit(parameterToEdit ? onUpdate : onSubmit)}>

        <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Name'
                required
                onChange={onChange}
                placeholder='Excellent'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />

        <Controller
            name='percentage'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                required
                fullWidth
                label='Percentage'
                value={value}
                sx={{ mb: 4 }}
                placeholder='80-90%'
                onChange={onChange}
                error={Boolean(errors.percentage)}
                {...(errors.percentage && { helperText: errors.percentage.message })}
              />
                
            )}
          />

        <Controller
            name='classCategoryId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                required
                select
                fullWidth
                label='Class Category'
                value={value}
                sx={{ mb: 4 }}
                placeholder='80-90%'
                onChange={onChange}
                error={Boolean(errors.classCategoryId)}
                {...(errors.classCategoryId && { helperText: errors.classCategoryId.message })}
              >
                <MenuItem>Select Class Category</MenuItem>
                        {CategoriesData?.map(category => (
                          <MenuItem key={category?.id} value={category?.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                </CustomTextField>
                
            )}
          />

        

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {parameterToEdit ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default ManageGradingParameters
