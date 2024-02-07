import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useExpenditureCategory = () => {
  const ExpenditureCategoryData = useAppSelector(store => store.expenditureCategory.ExpenditureCategoryData)
  const loading = useAppSelector(store => store.income.loading)

//   const paging = useAppSelector(store => store.income.paging)

  return useMemo(() => [ExpenditureCategoryData, loading], [ExpenditureCategoryData, loading])
}
