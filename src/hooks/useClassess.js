import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useClasses = () => {
  const ClassesList = useAppSelector(store => store.classes.ClassesList)
  const loading = useAppSelector(store => store.classes.loading)
  const paging = useAppSelector(store => store.classes.paging)

  return useMemo(() => [ClassesList, loading, paging], [ClassesList, loading, paging])
}
