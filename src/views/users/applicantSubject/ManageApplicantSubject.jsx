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
  CircularProgress,
  Grid,
  MenuItem,
} from '@mui/material'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'

import { useSubjects } from '../../../hooks/useSubjects'
import { createApplicantSubject, updateApplicantSubject } from '../../../store/apps/applicantsSubjects/asyncthunk'



const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))





const schema = yup.object().shape({
  subjectId: yup.string().required('Subject is required'),
  score: yup.string().required('Score is required'),

})

const defaultValues = {
  subjectId: '',
  score: ''

}



const ManageApplicantsSubjects = ({ open, toggle, subjectToEdit = null, updateData }) => {
  const dispatch = useAppDispatch()
  const [SubjectsList] = useSubjects()



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

    let payload = {
        subjectId: Number(data?.subjectId),
        score: Number(data?.score)
    
    }


    createApplicantSubject(payload).then(response => {

        
      if (response?.data?.success) {
        updateData()
        handleClose()
      }
    })
  }

  const onUpdate = async data => {

    let payload = {
        subjectId: Number(data?.subjectId),
        score: Number(data?.score)
    
    }
   

    updateApplicantSubject(subjectToEdit?.id, payload).then(response => {
      if (response.data.success) {
        updateData()
        handleClose()
      }
    })
  }

  useEffect(() => {
    if (subjectToEdit !== null) {
      Number(setValue('subjectId', subjectToEdit.subjectId))
      setValue('score', subjectToEdit.score)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    dispatch(fetchSubjects({ page: 1, limit: 100, categoryId: '' }))

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
          <Typography variant='h5'>{subjectToEdit ? 'Edit Applicant Exam Subject' : 'Create Applicant Exam Subject'}</Typography>
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
                      <span>{`${index + 1}. ${sub?.firstsubjectId} ${sub?.lastsubjectId}`}</span>
                    </Fragment>
                  ))}
                </Alert>
              </Grid>
            )}
            <Controller
            name='subjectId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                label='Subject'
                value={value}
                required
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.subjectId)}
                {...(errors.subjectId && { helperText: errors.subjectId.message })}
              >
                <MenuItem value=''>Select Subject</MenuItem>
                {SubjectsList?.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item.id}>
                      {`${item.name?.toUpperCase()} `}
                    </MenuItem>
                  )
                })}
              </CustomTextField>
            )}
          /> 

<Controller
            name='score'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                label='Score'
                value={value}
                required
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.score)}
                {...(errors.score && { helperText: errors.score.message })}
              />
            )}
          /> 

            <Box sx={{ mt: 5, }}>

              <Button type='submit' variant='contained' sx={{width: '100%'}} >
                {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
                {subjectToEdit ? 'Update' : 'Create'}
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>

     
    </Fragment>
  )
}

export default ManageApplicantsSubjects


