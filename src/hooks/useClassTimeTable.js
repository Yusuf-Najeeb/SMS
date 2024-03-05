import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useClassTimetable = () => {
  const TimetableData = useAppSelector(store => store.timetable.TimetableData)
  const loading = useAppSelector(store => store.timetable.loading)

//   const paging = useAppSelector(store => store.income.paging)

  return useMemo(() => [TimetableData, loading], [TimetableData, loading])
}
