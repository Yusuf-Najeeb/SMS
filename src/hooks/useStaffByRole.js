import { useMemo } from 'react'
import { useAppSelector } from '.'

export const useStaffByRole = () => {
  const StaffDataByRole = useAppSelector(store => store.staffByRole.StaffDataByRole)

  return useMemo(() => [StaffDataByRole], [StaffDataByRole])
}
