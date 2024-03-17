import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useIncomeCategory = () => {
  const IncomeCategoryData = useAppSelector(store => store.incomeCategory.IncomeCategoryData)
  const loading = useAppSelector(store => store.incomeCategory.loading)

//   const paging = useAppSelector(store => store.income.paging)

  return useMemo(() => [IncomeCategoryData, loading], [IncomeCategoryData, loading])
}
