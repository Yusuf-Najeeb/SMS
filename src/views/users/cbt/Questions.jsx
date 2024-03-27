// ** React Imports
import { useState, useEffect, Fragment } from 'react'

import { Controller } from 'react-hook-form'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Components
import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'
import { Button, CircularProgress, FormControlLabel, FormGroup, Grid, Switch, Typography } from '@mui/material'

const Questions = ({ direction, numberOfQuestions, errors, control, setQuestions }) => {

   

     // ** States
  const [loaded, setLoaded] = useState(false)
  const [saved, setSaved] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showObjectives, setShowObjectives] = useState([])
  const [formData, setFormData] = useState(Array.from({ length: numberOfQuestions }, () => ({})));

  const handleAddQuestions = () => {
    const newQuestions = formData.map(data => ({
      question: data.question || '',
      ...(data.optionA) && {optionA : data.optionA},
      ...(data.optionB) && {optionB : data.optionB},
      ...(data.optionC) && {optionC : data.optionC},
      ...(data.optionD) && {optionD : data.optionD},
      ...(data.answer) && {answer : data.answer},
      value: Number(data.value) || '',
      type: data.optionA ? 'objective' :'essay'
    }));

    
    setQuestions(newQuestions);

    setSaved(true)

    setTimeout(()=>{setSaved(false)},1500)
  };

  const handleInputChange = (index, field, value) => {
    setFormData(prevState => {
      const newData = [...prevState];
      newData[index] = { ...newData[index], [field]: value };

      return newData;
    });
  };


  // ** Hook
  const [sliderRef, instanceRef] = useKeenSlider({
    rtl: direction === 'rtl',
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  useEffect(() => {
    setShowObjectives(new Array(numberOfQuestions).fill(false));
  }, [numberOfQuestions]);

  const handleSwitchChange = (index) => {
    setShowObjectives(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = !prevState[index];

      return updatedState;
    });
  };



//    // Dynamically generate slides based on numberOfQuestions
   const slides = Array.from({ length: numberOfQuestions }, (_, index) => (
    <Box key={index} className='keen-slider__slide'>
        
        <Grid container spacing={6} sx={{width: '80%', margin: '0 auto'}} >
        <FormGroup row>
            <FormControlLabel
              value='start'
              label= {'Essay'}
              labelPlacement='start'
              sx={{ mr: 4 }}
              control={<Switch checked={showObjectives[index]} onChange={() => handleSwitchChange(index)}  />}
            />
          </FormGroup>
       
        <Grid item xs={12} sm={12}>
        <Controller
                    name={`questions[${index}].question`}
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
                        placeholder="What is the capital of Nigeria"
                        onChange={(e) => {
                  handleInputChange(index, 'question', e.target.value);
                  
                }}
                aria-describedby='stepper-linear-personal-question-helper'
                id={`question-${index}`}
                error={Boolean(errors?.questions?.[index]?.question)}
                helperText={errors?.questions?.[index]?.question?.message}
                      />
                      
                    )}
                  />
                  </Grid>

                  {!showObjectives[index] && ( 
                    
                    <Fragment>

<Grid item xs={12} sm={6}>
        <Controller
                    name={`questions[${index}].optionA`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        multiline
                        rows={2}
                        fullWidth
                        placeholder="Lagos"
                        required
                        value={value}
                        label='Option A'
                        onChange={(e) => {
                            handleInputChange(index, 'optionA', e.target.value);
                          }}
                          aria-describedby='stepper-linear-personal-optionA-helper'
                          id={`question-${index}`}
                          error={Boolean(errors?.questions?.[index]?.optionA)}
                          helperText={errors?.questions?.[index]?.optionA?.message}
                      />
                      
                    )}
                  />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
                    name={`questions[${index}].optionB`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        multiline
                        rows={2}
                        fullWidth
                        required
                        value={value}
                        placeholder="FCT"
                        label='Option B'
                        onChange={(e) => {
                            handleInputChange(index, 'optionB', e.target.value);
                          }}
                          aria-describedby='stepper-linear-personal-optionB-helper'
                          id={`question-${index}`}
                          error={Boolean(errors?.questions?.[index]?.optionB)}
                          helperText={errors?.questions?.[index]?.optionB?.message}
                      />
                      
                    )}
                  />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
                    name={`questions[${index}].optionC`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        multiline
                        rows={2}
                        fullWidth
                        required
                        value={value}
                        placeholder="Abuja"
                        label='Option C'
                        onChange={(e) => {
                            handleInputChange(index, 'optionC', e.target.value);
                          }}
                          aria-describedby='stepper-linear-personal-optionC-helper'
                          id={`question-${index}`}
                          error={Boolean(errors?.questions?.[index]?.optionC)}
                          helperText={errors?.questions?.[index]?.optionC?.message}
                      />
                      
                    )}
                  />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
                    name={`questions[${index}].optionD`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        multiline
                        rows={2}
                        fullWidth
                        required
                        value={value}
                        placeholder="Lokoja"
                        label='Option D'
                        onChange={(e) => {
                            handleInputChange(index, 'optionD', e.target.value);
                          }}
                          id={`question-${index}`}
                          error={Boolean(errors?.questions?.[index]?.optionD)}
                          helperText={errors?.questions?.[index]?.optionD?.message}
                        aria-describedby='stepper-linear-personal-optionD-helper'
                      />
                      
                    )}
                  />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
                    name={`questions[${index}].answer`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        multiline
                        rows={2}
                        fullWidth
                        required
                        value={value}
                        placeholder="Abuja"
                        label='Answer'
                        onChange={(e) => {
                            handleInputChange(index, 'answer', e.target.value);
                          }}
                          id={`question-${index}`}
                          error={Boolean(errors?.questions?.[index]?.answer)}
                          helperText={errors?.questions?.[index]?.answer?.message}
                        aria-describedby='stepper-linear-personal-answer-helper'
                      />
                      
                    )}
                  />
      </Grid>
      </Fragment>
)}

      <Grid item xs={12} sm={!showObjectives[index] ? 6 : 12}>
        <Controller
                    name={`questions[${index}].value`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        multiline
                        rows={2}
                        fullWidth
                        required
                        value={value}
                        placeholder="2"
                        label='Mark'
                        onChange={(e) => {
                            handleInputChange(index, 'value', e.target.value);
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

      {/* {saved && <Typography className="saveQuestionSuccess" sx={{color: 'text.primary', backgroundColor: 'error.light'}}>
            Questions Saved
        </Typography>} */}

      {index === (numberOfQuestions -1) && 

      <Box sx={{  mt: '30px', mb: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      {/* <Button
                type='button'
                variant='o'
                sx={{backgroundColor: 'warning.main'}}
              >
                 Edit
              </Button> */}
              <Button
                type='button'
                variant='contained'
                disabled={saved}
                onClick={handleAddQuestions}
                sx={{backgroundColor: 'info.main'}}
              >
                 {saved ? "Questions Saved"  : "Save Questions"}
              </Button>
            </Box>
 }
    </Box>
  ));

  return (
    <>
      <Box className='navigation-wrapper'>
        <Box ref={sliderRef} className='keen-slider'> 
          {slides}
        </Box>
        {loaded && instanceRef.current && (
          <>
            <Icon
              icon='tabler:chevron-left'
              className={clsx('arrow arrow-left', {
                'arrow-disabled': currentSlide === 0
              })}
              onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
            />

            <Icon
              icon='tabler:chevron-right'
              className={clsx('arrow arrow-right', {
                'arrow-disabled': currentSlide === instanceRef.current.track.details.slides.length - 1
              })}
              onClick={e => e.stopPropagation() || instanceRef.current?.next()}
            />
          </>
        )}
      </Box>
      {loaded && instanceRef.current && (
        <Box className='swiper-dots'>
          {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
            return (
              <Badge
                key={idx}
                variant='dot'
                component='div'
                className={clsx({
                  active: currentSlide === idx
                })}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
              ></Badge>
            )
          })}
        </Box>
      )}
    </>
  )
}

export default Questions
