import React from 'react'
import DeductionsTable from './Deductions'
import DeductionsTableForNonAdminStaff from './DeductionsTableData'
import GetUserData from '../../../@core/utils/getUserData'


const DeductionsHome = () => {

  const userData = GetUserData()

  if(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin' || userData?.role?.name == 'accountant') {
  return <DeductionsTable />
    }  else {
    return <DeductionsTableForNonAdminStaff />
  }
}

export default DeductionsHome