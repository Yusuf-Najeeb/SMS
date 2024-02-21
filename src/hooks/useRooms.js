import { useAppSelector } from '.'
import { useMemo } from 'react'

export const useRooms = () => {
  const RoomsList = useAppSelector(store => store.rooms.RoomsList)
  const loading = useAppSelector(store => store.rooms.loading)
  const paging = useAppSelector(store => store.rooms.paging)

  return useMemo(() => [RoomsList, loading, paging], [RoomsList, loading, paging])
}
