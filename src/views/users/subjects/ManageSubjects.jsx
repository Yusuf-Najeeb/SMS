// ** React Imports
import { Fragment, useEffect, useState } from 'react'

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
import {  fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import { createSubject, fetchSubjects, updateSubject } from '../../../store/apps/subjects/asyncthunk'
import SearchTeacher from './SearchTeacher'

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
  name: yup.string().required('Subject Title is required'),
  category_name: yup.string(),
  categoryId: yup.string()
})

const defaultValues = {
  name: '',

  // category_name: '',
  // categoryId: ''
}

const ManageSubjects = ({ open, toggle, subjectToEdit = null }) => {
  const dispatch = useAppDispatch()
  const [CategoriesData] = useCategories()

  const [openTeacherModal, setTeacherModal] = useState(false)
  const [itemsArray, setItemsArray] = useState([])

  const [showInputField, setShowInputField] = useState(false)

  const toggleTeacherModal = ()=> {
    // toggle()
    setTeacherModal(!openTeacherModal)
  }

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

    const teacherIds = itemsArray.map(item => item.id);

    let payload = {name: data.name}

    if(data.categoryId !== ''){
        payload = {
         name: data.name,
         categoryId: Number(data.categoryId),
         teacherIds
       }
    }else {
        payload = {
            name: data.name,
            category_name: data.category_name,
            teacherIds
          }
    }

    // console.log(payload, 'payload')


    createSubject(payload).then(response => {
      if (response.data.success) {
        handleClose()
        dispatch(fetchSubjects({ page: 1, limit: 10, categoryId: '' }))
      }
    })

  }

  const onUpdate = async data => {
    const changedFields = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== subjectToEdit[key]) {
        acc[key] = value
      }

      return acc
    }, {})

    const existingStaffIds = subjectToEdit.staffs.map(item => item.id)
    const teacherIds = itemsArray.map(item => item.id);

    const ids = [...existingStaffIds, ...teacherIds]
   
    let payload 

    

    if(data.categoryId !== ''){
        payload = {
          teacherIds: ids,
          ...(changedFields.hasOwnProperty('name') && { name: changedFields.name }),  
        ...(changedFields.hasOwnProperty('categoryId') && { categoryId: Number(changedFields.categoryId) })
        
       }
    }else {
        payload = {
          teacherIds: ids,
          ...(changedFields.hasOwnProperty('name') && { name: changedFields.name }),  
          ...(changedFields.hasOwnProperty('category_name') && { category_name: changedFields.category_name }),
          
          }
    }


    updateSubject(subjectToEdit?.id, payload).then(response => {
      if (response.data.success) {
        handleClose()
        dispatch(fetchSubjects({ page: 1, limit: 10, categoryId: '' }))
      }
    })

  }

  useEffect(() => {
    if (subjectToEdit !== null) {
      setValue('name', subjectToEdit.name)
      setValue('categoryId', subjectToEdit.categoryId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'subject' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>

    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 450 } } }}
    >
      <Header>
        <Typography variant='h5'>{subjectToEdit ? 'Edit Subject' : 'Create Subject'}</Typography>
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
        <form onSubmit={handleSubmit(subjectToEdit ? onUpdate : onSubmit)}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Subject Title'
                required
                onChange={onChange}
                placeholder='Subject Title'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />

          {!showInputField &&  <Controller
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
          /> }

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

          <Box sx={{ display: 'flex', mt: 5, alignItems: 'center', justifyContent: 'space-between' }}>

          <Button type='button' variant='outlined' onClick={toggleTeacherModal} sx={{ width: '45%' }}>
              Select Teachers
            </Button>
            

            <Button type='submit' variant='contained' sx={{ width: '45%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {subjectToEdit ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>

    <SearchTeacher itemsArray={itemsArray} setItemsArray={setItemsArray} openModal={openTeacherModal} closeModal={toggleTeacherModal} />
    </Fragment>
  )
}

export default ManageSubjects
