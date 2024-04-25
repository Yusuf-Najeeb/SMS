import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useStaffActivityLog = () => {
  const StaffActivityLogData = useAppSelector(store => store.staffActivityLog.StaffActivityLogData)
  const loading = useAppSelector(store => store.staffActivityLog.loading)

  const paging = useAppSelector(store => store.staffActivityLog.paging)

  return useMemo(() => [StaffActivityLogData, loading, paging], [StaffActivityLogData, loading, paging])
}
