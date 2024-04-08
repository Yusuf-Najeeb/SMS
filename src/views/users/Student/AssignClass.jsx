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
import { assignClass, fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'


const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  classId: yup.string().required('Class is required'),
})

const defaultValues = {
  categoryId: ''
}

const AssignClass = ({ open, toggle, Student, page }) => {
  const dispatch = useAppDispatch()
  const [CategoriesData] = useCategories()

  const [ClassesList] = useClasses()

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
      classId: Number(data.classId)
    }

    assignClass(payload).then(response => {
      if (response.data.success) {
        handleClose()
        dispatch(fetchStudents({ page: page == 0 ? page + 1 : page, key:'' }))
      }
    })
  }

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'student' }))
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))

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
        <Typography variant='h5'>Change Class</Typography>
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
            name='classId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Class'
                required
                onChange={onChange}
                error={Boolean(errors.classId)}
                {...(errors.classId && { helperText: errors.classId.message })}
              >
                <MenuItem value=''>Select Class</MenuItem>
                {ClassesList?.map(item => (
                  <MenuItem sx={{ textTransform: 'uppercase' }} key={item?.id} value={item.id}>
                    {`${item.name} ${item.type}`}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AssignClass
