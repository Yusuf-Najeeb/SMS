import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useStaff = () => {
  const StaffData = useAppSelector(store => store.staff.StaffData)
  const loading = useAppSelector(store => store.staff.loading)
  const paging = useAppSelector(store => store.staff.paging)

  return useMemo(() => [StaffData, loading, paging], [StaffData, loading, paging])
}
