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
import { fetchClassTimetable } from '../../../store/apps/timetable/asyncthunk';
import { useClassTimetable } from '../../../hooks/useClassTimeTable';
import { useCurrentSession } from '../../../hooks/useCurrentSession';
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk';
import { useStaff } from '../../../hooks/useStaff';

import { handleSelectPeriod } from '../../../store/apps/timetable';
import EditPeriod from './EditPeriod';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


  const calendarsColor = {
    Personal: 'error',
    Business: 'primary',
    Family: 'warning',
    Holiday: 'success',
    ETC: 'info'
  }


export default function ViewTimeTable({open, handleClose, ClassRoom}) {

    // ** Hooks
  const { settings } = useSettings()
  const dispatch = useAppDispatch()
  const { skin, direction } = settings

  const [editPeriodSidebarOpen, setEditPeriodSidebarOpen] = useState(false)

  const handleEditEventSidebarToggle = () => {
    // handleClose()
    setEditPeriodSidebarOpen(!editPeriodSidebarOpen)
  }

  const [TimetableData] = useClassTimetable()
  const [CurrentSessionData] = useCurrentSession()
  const [StaffData] = useStaff()

  useEffect(()=>{
    dispatch(fetchCurrentSession())
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  useEffect(() => {
    if (ClassRoom && CurrentSessionData) {
     
      dispatch(fetchClassTimetable({classId: ClassRoom?.id, sessionId: CurrentSessionData?.id }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ClassRoom, CurrentSessionData])


  return (
    <Fragment>

      {!editPeriodSidebarOpen ? 
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        
        <AppBar sx={{ position: 'relative', }}>
          <Toolbar>
            
            <Typography sx={{ ml: 2, flex: 1 }} variant="h3" component="div">
              {`${ClassRoom?.name} Timetable`}
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


<Calendar
            store={TimetableData}
            direction={direction}
            teachersData={StaffData?.result}
            calendarsColor={calendarsColor}
            handleEditEventSidebarToggle={handleEditEventSidebarToggle}
            handleSelectEvent={handleSelectPeriod}
            
          />


      </Dialog>
        :
           <EditPeriod open={editPeriodSidebarOpen} toggle={handleEditEventSidebarToggle} /> 
          }
    </Fragment>
  );
}

