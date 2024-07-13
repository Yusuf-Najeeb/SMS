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
import { CircularProgress, MenuItem, } from '@mui/material'
import { fetchApplicants } from '../../../store/apps/applicants/asyncthunk'
import { useApplicants } from '../../../hooks/useApplicants'
import { associateApplicantToAppicantSubject, dissociateApplicantFromAppicantSubject, fetchApplicantsSubjects } from '../../../store/apps/applicantsSubjects/asyncthunk'



const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  applicantId: yup.string().required('Applicant is required')
})

const defaultValues = {
  applicantId: ''
}

const ManageApplicant = ({ open, toggle, subject, status }) => {
  const dispatch = useAppDispatch()
  const [ApplicantsData] = useApplicants()


  useEffect(() => {
    dispatch(fetchApplicants())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
         subjectId:  subject.id,
         applicantId: Number(data.applicantId),
       }

       if (status){

        associateApplicantToAppicantSubject(payload).then(response => {
        if (response.data.success) {
          handleClose()
          dispatch(fetchApplicantsSubjects())
        }
      })
       }else {
        dissociateApplicantFromAppicantSubject(payload).then(response => {
          if (response.data.success) {
            handleClose()
            dispatch(fetchApplicantsSubjects())
          }
        })
       }


  }


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
        <Typography variant='h5'>{status ? 'Assign Applicant' : 'Remove Applicant'}</Typography>
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
            name='applicantId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                label='Applicant'
                value={value}
                required
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.applicantId)}
                {...(errors.applicantId && { helperText: errors.applicantId.message })}
              >
                <MenuItem value=''>Select Applicant</MenuItem>
                {ApplicantsData?.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item.id}>
                      {`${item.firstName?.toUpperCase()} ${item.lastName?.toUpperCase()}`}
                    </MenuItem>
                  )
                })}
              </CustomTextField>
            )}
          /> 


          <Box sx={{ mt: 5,  }}>

            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} /> }
              {status ? "Assign": "Remove"}
              
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>

    </Fragment>
  )
}

export default ManageApplicant
