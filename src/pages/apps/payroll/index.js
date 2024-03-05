
import { useEffect } from 'react'
import PayrollTab from '../../../views/users/payroll/PayrollTab'
import { useAppDispatch } from '../../../hooks'
import { fetchStaffs } from '../../../store/apps/staff/asyncthunk'



const PayrollHome = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchStaffs({ page: 1, limit: 300, key: '' }))
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return <PayrollTab tab='payroll' />
}

export default PayrollHome
