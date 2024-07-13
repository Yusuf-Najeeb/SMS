import { NextRequest, NextResponse } from 'next/server'
import GetUserData from '../../@core/utils/getUserData'

const userData = GetUserData()

const navigation = () => {
  if (userData?.role?.name == 'parent') {
    return [
      {
        sectionTitle: 'Dashboard'
      },
      {
        title: 'Dashboard',
        icon: 'tabler:smart-home',
        path: '/dashboard'
      },
      {
        sectionTitle: 'Applicants'
      },
      {
        title: ' Applicants',
        icon: 'fluent:people-sync-16-filled',
        path: '/apps/applicants'
      },
      {
        sectionTitle: 'Assessment & Results'
      },
      {
        title: 'Result Manager',
        icon: 'healthicons:i-exam-qualification',
        path: '/apps/ward-result-manager'
      }
    ]
  }

  if (userData?.role?.name == 'others') {
    return [
      {
        sectionTitle: 'Applicant Examination'
      },

      {
        title: 'CBT',
        icon: 'healthicons:i-exam-multiple-choice',
        path: '/apps/applicantCBTExam'
      },
      {
        sectionTitle: 'Applicant Examination Result'
      },

      {
        title: 'CBT Result',
        icon: 'healthicons:i-exam-multiple-choice',
        path: '/apps/applicant-cbt-result'
      }
    ]
  }

  if (userData?.role?.name == 'student') {
    return [
      {
        sectionTitle: 'Dashboard'
      },
      {
        title: 'Dashboard',
        icon: 'tabler:smart-home',
        path: '/dashboard'
      },
      {
        sectionTitle: 'Assessment & Results'
      },

      {
        title: 'CBT',
        icon: 'healthicons:i-exam-multiple-choice',
        path: '/apps/cbt'
      },
      {
        title: 'Result Manager',
        icon: 'healthicons:i-exam-qualification',
        path: '/apps/student-result-manager'
      },
      {
        sectionTitle: 'Academics '
      },
      {
        title: 'Time Table',
        icon: 'mdi:timetable',
        path: '/apps/timetable'
      }
    ]
  }

  if (userData?.role?.name == 'teacher') {
    return [
      {
        sectionTitle: 'Dashboard'
      },
      {
        title: 'Dashboard',
        icon: 'tabler:smart-home',
        path: '/dashboard'
      },
      {
        sectionTitle: 'Applicants'
      },
      {
        title: ' Applicants',
        icon: 'fluent:people-sync-16-filled',
        path: '/apps/applicants'
      },
      {
        title: ' Applicants Subjects',
        icon: 'mdi:learn-outline',
        path: '/apps/applicantsSubjects'
      },
      {
        title: 'Applicants CBT',
        icon: 'healthicons:i-exam-multiple-choice',
        path: '/apps/applicantCBT'
      },

      {
        sectionTitle: 'Student Management'
      },
      {
        title: 'Attendance',
        icon: 'mdi:timetable',
        path: '/apps/attendance'
      },
      {
        sectionTitle: 'Academics '
      },
      {
        title: 'Subjects',
        icon: 'mdi:learn-outline',
        path: '/apps/subjects'
      },
      {
        title: 'Classes',
        icon: 'mdi:google-classroom',
        path: '/apps/classes'
      },

      {
        sectionTitle: 'Non-Academic Assessment '
      },
      {
        title: 'Affective Traits',
        icon: 'game-icons:skills',
        path: '/apps/affectiveTraits'
      },
      {
        title: 'Psychomotor Skills',
        icon: 'game-icons:skills',
        path: '/apps/psychomotorSkills'
      },

      {
        sectionTitle: 'Assessment & Results'
      },

      {
        title: 'CBT',
        icon: 'healthicons:i-exam-multiple-choice',
        path: '/apps/cbt'
      },
      {
        title: 'Grading Parameters',
        icon: 'carbon:result',
        path: '/apps/grading-parameters'
      },
      {
        title: 'Result Manager',
        icon: 'healthicons:i-exam-qualification',
        path: '/apps/result-manager'
      }
    ]
  }

  if (userData?.role?.name == 'super-admin') {
    return [
      {
        sectionTitle: 'Dashboard'
      },
      {
        title: 'Dashboard',
        icon: 'tabler:smart-home',
        path: '/dashboard'
      },
      {
        sectionTitle: 'Staff Management'
      },
      {
        title: 'Staff',
        icon: 'pepicons-print:people',
        path: '/apps/staff'
      },

      {
        title: 'Staff Activity Log',
        icon: 'tdesign:system-log',
        path: '/apps/staff-activity-log'
      },

      // {
      //   title: 'Staff Attendance',
      //   icon: 'material-symbols:co-present-rounded',
      //   path: '/apps/staff-attendence/list'
      // },

      {
        sectionTitle: 'Applicants'
      },
      {
        title: ' Applicants',
        icon: 'fluent:people-sync-16-filled',
        path: '/apps/applicants'
      },
      {
        title: ' Applicants Subjects',
        icon: 'mdi:learn-outline',
        path: '/apps/applicantsSubjects'
      },
      {
        title: 'Applicants CBT',
        icon: 'healthicons:i-exam-multiple-choice',
        path: '/apps/applicantCBT'
      },

      {
        sectionTitle: 'Student Management'
      },
      {
        title: ' Students',
        icon: 'fa6-solid:people-line',
        path: '/apps/students'
      },
      {
        title: 'Attendance',
        icon: 'mdi:timetable',
        path: '/apps/attendance'
      },

      {
        sectionTitle: 'Guardians'
      },
      {
        title: 'Guardians',
        icon: 'raphael:parent',
        path: '/apps/guardian'
      },

      {
        sectionTitle: 'Academics '
      },
      {
        title: 'Subjects',
        icon: 'mdi:learn-outline',
        path: '/apps/subjects'
      },

      {
        title: 'Classes',
        icon: 'mdi:google-classroom',
        path: '/apps/classes'
      },

      {
        title: 'Grading Parameters',
        icon: 'carbon:result',
        path: '/apps/grading-parameters'
      },

      {
        title: 'Session',
        icon: 'iwwa:year',
        path: '/apps/session'
      },

      {
        sectionTitle: 'Non-Academic Assessment '
      },
      {
        title: 'Affective Traits',
        icon: 'game-icons:skills',
        path: '/apps/affectiveTraits'
      },
      {
        title: 'Psychomotor Skills',
        icon: 'game-icons:skills',
        path: '/apps/psychomotorSkills'
      },

      {
        sectionTitle: 'Assessment & Results'
      },

      {
        title: 'Result Manager',
        icon: 'healthicons:i-exam-qualification',
        path: '/apps/result-manager'
      },

      // {
      //   title: 'Library',
      //   icon: 'arcticons:classroom',
      //   path: '/apps/library/list'
      // },

      {
        title: 'CBT',
        icon: 'healthicons:i-exam-multiple-choice',
        path: '/apps/cbt'
      },

      {
        sectionTitle: 'Hostel'
      },

      {
        title: 'Rooms',
        icon: 'fa-solid:house-user',
        path: '/apps/rooms'
      },

      {
        sectionTitle: 'Accounts '
      },
      {
        title: 'Income',
        icon: 'emojione-monotone:money-bag',
        path: '/apps/income'
      },
      {
        title: 'Expenditure',
        icon: 'game-icons:pay-money',
        path: '/apps/expenditure'
      },
      {
        title: 'Payment Methods',
        icon: 'fxemoji:creditcard',
        path: '/apps/payment-methods'
      },
      {
        title: 'Payroll',
        icon: 'fluent:payment-16-regular',
        path: '/apps/payroll'
      }

      //   {
      //   sectionTitle: 'Settings'
      // },
      // {
      //   title: 'Settings',
      //   icon: 'tabler:settings',
      //   path: '/apps/settings'
      // }

      // {
      //   title: 'Fees and Billing',
      //   icon: 'fa6-solid:file-invoice-dollar',
      //   path: '/apps/fees-billing/list'
      // },

      // {
      //   title: 'Expenses',
      //   icon: 'arcticons:day-to-day-expenses',
      //   path: '/apps/expense/list'
      // },

      // {
      //   title: 'Invoices',
      //   icon: 'vaadin:invoice',
      //   path: '/apps/invoice/list'
      // },
      // {
      //   title: 'Inventory',
      //   icon: 'ic:outline-inventory-2',
      //   path: '/apps/inventory/list'
      // },
    ]
  }

  return [
    {
      sectionTitle: 'Dashboard'
    },
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: '/dashboard'
    },
    {
      sectionTitle: 'Staff Management'
    },
    {
      title: 'Staff',
      icon: 'pepicons-print:people',
      path: '/apps/staff'
    },

    {
      title: 'Staff Activity Log',
      icon: 'tdesign:system-log',
      path: '/apps/staff-activity-log'
    },

    // {
    //   title: 'Staff Attendance',
    //   icon: 'material-symbols:co-present-rounded',
    //   path: '/apps/staff-attendence/list'
    // },

    {
      sectionTitle: 'Applicants'
    },
    {
      title: ' Applicants',
      icon: 'fluent:people-sync-16-filled',
      path: '/apps/applicants'
    },
    {
      title: ' Applicants Subjects',
      icon: 'mdi:learn-outline',
      path: '/apps/applicantsSubjects'
    },
    {
      title: 'Applicants CBT',
      icon: 'healthicons:i-exam-multiple-choice',
      path: '/apps/applicantCBT'
    },

    {
      sectionTitle: 'Student Management'
    },
    {
      title: ' Students',
      icon: 'fa6-solid:people-line',
      path: '/apps/students'
    },
    {
      title: 'Attendance',
      icon: 'mdi:timetable',
      path: '/apps/attendance'
    },

    {
      sectionTitle: 'Guardians'
    },
    {
      title: 'Guardians',
      icon: 'raphael:parent',
      path: '/apps/guardian'
    },

    {
      sectionTitle: 'Academics '
    },
    {
      title: 'Subjects',
      icon: 'mdi:learn-outline',
      path: '/apps/subjects'
    },

    {
      title: 'Classes',
      icon: 'mdi:google-classroom',
      path: '/apps/classes'
    },

    {
      title: 'Grading Parameters',
      icon: 'carbon:result',
      path: '/apps/grading-parameters'
    },

    {
      title: 'Session',
      icon: 'iwwa:year',
      path: '/apps/session'
    },

    {
      sectionTitle: 'Non-Academic Assessment '
    },
    {
      title: 'Affective Traits',
      icon: 'game-icons:skills',
      path: '/apps/affectiveTraits'
    },
    {
      title: 'Psychomotor Skills',
      icon: 'game-icons:skills',
      path: '/apps/psychomotorSkills'
    },

    {
      sectionTitle: 'Assessment & Results'
    },

    {
      title: 'Result Manager',
      icon: 'healthicons:i-exam-qualification',
      path: '/apps/result-manager'
    },

    // {
    //   title: 'Library',
    //   icon: 'arcticons:classroom',
    //   path: '/apps/library/list'
    // },

    {
      title: 'CBT',
      icon: 'healthicons:i-exam-multiple-choice',
      path: '/apps/cbt'
    },

    {
      sectionTitle: 'Hostel'
    },

    {
      title: 'Rooms',
      icon: 'fa-solid:house-user',
      path: '/apps/rooms'
    },

    {
      sectionTitle: 'Accounts '
    },
    {
      title: 'Income',
      icon: 'emojione-monotone:money-bag',
      path: '/apps/income'
    },
    {
      title: 'Expenditure',
      icon: 'game-icons:pay-money',
      path: '/apps/expenditure'
    },
    {
      title: 'Payment Methods',
      icon: 'fxemoji:creditcard',
      path: '/apps/payment-methods'
    },
    {
      title: 'Payroll',
      icon: 'fluent:payment-16-regular',
      path: '/apps/payroll'
    }

    //   {
    //   sectionTitle: 'Settings'
    // },
    // {
    //   title: 'Settings',
    //   icon: 'tabler:settings',
    //   path: '/apps/settings'
    // }

    // {
    //   title: 'Fees and Billing',
    //   icon: 'fa6-solid:file-invoice-dollar',
    //   path: '/apps/fees-billing/list'
    // },

    // {
    //   title: 'Expenses',
    //   icon: 'arcticons:day-to-day-expenses',
    //   path: '/apps/expense/list'
    // },

    // {
    //   title: 'Invoices',
    //   icon: 'vaadin:invoice',
    //   path: '/apps/invoice/list'
    // },
    // {
    //   title: 'Inventory',
    //   icon: 'ic:outline-inventory-2',
    //   path: '/apps/inventory/list'
    // },
  ]
}

export default navigation
