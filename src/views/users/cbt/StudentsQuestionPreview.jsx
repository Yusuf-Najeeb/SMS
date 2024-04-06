import { Box, Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { styled } from '@mui/material/styles'

import Button from '@mui/material/Button'

// ** Custom Component Import
import Icon from 'src/@core/components/icon'

// ** Styled Components
const Illustration = styled('img')(({ theme }) => ({
    zIndex: 2,

    // display: 'block',
    objectFit: 'cover',
    objectPosition: 'center',

    textAlign: 'center',
    height: 160,

    // [theme.breakpoints.down(1540)]: {
    //   maxHeight: 130
    // },
    // [theme.breakpoints.down('lg')]: {
    //   maxHeight: 110
    // }
  }))

  const StyledBox = styled('div')(({ theme }) => ({
    height: '200px',
    width: '200px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: '20px 10px',
    borderRadius: '10px',
    background: '#f5eedd;',
    flexDirection: 'column'
  }))

const StudentsQuestionPreview = ({setShowQuestionsPreview, subjectName, assessmentCategory, Questions, setStartCbt}) => {

    const proceedToQuestion = ()=> {
        setShowQuestionsPreview(false)
        setStartCbt(true)
    }

  return (
     <Fragment>
    {/* <Box  sx={{ mt: 10, p: 5, pb: 15, background: '#f5eedd' , borderRadius: 1}}> */}
    <Box  sx={{ mt: 10, p: 5, pb: 15, background: '#fff' , borderRadius: 1}}>

        {Questions.length > 0 ? 
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px auto 25px auto'  }}>
            <Illustration alt='exam-illustration' src={`/images/teacher.svg`} />
                 </Box>
            : 
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  margin: '40px auto 25px auto' }}>
            <Icon icon='fluent:tag-error-24-regular' fontSize='4.25rem' color='#d31f21' />
          </Box>
        }

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '0 auto'  }}>
            <Typography sx={{color: '#000'}}>Subject: <Box component={'span'} sx={{ fontWeight: 600, ml: 1, textTransform: 'uppercase' }}>
              {subjectName}
            </Box></Typography>

            <Typography sx={{color: '#000'}}>Assessment Category: <Box component={'span'} sx={{ fontWeight: 600, ml: 1 , textTransform: 'uppercase'}}>
              {assessmentCategory}
            </Box></Typography>
                 </Box>

            {Questions?.length > 0 ?  

                <Fragment>
                 <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', maxWidth: '60%', margin: '35px auto',  }}>
           <Box component={StyledBox}>
           <Icon icon={'healthicons:i-exam-multiple-choice'} fontSize={'35px'} color='#ff7b00' />

           <Typography sx={{color: '#000', fontSize: '35px', fontFamily: 'cursive'}}>1</Typography>
           <Typography sx={{color: '#000', fontSize: '13px'}}>Chosen Subject</Typography>
           </Box>

           <Box component={StyledBox}>
           <Icon icon={'mingcute:question-fill'} fontSize={'35px'} color='#ff7b00' />

           <Typography sx={{color: '#000', fontSize: '35px', fontWeight: 400, fontFamily: 'cursive'}} >{Questions?.length}</Typography>
           <Typography sx={{color: '#000', fontSize: '13px'}}>Questions Ready</Typography>
           </Box>

           <Box component={StyledBox}>
           <Icon icon={'ri:time-fill'} fontSize={'35px'} color='#ff7b00' />

           <Typography sx={{color: '#000', fontSize: '35px', fontFamily: 'cursive'}} >0</Typography>
           <Typography sx={{color: '#000', fontSize: '13px'}}>Timer</Typography>
           </Box>

                 </Box>

                 <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px', maxWidth: '60%', margin: '35px auto',  }}>
                 <Typography sx={{color: '#000', fontSize: '20px', fontFamily: 'fantasy'}} >Don't just stand on the sidelines, step into the game. Are you ready for the challenge ? </Typography>

                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', mt: '40px' }}>
          <Button type='button' variant='contained' sx={{backgroundColor: '#ff7b00'}} onClick={proceedToQuestion} >
              Start
            </Button>
            </Box>
                 </Box>

                 </Fragment>

            : 

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  margin: '40px auto 25px auto' }}>
            
            <Typography sx={{color: '#000', fontSize: '18px',}} >No CBT questions set for this subject and assessment category. CONTACT YOUR TEACHER </Typography>
          </Box>

        }
        </Box>
        </Fragment>
  )
}

export default StudentsQuestionPreview