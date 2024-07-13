import {Fragment, forwardRef, useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import { fetchClassTimeTable } from '../../../store/apps/timetable/asyncthunk';
import { Box } from '@mui/material';
import GetUserData from '../../../@core/utils/getUserData';
import { useClasses } from '../../../hooks/useClassess';
import { useAppDispatch } from 'src/hooks'
import { fetchClasses } from '../../../store/apps/classes/asyncthunk';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function ViewStudentTimeTable() {

  const dispatch = useAppDispatch()

  const [ClassesList] = useClasses()

    // ** State
  const [picturePath, setPicturePath] = useState('')

  const [className, setClassName] = useState('')

  const studentInfo = GetUserData()



  useEffect(() => {
    dispatch(fetchClasses({ page: 1, limit: 100, key: '' }))

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (studentInfo) {
      const studentClass = ClassesList?.find((c)=> c.id == studentInfo?.classId)
      const nameOfClass = `${studentClass?.name}${studentClass?.type}`

      setClassName(nameOfClass)

      
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentInfo])

  useEffect(()=>{
    if(className?.length > 0){
      fetchClassTimeTable(className).then((res)=>{

        if(res?.data?.success){
    
            setPicturePath(res?.data?.data?.picture)
        }
      })
    }
  },[className])


  return (
    <Fragment>

        
        <AppBar sx={{ position: 'relative', }}>
          <Toolbar>
            
            <Typography sx={{ ml: 2, flex: 1 }} variant="h3" component="div">
              {className.length < 1 ? 'Timetable' : `${className} Timetable`}
            </Typography>
           
          </Toolbar>
        </AppBar>

            {picturePath ? 
            <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                <img  src={`${backendURL?.replace('api', '')}/${picturePath}`} width={'90%'} height={'90%'}  alt="timetable"  style={{objectFit:'cover', objectPosition: 'center'}} />
            </Box>
    : <Box sx={{width: '100%', height: '100%',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

    <Typography sx={{textTransform: 'uppercase'}}>No timetable uploaded for your class yet</Typography>
</Box>
}


 
    </Fragment>
  );
}

