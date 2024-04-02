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
import { ButtonStyled } from '../../../@core/components/mui/button/ButtonStyledComponent'

import {  CircularProgress,  MenuItem, Typography } from '@mui/material'

// ** Store & Actions Imports
import { useDispatch } from 'react-redux'

import DatePicker from 'react-datepicker'

import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateQuestionsSchema } from 'src/@core/Formschema'

import { fetchCategories } from '../../../store/apps/categories/asyncthunk'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'
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
import {  updateQuestion } from '../../../store/apps/cbt/asyncthunk'
import { notifyWarn } from '../../../@core/components/toasts/notifyWarn'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import axios from 'axios'

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
  question: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  value: '',
  answer: ''
}

const EditQuestion = ({ open, closeModal, questionToEdit, fetchQuestions }) => {
  const [fileName, setFileName] = useState('')
  const [fileUploadRes, setFileUploadRes] = useState(null)
  const [submittingQuestionResource, setSubmittingQuestionResource] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const [StaffData] = useStaff()
  const [CategoriesData] = useCategories()
  const [SubjectsList] = useSubjects()
  const [ClassesList] = useClasses()
  const [SessionData] = useSession()

  const handleChangeClass = e => setClassRoomId(Number(e.target.value))

  const handleFileChange = async e => {
    const fileInput = e.target

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]

      setFileName(file.name)

      const fileSize = file.size / 1024 / 1024 // in MB

      if (fileSize > 10) {
        notifyWarn('FILE ERROR', 'File size should not exceed 10MB.')
      } else {
        try {
          const formData = new FormData()
          formData.append('file', file)
          setSubmittingQuestionResource(true)

          const response = await axios.post('upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data;'
            }
          })

          if (response.data.success) {
            notifySuccess('Question File Upload successful')
            setFileUploadRes(response?.data?.data?.url)

            setSubmittingQuestionResource(false)
          } else {
            notifyError('Question File Upload Failed')
          }
        } catch (error) {
          notifyError(error?.response ? error?.response.data.message : 'Question File upload failed, try again')
          setSubmittingQuestionResource(false)
        }
      }
    } else {
      notifyWarn('FILE ERROR', 'No file selected.')
    }
  }

  useEffect(() => {
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))
    dispatch(fetchSubjects({ page: 1, limit: 300, categoryId: '' }))
    dispatch(fetchClasses({ page: 1, limit: 300, key: '' }))
    dispatch(fetchSession({ page: 1, limit: 300 }))
    dispatch(fetchCategories({ page: 1, limit: 300, type: 'assessment' }))
    dispatch(fetchStudents({ page: 1, limit: 3000, key: '' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (questionToEdit) {
      const dateDue = questionToEdit.dueDate

      Number(setValue('categoryId', questionToEdit.categoryId))
      Number(setValue('staffId', questionToEdit.staffId))
      Number(setValue('subjectId', questionToEdit.subjectId))
      Number(setValue('sessionId', questionToEdit.sessionId))
      Number(setValue('classId', questionToEdit.classId))
      setValue('question', questionToEdit.question)
      setValue('optionA', questionToEdit.optionA)
      setValue('optionB', questionToEdit.optionB)
      setValue('optionC', questionToEdit.optionC)
      setValue('optionD', questionToEdit.optionD)
      setValue('answer', questionToEdit.answer)
      Number(setValue('value', questionToEdit.value))

      setValue('dueDate', new Date(dateDue?.slice(0, 10)))
      setValue('dueTime', dateDue?.slice(11, 16))
    }

    // eslint-disable-next-line
  }, [questionToEdit])

  const {
    control,
    setValue,
    getValues,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(updateQuestionsSchema) })

  // Watch all input fields and track changes
  const watchedFields = watch()

  const onSubmit = async data => {
    // Monitor changed input fields so that only changed fields are submitted
    const changedFields = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== questionToEdit[key]) {
        acc[key] = value
      }

      return acc
    }, {})

    console.log(changedFields, 'changed fields')

    const formattedDueDate = formatDateToYYYMMDDD(data.dueDate)
    const dueDate = `${formattedDueDate} ${data.dueTime}`

    let payload = {
      dueDate,
      ...(changedFields.hasOwnProperty('question') && { question: changedFields.question }),
      ...(changedFields.hasOwnProperty('optionA') && { optionA: changedFields.optionA }),
      ...(changedFields.hasOwnProperty('optionB') && { optionB: changedFields.optionB }),
      ...(changedFields.hasOwnProperty('optionC') && { optionC: changedFields.optionC }),
      ...(changedFields.hasOwnProperty('optionD') && { optionD: changedFields.optionD }),
      ...(changedFields.hasOwnProperty('answer') && { answer: changedFields.answer }),
      ...(changedFields.hasOwnProperty('value') && { value: Number(changedFields.value) }),
      ...(changedFields.hasOwnProperty('staffId') && { staffId: Number(changedFields.staffId) }),
      ...(changedFields.hasOwnProperty('subjectId') && { subjectId: Number(changedFields.subjectId) }),
      ...(changedFields.hasOwnProperty('classId') && { classId: Number(changedFields.classId) }),
      ...(changedFields.hasOwnProperty('sessionId') && { sessionId: Number(changedFields.sessionId) }),
      ...(changedFields.hasOwnProperty('categoryId') && { categoryId: Number(changedFields.categoryId) }),
      ...(fileUploadRes && { resource: fileUploadRes })
    }

    updateQuestion(questionToEdit?.id, payload).then(res => {
      if (res?.data?.success) {
        reset()
        closeModal()
        fetchQuestions()
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
                          <MenuItem key={item?.id} value={item?.id} sx={{ textTransform: 'uppercase' }}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid item xs={12} sm={6}>
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

                <Grid container spacing={6} sx={{ width: '80%', margin: '0 auto' }}>
                  {/* <Grid
          item
          xs={12}
          sm={6}
          sx={{ mb: 6, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        > */}

                  <Grid item xs={12} sm={3}>
                    <Box
                      sx={{
                        border: '3px dotted black',
                        borderRadius: 3,
                        p: 3,
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      <ButtonStyled component='label' variant='contained' htmlFor={`upload-file`}>
                        <input
                          hidden
                          type='file'
                          accept='application/pdf'
                          onChange={e => handleFileChange(e)}
                          id={`upload-file`}
                        />

                        <Icon
                          icon={submittingQuestionResource ? 'line-md:uploading-loop' : 'tabler:upload'}
                          fontSize='1.75rem'
                        />
                      </ButtonStyled>
                      <Typography variant='body2' sx={{ mt: 2 }}>
                        Upload Question Resource (Pdf)
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={9}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        mt: 10
                      }}
                    >
                      <Typography variant='body1'>{fileName}</Typography>
                    </Box>
                  </Grid>

                  {/* </Grid> */}

                  <Grid item xs={12} sm={12}>
                    <Controller
                      name={`question`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          multiline
                          rows={2}
                          fullWidth
                          required
                          value={value}
                          label='Question'
                          placeholder='What is the capital of Nigeria'
                          onChange={e => {
                            onChange(e)
                          }}
                          aria-describedby='stepper-linear-personal-question-helper'
                          id={`question`}
                          error={Boolean(errors?.question)}
                          helperText={errors?.question?.message}
                        />
                      )}
                    />
                  </Grid>

                  {questionToEdit.type == 'objective' && (
                    <Fragment>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name={`optionA`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <CustomTextField
                              multiline
                              rows={2}
                              fullWidth
                              placeholder='Lagos'
                              value={value}
                              label='Option A'
                              onChange={e => {
                                onChange(e)
                              }}
                              aria-describedby='stepper-linear-personal-optionA-helper'
                              id={`optionA`}
                              error={Boolean(errors?.optionA)}
                              helperText={errors?.optionA?.message}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Controller
                          name={`optionB`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <CustomTextField
                              multiline
                              rows={2}
                              fullWidth
                              value={value}
                              placeholder='FCT'
                              label='Option B'
                              onChange={e => {
                                onChange(e)
                              }}
                              aria-describedby='stepper-linear-personal-optionB-helper'
                              id={`optionB`}
                              error={Boolean(errors?.optionB)}
                              helperText={errors?.optionB?.message}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Controller
                          name={`optionC`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <CustomTextField
                              multiline
                              rows={2}
                              fullWidth
                              value={value}
                              placeholder='Abuja'
                              label='Option C'
                              onChange={e => {
                                onChange(e)
                              }}
                              aria-describedby='stepper-linear-personal-optionC-helper'
                              id={`optionC`}
                              error={Boolean(errors?.optionC)}
                              helperText={errors?.optionC?.message}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Controller
                          name={`optionD`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <CustomTextField
                              multiline
                              rows={2}
                              fullWidth
                              value={value}
                              placeholder='Lokoja'
                              label='Option D'
                              onChange={e => {
                                onChange(e)
                              }}
                              id={`optionD`}
                              error={Boolean(errors?.optionD)}
                              helperText={errors?.optionD?.message}
                              aria-describedby='stepper-linear-personal-optionD-helper'
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Controller
                          name={`answer`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <CustomTextField
                              multiline
                              rows={2}
                              fullWidth
                              value={value}
                              placeholder='Abuja'
                              label='Answer'
                              onChange={e => {
                                onChange(e)
                                handleInputChange('answer', e.target.value)
                              }}
                              id={`answer`}
                              error={Boolean(errors?.optionB)}
                              helperText={errors?.optionB?.message}
                              aria-describedby='stepper-linear-personal-answer-helper'
                            />
                          )}
                        />
                      </Grid>
                    </Fragment>
                  )}

                  <Grid item xs={12} sm={questionToEdit.type == 'objective' ? 6 : 12}>
                    <Controller
                      name={`value`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          multiline
                          rows={2}
                          fullWidth
                          required
                          value={value}
                          placeholder='2'
                          label='Mark'
                          onChange={e => {
                            onChange(e)
                          }}
                          id='stepper-linear-personal-paymentMode'
                          error={Boolean(errors.value)}
                          aria-describedby='stepper-linear-personal-value-helper'
                          {...(errors.value && { helperText: errors.value.message })}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>

            <Box sx={{ mt: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button type='submit' variant='contained' disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={20} color='secondary' sx={{ ml: 3 }} /> : 'Update'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default EditQuestion
