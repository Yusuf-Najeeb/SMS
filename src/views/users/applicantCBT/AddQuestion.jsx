import { useEffect, useState, Fragment } from 'react'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

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
import { useDispatch } from 'react-redux'

import DatePicker from 'react-datepicker'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputQuestionsSchema } from 'src/@core/Formschema'

import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { fetchStaffByType, fetchStaffs } from '../../../store/apps/staff/asyncthunk'
import { fetchSubjects } from '../../../store/apps/subjects/asyncthunk'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk'
import { fetchSession } from '../../../store/apps/session/asyncthunk'
import { useStaff } from '../../../hooks/useStaff'
import { useSubjects } from '../../../hooks/useSubjects'
import { useClasses } from '../../../hooks/useClassess'
import { useSession } from '../../../hooks/useSession'
import { useCategories } from '../../../hooks/useCategories'
import { fetchStudents } from '../../../store/apps/Student/asyncthunk'
import { formatDateToYYYMMDDD } from '../../../@core/utils/format'
import { submitApplicantCBTQuestions, submitQuestions } from '../../../store/apps/cbt/asyncthunk'
import Questions from '../cbt/Questions'
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
  dueDate: '',
  dueTime: '',
  categoryId: '',
  staffId: '',
  subjectId: '',
  classId: '',
  sessionId: '',
  numberOfQuestions: 0,
  question: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  value: '',
  answer: ''
}

const AddApplicantCBTQuestion = ({ open, closeModal }) => {
  const [ClassRoomId, setClassRoomId] = useState()
  const [numberOfQuestions, setNumberOfQuestions] = useState(0)
  const [showQuestions, setShowQuestions] = useState(false)
  const [questions, setQuestions] = useState([])

  // ** Hooks
  const dispatch = useDispatch()
  const StaffData = useAppSelector(store => store.staff.StaffDataByType)
  const [CategoriesData] = useCategories()
  const [SubjectsList] = useSubjects()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()

  const handleChangeNumberfQuestions = e => {
    Number(setNumberOfQuestions(e.target.value))
  }

  const handleChangeClass = e => setClassRoomId(Number(e.target.value))

  useEffect(() => {
    dispatch(fetchStaffByType({ page: 1, limit: 300, key: '', type: 'teacher' }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'assessment' }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(inputQuestionsSchema) })

  const onSubmit = async data => {
    
    const formattedDueDate = formatDateToYYYMMDDD(data.dueDate)
    const dueDate = `${formattedDueDate} ${data.dueTime}`

    let payload = {
      categoryId: Number(data.categoryId),
      staffId: Number(data.staffId),
      sessionId: Number(data.sessionId),
      classId: Number(data.classId),
      subjectId: Number(data.subjectId),
      dueDate,
      questions
    }


    submitApplicantCBTQuestions(payload).then(res => {
      if (res?.data?.success) {
        reset()
        closeModal()
        setNumberOfQuestions(0)
        setShowQuestions(false)
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
        
        sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '95%', maxWidth: 950 } }}
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
                <Grid item xs={12} sm={6}>
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
                        <MenuItem value=''>Select Assessment Category</MenuItem>
                        {CategoriesData?.map(category => (
                          <MenuItem key={category?.id} value={category?.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                        <MenuItem value=''>Select Class</MenuItem>
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
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.subjectId)}
                        aria-describedby='stepper-linear-personal-subjectId-helper'
                        {...(errors.subjectId && { helperText: errors.subjectId.message })}
                      >
                        <MenuItem value=''>Select Subject</MenuItem>
                        {SubjectsList?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
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
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.staffId)}
                        aria-describedby='stepper-linear-personal-staffId-helper'
                        {...(errors.staffId && { helperText: errors.staffId.message })}
                      >
                        <MenuItem value=''>Select Teacher</MenuItem>
                        {StaffData?.result?.map(item => (
                          <MenuItem key={item?.id} value={item?.id}>
                            {`${item?.firstName} ${item?.lastName}`}
                          </MenuItem>
                        ))}
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
                          <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
                            {`${item.name} ${item.term} term`}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='dueDate'
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
                          <CustomTextField
                            fullWidth
                            required
                            value={value}
                            onChange={onChange}
                            label='Due Date *'
                            error={Boolean(errors.dueDate)}
                            {...(errors.dueDate && { helperText: errors.dueDate.message })}
                          />
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='dueTime'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        type='time'
                        fullWidth
                        required
                        value={value}
                        label='Due Time'
                        onChange={e => {
                          onChange(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.dueTime)}
                        aria-describedby='stepper-linear-personal-dueTime-helper'
                        {...(errors.dueTime && { helperText: errors.dueTime.message })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Controller
                    name='numberOfQuestions'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        required
                        value={value}
                        disabled={showQuestions}
                        label='Number of Questions'
                        onBlur={() => {
                          onBlur
                          setShowQuestions(true)
                        }}
                        onChange={e => {
                          handleChangeNumberfQuestions(e)
                          onChange(e)
                        }}
                        id='stepper-linear-personal-paymentMode'
                        error={Boolean(errors.numberOfQuestions)}
                        aria-describedby='stepper-linear-personal-numberOfQuestions-helper'
                        {...(errors.numberOfQuestions && { helperText: errors.numberOfQuestions.message })}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              {showQuestions && (
                <KeenSliderWrapper sx={{ mt: 10 }}>
                  <Typography sx={{ mb: 3, fontWeight: 700 }}>Questions</Typography>
                  <Grid container spacing={6} className='match-height'>
                    <Grid item xs={12}>
                      <Questions
                        numberOfQuestions={numberOfQuestions}
                        errors={errors}
                        control={control}
                        setQuestions={setQuestions}
                      />
                    </Grid>
                  </Grid>
                </KeenSliderWrapper>
              )}

              {!showQuestions && (
                <Typography sx={{ textAlign: 'center', mt: 20, fontSize: '14px' }}>
                  Input a value for Number of Questions to show Questions input field here
                </Typography>
              )}
            </DialogContent>

            <Box sx={{ mt: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button type='submit' variant='contained' disabled={isSubmitting || questions.length < 1}>
                {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Submit'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default AddApplicantCBTQuestion
