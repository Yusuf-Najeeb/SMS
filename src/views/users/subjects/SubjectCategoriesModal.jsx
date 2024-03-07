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
import { CircularProgress, FormControlLabel, FormGroup, MenuItem, Switch } from '@mui/material'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import { assignSubjectCategory, createSubject, fetchSubjects, updateSubject } from '../../../store/apps/subjects/asyncthunk'
import { createRoom, fetchRooms, updateRoom } from '../../../store/apps/rooms/asyncthunk'
import DataGrid from '../../../@core/theme/overrides/dataGrid'

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
  categoryId: yup.string()
})

const defaultValues = {
  categoryId: '',
}

const AssignSubjectCategories = ({ open, toggle, Subject  }) => {
  const dispatch = useAppDispatch()
  const [CategoriesData] = useCategories()

  const {
    reset,
    control,
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
    let payload = {
        categoryId: Number(data.categoryId),
        subjectId: Subject.id
      }
    


      assignSubjectCategory(payload).then(response => {
      if (response?.data.success) {
        handleClose()
        dispatch(fetchSubjects({ page: 1, limit: 10, categoryId: '' }))
      }
    })
  }


  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'subject' }))

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
        <Typography variant='h5'>Assign Category</Typography>
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
                  label='Category Name'
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  error={Boolean(errors.categoryId)}
                  {...(errors.categoryId && { helperText: errors.categoryId.message })}
                >
                  <MenuItem value=''>Select Subject Category</MenuItem>
                  {CategoriesData?.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.id}>
                        {item.name}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              )}
            />

         

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {'Assign'}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AssignSubjectCategories
