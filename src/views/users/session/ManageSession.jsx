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
import { CircularProgress, MenuItem } from '@mui/material'
import { createSession, fetchSession, updateSession } from '../../../store/apps/session/asyncthunk'
import { notifyError } from '../../../@core/components/toasts/notifyError'



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
  name: yup
    .string()

    // .min(3, obj => showErrors('name', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  name: '',
}

const ManageSession = ({ open, toggle, sessionToEdit = null }) => {
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
      }
      
      console.log(payload, 'payload')

      createSession(payload).then((response)=>{
          if (response.data.success){
            handleClose()
            dispatch(fetchSession({ page: 1, limit: 10 }))
          }
      })

     
  }

  const onUpdate = async (data) => {
    const payload = {
        name: data.name,
      }
      
      console.log(payload, 'payload')

      updateSession(sessionToEdit?.id, payload).then((response)=>{
          if (response?.data.success){
            handleClose()
            dispatch(fetchSession({ page: 1, limit: 10 }))
          }
      })
  }

  useEffect(() => {
    if (sessionToEdit !== null) {
      setValue('name', sessionToEdit.name)
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
        <Typography variant='h5'>{sessionToEdit ? 'Edit Session' : 'Create Session'}</Typography>
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
        <form onSubmit={handleSubmit(sessionToEdit ? onUpdate : onSubmit)}>
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
                onChange={onChange}
                placeholder='2017/2018'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />

       

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {sessionToEdit ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default ManageSession
