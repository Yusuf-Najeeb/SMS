// ** React Import
import { useEffect, useRef, useState } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import interactionPlugin from '@fullcalendar/interaction'

// ** Third Party Style Import
import 'bootstrap-icons/font/bootstrap-icons.css'
import { parseCalendarEvents } from '../../../@core/utils/format'
import { useAppDispatch } from '../../../hooks'

const blankEvent = {
  title: '',
  start: '',
  end: '',
  allDay: false,
  url: '',
  extendedProps: {
    calendar: '',
    guests: [],
    location: '',
    description: ''
  }
}

const Calendar = props => {
  // ** Props
  const {
    store,
    teachersData,
    calendarsColor,
    direction,
  } = props

  const dispatch = useAppDispatch()


  const [calendarEvents, setCalendarEvents] = useState([])

  const [showCalendar, setShowCalendar] = useState(true)

  // ** Refs
  const calendarRef = useRef()

  
useEffect(()=>{
  if(store){
    const parsedEvents = parseCalendarEvents(store, teachersData)

    setCalendarEvents([...parsedEvents])
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
},[store])


  if (showCalendar) {
    const calendarOptions = {
      
      events: calendarEvents,
  
    //  plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
     plugins: [interactionPlugin, dayGridPlugin, bootstrap5Plugin],
     initialView: 'dayGridMonth',
     headerToolbar: {
       start: 'sidebarToggle, prev, next, title',
       end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
     },
     views: {
       week: {
         titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
       }
     },
  
     /*
           Enable dragging and resizing event
           ? Docs: https://fullcalendar.io/docs/editable
         */
     editable: true,
     weekends: false,
  
     /*
           Enable resizing event from start
           ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
         */
     eventResizableFromStart: true,
  
     /*
             Automatically scroll the scroll-containers during event drag-and-drop and date selecting
             ? Docs: https://fullcalendar.io/docs/dragScroll
           */
     dragScroll: true,
  
     /*
             Max number of events within a given day
             ? Docs: https://fullcalendar.io/docs/dayMaxEvents
           */
     dayMaxEvents: 10,

    
  
     /*
             Determines if day names and week names are clickable
             ? Docs: https://fullcalendar.io/docs/navLinks
           */
     navLinks: true,
     eventClassNames({ event: calendarEvent }) {
       // @ts-ignore
       const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
  
       return [
         // Background Color
         `bg-${colorName}`
       ]
     },
    
  
    
     ref: calendarRef,
  
     // Get direction from app state (store)
     direction
   }

    // @ts-ignore
    return <FullCalendar {...calendarOptions} />
  } else {
    return null
  }
}

export default Calendar
