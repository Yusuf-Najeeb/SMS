import {Fragment, forwardRef, useState, useEffect} from 'react';
import Slide from '@mui/material/Slide';
import { useAppDispatch } from 'src/hooks'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

import Calendar from '../../apps/calendar/StudentCalendar';
import { fetchCurrentSession } from '../../../store/apps/currentSession/asyncthunk';
import { fetchClassTimetable } from '../../../store/apps/timetable/asyncthunk';
import { useClassTimetable } from '../../../hooks/useClassTimeTable';
import { useCurrentSession } from '../../../hooks/useCurrentSession';
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk';
import { useStaff } from '../../../hooks/useStaff';
import GetUserData from '../../../@core/utils/getUserData';


const userData = GetUserData()


  const calendarsColor = {
    Personal: 'error',
    Business: 'primary',
    Family: 'warning',
    Holiday: 'success',
    ETC: 'info'
  }


export default function ViewStudentTimeTable() {

    // ** Hooks
  const { settings } = useSettings()
  const dispatch = useAppDispatch()
  const { skin, direction } = settings
  const [TimetableData] = useClassTimetable()
  const [CurrentSessionData] = useCurrentSession()
  const [StaffData] = useStaff()



  

  useEffect(()=>{
    dispatch(fetchCurrentSession())
    dispatch(fetchStaffs({ page: 1, limit: 300, key: 'teacher' }))

    // eslint-disable-next-line 
  },[])



  useEffect(() => {
    if (userData && CurrentSessionData) {
     
      dispatch(fetchClassTimetable({classId: userData?.classId, sessionId: CurrentSessionData?.id }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ CurrentSessionData, userData])


  return (
    <Fragment>



<Calendar
            store={TimetableData}
            direction={direction}
            teachersData={StaffData?.result}
            calendarsColor={calendarsColor}
            
          />

       
    </Fragment>
  );
}

