// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import staff from '../../src/store/apps/staff'
import student from '../../src/store/apps/Student'
import auth from   'src/store/apps/auth'
import guardian from 'src/store/apps/guardian'
import income from 'src/store/apps/income'
import incomeCategory from 'src/store/apps/incomeCategory'
import expenditure from 'src/store/apps/expenditure'
import expenditureCategory from 'src/store/apps/expenditureCategory'
import settings from 'src/store/apps/settings'
import categories from 'src/store/apps/categories'
import subjects from 'src/store/apps/subjects'
import classes from 'src/store/apps/classes'
import states from 'src/store/apps/states'
import rooms from 'src/store/apps/rooms'
import gradingParameters from 'src/store/apps/gradingParameters'
import session from 'src/store/apps/session'
import currentSession from 'src/store/apps/currentSession'
import timetable from 'src/store/apps/timetable'
import payslip from 'src/store/apps/payslip'
import deductions from 'src/store/apps/deductions'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    staff,
    student,
    auth,
    guardian,
    income,
    incomeCategory,
    expenditure,
    expenditureCategory,
    settings,
    categories,
    subjects,
    classes,
    states, 
    rooms,
    gradingParameters,
    session,
    currentSession,
    timetable,
    payslip,
    deductions
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
