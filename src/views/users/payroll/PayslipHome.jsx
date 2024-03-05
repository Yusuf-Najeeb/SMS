import React from 'react'
import PayslipTable from './Payslips'
import PayslipTableForNonAdmin from './PayslipTableForNonAdmin'
import GetUserData from '../../../@core/utils/getUserData'


const PayslipsHome = () => {

    const userData = GetUserData()

    if(userData?.role?.name == 'super-admin' || userData?.role?.name == 'admin' || userData?.role?.name == 'accountant') {
  return <PayslipTable />
    }  else {
    return <PayslipTableForNonAdmin />
  }
}

export default PayslipsHome