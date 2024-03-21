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
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import { assignStudentCategory, fetchStudents } from '../../../store/apps/Student/asyncthunk'

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
  categoryId: yup.string().required('This field is required'),
})

const defaultValues = {
  categoryId: ''
}

const AssignHostelCategory = ({ open, toggle, Student, page }) => {
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

  const onSubmit = async data => {
    const payload = {
      studentId: Student.id,
      categoryId: Number(data.categoryId)
    }

    assignStudentCategory(payload).then(response => {
      if (response.data.success) {
        handleClose()
        dispatch(fetchStudents({ page: page == 0 ? page + 1 : page, key:'' }))
      }
    })
  }

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'hostel' }))

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
        <Typography variant='h5'>Assign Hostel Room</Typography>
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
        <form onSubmit={handleSubmit(onSubmit)}>
        

          <Controller
            name='categoryId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Room Name'
                required
                onChange={onChange}
                error={Boolean(errors.categoryId)}
                {...(errors.categoryId && { helperText: errors.categoryId.message })}
              >
                <MenuItem value=''>Select Room</MenuItem>
                {CategoriesData?.map(item => (
                  <MenuItem sx={{ textTransform: 'uppercase' }} key={item?.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              Assign
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AssignHostelCategory
