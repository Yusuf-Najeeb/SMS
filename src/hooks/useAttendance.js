import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useAttendance = () => {

  const ClassAttendanceData = useAppSelector(store => store.attendance.ClassAttendanceData)
  const loading = useAppSelector(store => store.attendance.loading)

  return useMemo(() => [ClassAttendanceData, loading], [ClassAttendanceData, loading])
}
