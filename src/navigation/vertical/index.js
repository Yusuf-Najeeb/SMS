const navigation = () => {
  return [
    {
      sectionTitle: 'Staff Manager'
    },
    {
      title: 'Staff List',
      icon: 'tabler:mail',
      path: '/apps/invoice/list'
    },
    {
      title: 'New Staff',
      icon: 'tabler:mail',
      path: '/apps/new-staff/list'
    },
    {
      title: 'Staff Attendance',
      icon: 'tabler:mail',
      path: '/apps/staff-attendence/list'
    },

    {
      sectionTitle: 'Student'
    },
    {
      title: ' Student List',
      icon: 'tabler:mail',
      path: '/apps/student/list'
    },
    {
      title: 'New Student',
      icon: 'tabler:mail',
      path: '/apps/newStudent/list'
    },
    {
      title: 'Student Attendence',
      icon: 'tabler:mail',
      path: '/apps/student-attendence/list'
    },
    {
      sectionTitle: 'Guardians'
    },
    {
      title: 'Guardians',
      icon: 'tabler:mail',
      path: '/apps/guadian/list'
    },

    {
      title: 'New Guardian',
      icon: 'tabler:mail',
      path: '/apps/newGuardian/list'
    },
    {
      sectionTitle: 'Academics '
    },
    {
      title: 'Subjects List',
      icon: 'tabler:mail',
      path: '/apps/subject-list/list'
    },

    {
      title: 'Tests and Exams',
      icon: 'tabler:mail',
      path: '/apps/tests-exams/list'
    },

    {
      title: 'Classrooms',
      icon: 'tabler:mail',
      path: '/apps/classroom/list'
    },
    {
      sectionTitle: 'Accounts '
    },
    {
      title: 'Fees and Billing',
      icon: 'tabler:mail',
      path: '/apps/fees-billing/list'
    },

    {
      title: 'Expenses',
      icon: 'tabler:mail',
      path: '/apps/expense/list'
    },

    {
      title: 'Invoices',
      icon: 'tabler:mail',
      path: '/apps/invoice/list'
    },
    {
      title: 'inventory',
      icon: 'tabler:mail',
      path: '/apps/inventory/list'
    },

    {
      sectionTitle: 'Settings '
    },
    {
      title: 'Setting',
      icon: 'tabler:mail',
      path: '/pages/wizard-examples/property-listing'
    }

    // {
    //   sectionTitle: 'Forms & Tables'
    // },
    // {
    //   title: 'Form Elements',
    //   icon: 'tabler:toggle-left',
    //   children: [
    //     {
    //       title: 'Text Field',
    //       path: '/forms/form-elements/text-field'
    //     },
    //     {
    //       title: 'Select',
    //       path: '/forms/form-elements/select'
    //     },
    //     {
    //       title: 'Checkbox',
    //       path: '/forms/form-elements/checkbox'
    //     },
    //     {
    //       title: 'Radio',
    //       path: '/forms/form-elements/radio'
    //     },
    //     {
    //       title: 'Custom Inputs',
    //       path: '/forms/form-elements/custom-inputs'
    //     },
    //     {
    //       title: 'Textarea',
    //       path: '/forms/form-elements/textarea'
    //     },
    //     {
    //       title: 'Autocomplete',
    //       path: '/forms/form-elements/autocomplete'
    //     },
    //     {
    //       title: 'Date Pickers',
    //       path: '/forms/form-elements/pickers'
    //     },
    //     {
    //       title: 'Switch',
    //       path: '/forms/form-elements/switch'
    //     },
    //     {
    //       title: 'File Uploader',
    //       path: '/forms/form-elements/file-uploader'
    //     },
    //     {
    //       title: 'Editor',
    //       path: '/forms/form-elements/editor'
    //     },
    //     {
    //       title: 'Slider',
    //       path: '/forms/form-elements/slider'
    //     },
    //     {
    //       title: 'Input Mask',
    //       path: '/forms/form-elements/input-mask'
    //     }
    //   ]
    // },
    // {
    //   icon: 'tabler:layout-navbar',
    //   title: 'Form Layouts',
    //   path: '/forms/form-layouts'
    // },
    // {
    //   title: 'Form Validation',
    //   path: '/forms/form-validation',
    //   icon: 'tabler:checkbox'
    // },
    // {
    //   title: 'Form Wizard',
    //   path: '/forms/form-wizard',
    //   icon: 'tabler:text-wrap-disabled'
    // },
    // {
    //   title: 'Table',
    //   icon: 'tabler:table',
    //   path: '/tables/mui'
    // },
    // {
    //   title: 'Mui DataGrid',
    //   icon: 'tabler:layout-grid',
    //   path: '/tables/data-grid'
    // }
  ]
}

export default navigation
