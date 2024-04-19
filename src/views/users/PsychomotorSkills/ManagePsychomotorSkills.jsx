// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch } from 'src/hooks'
import { CircularProgress, Dialog, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material'
import { CustomCloseButton } from '../Guardian/AddGuardian'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import {  fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { useStudent } from '../../../hooks/useStudent'
import { psychomotorSkillsSchema } from '../../../@core/FormSchema'
import { createPsychomotorSkills, updatePsychomotorSkills } from '../../../store/apps/psychomotorSkills/asyncthunk'




const defaultValues = {
    studentId: '',
    sessionId: '',
    classId: '',
    reading: '',
    verbal_fluency_diction: '',
    handwriting: '',
    musical_skills: '',
    creative_arts: '',
    physical_education: '',
    general_reasoning: '',
}

const ManagePsychomotorSkills = ({ open, toggle, skillsToEdit = null, updateData }) => {
  const dispatch = useAppDispatch()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()
  const [StudentData] = useStudent()


  useEffect(() => {
    dispatch(fetchStaffs({page: 1, limit: 500, key: 'teacher'}))
    dispatch(fetchCategories({ page: 1, limit: 30, type: 'class' }))
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
    resolver: yupResolver(psychomotorSkillsSchema)
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
        reading: Number(data.reading),
        verbal_fluency_diction: Number(data.verbal_fluency_diction),
        handwriting: Number(data.handwriting), 
        musical_skills: Number(data.musical_skills),
        creative_arts: Number(data.creative_arts),
        physical_education: Number(data.physical_education),
        general_reasoning: Number(data.general_reasoning),
      }


      createPsychomotorSkills(payload).then((res)=>{
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
        reading: Number(data.reading),
        verbal_fluency_diction: Number(data.verbal_fluency_diction),
        handwriting: Number(data.handwriting), 
        musical_skills: Number(data.musical_skills),
        creative_arts: Number(data.creative_arts),
        physical_education: Number(data.physical_education),
        general_reasoning: Number(data.general_reasoning),
      }

      updatePsychomotorSkills(skillsToEdit?.id, payload).then((res)=>{
          if (res?.data.success){
            toggle()
            handleClose()
            reset()
            updateData()
          }
      })


    
  }

  useEffect(() => {
    if (skillsToEdit !== null) {
      Number(setValue('studentId', skillsToEdit.studentId)),
      Number(setValue('sessionId', skillsToEdit.sessionId)),
      Number(setValue('classId', skillsToEdit.classId)),
      setValue('reading', skillsToEdit.reading),
      setValue('verbal_fluency_diction', skillsToEdit.verbal_fluency_diction),
      setValue('handwriting', skillsToEdit.handwriting),
      setValue('musical_skills', skillsToEdit.musical_skills),
      setValue('creative_arts', skillsToEdit.creative_arts),
      setValue('physical_education', skillsToEdit.physical_education),
      setValue('general_reasoning', skillsToEdit.general_reasoning)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillsToEdit])

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
          <Typography variant='h5'>{skillsToEdit ? 'Edit Student Psychomotor Skills' : 'Add Student Psychomotor Skills'}</Typography>
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
        <form onSubmit={handleSubmit(skillsToEdit ? onUpdate : onSubmit)}>
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
            name='reading'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                required
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label='Reading'
                onChange={onChange}
                error={Boolean(errors.reading)}
                {...(errors.reading && { helperText: errors.reading.message })}
              />
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='verbal_fluency_diction'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Verbal Fluency'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.verbal_fluency_diction)}
                {...(errors.verbal_fluency_diction && { helperText: errors.verbal_fluency_diction.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>    
          <Controller
            name='handwriting'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Hand Writing'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.handwriting)}
                {...(errors.handwriting && { helperText: errors.handwriting.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>    
          <Controller
            name='musical_skills'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Musical Skills'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.musical_skills)}
                {...(errors.musical_skills && { helperText: errors.musical_skills.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>    
          <Controller
            name='creative_arts'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Creative Arts'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.creative_arts)}
                {...(errors.creative_arts && { helperText: errors.creative_arts.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>    
          <Controller
            name='physical_education'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='Physical Education'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.physical_education)}
                {...(errors.physical_education && { helperText: errors.physical_education.message })}
              />
               
            )}
          />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>    
          <Controller
            name='general_reasoning'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
              required
                fullWidth
                label='General Reasoning'
                value={value}
                sx={{ mb: 4 }}
                onChange={onChange}
                error={Boolean(errors.general_reasoning)}
                {...(errors.general_reasoning && { helperText: errors.general_reasoning.message })}
              />
               
            )}
          />
          </Grid>

          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
            <Button type='submit' variant='contained' >
              {isSubmitting && <CircularProgress size={20} color='secondary' sx={{ ml: 2 }} />}
              {skillsToEdit ? 'Update' : 'Add'}
            </Button>
          </Box>
        </form>
      </Box>
      </DialogContent>

    </Dialog>
  )
}

export default ManagePsychomotorSkills
