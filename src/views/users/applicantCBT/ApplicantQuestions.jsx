import React, { Fragment, useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { Box, Card, Divider, Grid, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

// ** Custom Component Import
import { submitAnswers, submitApplicantAnswers } from '../../../store/apps/cbt/asyncthunk'
import GetUserData from '../../../@core/utils/getUserData'

import { ButtonStyled } from '../../../@core/components/mui/button/ButtonStyledComponent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { notifySuccess } from '../../../@core/components/toasts/notifySuccess'
import { notifyError } from '../../../@core/components/toasts/notifyError'
import { notifyWarn } from '../../../@core/components/toasts/notifyWarn'
import axios from 'axios'
import SubmitDialog from '../cbt/SubmitDialog'

const userData = GetUserData()
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

const ApplicantQuestions = ({ Questions, setStartCbt }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [typedAnswers, setTypedAnswers] = useState(Array.from({ length: Questions.length }, () => ''))
  const [submitModal, setSubmitModal] = useState(false)
  const [answers, setAnswers] = useState(Array.from({ length: Questions.length }, () => ({})))
  const [fileName, setFileName] = useState(Array.from({ length: Questions.length }, () => ''))
  const [fileUploadRes, setFileUploadRes] = useState(Array.from({ length: Questions.length }, () => ''))


  const [submittingAnswerResource, setSubmittingAnswerResource] = useState([])

  const currentQuestion = Questions[currentQuestionIndex]


  const doSubmit = value => {
    setSubmitModal(true)
  }

  const doCancelSubmit = () => {
    setSubmitModal(false)
  }

  const onSubmitClick = async () => {
    const payload = {
      applicantId: userData?.id,
      classId: Questions[0].classId,
      subjectId: Questions[0].subjectId,
      categoryId: Questions[0].categoryId,
      sessionId: Questions[0].sessionId,
      answers
    }

    submitApplicantAnswers(payload).then(res => {
      if (res?.data?.success) {
        setStartCbt(false)
        doCancelSubmit()
      }
    })
  }

  const handleOptionChange = value => {
    setSelectedOption(value)
    setAnswers(prevState => {
      const newData = [...prevState]
      newData[currentQuestionIndex] = { answer: value, questionId: currentQuestion.id }

      return newData
    })
  }

  const handleInputChange = e => {
    const { value } = e.target

    // Update the typed answer for the corresponding question index
    setAnswers(prevState => {
      const newData = [...prevState]
      newData[currentQuestionIndex] = { answer: value, questionId: currentQuestion.id }

      return newData
    })

    // Update the typed answer for the current question index
    setTypedAnswers(prevTypedAnswers => {
      const newTypedAnswers = [...prevTypedAnswers]
      newTypedAnswers[currentQuestionIndex] = value

      return newTypedAnswers
    })
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex !== 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex !== Questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setCurrentQuestionIndex(0)
    }
  }

  const handleFileChange = async (e, index) => {
    const fileInput = e.target

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0]

      setFileName(prevState => {
        const newData = [...prevState]
        newData[index] = file.name

        return newData
      })

      const fileSize = file.size / 1024 / 1024 // in MB

      if (fileSize > 10) {
        notifyWarn('FILE ERROR', 'File size should not exceed 10MB.')
      } else {
        try {
          const formData = new FormData()
          formData.append('file', file)
          setSubmittingAnswerResource(prevState => {
            const updatedState = [...prevState]
            updatedState[index] = true

            return updatedState
          })

          const response = await axios.post('upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data;'
            }
          })

          if (response?.data?.success) {
            notifySuccess('Answer File Upload Successful')
            setFileUploadRes(prevState => {
              const newData = [...prevState]
              newData[index] = response?.data?.data?.url

              return newData
            })

            setSubmittingAnswerResource(prevState => {
              const updatedState = [...prevState]
              updatedState[index] = false

              return updatedState
            })
            setAnswers(prevState => {
                const newData = [...prevState]
                newData[currentQuestionIndex] = { answer: response?.data?.data?.url, questionId: currentQuestion.id }
          
                return newData
              })
          } else {
            notifyError('Answer File Upload Failed')
          }
        } catch (error) {
          notifyError(error?.response ? error?.response.data.message : 'Answer File upload failed, try again')
          setSubmittingAnswerResource(prevState => {
            const updatedState = [...prevState]
            updatedState[index] = false

            return updatedState
          })
        }
      }
    } else {
      notifyWarn('FILE ERROR', 'No file selected.')
    }
  }

  useEffect(() => {
    // Set the selected option to the answer for the current question when the current question changes
    setSelectedOption(answers[currentQuestionIndex]?.answer)
  }, [currentQuestionIndex, answers])

  useEffect(() => {
    setSubmittingAnswerResource(new Array(Questions?.length).fill(false))
  }, [Questions])

  return (
    <Fragment>
      <Box sx={{ mt: 10, p: 5, pb: 15, background: '#fff' }}>
        <Box>
          <Typography sx={{ color: '#000' }}>
            Question
            <Box component={'span'} sx={{ fontWeight: 600, ml: 1 }}>
              {currentQuestionIndex + 1}/{Questions.length}
            </Box>
          </Typography>

          <Box sx={{ mt: 5, mb: 5, position: 'relative' }}>
            <Box sx={{ height: '1px', backgroundColor: '#3333334d', width: '100%' }}> </Box>
          </Box>

          <Grid container spacing={6} sx={{ width: '100%', margin: '0 auto' }}>
            <Grid item xs={12} sm={12}>
              <Typography sx={{ color: '#000' }}>{currentQuestion.question}</Typography>
            </Grid>

            {currentQuestion?.resource && (
              <Grid item xs={12} sm={12}>
                <embed
                  src={`${backendURL?.replace('api', '')}/${currentQuestion.resource}`}
                  type='application/pdf'
                  width='100%'
                  height='600px'
                />
              </Grid>
            )}

            {currentQuestion.optionA ? (
              [currentQuestion.optionA, currentQuestion.optionB, currentQuestion.optionC, currentQuestion.optionD].map(
                (option, index) => (
                  <Grid item xs={12} sm={12} key={index}>
                    <Box
                      className='option'
                      sx={{
                        border: selectedOption === option ? '1px solid #1be35b' : '1px solid #eee',
                        borderRadius: '5px',
                        p: 3
                      }}
                    >
                      <input
                        type='radio'
                        id={`option-${index}`}
                        name={`option-${currentQuestionIndex}`}
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleOptionChange(option)}
                      />
                      <label htmlFor={`option-${index}`} style={{ color: '#000' }}>
                        {' '}
                        {option}
                      </label>
                    </Box>
                  </Grid>
                )
              )
            ) : (
              <Fragment>
                <Grid item xs={12} sm={12}>
                  <label htmlFor={`answer-${currentQuestion}`} style={{ color: '#000' }}>
                    Your Answer:
                  </label>
                  <textarea
                    rows='5'
                    cols='30'
                    style={{ width: '100%', marginTop: '15px' }}
                    onChange={handleInputChange}
                    name={`answer-${currentQuestion}`}
                    id={`answer-${currentQuestion}`}
                    value={typedAnswers[currentQuestionIndex]}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{ mb: 6, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Grid item xs={12} sm={2}>
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
                      <ButtonStyled component='label' variant='contained' htmlFor={`upload-file-${currentQuestionIndex}`}>
                        <input
                          hidden
                          type='file'
                          accept='application/pdf'
                          onChange={e => handleFileChange(e, currentQuestionIndex)}
                          id={`upload-file-${currentQuestionIndex}`}
                        />

                        <Icon
                          icon={submittingAnswerResource[currentQuestionIndex] ? 'line-md:uploading-loop' : 'tabler:upload'}
                          fontSize='1.75rem'
                        />
                      </ButtonStyled>
                      <Typography variant='body2' sx={{ mt: 2, color: "#000" }}>
                        Upload Answer Resource (Pdf)
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={10}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      alignItems: 'center',
                      alignSelf: 'center'
                    }}
                  >
                    <Typography variant='body2'sx={{color: "#000"}} >{fileName[currentQuestionIndex]}</Typography>
                  </Box>
                  </Grid>
                  </Grid>
              </Fragment>
            )}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', mt: '40px' }}>
            <Button
              type='button'
              variant='contained'
              sx={{ backgroundColor: 'info.main' }}
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </Button>
            {currentQuestionIndex === Questions?.length - 1 ? (
              <Button type='button' variant='contained' sx={{ backgroundColor: 'success.main' }} onClick={doSubmit}>
                Submit
              </Button>
            ) : (
              <Button
                type='button'
                variant='contained'
                sx={{ backgroundColor: 'info.main' }}
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === Questions?.length - 1}
              >
                Next Question
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {submitModal && <SubmitDialog open={submitModal} handleClose={doCancelSubmit} handleSubmit={onSubmitClick} />}
    </Fragment>
  )
}

export default ApplicantQuestions
