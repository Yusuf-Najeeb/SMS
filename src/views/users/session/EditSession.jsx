// ** React Imports
import { useEffect, useState, forwardRef } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import DatePicker from 'react-datepicker'

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
import { formatDateToYYYMMDDD } from '../../../@core/utils/format'
import { fetchSession, updateSessionDate } from '../../../store/apps/session/asyncthunk'


export const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
//   name: yup.string().required('Session Name is required'),

  startDate: yup.string().required('Start Date is required'),
  endDate: yup.string().required('End Date is required')
})

const defaultValues = {
//   name: '',

  startDate: '',
  endDate: '',
}

const EditSession = ({ open, toggle, sessionToEdit }) => {
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

 

  const onUpdate = async (data) => {

    const formattedStartDAte = (data?.startDate !== '') ? formatDateToYYYMMDDD(data?.startDate) : ''
    const formattedEndDAte = (data?.endDate !== '') ? formatDateToYYYMMDDD(data?.endDate) : ''
    
      const payload = {
        // name: data.name,

        startDate: formattedStartDAte,
        endDate: formattedEndDAte,
      }


      updateSessionDate(sessionToEdit?.id, payload).then((response)=>{
        if (response.data.success){
            handleClose()
            dispatch(fetchSession({ page: 1, limit: 10 }))
          }
      })
  }

  useEffect(()=>{
    if(sessionToEdit){
        // setValue('name', sessionToEdit?.name)

    sessionToEdit.startDate !== null ? setValue('startDate', new Date(sessionToEdit.startDate)) : setValue('startDate', '')
    sessionToEdit.endDate !== null ? setValue('endDate', new Date(sessionToEdit.endDate)) : setValue('endDate', '')
    }
    
    // eslint-disable-next-line
  },[sessionToEdit])


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>Edit Session</Typography>
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
        <form onSubmit={handleSubmit(onUpdate)} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        {/* <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      label='Session Name'
                      required
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      {...(errors.name && { helperText: 'Session Name is required ' })}
                    />
                  )}
                /> */}

        <Controller
                  name='startDate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      popperPlacement='bottom-end'
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='Start Date'
                          error={Boolean(errors.startDate)}
                          {...(errors.startDate && { helperText: 'Start Date is required' })}
                        />
                      }
                    />
                  )}
                />

<Controller
                  name='endDate'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      selected={value}
                      popperPlacement='bottom-end'
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={onChange}
                          label='End Date'
                          error={Boolean(errors.endDate)}
                          {...(errors.endDate && { helperText: 'Start Date is required' })}
                        />
                      }
                    />
                  )}
                />

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
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

export default EditSession
