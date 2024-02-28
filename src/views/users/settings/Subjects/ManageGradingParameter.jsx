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
import { CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { createCategory, fetchCategories, updateCategory } from '../../../../store/apps/categories/asyncthunk'
import { fetchGradingParameters } from '../../../../store/apps/gradingParameters/asyncthunk'
import { useGradingParameters } from '../../../../hooks/useGradingParameters'



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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const schema = yup.object().shape({
  type: yup.string().required(),
  name: yup
    .string()
    .min(3, obj => showErrors('name', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  parameterIds: '',
  type: ''
}

const ManageGradingParameter = ({ open, toggle, subject }) => {
  const dispatch = useAppDispatch()

  const [GradingParametersList] = useGradingParameters()

  useEffect(() => {
    dispatch(fetchGradingParameters({ page: 1, limit: 300 }))

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
        subjectId: subject.id,
        type: data.type
      }

      createCategory(payload).then((response)=>{
          if (response.data.success){
            handleClose()
            dispatch(fetchCategories({ page: 1, limit: 10, type: '' }))
          }
      })

  }


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Assign Grading Parameter</Typography>
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

        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Grading Parameter</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={parameterIds}
          onChange={handleChange}
          input={<OutlinedInput label="Grading Parameter" />}
          MenuProps={MenuProps}
        >
          {GradingParametersList?.map((parameter) => (
            <MenuItem
              key={parameter?.id}
              value={parameter?.name}
              style={{textTransform: 'uppercase'}}
            >
              {parameter?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

          <Controller
            name='parameterIds'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                select
                value={value}
                sx={{ mb: 4 }}
                label='Grading Parameter'
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
              Assign
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default ManageGradingParameter
