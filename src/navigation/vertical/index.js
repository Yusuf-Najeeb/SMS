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
      }
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

    // {
    //   title: 'New Staff',
    //   icon: 'tabler:mail',
    //   path: '/apps/new-staff/list'
    // },
    // {
    //   title: 'Staff Attendance',
    //   icon: 'material-symbols:co-present-rounded',
    //   path: '/apps/staff-attendence/list'
    // },

    {
      sectionTitle: 'Students'
    },
    {
      title: ' Students',
      icon: 'fa6-solid:people-line',
      path: '/apps/students'
    },

    // {
    //   title: 'New Student',
    //   icon: 'tabler:mail',
    //   path: '/apps/newStudent/list'
    // },

    // {
    //   title: 'Students Attendence',
    //   icon: 'material-symbols:co-present-rounded',
    //   path: '/apps/student-attendence/list'
    // },
    {
      sectionTitle: 'Guardians'
    },
    {
      title: 'Guardians',
      icon: 'raphael:parent',
      path: '/apps/guardian'
    },

    // {
    //   title: 'New Guardian',
    //   icon: 'raphael:parent',
    //   path: '/apps/newGuardian/list'
    // },
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

    // {
    //   title: 'Time Table',
    //   icon: 'mdi:timetable',
    //   path: '/apps/timetable'
    // },

    

    // {
    //   title: 'Tests and Exams',
    //   icon: 'healthicons:i-exam-multiple-choice',
    //   path: '/apps/tests-exams/list'
    // },

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
    // {
    //   title: 'Exam',
    //   icon: 'healthicons:i-exam-multiple-choice',
    //   path: '/apps/exam/list'
    // },

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
    },

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
