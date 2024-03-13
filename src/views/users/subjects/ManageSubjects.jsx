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
import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch
} from '@mui/material'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { useCategories } from '../../../hooks/useCategories'
import { createSubject, fetchSubjects, updateSubject } from '../../../store/apps/subjects/asyncthunk'
import SearchTeacher from './SearchTeacher'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { useStaff } from '../../../hooks/useStaff'
import { private_safeEmphasize } from '@mui/system'

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

const ITEM_HEIGHT = 28
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const schema = yup.object().shape({
  name: yup.string().required('Subject Title is required'),
  category_name: yup.string(),
  categoryId: yup.string()
})

const defaultValues = {
  name: ''

  // category_name: '',
  // categoryId: ''
}

const ManageSubjects = ({ open, toggle, subjectToEdit = null }) => {
  const dispatch = useAppDispatch()
  const [CategoriesData] = useCategories()
  const [StaffData] = useStaff()

  const [openTeacherModal, setTeacherModal] = useState(false)
  const [itemsArray, setItemsArray] = useState([])
  const [TeacherNames, setTeacherNames] = useState([])

  const [showInputField, setShowInputField] = useState(false)

  const toggleTeacherModal = () => {

    // toggle()
    setTeacherModal(!openTeacherModal)
  }

  const handleChange = event => {
    setShowInputField(event.target.checked)
  }

  const handleChangeTeachers = event => {
    const {
      target: { value }
    } = event
    setTeacherNames(

      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
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

    // const teacherIds = itemsArray.map(item => item.id);

    let payload = { name: data.name }

    const teacherIds = TeacherNames.map(item => {
      const matchingObject = StaffData?.result?.find(obj => obj.email === item)

      return matchingObject ? matchingObject.id : null
    })


    if (data.categoryId !== '') {
      payload = {
        name: data.name,
        categoryId: Number(data.categoryId),
        teacherIds
      }
    } else {
      payload = {
        name: data.name,
        category_name: data.category_name,
        teacherIds
      }
    }


    createSubject(payload).then(response => {
      if (response.data.success) {
        setTeacherNames([])
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

    const teacherIds = TeacherNames.map(item => {
      const matchingObject = StaffData?.result?.find(obj => obj.email === item)

      return matchingObject ? matchingObject.id : null
    })

    const ids = [...existingStaffIds, ...teacherIds]

    let payload

    if (data.categoryId !== '') {
      payload = {
        teacherIds: ids,
        ...(changedFields.hasOwnProperty('name') && { name: changedFields.name }),
        ...(changedFields.hasOwnProperty('categoryId') && { categoryId: Number(changedFields.categoryId) })
      }
    } else {
      payload = {
        teacherIds: ids,
        ...(changedFields.hasOwnProperty('name') && { name: changedFields.name }),
        ...(changedFields.hasOwnProperty('category_name') && { category_name: changedFields.category_name })
      }
    }

    updateSubject(subjectToEdit?.id, payload).then(response => {
      if (response.data.success) {
        setTeacherNames([])
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

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))

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
            {subjectToEdit && subjectToEdit?.staffs?.length > 0 && (
              <Grid item sx={{ mt: 5, mb: 5 }} xs={12} sm={12} md={12}>
                <Typography variant='h5'>Subject Teachers </Typography>
                <Alert severity='success'>
                  {subjectToEdit?.staffs?.map((sub, index) => (
                    <Fragment key={sub.id}>
                      {index > 0 && ', '}
                      <span>{`${index + 1}. ${sub?.firstName} ${sub?.lastName}`}</span>
                    </Fragment>
                  ))}
                </Alert>
              </Grid>
            )}
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

            <FormControl sx={{ mt: 5, mb: 5, width: '100%' }}>
              <InputLabel id='demo-multiple-name-label'>Select Teacher</InputLabel>
              <Select
                labelId='demo-multiple-name-label'
                id='demo-multiple-name'
                multiple
                value={TeacherNames}
                onChange={handleChangeTeachers}
                input={<OutlinedInput label='Select Teacher' />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {StaffData?.result?.map(parameter => (
                  <MenuItem
                    key={parameter?.id}

                    // value={`${parameter?.firstName} ${parameter?.lastName}`}
                    value={` ${parameter?.email}`}
                    style={{ textTransform: 'uppercase' }}
                  >
                    <Checkbox checked={TeacherNames.indexOf(parameter) > -1} />
                    <ListItemText
                      sx={{ textTransform: 'uppercase' }}
                      primary={`${parameter?.firstName} ${parameter.lastName}`}
                    />
                  </MenuItem>
                ))}
              </Select>
              {/* </Box> */}
            </FormControl>

            {!showInputField && (
              <Controller
                name='categoryId'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Subject Type'
                    value={value}
                    sx={{ mb: 4 }}
                    onChange={onChange}
                    error={Boolean(errors.categoryId)}
                    {...(errors.categoryId && { helperText: errors.categoryId.message })}
                  >
                    <MenuItem value=''>Select Subject Type</MenuItem>
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

            <FormGroup row>
              <FormControlLabel
                value='start'
                label='display subject type input field'
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
                    label='Subject Type'
                    value={value}
                    sx={{ mb: 4 }}
                    onChange={onChange}
                    error={Boolean(errors.category_name)}
                    {...(errors.category_name && { helperText: errors.category_name.message })}
                  />
                )}
              />
            )}

            <Box sx={{ mt: 5, }}>

              <Button type='submit' variant='contained' sx={{width: '100%'}} >
                {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
                {subjectToEdit ? 'Update' : 'Create'}
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>

      {/* <SearchTeacher
        itemsArray={itemsArray}
        setItemsArray={setItemsArray}
        openModal={openTeacherModal}
        closeModal={toggleTeacherModal}
      /> */}
    </Fragment>
  )
}

export default ManageSubjects


