import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useCategories = () => {
  const CategoriesData = useAppSelector(store => store.categories.CategoryData)
  const loading = useAppSelector(store => store.categories.loading)

  const paging = useAppSelector(store => store.categories.paging)

  return useMemo(() => [CategoriesData, loading, paging], [CategoriesData, loading, paging])
}
