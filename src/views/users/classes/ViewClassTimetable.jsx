import {Fragment, forwardRef, useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Icon from 'src/@core/components/icon'
import Slide from '@mui/material/Slide';
import { useAppDispatch } from 'src/hooks'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

import Calendar from '../../apps/calendar/Calendar';
import { fetchCurrentSession } from '../../../store/apps/currentSession/asyncthunk';
import { fetchClassTimeTable, fetchClassTimetable } from '../../../store/apps/timetable/asyncthunk';
import { useClassTimetable } from '../../../hooks/useClassTimeTable';
import { useCurrentSession } from '../../../hooks/useCurrentSession';
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk';
import { useStaff } from '../../../hooks/useStaff';

import { handleSelectPeriod } from '../../../store/apps/timetable';
import EditPeriod from './EditPeriod';
import { Box } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function ViewClassTimeTable({open, handleClose, selectedClass}) {

    // ** State
  const [picturePath, setPicturePath] = useState('')

  const className = `${selectedClass.name}${selectedClass.type}`






  useEffect(() => {
    if (selectedClass) {
     
      fetchClassTimeTable(className).then((res)=>{

        if(res?.data?.success){
            console.log(res, 'res')
    
            setPicturePath(res?.data?.data?.picture)
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass])


  return (
    <Fragment>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        
        <AppBar sx={{ position: 'relative', }}>
          <Toolbar>
            
            <Typography sx={{ ml: 2, flex: 1 }} variant="h3" component="div">
              {`${selectedClass?.name} Timetable`}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Icon icon='tabler:x' fontSize={20} />
            </IconButton>
          </Toolbar>
        </AppBar>

            {picturePath ? 
            <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                <img  src={`${backendURL?.replace('api', '')}/${picturePath}`} width={'90%'} height={'90%'}  alt="timetable"  style={{objectFit:'cover', objectPosition: 'center'}} />
            </Box>
    : <Box sx={{width: '100%', height: '100%',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

    <Typography sx={{textTransform: 'uppercase'}}>No timetable uploaded for this class yet</Typography>
</Box>
}


      </Dialog>
    </Fragment>
  );
}

