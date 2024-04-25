// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
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
import { CircularProgress, Dialog, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material'
import { CustomCloseButton } from '../Guardian/AddGuardian'
import {  fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { useStudent } from '../../../hooks/useStudent'
import { affectiveTraitsSchema } from '../../../@core/FormSchema'
import { createAffectiveTraits, updateAffectiveTraits } from '../../../store/apps/affectiveTraits/asyncthunk'



const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))



const defaultValues = {
    studentId: '',
    sessionId: '',
    classId: '',
    punctuality: '',
    mentalAlertness: '',
    attentiveness: '',
    respect: '',
    neatness: '',
    politeness: '',
    honesty: '',
    relating_with_peers: '',
    attitude_to_school: '',
    spirit_of_team_work: '',
    completes_school_work_promptly: ''
}

const ManageAffectiveTraits = ({ open, toggle, traitsToEdit = null, updateData }) => {
  const dispatch = useAppDispatch()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [StudentData] = useStudent()


  useEffect(() => {

    dispatch(fetchClasses({page: 1, limit: 300, key: ''}))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))

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
    resolver: yupResolver(affectiveTraitsSchema)
  })

  const handleClose = () => {
    toggle()
    reset()
  }

  const onSubmit = async (data) => {

      const payload = {
        studentId: Number(data.studentId),
        sessionId: Number(data.sessionId),
        classId: Number(data.classId),
        punctuality: Number(data.punctuality),
        mentalAlertness: Number(data.mentalAlertness),
        attentiveness: Number(data.attentiveness), 
        respect: Number(data.respect),
        neatness: Number(data.neatness),
        politeness: Number(data.politeness),
        honesty: Number(data.honesty),
        relating_with_peers: Number(data.relating_with_peers),
        attitude_to_school: Number(data.attitude_to_school),
        spirit_of_team_work: Number(data.spirit_of_team_work),
        completes_school_work_promptly: Number(data.completes_school_work_promptly),
      }


      createAffectiveTraits(payload).then((res)=>{
          if (res?.data.success){
            toggle()
            handleClose()
            reset()
          }
      })

  }

  const onUpdate = async (data) => {
   
      const payload = {
        studentId: Number(data.studentId),
        sessionId: Number(data.sessionId),
        classId: Number(data.classId),
        punctuality: Number(data.punctuality),
        mentalAlertness: Number(data.mentalAlertness),
        attentiveness: Number(data.attentiveness), 
        respect: Number(data.respect),
        neatness: Number(data.neatness),
        politeness: Number(data.politeness),
        honesty: Number(data.honesty),
        relating_with_peers: Number(data.relating_with_peers),
        attitude_to_school: Number(data.attitude_to_school),
        spirit_of_team_work: Number(data.spirit_of_team_work),
        completes_school_work_promptly: Number(data.completes_school_work_promptly),
      }

      updateAffectiveTraits(traitsToEdit?.id, payload).then((res)=>{
          if (res?.data.success){
            toggle()
            handleClose()
            reset()
            updateData()
          }
      })


    
  }

  useEffect(() => {
    if (traitsToEdit !== null) {
      Number(setValue('studentId', traitsToEdit.studentId)),
      Number(setValue('sessionId', traitsToEdit.sessionId)),
      Number(setValue('classId', traitsToEdit.classId)),
      setValue('punctuality', traitsToEdit.punctuality),
      setValue('mentalAlertness', traitsToEdit.mentalAlertness),
      setValue('attentiveness', traitsToEdit.attentiveness),
      setValue('respect', traitsToEdit.respect),
      setValue('neatness', traitsToEdit.neatness),
      setValue('politeness', traitsToEdit.politeness),
      setValue('honesty', traitsToEdit.honesty),
      setValue('relating_with_peers', traitsToEdit.relating_with_peers),
      setValue('attitude_to_school', traitsToEdit.attitude_to_school),
      setValue('spirit_of_team_work', traitsToEdit.spirit_of_team_work),
      setValue('completes_school_work_promptly', traitsToEdit.completes_school_work_promptly)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traitsToEdit])

  return (
    <Dialog
    fullWidth
    open={open}
    maxWidth='md'
    scroll='body'

    //   TransitionComponent={Transition}
    sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 900} }}
  >
      <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5'>{traitsToEdit ? 'Edit Student Affective Traits' : 'Add Student Affective Traits'}</Typography>
        </DialogTitle>


    <DialogContent
      sx={{
        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
      }}
    >
      <CustomCloseButton onClick={toggle}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>

      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(traitsToEdit ? onUpdate : onSubmit)}>
        <Grid container spacing={6}>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='studentId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                select
                label='Student'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.studentId)}
                {...(errors.studentId && { helperText: errors.studentId.message })}
              >
                {StudentData?.result?.map((item)=>{ 
                   return  (
                <MenuItem key={item.id} value={item.id} sx={{textTransform: 'uppercase'}}>{`${item?.firstName} ${item?.lastName}`}</MenuItem>
                )})}

                </CustomTextField>
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='classId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                select
                label='Class'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.classId)}
                {...(errors.classId && { helperText: errors.classId.message })}
              >
                {ClassesList?.map((item)=>{ 
                   return  (
                <MenuItem key={item.id} value={item.id} sx={{textTransform: 'uppercase'}}>{`${item?.name} ${item?.type}`}</MenuItem>
                )})}

                </CustomTextField>
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='sessionId'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                select
                label='Session'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.sessionId)}
                {...(errors.sessionId && { helperText: errors.sessionId.message })}
              >
                {SessionData?.map((item)=>{ 
                   return  (
                <MenuItem key={item.id} value={item.id} sx={{textTransform: 'uppercase'}}>{`${item?.name} ${item?.term} term`}</MenuItem>
                )})}

                </CustomTextField>
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}> 
          <Controller
            name='punctuality'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                required
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Punctuality'
                onChange={onChange}
                error={Boolean(errors.punctuality)}
                {...(errors.punctuality && { helperText: errors.punctuality.message })}
              />
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='mentalAlertness'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Mental Alertness'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.mentalAlertness)}
                {...(errors.mentalAlertness && { helperText: errors.mentalAlertness.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='attentiveness'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Attentiveness'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.attentiveness)}
                {...(errors.attentiveness && { helperText: errors.attentiveness.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='respect'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Respect'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.respect)}
                {...(errors.respect && { helperText: errors.respect.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='neatness'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Neatness'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.neatness)}
                {...(errors.neatness && { helperText: errors.neatness.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='politeness'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Politeness'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.politeness)}
                {...(errors.politeness && { helperText: errors.politeness.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='honesty'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Honesty'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.honesty)}
                {...(errors.honesty && { helperText: errors.honesty.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='relating_with_peers'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Relating With Peers'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.relating_with_peers)}
                {...(errors.relating_with_peers && { helperText: errors.relating_with_peers.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='attitude_to_school'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Attitude to School'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.attitude_to_school)}
                {...(errors.attitude_to_school && { helperText: errors.attitude_to_school.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>    
          <Controller
            name='spirit_of_team_work'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Teamwork Spirit'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.spirit_of_team_work)}
                {...(errors.spirit_of_team_work && { helperText: errors.spirit_of_team_work.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>    
          <Controller
            name='completes_school_work_promptly'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Promptness to School Work Completion'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.completes_school_work_promptly)}
                {...(errors.completes_school_work_promptly && { helperText: errors.completes_school_work_promptly.message })}
              />
               
            )}
          />
          </Grid>

          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
            <Button type='submit' variant='contained' >
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {traitsToEdit ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
      </DialogContent>

    </Dialog>
  )
}

export default ManageAffectiveTraits
