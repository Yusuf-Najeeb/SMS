import { useMemo } from 'react'
import { useAppSelector } from '.'

export const usePayslip = () => {

  const PayslipData = useAppSelector(store => store.payslip.PayslipData)
  const loading = useAppSelector(store => store.payslip.loading)

  return useMemo(() => [PayslipData, loading], [PayslipData, loading])
}
