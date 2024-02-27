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
import { createSubject, fetchSubjects, updateSubject } from '../../../store/apps/subjects/asyncthunk'
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
  name: yup.string().required('Room Name is required'),
  capacity: yup.string().required('Room Capacity is required'),
  category_name: yup.string(),
  categoryId: yup.string()
})

const defaultValues = {
  name: '',
  category_name: '',
  categoryId: '',
  capacity: ''
}

const ManageRooms = ({ open, toggle, roomToEdit = null }) => {
  const dispatch = useAppDispatch()
  const [CategoriesData] = useCategories()

  const [showInputField, setShowInputField] = useState(false)

  const handleChange = event => {
    setShowInputField(event.target.checked)
  }

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    watch,
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

  // Watch all input fields and track changes
  const watchedFields = watch()

  const onSubmit = async data => {
    let payload

    if (data.categoryId !== '') {
      payload = {
        name: data.name,
        capacity: Number(data.capacity),
        categoryId: Number(data.categoryId)
      }
    } else {
      payload = {
        name: data.name,
        capacity: Number(data.capacity),
        category_name: data.category_name
      }
    }


    createRoom(payload).then(response => {
      if (response?.data.success) {
        handleClose()
        dispatch(fetchRooms({ page: 1, limit: 10, key: '' }))
      }
    })
  }

  const onUpdate = async data => {

    const changedFields = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== roomToEdit[key]) {
          acc[key] = value
        }
  
        return acc
      }, {})

    let payload

    if (data.categoryId !== '') {
      payload = {
        // Omit any input field not edited from the payload 
        ...(changedFields.hasOwnProperty('name') && { name: changedFields.name }),  
        ...(changedFields.hasOwnProperty('capacity') && { capacity: Number(changedFields.capacity) }),
        ...(changedFields.hasOwnProperty('categoryId') && { categoryId: Number(changedFields.categoryId) })
      }
    } else {
      payload = {
        // Omit any input field not edited from the payload 
        ...(changedFields.hasOwnProperty('name') && { name: changedFields.name }),
        ...(changedFields.hasOwnProperty('capacity') && { capacity: Number(changedFields.capacity) }),
        ...(changedFields.hasOwnProperty('category_name') && { category_name: changedFields.category_name })

      }
    }

    updateRoom(roomToEdit?.id, payload).then(response => {
      if (response?.data.success) {
        handleClose()
        dispatch(fetchRooms({ page: 1, limit: 10, key: '' }))
      }
    })
  }

  useEffect(() => {
    if (roomToEdit !== null) {
      setValue('name', roomToEdit.name)
      setValue('categoryId', roomToEdit.categoryId)
      setValue('capacity', roomToEdit.capacity)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'room' }))

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
        <Typography variant='h5'>{roomToEdit ? 'Edit Room' : 'Create Room'}</Typography>
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
        <form onSubmit={handleSubmit(roomToEdit ? onUpdate : onSubmit)}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Room Name'
                required
                onChange={onChange}
                placeholder='Room 1'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />

          {!showInputField && (
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
                  <MenuItem value=''>Select Room Category</MenuItem>
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
          )}

          <Controller
            name='capacity'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Room Capacity'
                required
                onChange={onChange}
                placeholder='100'
                error={Boolean(errors.capacity)}
                {...(errors.capacity && { helperText: errors.capacity.message })}
              />
            )}
          />

          <FormGroup row>
            <FormControlLabel
              value='start'
              label='display category input field'
              labelPlacement='start'
              sx={{ mr: 4 }}
              control={<Switch checked={showInputField} onChange={handleChange} />}
            />
          </FormGroup>

          {showInputField && (
            <Controller
              name='category_name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  label='Category Name'
                  value={value}
                  sx={{ mb: 4 }}
                  onChange={onChange}
                  error={Boolean(errors.category_name)}
                  {...(errors.category_name && { helperText: errors.category_name.message })}
                />
              )}
            />
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {roomToEdit ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default ManageRooms
