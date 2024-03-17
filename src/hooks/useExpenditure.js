import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useExpenditure = () => {
  const ExpenditureData = useAppSelector(store => store.expenditure.ExpenditureData)
  const loading = useAppSelector(store => store.expenditure.loading)

  const paging = useAppSelector(store => store.income.paging)

  return useMemo(() => [ExpenditureData, loading, paging], [ExpenditureData, loading, paging])
}
