import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useDeductions = () => {

  const deductionsData = useAppSelector(store => store.deductions.deductionsData)
  const loading = useAppSelector(store => store.deductions.loading)

  return useMemo(() => [deductionsData, loading], [deductionsData, loading])
}
