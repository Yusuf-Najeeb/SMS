import { useEffect, useState, Fragment } from 'react'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

import { Alert, CircularProgress, MenuItem, Typography } from '@mui/material'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputScoreSchema } from 'src/@core/Formschema'

import FormController from '../component/FormController'
import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { fetchStaffByType, fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchStudentsTakingSubject, fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { fetchClasses, fetchStudentsInClass } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { useStaff } from '../../../hooks/useStaff'
import { useSubjects } from '../../../hooks/useSubjects'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { useCategories } from '../../../hooks/useCategories'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { useStudent } from '../../../hooks/useStudent'
import { saveStudentScore } from '../../../store/apps/reportCard/asyncthunk'
import { useAppSelector } from '../../../hooks'

export const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const defaultValues = {
  score: '',
  maxScore: '',
  categoryId: '',
  staffId: '',
  studentId: '',
  subjectId: '',
  classId: '',
  sessionId: '',
}

const EnterStudentScore = ({ open, closeModal }) => {
  

  const [ClassRoomId, setClassRoomId] = useState()
  const [subjectId, setSubjectId] = useState(null)
  const [teacherId, setTeacherId] = useState(null)
  const [studentsTakingSubject, setStudentsTakingSubject] = useState([])

  // ** Hooks
  const dispatch = useDispatch()
  const StaffData = useAppSelector(store => store.staff.StaffDataByType)
  const [CategoriesData] = useCategories()
  const [SubjectsList] = useSubjects()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()

  const handleChangeClass = (e)=> Number(setClassRoomId(e.target.value))
  const handleChangeSubject = (e)=> Number(setSubjectId(e.target.value))
  const handleChangeTeacher = (e)=> Number(setTeacherId(e.target.value))


  useEffect(() => {
    dispatch(fetchStaffByType({ page: 1, limit: 300, key: '', type: 'teacher' }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    dispatch(fetchClasses({page: 1, limit: 300, key: ''}))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'assessment' }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    if(subjectId && teacherId){
      fetchStudentsTakingSubject(subjectId, teacherId).then((res)=>{
        if(res?.data?.success){
          setStudentsTakingSubject(res?.data?.data)
        }
      })
    }
  },[subjectId, teacherId])

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(inputScoreSchema) })

  const onSubmit = async data => {


    let payload = {
      categoryId: Number(data.categoryId),
      score: Number(data.score),
      maxScore: Number(data.maxScore),
      staffId: Number(data.staffId),
      studentId: Number(data.studentId),
      sessionId: Number(data.sessionId),
      classId: Number(data.classId),
      subjectId: Number(data.subjectId),
    }


    saveStudentScore(payload).then(res => {
      if (res?.data?.success) {
        reset()
        closeModal()
      }
    })
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        open={open}
        maxWidth='md'
        scroll='body'

        //   TransitionComponent={Transition}
        //   sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%', maxWidth: 450 } }}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '95%', maxWidth: 800 } }}
      >
        <DialogContent
          sx={{
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={closeModal}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`
              }}
            >
              <Grid container spacing={6}>
               

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='categoryId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Assessment Category'
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-categoryId'
                        error={Boolean(errors.categoryId)}
                        aria-describedby='stepper-linear-personal-categoryId-helper'
                        {...(errors.categoryId && { helperText: errors.categoryId.message })}
                      >
                        <MenuItem>Select Assessment Category</MenuItem>
                        {CategoriesData?.map(category => (
                          <MenuItem key={category?.id} value={category?.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='classId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Class'
                        onChange={e => {
                          onChange(e)
                          handleChangeClass(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.classId)}
                        aria-describedby='stepper-linear-personal-classId-helper'
                        {...(errors.classId && { helperText: errors.classId.message })}
                      >
                        <MenuItem>Select Class</MenuItem>
                        {ClassesList?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {`${item.name} ${item.type}`}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='subjectId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Subject'
                        onChange={e => {
                          onChange(e)
                          handleChangeSubject(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.subjectId)}
                        aria-describedby='stepper-linear-personal-subjectId-helper'
                        {...(errors.subjectId && { helperText: errors.subjectId.message })}
                      >
                        <MenuItem >Select Subject</MenuItem>
                        {SubjectsList?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='staffId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Subject Teacher'
                        onChange={e => {
                          onChange(e)
                          handleChangeTeacher(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.staffId)}
                        aria-describedby='stepper-linear-personal-staffId-helper'
                        {...(errors.staffId && { helperText: errors.staffId.message })}
                      >
                        <MenuItem>Select Teacher</MenuItem>
                        {StaffData?.result?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {`${item?.firstName} ${item?.lastName}`}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='studentId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Student'
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.studentId)}
                        aria-describedby='stepper-linear-personal-studentId-helper'
                        {...(errors.studentId && { helperText: errors.studentId.message })}
                      >
                        <MenuItem value=''>Select Student Taking Subject</MenuItem>
                        {studentsTakingSubject?.length > 0 ?  studentsTakingSubject?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {`${item.firstName} ${item.lastName}`}
                          </MenuItem>
                        )): 
                        <Typography sx={{textAlign: 'center'}}>No student registered</Typography>
                        }
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='sessionId'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        select
                        fullWidth
                        required
                        value={value}
                        label='Session'
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.sessionId)}
                        aria-describedby='stepper-linear-personal-sessionId-helper'
                        {...(errors.sessionId && { helperText: errors.sessionId.message })}
                      >
                        <MenuItem value=''>Select Session</MenuItem>
                        {SessionData?.map(item => (
                          <MenuItem key={item?.id} value={item?.id} sx={{textTransform: 'uppercase'}} >
                            {`${item.name} ${item.term} term`}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormController
                    name='maxScore'
                    control={control}
                    required={true}
                    requireBoolean={true}
                    label='Maximum Score'
                    error={errors['maxScore']}
                    errorMessage={errors?.maxScore?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormController
                    name='score'
                    control={control}
                    required={true}
                    requireBoolean={true}
                    label='Score'
                    error={errors['score']}
                    errorMessage={errors?.score?.message}
                  />
                </Grid>

              </Grid>
            </DialogContent>

            <Box sx={{  mt: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                type='submit'
                variant='contained'
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Save'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
   
    </Fragment>
  )
}

export default EnterStudentScore
