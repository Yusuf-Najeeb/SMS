import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useIncome = () => {
  const IncomeData = useAppSelector(store => store.income.IncomeData)
  const loading = useAppSelector(store => store.income.loading)

//   const paging = useAppSelector(store => store.income.paging)

  return useMemo(() => [IncomeData, loading], [IncomeData, loading])
}
